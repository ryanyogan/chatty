import React from 'react';
import PropTypes from 'prop-types';
import {
  addNavigationHelpers,
  StackNavigator,
  TabNavigator,
} from 'react-navigation';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import Groups from './screens/groups.screen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  tabText: {
    color: '#777',
    fontSize: 10,
    justifyContent: 'center',
  },
  selected: {
    color: 'blue',
  },
});

const TestScreen = title => () =>
  <View style={styles.container}>
    <Text>
      {title}
    </Text>
  </View>;

const MainScreenNavigator = TabNavigator({
  Chats: { screen: Groups },
  Settings: { screen: TestScreen('Settings') },
});

const AppNavigator = StackNavigator({
  Main: { screen: MainScreenNavigator },
});

const firstAction = AppNavigator.router.getActionForPathAndParams('Main');
const tempNavState = AppNavigator.router.getStateForAction(firstAction);
const initNavState = AppNavigator.router.getStateForAction(tempNavState);

export const navigationReducer = (state = initNavState, action) => {
  switch (action.type) {
    default:
      return AppNavigator.router.getStateForAction(action, state) || state;
  }
};

const AppWithNavigationState = ({ dispatch, nav }) =>
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />;

const { func, object } = PropTypes;
AppWithNavigationState.propTypes = {
  dispatch: func.isRequired,
  nav: object.isRequired, // eslint-disable-line
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
