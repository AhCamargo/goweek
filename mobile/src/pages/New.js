import React, { Component } from 'react';
import api from "../services/api";
import Icon from "react-native-vector-icons/MaterialIcons";
import styled from 'glamorous-native';
import { 
  SafeAreaView, StyleSheet, AsyncStorage,
 } from 'react-native';

export default class New extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    newTweet: '',
  };

  handleNewTweet = async () => {
   const content = this.state.newTweet;
   const author = await AsyncStorage.getItem('@GoTwitter:username');

   await api.post('tweets', { content, author});

   this.goBack();
  };

  handleInputChange = newTweet => {
   this.setState({ newTweet });
  };

  goBack = () => {
   this.props.navigation.pop();
  };

  render() {
     const { newTweet } = this.state;
    return (
            <SafeAreaView style={styles.container}>
              <Header /*style={styles.Header}*/>
                <CloseButton onPress={this.goBack}>
                 <Icon name="close" sixe={24} color="#4BB0EE"/>
                </CloseButton>

                <Button /*style={styles.Button}*/ onPress={this.handleNewTweet}>
                 <ButtonText /*style={styles.ButtonText}*/>Tweetar</ButtonText>
                </Button>
              </Header>

              <Input
               //style={styles.Input}
               multiline
               placeholder="O que está acontecendo?"
               value={newTweet}
               onChange={this.handleInputChange}
               placeholderTextColor="#999"
               retunrKeyType="send"
               onSubmitEditing={this.handleNewTweet}
              />
            </SafeAreaView>
           );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

const Header = styled.view({
  paddingTop: 10,
  paddingHorizontal: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
});

const CloseButton = styled.touchableOpacity({});

const Button = styled.touchableOpacity({
  height: 32,
  paddingHorizontal: 20,
  borderRadius: 16,
  backgroundColor: '#4BB0EE',
  justifyContent: 'center',
  alignItems: 'center',
});

const ButtonText = styled.text({
  color: '#FFF',
  fontSize: 16,
  fontWeight: 'bold',
});

const Input = styled.textInput({
  margin: 20,
  fontSize: 16,
  color: '#333',
});