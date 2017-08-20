import React, { Component } from 'react';
import { _ } from 'lodash';
import { FlatList, StyleSheet, View } from 'react-native';
import randomColor from 'randomcolor';

import Message from '../components/message.component';

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    backgroundColor: '#e5ddd5',
    flex: 1,
    flexDirection: 'column',
  },
});

const mockData = () =>
  _.times(100, i => ({
    color: randomColor(),
    isCurrentUser: i % 5 === 0,
    message: {
      id: i,
      createdAt: new Date().toISOString(),
      from: {
        username: `Username ${i}`,
      },
      text: `Message ${i}`,
    },
  }));

class Messages extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
    };
  };

  keyExtractor = item => item.message.id;

  renderItem = ({ item: { isCurrentUser, message, color } }) =>
    <Message color={color} isCurrentUser={isCurrentUser} message={message} />;

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={mockData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

export default Messages;
