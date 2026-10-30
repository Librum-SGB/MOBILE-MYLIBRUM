import { useEffect, useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import api, { setAuthToken } from '../api/api';
import { LoginRequestDTO, LoginResponseDTO } from '../types/auth';

const TOKEN_KEY = 'mylibrum.biometria.token';

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [biometriaAtivada, setBiometriaAtivada] = useState(false);

  useEffect(() => {
    SecureStore.getItemAsync(TOKEN_KEY)
      .then(token => setBiometriaAtivada(Boolean(token)))
      .catch(() => setBiometriaAtivada(false));
  }, []);

  const podeUsarDigital = async () => {
    if (Platform.OS !== 'android') return false;
    const [hardware, cadastrada, tipos] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
      LocalAuthentication.supportedAuthenticationTypesAsync(),
    ]);
    // Uma API genérica do Android não permite selecionar a modalidade exata no prompt.
    // Se há face/íris disponível, recusamos o atalho para garantir a regra "só digital".
    const apenasDedo = tipos.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
      && !tipos.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)
      && !tipos.includes(LocalAuthentication.AuthenticationType.IRIS);
    return hardware && cadastrada && apenasDedo;
  };

  const habilitarDigital = async (token: string) => {
    try {
      if (!(await podeUsarDigital())) return;
      // Confirma a opção do usuário depois de seu primeiro login com senha.
      Alert.alert('Entrar com impressão digital',
        'Deseja ativar o acesso biométrico neste aparelho? É necessário autenticar com senha ao menos uma vez.',
        [
          { text: 'Agora não', style: 'cancel' },
          { text: 'Ativar', onPress: () => {
            SecureStore.setItemAsync(TOKEN_KEY, token)
              .then(() => setBiometriaAtivada(true))
              .catch(() => Alert.alert('Erro', 'Não foi possível salvar a sessão com segurança.'));
          } },
        ]
      );
    } catch { /* Biometria não disponível; login comum segue funcionando */ }
  };

  const login = async (dto: LoginRequestDTO) => {
    setErro('');
    const email = dto.email.trim();
    if (!email || !dto.senha) {
      setErro('Preencha o e-mail e a senha.');
      return;
    }

    setCarregando(true);
    try {
      const response = await api.post<LoginResponseDTO>('/auth/login', { email, senha: dto.senha }, { timeout: 10000 });
      const token = response.data?.token;
      if (typeof token !== 'string' || !token.trim()) throw new Error('Resposta de login sem token');
      setAuthToken(token);
      setLoggedIn(true);
      try {
        const anterior = await SecureStore.getItemAsync(TOKEN_KEY);
        if (anterior) {
          await SecureStore.setItemAsync(TOKEN_KEY, token);
          setBiometriaAtivada(true);
        } else {
          await habilitarDigital(token);
        }
      } catch { /* Falha no armazenamento não invalida um login já aceito. */ }
    } catch (error) {
      setAuthToken(null);
      setLoggedIn(false);
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        // O erro completo do Axios inclui a senha enviada; registre apenas o diagnóstico.
        console.error('Erro ao fazer login:', { status, codigo: error.code });
        if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
          setErro('O servidor demorou para responder. Tente novamente.');
        } else if (!error.response) {
          setErro('Não foi possível conectar ao servidor. Verifique a conexão e se o serviço está disponível.');
        } else if (status === 401) {
          setErro('E-mail ou senha inválidos.');
        } else if (status === 403) {
          setErro('Acesso negado. Verifique se sua conta tem permissão para entrar.');
        } else if (status === 404 || status === 405) {
          setErro('O serviço de login não foi encontrado no servidor configurado.');
        } else if (status === 429) {
          setErro('Muitas tentativas de login. Aguarde um pouco antes de tentar novamente.');
        } else if (status && status >= 500) {
          setErro('O servidor está com um problema. Tente novamente mais tarde.');
        } else {
          setErro('Não foi possível entrar. Confira o e-mail e a senha e tente novamente.');
        }
      } else {
        console.error('Erro ao fazer login: resposta de sessão inválida.');
        setErro('O servidor não retornou uma sessão válida. Verifique o serviço de login.');
      }
    } finally {
      setCarregando(false);
    }
  };

  const loginComDigital = async () => {
    setCarregando(true);
    setErro('');
    try {
      if (!(await podeUsarDigital())) {
        setErro('Acesso com digital exige um Android com biometria digital cadastrada e sem outras modalidades biométricas disponíveis.');
        return;
      }
      const resultado = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Entrar no MyLibrum com impressão digital',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: true,
        biometricsSecurityLevel: 'strong',
      });
      if (!resultado.success) {
        setErro('Autenticação biométrica cancelada ou não reconhecida.');
        return;
      }
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!token) {
        setBiometriaAtivada(false);
        setErro('Faça o primeiro acesso com e-mail e senha.');
        return;
      }
      // Valida a sessão com o backend ANTES de abrir as telas privadas.
      // Um token expirado/revogado exige login com senha.
      await api.get('/api/materiais', { headers: { Authorization: `Bearer ${token}` } });
      setAuthToken(token);
      setLoggedIn(true);
    } catch (error) {
      console.error('Não foi possível validar a sessão biométrica:', error);
      setAuthToken(null);
      setErro('Sessão expirada ou servidor indisponível. Entre com e-mail e senha.');
    } finally {
      setCarregando(false);
    }
  };

  const logout = () => {
    setAuthToken(null);
    setLoggedIn(false);
    setErro('');
    // Preferência biométrica permanece até o usuário remover a autorização.
  };

  const desativarDigital = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setBiometriaAtivada(false);
  };

  return { loggedIn, login, loginComDigital, logout, desativarDigital, biometriaAtivada, carregando, erro };
};
