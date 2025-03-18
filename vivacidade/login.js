import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const RegistroScreen = () => {
  // Estado para os campos do formulário
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  // Função para validar e enviar o formulário
  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    // Criar o corpo da requisição
    const data = {
      nome,
      email,
      senha,
    };

    try {
      // Enviar os dados para o backend (API)
      const response = await fetch('http://localhost:1024', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        // Exibir mensagem de sucesso
        Alert.alert('Sucesso', responseData.message);
      } else {
        // Exibir erro
        Alert.alert('Erro', responseData.message || 'Erro ao registrar usuário');
      }

      // Limpar os campos após o envio
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={(text) => setNome(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={(text) => setSenha(text)}
      />

      <Button title="Registrar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 5,
  },
});

export default RegistroScreen;
