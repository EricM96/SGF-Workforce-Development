import React, { Component} from 'react'
import { Image, StyleSheet } from 'react-native';
const FIVE_SECONDS = 5000;


export default class FlexDirectionBasics extends Component {
    componentDidMount() {
        // When mounted, wait one second, then navigate to App
        setTimeout(() => {
          // Components that are placed inside a React Navigation
          // navigator will receive the `navigation` prop.
          // It's main usage is to trigger navigation events.
          // Right here we're telling it to navigate to the route
          // with the name 'App'.
          this.props.navigation.navigate('App');
        }, FIVE_SECONDS);
      }

    render() {
        return (
                <Image
                    style={styles.img}
                    source={require('../assets/icons/Portal_to_Work.png')}
                    alt="Portal to Work Logo"
                    resizeMode= 'contain'
                    enum= 'center'
                    background= '00455c'

        />
        )
    }
}

var styles = StyleSheet.create({
    img: {  width: 300, 
            height: 100,
            alignContent:'space-around'}
    
});


