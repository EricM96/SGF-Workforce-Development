import * as React from 'react';
import {  View, StyleSheet, Text } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import TextButton from './TextButton'
import Deck from './Deck.js'
import { connect } from 'react-redux'

state = {
};


class Jobs extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Pan, zoom, and tap on the map!
        </Text>
        
        {
            this.props.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <Text>Map region does exist.</Text>
        }
        
        <MapView
        style={{ alignSelf: 'stretch', height: 400 }}
        initialRegion={{
          latitude: this.props.location.coords.latitude,
          longitude: this.props.location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        >
          <Marker
            coordinate={this.props.location.coords}
            title="My Location"
            description="This is where I am."
          />
        </MapView>
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between',
    padding: 24
  },
  bottomView: {
    flex: 4,
    justifyContent: 'flex-end'
  },
  topView: {
    flex: 6,
    justifyContent: 'flex-start'
  },
  addCard: {
    padding: 5,
    margin: 5,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  }
});

function mapStateToProps({},{ navigation }) {
  const location = navigation.getParam('location')
  console.log("The location is " + JSON.stringify(location))
  return { 
    location,
    hasLocationPermissions: true,
    mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
   }
}

export default connect(mapStateToProps)(Jobs)

/*

*/