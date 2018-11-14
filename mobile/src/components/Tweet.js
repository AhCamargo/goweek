import React, { Component } from 'react';
import api from "../services/api";
import Icon from "react-native-vector-icons/Ionicons";
import styled from 'glamorous-native';


export default class Tweet extends Component {

  handleLike = async () => {
      const { _id } = this.props.tweet;

      await api.post(`likes/${_id}`);
  };

  render() {
      const { tweet } = this.props;

    return (
           <Container>
             <AuthorText>{tweet.author}</AuthorText>
             <ContentText>{tweet.content}</ContentText>

             <LikeButton onPress={this.handleLike}>
              <Icon name="ios-heart-empty" size={20} color="#999" />
              <LikeText>{tweet.likes}</LikeText>
             </LikeButton>
           </Container>
          );
  }
}

const Container = styled.view({
    padding: 20,
    borderBottomWidth: 1,
    borderColor: '#eee',
  });
  
  const AuthorText = styled.text({
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1C2022',
  });
  
  const ContentText = styled.text({
    fontSize: 15,
    lineHeight: 20,
    color: '#1C2022',
    marginVertical: 10,
  });
  
  const LikeButton = styled.touchableOpacity({
    flexDirection: 'row',
    alignItems: 'center',
  });
  
  const LikeText = styled.text({
    color: '#999',
    marginLeft: 5,
  });
