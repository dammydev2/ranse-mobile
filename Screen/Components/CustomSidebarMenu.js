/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React from 'react';

//Import all required component
import  { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler';

const CustomSidebarMenu = props => {
  let [first_name, setFirstName] = useState('');

  useEffect(() => {
    // Update the document title using the browser API
    getName()
  });
  let items = [
    {
      navOptionName: 'Home Screen',
      screenToNavigate: 'HomeScreen',
    },
    {
      navOptionName: 'Setting Screen',
      screenToNavigate: 'SettingsScreen',
    },
    {
      navOptionName: 'Logout',
      screenToNavigate: 'logout',
    },
  ];

  // AsyncStorage.getItem('first_name')
  // .then( first_name => console.log(first_name) );
  const getName = async () => {
    try {
      const first_name = await AsyncStorage.getItem('first_name')
      if(first_name !== null) {
        setFirstName(first_name)
        // value previously stored
      }
    } catch(e) {
      // error reading value
    }
  }

  const handleClick = (index, screenToNavigate) => {
    if (screenToNavigate == 'logout') {
      props.navigation.toggleDrawer();
      Alert.alert(
        'Logout',
        'Are you sure? You want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => {
              return null;
            },
          },
          {
            text: 'Confirm',
            onPress: () => {
              AsyncStorage.clear();
              props.navigation.navigate('Auth');
              console.log('logout');
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      props.navigation.toggleDrawer();
      global.currentScreenIndex = screenToNavigate;
      props.navigation.navigate(screenToNavigate);
    }
  };
  return (
    <View style={stylesSidebar.sideMenuContainer}>
      <View style={stylesSidebar.profileHeader}>
        <View style={stylesSidebar.profileHeaderPicCircle}>
          <Text style={{ fontSize: 25, color: '#307ecc' }}>
            {'About React'.charAt(0)}
          </Text>
        </View>
        <Text style={stylesSidebar.profileHeaderText}>{ first_name }</Text>
      </View>
      <View style={stylesSidebar.profileHeaderLine} />
      <View style={{ width: '100%', flex: 1 }}>
        {items.map((item, key) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              color: 'white',
              backgroundColor:
                global.currentScreenIndex === item.screenToNavigate
                  ? '#800181'
                  : '#800199',
            }}
            key={key}
            onStartShouldSetResponder={() =>
              handleClick(key, item.screenToNavigate)
            }>
            <Text style={{ fontSize: 15, color: 'white' }}>
              {item.navOptionName}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const stylesSidebar = StyleSheet.create({
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#800199',
    paddingTop: 40,
    color: 'white',
  },
  profileHeader: {
    flexDirection: 'row',
    backgroundColor: '#800181',
    padding: 15,
    textAlign: 'center',
  },
  profileHeaderPicCircle: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    color: 'white',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeaderText: {
    color: 'white',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontWeight: 'bold',
  },
  profileHeaderLine: {
    height: 1,
    marginHorizontal: 20,
    backgroundColor: '#e2e2e2',
    marginTop: 15,
    marginBottom: 10,
  },
});
export default CustomSidebarMenu;