/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
// import Loader from './../Components/loader';

const TryScreen = props => {
  let [token, setFirstName] = useState('');
  let [resturants, setResturants] = useState([]);
  let [loading, setLoading] = useState(false);
  var type = props.navigation.getParam('type', 'no data');


  

  

      useEffect(() => {
        fetch('http://192.168.1.158:8000/api/user/tryapi', {
      method: 'GET',
      // body: formBody,
      headers: {
        'Content-Type': "application/json",
        'Authorization': 'Bearer ' + token
      },
    }).then(response => response.json())
      .then(responseJson => {
        resturants = responseJson.resturants
        console.log(resturants)
        setLoading(false);
        setResturants(resturants)
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
      getName()
      },  []);

    // useEffect(() => {
    //   // Update the document title using the browser API
    //   getName()
    //   // getHistory()
    // });
    

  const getName = async () => {
    try {
      const token = await AsyncStorage.getItem('token')
      if (token !== null) {
        setFirstName(token)
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  }
  


  
  //  global.currentScreenIndex = 'RestaurantScreen';
  return (
    
    <View style={{ flex: 1, flexDirection: 'column', padding: 20 }}>

<FlatList

          data={resturants}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Text>{item.address}, {item.name}</Text>
          )}
        />


    </View>
  );
};


export default TryScreen;

const styles = StyleSheet.create({
  resturantBox: {
    height: 250,
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
    fontWeight: 'bold',
    marginTop: -20
  },
  innerContent: {
    padding: 5
  },
  addressText: {
    fontWeight: 'bold'
  },
  descriptionText: {
    fontStyle: 'italic'
  }
})