import React, { Component} from 'react';
import { Text, View, StyleSheet, Picker, Switch } from 'react-native'; 
import { AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'

class Settings extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
          title: 'Settings'
        }
      }

    state = {
        ed_level: 'none', 
        job_cat: 'no preference', 
        tTime: 60,
        walk: false,
        bus: false,
        drive: true, 
    };
    

    render() {
        return (
        <ScrollView style={styles.scroll}>
            <View style={styles.labelPickerPair}>

                <Text style={styles.label}>
                    Education Level: {this.state.ed_level}
                </Text>
                <Picker
                    selectedValue={this.state.ed_level}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({ 
                            ed_level: itemValue ,
                            job_cat: this.state.job_cat,
                            tTime: this.state.tTime,
                            walk: this.state.walk,
                            bus: this.state.bus,
                            drive: this.state.drive
                        });
                        AsyncStorage.setItem('ed_level', itemValue);
                    }}
                >
                    <Picker.Item label="No Preference" value='none' />
                    <Picker.Item label="High School or Equivalent" value="high school" />
                    <Picker.Item label="Associates Degree" value="associates" />
                    <Picker.Item label="Bachelors Degree" value="bachelors" />
                </Picker>
            </View>

            <View style={styles.labelPickerPair}>

                <Text style={styles.label}>
                    Job Category: {this.state.job_cat}
                </Text>
                <Picker
                    selectedValue={this.state.job_cat}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                            ed_level: this.state.ed_level,
                            job_cat: itemValue,
                            tTime: this.state.tTime,
                            walk: this.state.walk,
                            bus: this.state.bus,
                            drive: this.state.drive
                        });
                        AsyncStorage.setItem('job_cat', itemValue); 
                    }
                    }
                >
                    <Picker.Item label="No Preference" value='none' />
                    <Picker.Item label="full time" value="full time" />
                    <Picker.Item label="part time" value="part time" />
                    <Picker.Item label="internship" value="internship" />
                    <Picker.Item label="casual" value="casual" />
                    <Picker.Item label="temporary" value="temporary" />
                    <Picker.Item label="contractor" value="contractor" />
                </Picker>
            </View>

            <View style={styles.labelPickerPair}>

                <Text style={styles.label}>
                    Maximum Travel Time: {this.state.tTime+''}
                </Text>
                <Picker
                    selectedValue={this.state.tTime}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => {
                        this.setState({
                            ed_level: this.state.ed_level,
                            job_cat: this.state.job_cat,
                            tTime: itemValue,
                            walk: this.state.walk,
                            bus: this.state.bus,
                            drive: this.state.drive
                        });
                        AsyncStorage.setItem('tTime', itemValue+''); 
                    }
                    }
                >
                    <Picker.Item label="15 min" value={15} />
                    <Picker.Item label="30 min" value={30} />
                    <Picker.Item label="45 min" value={45} />
                    <Picker.Item label="60 min" value={60} />
                </Picker>
            </View>

            <View style={styles.labelPickerPair}>
                <Text style={styles.label}> Show Walking Distance: {this.state.walk+''} </Text>
                <Switch
                    value={this.state.walk}
                    onValueChange={(value) => {
                        this.setState({
                            ed_level: this.state.ed_level,
                            job_cat: this.state.job_cat,
                            tTime: this.state.tTime,
                            walk: value,
                            bus: this.state.bus,
                            drive: this.state.drive
                        });
                        AsyncStorage.setItem('walk', this.state.walk+''); 
                    }}
                />
            </View>

            <View style={styles.labelPickerPair}>
                <Text style={styles.label}> Show Busing Distance: {this.state.bus+''} </Text>
                <Switch
                    value={this.state.bus}
                    onValueChange={(value) => {
                        this.setState({
                            ed_level: this.state.ed_level,
                            job_cat: this.state.job_cat,
                            tTime: this.state.tTime,
                            walk: this.state.walk,
                            bus: value,
                            drive: this.state.drive
                        });
                        AsyncStorage.setItem('bus', value+'');
                    }}
                />
            </View>

            <View style={styles.labelPickerPair}>
                <Text style={styles.label}> Show Busing Driving: {this.state.drive + ''} </Text>
                <Switch
                    value={this.state.drive}
                    onValueChange={(value) => {
                        this.setState({
                            ed_level: this.state.ed_level,
                            job_cat: this.state.job_cat,
                            tTime: this.state.tTime,
                            walk: this.state.walk,
                            bus: this.state.bus,
                            drive: value
                        });
                        AsyncStorage.setItem('drive', value+''); 
                    }}
                />
            </View>

        </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scroll: {
        marginTop: 20,
        marginBottom: 20,
        paddingVertical: 20,
        backgroundColor: '#F5FCFF',
    },
    label: {
        fontSize: 20,
    },
    picker: { 
        flex: 1 
    }
});

function mapStateToProps({},{ navigation }) {
    return {
    }
  }

export default connect(mapStateToProps)(Settings)

