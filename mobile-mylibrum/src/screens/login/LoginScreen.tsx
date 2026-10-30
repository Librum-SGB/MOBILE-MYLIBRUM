import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';

type LoginScreenProps = {
  onLogin: (email: string, senha: string) => void;
  onBiometria: () => void;
  biometriaAtivada: boolean;
  carregando: boolean;
  erro: string;
};

export const LoginScreen = ({ onLogin, onBiometria, biometriaAtivada, carregando, erro }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
      <View style={styles.logo}><MaterialCommunityIcons name="bookshelf" size={43} color="#fff" /></View>
      <Text style={styles.title}>MyLibrum</Text>
      <Text style={styles.subtitle}>Sua biblioteca na palma da mão</Text>
      {erro ? <Text style={styles.erro}>{erro}</Text> : null}
      <Text style={styles.label}>E-mail</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail}
        keyboardType="email-address" autoCapitalize="none" autoComplete="email"
        placeholder="Seu e-mail" placeholderTextColor="#8790A1" />
      <Text style={styles.label}>Senha</Text>
      <TextInput style={styles.input} value={senha} onChangeText={setSenha}
        secureTextEntry placeholder="Sua senha" placeholderTextColor="#8790A1" />
      <TouchableOpacity style={styles.button} onPress={() => onLogin(email.trim(), senha)} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>
      {biometriaAtivada && (
        <TouchableOpacity style={styles.biometria} onPress={onBiometria} disabled={carregando}>
          <MaterialCommunityIcons name="fingerprint" size={29} color="#69B3FF" />
          <Text style={styles.biometriaText}>Entrar com impressão digital</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.rodape}>A biometria pode ser habilitada após o primeiro login com senha.</Text>
    </KeyboardAvoidingView>
  );
};
