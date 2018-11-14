import React, { Component } from 'react';
import { StackActions, NavigationActions } from "react-navigation";
import styled from 'glamorous-native';
import Icon from "react-native-vector-icons/FontAwesome";
  import { 
    View, StyleSheet,
    KeyboardAvoidingView,
    AsyncStorage,
   } from 'react-native';

export default class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
   username: '',
  };

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@GoTwitter:username');

    if(username) {
      this.navigateToTimeline();
    }
  }
  
  handleLogin = async () => {
    const { username } = this.state;

    if(!username.length) return;
    
    await AsyncStorage.setItem('@GoTwitter:username', username); //Salvando user no "LocalStorage"

    //this.props.navigation.navigate('Timeline'); //Redireciona para outra página

    this.navigateToTimeline();

  };
  
  navigateToTimeline = () => {
    //Assim que o user logar, recriaremos o fluxo de navegaçao, apartir da tela Timeline.
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Timeline"}) ]
    })

    this.props.navigation.dispatch(resetAction); //Redireciona a tela, mas nao deixa o user voltar para tela de login.
  };
  handleInputChange = username => {
    this.setState({username});
  }

  render() {
      const {username} = this.state;

    return (
      <KeyboardAvoidingView style={styles.container} behavior="height">
        <Content>
         <View>
          <Icon name="twitter" size={64} color="#4BB0EE" />
         </View>

          <Input
            //style={styles.input}
            placeholder="Nome de usuário"
            value={username}
            onChangeText={this.handleInputChange}
            returnKeyType="send"
            onSubmitEditing={this.handleLogin}
          />

          <Button /*style={styles.Button}*/ onPress={this.handleLogin}>
              <ButtonText /*style={styles.ButtonText}*/>Entrar</ButtonText>
          </Button>
        </Content>
      </KeyboardAvoidingView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const Content = styled.view({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 30,
});

const Input = styled.textInput({
  borderWidth: 1,
  borderColor: '#DDD',
  borderRadius: 5,
  height: 44,
  paddingHorizontal: 15,
  alignSelf: 'stretch',
  marginTop: 30,
});

const Button = styled.touchableOpacity({
  height: 44,
  alignSelf: 'stretch',
  marginTop: 10,
  backgroundColor: '#4BB0EE',
  borderRadius: 5,
  justifyContent: 'center',
  alignItems: 'center',
});

const ButtonText = styled.text({
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
});