import React, { Component} from 'react'
import { View, Image, StyleSheet } from 'react-native';
import { connect } from 'react-redux'

export default class FlexDirectionBasics extends Component {
    render() {
        return (
                <Image
                    style={styles.img}
                    source={require('../assets/icons/Portal_to_Work.png')}
                    alt="Portal to Work Logo"
                    resizeMode= 'contain'
                    enum= 'center'
        />
            
            </View>
        )
    }
}

var styles = StyleSheet.create({
    img: {  width: 300, 
            height: 100,
            alignContent:'space-around'}
    
});


