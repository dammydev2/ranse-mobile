/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, {Component} from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { DrawerNavigator } from 'react-navigation';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
  Button,
} from 'react-native';
// import ResturantScreen from './ResturantScreen';

// import StackScreen from './../StackRoutes';


const HomeScreen = ({ navigation }) => {
  // <StackScreen />
  global.currentScreenIndex = 'HomeScreen';
  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 20, marginTop: 10 }}>

      <TouchableOpacity
      onPress={ () => navigation.navigate('ResturantScreen', { type: 'resturant' })}>
        <View style={styles.viewBox}>
          <View style={styles.content}>
            <Image
              source={require('../../Image/rice.png')}
              style={{
                // width: '20%',
                height: 100,
                width: 100,
                resizeMode: 'contain',
              }}
            />
            <View style={styles.innerContent}>
              <Text style={styles.mainText}>Foods</Text>
              <Text style={styles.belowText}>Foods you love from your favourite resturants</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.viewBox}>
        <View style={styles.content}>
          <Image
            source={require('../../Image/foodresturant.png')}
            style={{
              // width: '20%',
              height: 100,
              width: 100,
              resizeMode: 'contain',
            }}
          />
          <View style={styles.innerContent}>
            <Text style={styles.mainText}>Pasteries</Text>
            <Text style={styles.belowText}>Cakes, Bread, Pies and confectioneries near you</Text>
          </View>
        </View>
      </View>

      {/* <Text style={{ fontSize: 23, marginTop: 10 }}>Home Screen</Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Simple Login Registraction Example
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10 }}>https://aboutreact</Text> */}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  viewBox: {
    height: 150,
    backgroundColor: '#ffffff',
    // flex: 2,
    padding: 30,
    marginTop: 5
  },
  content: {
    flexDirection: 'row'
  },
  mainText: {
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold'
  },
  innerContent: {
    padding: 5
  },
  belowText: {
    width: '60%'
  }
})