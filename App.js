import * as React from 'react';
import { View, StyleSheet, StatusBar, Platform, AsyncStorage } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Constants from 'expo-constants';
import { createStore } from 'redux'
import { Provider } from 'react-redux'


// You can import from local files
import CreateDeck from './components/CreateDeck';
import Settings from './components/Settings';
import Jobs from './components/Jobs';
import Home from './components/Home';
import DeckList from './components/DeckList';
import CurrentLocation from './components/CurrentLocation';
import ShowCards from './components/ShowCards';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white, orange } from './utils/colors'
import reducer from './reducers'
import middleware from './middleware'
import { saveData } from './utils/api'
import { setLocalNotification } from './utils/helpers'
import {darkBlue} from './utils/colors'; 
import JobDetails from './components/JobDetails';

// or any pure javascript modules available in npm


function UdaciStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  CurrentLocation: {
    screen: CurrentLocation,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome name='compass' size={30} color={tintColor} />
    },
  },
  DeckList1: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome name='bell' size={30} color={tintColor} />
    },
  },
  DeckList2: {
    screen: DeckList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome name='heart' size={30} color={tintColor} />
    },
  },
  CreateDeck: {
    screen: CreateDeck,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => <FontAwesome name='calendar' size={30} color={tintColor} />
    },
  }
}, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Platform.OS === 'ios' ? darkBlue : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === 'ios' ? white : darkBlue,
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
  Home: {
    screen: Home
  },
  Tabs: {
    screen: Tabs
  },
  Jobs: {
    screen: Jobs
  },
  Settings: {
    screen: Settings
  },
  JobDetails: {
    screen: JobDetails
  }
},
{
  defaultNavigationOptions: {
    title: 'Portal To Work',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: darkBlue,
      height: 20
    },
    headerTitleStyle: {
      alignSelf: 'center',
      flex: 1
    }
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
