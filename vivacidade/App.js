import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const RegistroScreen = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios!');
      return;
    }

    try {
      // Usando o IP da máquina para o backend local
      const response = await axios.post('http://192.168.0.249:1024/register', {
        nome,
        email,
        senha,
      });
      Alert.alert('Sucesso', response.data.message);
      setNome('');
      setEmail('');
      setSenha('');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao registrar usuário');
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
