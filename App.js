import * as React from 'react';
import { View, StyleSheet, StatusBar, Platform, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Constants from 'expo-constants';
import { createStore } from 'redux'
import { Provider } from 'react-redux'


// You can import from local files
import CreateDeck from './components/CreateDeck';
import DeckTop from './components/DeckTop';
import DeckList from './components/DeckList';
import ShowCards from './components/ShowCards';
import AddCard from './components/AddCard';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white, orange } from './utils/colors'
import reducer from './reducers'
import middleware from './middleware'
import { saveData } from './utils/api'
import { setLocalNotification } from './utils/helpers'
import Home from './components/Home';

// or any pure javascript modules available in npm


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck List',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={20} color={tintColor} />
    },
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarLabel: 'Create Deck',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={20} color={tintColor} />
    },
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : purple,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

const MainStack = createStackNavigator({
  Tabs: {
    screen: Home
  },
  DeckTop: {
    screen: DeckTop
  },
  AddCard: {
    screen: AddCard
  },
  ShowCards: {
    screen: ShowCards
  }

});

const Container = createAppContainer(MainStack)
const store = createStore(reducer, middleware)
store.subscribe(() => {
  saveData(JSON.stringify(store.getState()));
});

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <UdaciStatusBar backgroundColor={white} barStyle="light-content" height='1'/>
          <Container />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  }
});
