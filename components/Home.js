import React, { Component} from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
const THREE_SECONDS = 3000;


export default class FlexDirectionBasics extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: '',
      
      headerStyle: {
        backgroundColor: '#ffffff',
        opacity: 0,
      }
    }
  }
    componentDidMount() {
        // When mounted, wait one second, then navigate to App
        setTimeout(() => {
          this.props.navigation.navigate('Tabs');
        }, THREE_SECONDS);
      }

    render() {
        return (
          <View style={styles.view}>
            <TouchableOpacity onPress={() => {
              console.log('Here'); 
              this.props.navigation.navigate('Tabs', {})
              }}>
              <Image
                  style={styles.img}
                  source={require('../assets/icons/Portal_to_Work.png')}
                  alt="Portal to Work Logo"
                  resizeMode= 'contain'
                  enum= 'center'
                  background= '00455c'
              />
            </TouchableOpacity>
          </View>
        )
    }
}

var styles = StyleSheet.create({
    img: {  width: 300, 
            height: 100,
            justifyContent: 'center',
            alignSelf: 'center',
          },
    view: {
      flex: 1, 
      alignContent: 'center',
      justifyContent: 'center',

    }
    
});


