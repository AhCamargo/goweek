import React, { Component } from 'react';
import { FlatList } from 'react-native';

import Icon from "react-native-vector-icons/MaterialIcons";
import styled from 'glamorous-native';
import socket from "socket.io-client";

import api from "../services/api";

import Tweet from "../components/Tweet";


export default class Timeline extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Início",
    headerRight: (
      <AddButton onPress={() => navigation.navigate('New')}>
        <Icon
          style={{marginRight: 10}}
          name="add-circle-outline"
          size={24}
          color="#4BB0EE"
        />
      </AddButton>
    ),
  });
  
  state = {
    tweets: [],
  };

  async componentDidMount() {
    this.subscribeToEvents();
    
    const response = api.get('tweets');

    this.setState({ tweets: response.data });
  }

  subscribeToEvents = () => {
    const io = socket('http://10.0.3.2:3000');

    io.on('tweet', data => {
        this.setState({ tweets: [data, ...this.state.tweets] }); //pega o ultimo result(data coloca como primeiro) e adiciona com os results anteriores
    });
    io.on('like', data => {
        this.setState({ tweets: this.state.tweets.map(tweet => 
          tweet._id === data._id ? data : tweet
        ) });
    });
  };

  render() {
      const { tweets } = this.state;
    return (
        <Container>
         <FlatList
          data={tweets}
          keyExtractor={tweet => tweet._id}
          renderItem={({ item }) => <Tweet tweet={item} /> }
         />
        </Container>
      );
  }
}

const Container = styled.view({
  flex: 1,
  backgroundColor: '#FFF',
});
const AddButton = styled.touchableOpacity({});