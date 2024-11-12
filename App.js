import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageZoom from 'react-native-image-pan-zoom';
import IMGMapa from '/assets/IMGMapaFEI.png';
import { Ionicons } from '@expo/vector-icons';

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
        <Text style={styles.nome}>Bem-vindo ao FEI Maps</Text>
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
        <Text style={styles.nome}>Bem-vindo ao FEI Maps</Text>
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

// ============================ Tela de Descrição dos Prédios ==========================
class TelaDescricao extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.containerDescricao}>
        <Text style={styles.title}>Prédio A:</Text>
        <Text style={styles.descricao}> 
          Reitoria, Superintendência Geral e Administrativa, Setor de Apoio a Eventos e Transporte, Secretaria Geral, Setor de Audiovisual, 
          Setor de Comunicação e Marketing, Setor de Pessoal, Setor de Recursos Humanos, Biblioteca e Salas de Estudos
        </Text>
        <Text style={styles.title}>Prédio B:</Text>
        <Text style={styles.descricao}> 
          Coordenadoria Departamental, Salas de Estudos, Posto Bancário, Tesouraria, Setor de Estágios e Empregos, 
          Centros de Estudos de Alunos, DCE (Diretório Central dos Estudantes), Pastoral,  Assistente Religioso, Salas de Aulas e 
          Centros e Diretórios Acadêmicos ( Automação e Controle, Engenharia Civil, Engenharia Mecânica, Engenharia Química, Administração, 
          Engenharia de Produção e Engenharia Elétrica)
        </Text>
        <Text style={styles.title}>Prédio C:</Text>
        <Text style={styles.descricao}> 
          Praça de Alimentação, Restaurantes, Associação dos Funcionários e Ambulatório Médico
        </Text>
        <Text style={styles.title}>Prédio D:</Text>
        <Text style={styles.descricao}> 
          Centro de Laboratórios Elétricos, Laboratórios de Física, Laboratórios de Robótica e de Automação e Controle, Salas de Aulas, 
          Programa de Bolsas de Estudos, Coordenadoria de Relações Internacionais, Secretaria de Iniciação Científica, 
          CPA - Comissão Própria de Avaliação, Inspetoria e Segurança do Trabalho
        </Text>
        <Text style={styles.title}>Prédio E:</Text>
        <Text style={styles.descricao}> 
          Abriga o Centro de Laboratórios Mecânicos (CLM) que atende as áreas de Mecânica, Materiais e Têxtil, 
          Centro de Pesquisas Têxteis (CPT/IPEI) e Laboratório de Ensaios Mecânicos (CPM/IPEI)
        </Text>
        <Text style={styles.title}>Prédio F:</Text>
        <Text style={styles.descricao}> 
          Laboratório de Engenharia Civil, Setor de Manutenção, Seção de Custos e Patrimônio, Setor de Compras, Suprimentos e Almoxarifado
        </Text>
        <Text style={styles.title}>Prédio G:</Text>
        <Text style={styles.descricao}> 
          Centro de Laboratórios Químicos (CLQ) que atende as áreas de Materiais, Química e Têxtil
        </Text>
        <Text style={styles.title}>Prédio H:</Text>
        <Text style={styles.descricao}> 
          Instituto de Pesquisas - IPEI, Laboratórios do Instituto de Pesquisas, Empresa Júnior FEI, Lanchonete e Copiadora
        </Text>
        <Text style={styles.title}>Prédio I:</Text>
        <Text style={styles.descricao}> 
          Salas de Aulas, Auditório, Laboratórios de Mecânica dos Fluidos e Diretório Acadêmico do Curso de Ciência da Computação (DACC)
        </Text>
        <Text style={styles.title}>Prédio J:</Text>
        <Text style={styles.descricao}> 
          Salas de Aulas e Auditório
        </Text>
        <Text style={styles.title}>Prédio K:</Text>
        <Text style={styles.descricao}> 
          Salas de Aulas, Laboratórios de Informática, Laboratórios de Robótica e Inteligência Artificial, Laboratórios de Automação e Controle,
          Laboratório de Manufatura Digital, Coordenadoria Geral de Informática (CGI), Laboratório de Tecnologia da Informação, 
          Secretaria da Pós-graduação Stricto Sensu e Chefias do Mestrado e Doutorado
        </Text>
        <Text style={styles.title}>Prédio N:</Text>
        <Text style={styles.descricao}> 
          Piscina Semiolímpica Coberta, Arquibancada, Vestiário, Salas de Musculação e Artes Marciais, Áreas de Lazer e Sala Multiuso para Alunos
        </Text>
        <Text style={styles.title}>Prédio O:</Text>
        <Text style={styles.descricao}> 
          Portaria Externa
        </Text>
        <Text style={styles.title}>Prédio P:</Text>
        <Text style={styles.descricao}> 
          Torre Caixa d’água
        </Text>
        <Text style={styles.title}>Prédio R:</Text>
        <Text style={styles.descricao}> 
          Capela Santo Inácio de Loyola
        </Text>
        <Text style={styles.title}>Prédio S:</Text>
        <Text style={styles.descricao}> 
          Ginásio de Esportes, Arquibancada, Quadra Poliesportiva, Vestiário e Sala Administrativa do CVDRL
        </Text>
        <Text style={styles.title}>Prédio T:</Text>
        <Text style={styles.descricao}> 
          IECAT – Instituto de Especialização em Ciências Administrativas e Tecnológicas (Pós-graduação Latu Sensu), Salas de aula, 
          Auditório e Inspetoria
        </Text>
        <Text style={styles.title}>Prédio U:</Text>
        <Text style={styles.descricao}> 
          Quadras poliesportivas e tênis, Campo de Futebol, Campo de Futebol Society, Atletismo: pista área de prova de campo, lançamento de dardo,
           Vestiário, Sala de Apoio, Depósito de Materiais Esportivos, Torre d’água e Arquibancada
        </Text>
      </ScrollView>
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={TelaLogin} />
          <Stack.Screen name="Cadastro" component={TelaCadastro} />
          <Stack.Screen name="Login " component={TelaLogin2} />
          <Stack.Screen name="Recuperação" component={TelaRecupera}/>
          <Stack.Screen name="Verificação" component={TelaVerifica}/>
          <Stack.Screen name="Redefinição" component={TelaRedefine}/>
          <Stack.Screen name="Início" component={TelaInicial} options={({ navigation }) => ({title: 'Mapa da Faculdade', headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.navigate('Descrição dos Prédios')}>
                  <Ionicons name="menu" size={30} color="black" style={{ marginLeft: 15 }} />
                </TouchableOpacity>),})}/>
          <Stack.Screen name="Descrição dos Prédios" component={TelaDescricao} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

// ============================ Estilos ======================================

const styles = StyleSheet.create({
  descricao: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: 10,
  },
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
  containerDescricao: {
    flexGrow: 1, 
    justifyContent: 'flex-start', 
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
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