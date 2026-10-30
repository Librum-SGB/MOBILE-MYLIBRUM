import { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { requireOptionalNativeModule } from 'expo';

// O import direto da biblioteca encerra o app quando o módulo não está no binário (Expo Go).
const reconhecimentoVoz: typeof import('expo-speech-recognition') | null =
  Platform.OS === 'web' || requireOptionalNativeModule('ExpoSpeechRecognition')
    ? require('expo-speech-recognition')
    : null;

export function PesquisaVoz({ onTexto }: { onTexto: (texto: string) => void }) {
  const [ouvindo, setOuvindo] = useState(false);

  useEffect(() => {
    if (!reconhecimentoVoz) return;

    const assinaturas = [
      reconhecimentoVoz.addSpeechRecognitionListener('start', () => setOuvindo(true)),
      reconhecimentoVoz.addSpeechRecognitionListener('end', () => setOuvindo(false)),
      reconhecimentoVoz.addSpeechRecognitionListener('result', event => {
        const fala = event.results?.[0]?.transcript;
        if (fala) onTexto(fala);
      }),
      reconhecimentoVoz.addSpeechRecognitionListener('error', event => {
        setOuvindo(false);
        if (event.error !== 'no-speech' && event.error !== 'aborted') {
          Alert.alert('Pesquisa por voz', event.message || 'Não foi possível reconhecer a fala.');
        }
      }),
    ];

    return () => assinaturas.forEach(assinatura => assinatura.remove());
  }, [onTexto]);

  const alternar = async () => {
    if (!reconhecimentoVoz) {
      Alert.alert('Pesquisa por voz indisponível',
        'A pesquisa por voz não está disponível nesta versão do aplicativo. Você pode pesquisar digitando.');
      return;
    }

    const { ExpoSpeechRecognitionModule } = reconhecimentoVoz;
    try {
      if (ouvindo) {
        ExpoSpeechRecognitionModule.stop();
        return;
      }
      const permissao = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!permissao.granted) {
        Alert.alert('Microfone', 'Permita o acesso ao microfone e ao reconhecimento de voz.');
        return;
      }
      ExpoSpeechRecognitionModule.start({ lang: 'pt-BR', interimResults: true, continuous: false });
    } catch {
      setOuvindo(false);
      Alert.alert('Pesquisa por voz', 'Não foi possível iniciar a pesquisa por voz. Tente novamente.');
    }
  };

  return (
    <TouchableOpacity onPress={alternar} accessible accessibilityLabel={!reconhecimentoVoz ? 'Pesquisa por voz indisponível' : ouvindo ? 'Parar microfone' : 'Pesquisar por voz'}
      style={{ width: 44, height: 44, backgroundColor: !reconhecimentoVoz ? '#48515A' : ouvindo ? '#A83C44' : '#1466EF', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
      {ouvindo ? <ActivityIndicator color="#fff" size="small" />
        : <MaterialCommunityIcons name={reconhecimentoVoz ? 'microphone' : 'microphone-off'} color="#fff" size={24} />}
    </TouchableOpacity>
  );
}
