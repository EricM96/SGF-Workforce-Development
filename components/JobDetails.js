import * as React from 'react';
import { View, ScrollView, StyleSheet, Text, FlatList, TextButton } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { connect } from 'react-redux'
import { white, black, lightGray, darkBlue } from '../utils/colors.js'
import { MaterialIcons } from '@expo/vector-icons'
import { fetchJobs } from '../utils/api'


class JobsDetails extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Job Details'
        }
    }

    state = {
        jobs: []
    }

    async componentDidMount() {
        const jobs = await fetchJobs();
        this.setState({ jobs: jobs.data });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.topView}>
                    <MapView
                        style={{ alignSelf: 'stretch', height: 300 }}
                        initialRegion={{
                            latitude: parseFloat(this.props.job.lat),
                            longitude: parseFloat(this.props.job.long),
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    >
                        <Marker
                            coordinate={{latitude: parseFloat(this.props.job.lat), longitude: parseFloat(this.props.job.long)}}
                            title="My Location"
                            description="This is where I am."
                        />
                    </MapView> 
                </View>
            
                <View style={styles.bottomView}>
                    <Text style={{ height: 50, flex: 6, fontSize: 20}}>
                        {this.props.job.jobtitle}
                    </Text>

                    <Text style={{ height: 50, flex: 6, fontSize: 14 }}>
                        {this.props.job.description}
                    </Text>
                </View>

                {/* <TextButton>
                    Use This Address
                    </TextButton> */}
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'stretch'
    },
    bottomView: {
        flex: 3,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        position: 'relative',
    },
    middleView: {
        flex: 6,
        borderTopColor: 'gray',
        borderBottomColor: 'gray',
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    topView: {
        flex: 5,
        display: 'flex',
        alignContent: 'stretch',
        flexDirection: 'column',
        position: 'relative'
    },
    addCard: {
        padding: 5,
        margin: 5,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
    description: {
        color: black,
        textAlign: 'center',
        fontSize: 12
    },
    company: {
        color: black,
        textAlign: 'center',
        fontSize: 18
    },
    title: {
        textAlign: 'center',
        backgroundColor: white,
        color: darkBlue,
        fontSize: 28
    },
    header: {
        fontSize: 30
    },
    flatview: {
        backgroundColor: black,
        borderTopColor: lightGray,
        borderTopWidth: 1
    },
    buttonStyle: {
        backgroundColor: darkBlue
    }
});

function mapStateToProps({ }, { navigation }) {
    const job = navigation.getParam('jobDetails')
    return {
        job,
        hasLocationPermissions: true,
        mapRegion: { latitude: job.lat, longitude: job.long, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
    }
}

export default connect(mapStateToProps)(JobsDetails)