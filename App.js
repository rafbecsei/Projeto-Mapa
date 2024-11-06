import React from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

//const backgroundImage = require('');

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }

  handleLogin = async () => {
    const { email, senha } = this.state;
    try {
      const EmailSalvo = await AsyncStorage.getItem('email');
      const SenhaSalva = await AsyncStorage.getItem('senha');
      if (email === EmailSalvo && senha === SenhaSalva) {
        this.props.navigation.navigate('HomeScreen');
      } else {
        alert('E-mail ou senha incorretos');
      }
    } catch (error) {
      alert('Erro ao verificar os dados de login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Bem-vindo ao Mapa da Faculdade</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe seu usuário"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Informe sua senha"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry
        />
        <Button title="Entrar" onPress={this.handleLogin} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('CadastroScreen')}>
          <Text style={styles.registerText}>Não tem uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class CadastroScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }

  handleCadastro = async () => {
    const { email, senha } = this.state;
    try {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('senha', senha);
      alert('Cadastro realizado com sucesso!');
      this.props.navigation.navigate('Login');
    } catch (error) {
      alert('Erro ao salvar os dados de cadastro');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cadastro</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe seu usuário"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Informe sua senha"
          value={this.state.password}
          onChangeText={(text) => this.setState({ password: text })}
          secureTextEntry
        />
        <Button title="Cadastrar" onPress={this.handleCadastro} />
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{"Home"}</Text>
      </View>
    );
  }
}


class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CadastroScreen" component={CadastroScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
});

export default App;
