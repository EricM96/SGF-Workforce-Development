import * as React from 'react';
import { Text, View, StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';
import TextButton from './TextButton'
import { red, darkBlue } from '../utils/colors.js'
import { connect } from 'react-redux'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'


class CurrentLocation extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Set Location'
    }

  }

  getLocationAsync = async (id, e) => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });

    }

    let location = await Location.getCurrentPositionAsync({});
    //TBD - save location!
    console.log("Location is set!" + location.coords.longitude )
   
   

   this.props.navigation.navigate(
      'Jobs', { location: location })
  };


  render() {
    text=''
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TextButton onPress={this.getLocationAsync}
                    style={styles.button}>
          Use My Current Location
        </TextButton>
        <View style={styles.separator}>
        </View>
        <View>
          <TextInput
            value={text}
            style={{ height: 60 }}
            placeholder="Street Address"
            onChangeText={this.handleChange}
          />
          <TextInput
            value={text}
            style={{ height: 60 }}
            placeholder="Line 2"
            onChangeText={this.handleChange}
          />
          <TextInput
            value={text}
            style={{ height: 60 }}
            placeholder="City"
            onChangeText={this.handleChange}
          />
          <TextInput
            value={text}
            style={{ height: 60 }}
            placeholder="State"
            onChangeText={this.handleChange}
          />
          <TextInput
            value={text}
            style={{ height: 60 }}
            placeholder="Zip"
            onChangeText={this.handleChange}
          />
          <TextButton onPress={this.handleSubmit}
                      style={styles.button}>
            Use This Address
          </TextButton>
        </View>
   

    </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  flatview: {
    justifyContent: 'center',
    paddingTop: 30,
    borderRadius: 2,
  },
  name: {
    fontSize: 28,
    textAlign: 'center',
  },
  card: {
    color: red,
    textAlign: 'center',
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    padding: 5
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
    borderWidth: 2
  },
  button: {
    backgroundColor: darkBlue
  }
})


function mapStateToProps({ decks }) {
  return {
    decks
  }
}

export default connect(mapStateToProps)(CurrentLocation)