/* eslint-disable react/no-multi-comp */

import { _ } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  groupContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  groupName: {
    fontWeight: 'bold',
    flex: 0.7,
  },
});

// TODO: Remove the mocked data
const mockData = () =>
  _.times(100, i => ({
    id: i,
    name: `Group ${i}`,
  }));

class Group extends Component {
  render() {
    const { id, name } = this.props.group;
    return (
      <TouchableHighlight key={id}>
        <View style={styles.groupContainer}>
          <Text style={styles.groupName}>
            {name}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const { shape, number, string } = PropTypes;
Group.propTypes = {
  group: shape({
    id: number,
    name: string,
  }),
};

class Groups extends Component {
  static navigationOptions = {
    title: 'Chats',
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => <Group group={item} />;

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

export default Groups;
