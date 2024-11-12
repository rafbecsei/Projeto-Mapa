import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageZoom from 'react-native-image-pan-zoom';
import IMGMapa from '/assets/IMGMapaFEI.png';

const Stack = createStackNavigator();

// ============================== Login ================================

class TelaLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
      tentativas: 0,
    };
  }

  handleLogin = async () => {
    const { email, senha, tentativas } = this.state;
    try {
      const EmailSalvo = await AsyncStorage.getItem('email');
      const SenhaSalva = await AsyncStorage.getItem('senha');
      if (email === EmailSalvo && senha === SenhaSalva) {
        this.props.navigation.navigate('Início');
      } 
      else {
        const errou = tentativas + 1;
        this.setState({ tentativas: errou });
        if(errou >= 2){
          this.setState({ tentativas: 0 });
          this.props.navigation.navigate('Login ');
        }
        alert('E-mail ou senha incorretos');
      }
    } 
    catch (error) {
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
          placeholderTextColor="#888" 
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Informe sua senha"
          placeholderTextColor="#888" 
          value={this.state.senha}
          onChangeText={(text) => this.setState({ senha: text })}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')}>
          <Text style={styles.registerText}>Ainda não se cadastrou? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// ============================= Login 2 =====================================

class TelaLogin2 extends React.Component {
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
        this.props.navigation.navigate('Início');
      } 
      else {
        alert('E-mail ou senha incorretos');
      }
    } 
    catch (error) {
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
          placeholderTextColor="#888" 
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Informe sua senha"
          placeholderTextColor="#888" 
          value={this.state.senha}
          onChangeText={(text) => this.setState({ senha: text })}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Recuperação')}>
          <Text style={styles.registerText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Cadastro')}>
          <Text style={styles.registerText}>Ainda não se cadastrou? Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// ============================ Cadastro ================================

class TelaCadastro extends React.Component {
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
    } 
    catch (error) {
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
          placeholderTextColor="#888" 
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Informe sua senha"
          placeholderTextColor="#888" 
          value={this.state.senha}
          onChangeText={(text) => this.setState({ senha: text })}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={this.handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// ============================ Recupera Senha ============================

class TelaRecupera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      codigo: null,
    };
  }

  handleEnviaCodigo = async () => {
  const {email} = this.state;
  try{
    const EmailSalvo = await AsyncStorage.getItem('email');
    if (email !== EmailSalvo) {
      alert('E-mail incorreto!');
      return; 
    }
    const geraCodigo = Math.floor(100000 + Math.random() * 900000);
    alert('Código de Verificação: ' + geraCodigo);
    this.setState({ codigo: geraCodigo });
    this.props.navigation.navigate('Verificação', {codigo: geraCodigo});
  } 
  catch(error){
    alert('Erro na verificação');
  }
};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recuperação de Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Informe seu usuário"
          placeholderTextColor="#888"
          value={this.state.email}
          onChangeText={(text) => this.setState({ email: text })}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={this.handleEnviaCodigo}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// =========================== Tela Verifica =============================

class TelaVerifica extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigoInserido: '',
    };
  }

  handleVerifica = () => {
    const {codigo} = this.props.route.params;
    if(parseInt(this.state.codigoInserido) === codigo) {
      this.props.navigation.navigate('Redefinição');
    } 
    else {
      alert('Código incorreto!');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verifique o Código</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o código"
          placeholderTextColor="#888"
          keyboardType="numeric"
          value={this.state.codigoInserido}
          onChangeText={(text) => this.setState({ codigoInserido: text })}
        />
        <TouchableOpacity style={styles.button} onPress={this.handleVerifica}>
          <Text style={styles.buttonText}>Verificar</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

// ========================= Redefinindo Senha ===========================
class TelaRedefine extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      novaSenha: '',
    };
  }

  handleRedefinirSenha = async () => {
    try {
      await AsyncStorage.setItem('senha', this.state.novaSenha);
      alert('Senha atualizada com sucesso!');
      this.props.navigation.navigate('Login');
    } catch (error) {
      alert('Erro ao atualizar a senha');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Redefinir Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          placeholderTextColor="#888"
          value={this.state.novaSenha}
          onChangeText={(text) => this.setState({novaSenha: text})}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={this.handleRedefinirSenha}>
          <Text style={styles.buttonText}>Redefinir Senha</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


// ============================ Tela Inicial ==============================

class TelaInicial extends React.Component {
  render() {
    return (
      <View style={styles.mapaContainer}>
        <ImageZoom
          
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').width * (600 / 750)}>

          <Image source={IMGMapa} style={styles.image} resizeMode="contain"/>
        </ImageZoom>
      </View>
    );
  }
}

// ============================ App Component ================================

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Início">
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Login " component={TelaLogin2} />
          <Stack.Screen name="Recuperação" component={TelaRecupera}/>
          <Stack.Screen name="Verificação" component={TelaVerifica}/>
          <Stack.Screen name="Redefinição" component={TelaRedefine}/>
          <Stack.Screen name="Início" component={TelaInicial} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// ============================ Estilos ======================================

const styles = StyleSheet.create({
  mapaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff',
  },
  image: {
    width: '100%',
    height: '100%',
  },
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
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    color: '#0000EE',
    textDecorationLine: 'underline',
  },
});


export default App;
