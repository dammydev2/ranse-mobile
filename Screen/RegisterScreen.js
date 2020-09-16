/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-community/async-storage';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './Components/loader';

const RegisterScreen = props => {
  let [firstName, setFirstName] = useState('');
  let [lastName, setLastName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [UserPassword, setUserPassword] = useState('');
  let [ConfirmPassword, setConfirmPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [emailError, setEmailError] = useState('');
  let [passwordError, setpasswordError] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);

  var phone = props.navigation.getParam('phone', 'no data');

  const handleSubmitButton = () => {
    setErrortext('');
    if (!firstName) {
      alert('Please first Name');
      return;
    }
    if (!lastName) {
      alert('Please last Name');
      return;
    }
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
    if (!UserPassword) {
      alert('Please fill Password');
      return;
    }
    if (!ConfirmPassword) {
      alert('Please fill confirm Password');
      return;
    }
    if (UserPassword !== ConfirmPassword) {
      alert('password and confirm password are not the same');
      return;
    }
    //Show Loader
    setLoading(true);
    var dataToSend = {
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      password: UserPassword,
      password_confirmation: ConfirmPassword,
      user_role: 'customer',
      phone: phone,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://192.168.0.196:8000/api/register', {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 201) {
          AsyncStorage.setItem('token', responseJson.token);
          props.navigation.navigate('DrawerNavigationRoutes');
          console.log(responseJson)
          // setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
        } else {
          setErrortext('Registration Unsuccessful');
           setEmailError(responseJson.errors.email)
           setpasswordError(responseJson.errors.password)
        }
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#800199',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../Image/success.jpeg')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#800199' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Image
          source={require('../Image/splash.png')}
          style={{
            width: '20%',
            height: 50,
            resizeMode: 'contain',
            margin: 10,
          }}
        />
      </View>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
          <Icon
              style={styles.iconStyle}
              name='user'
              type='font-awesome'
              size={26}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={firstName => setFirstName(firstName)}
              placeholder="Enter First Name"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
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
              onChangeText={lastName => setLastName(lastName)}
              placeholder="Enter Last Name"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
          <Icon
              style={styles.iconStyle}
              name='envelope'
              type='font-awesome'
              size={22}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              placeholder="Enter Email"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              // ref={ref => {
              //   this._emailinput = ref;
              // }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {emailError} </Text>
          ) : null}

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
            <Text style={styles.errorTextStyle}> {passwordError} </Text>
          ) : null}

          <View style={styles.SectionStyle}>
            <Icon
              style={styles.iconStyle}
              name='lock'
              type='font-awesome'
              size={26}
            />
            <TextInput
              style={styles.inputStyle}
              onChangeText={ConfirmPassword => setConfirmPassword(ConfirmPassword)}
              placeholder="Confirm Password" //12345
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

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
        </KeyboardAvoidingView>
      </ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.belowBox} />
      </View>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  belowBox: {
    height: 100,
    width: 100,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 150,
    marginTop: -30
  },
  iconStyle: {
    color: '#FFFFFF',
    marginTop: 10,
    // marginLeft: 10
  }
});