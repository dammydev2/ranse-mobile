/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';

const LoginScreen = props => {
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    setLoading(true);
    var dataToSend = { email: userEmail, password: userPassword };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://192.168.0.196:8000/api/login', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    }).then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        // console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 200) {
          AsyncStorage.setItem('first_name', responseJson.first_name);
          AsyncStorage.setItem('token', responseJson.token);
          // console.log(responseJson.data[0].user_id);
          props.navigation.navigate('DrawerNavigationRoutes');
        } else {
          setErrortext('Please check your email id or password');
          console.log('Please check your email id or password');
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Image
          source={require('../Image/splash.png')}
          style={{
            width: '20%',
            height: 50,
            resizeMode: 'contain',
            margin: 30,
          }}
        />
      </View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>
            <View style={styles.WelcomeViewStyle}>
              <Text style={styles.WelcomeStyle}>
                Welcome !
                </Text>
            </View>
            <View style={styles.SectionStyle}>
              <Icon
                style={styles.iconStyle}
                name='user'
                type='font-awesome'
                size={26}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                // underlineColorAndroid="#FFFFFF"
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                // ref={ref => {
                //   this._emailinput = ref;
                // }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <Icon
                style={styles.iconStyle}
                name='lock'
                type='font-awesome'
                size={26}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                // underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor="#F6F6F7"
                keyboardType="default"
                // ref={ref => {
                //   this._passwordinput = ref;
                // }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('PhoneNumberScreen')}>
              New Here ? Register
            </Text>
            {/* <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('RegisterScreen', { phone: '090' })}>
              register page
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('ConfirmCodeScreen', { phone: '090' })}>
              confirm Screen
            </Text> */}
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.belowBox} />
      </View>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#800199',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FFFFFF',
    borderWidth: 0,
    color: '#800199',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#800199',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 3,
    // borderRadius: 30,
    borderColor: '#800199',
    borderBottomColor: 'white',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  WelcomeStyle: {
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  WelcomeViewStyle: {
    marginLeft: 30,
  },
  belowBox: {
    height: 100,
    width: 100,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 150,
    marginTop: 40
  },
  iconStyle: {
    color: '#FFFFFF',
    marginTop: 10,
    // marginLeft: 10
  }
});