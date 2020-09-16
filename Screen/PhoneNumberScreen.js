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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Loader from './Components/loader';

const PhoneNumberScreen = props => {
  let [userPhone, setUserPhone] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  const handleSubmitPress = () => {
    setErrortext('');
    if (!userPhone) {
      alert('Please fill Phone Number');
      return;
    }
    setLoading(true);
    var dataToSend = { phone: userPhone };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://192.168.0.196:8000/api/get_number', {
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
        console.log(responseJson);
        // If server response message same as Data Matched
        if (responseJson.status == 200) {
          // AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
          // console.log(responseJson.data[0].user_id);
          props.navigation.navigate('ConfirmCodeScreen', { phone: userPhone });
        } else {
          setErrortext(responseJson.error);
          console.log(responseJson.error);
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
      <Loader loading={loading} />
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
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 40 }}>
          <KeyboardAvoidingView enabled>
            <View>
              <Text style={styles.frontTextStyle}>
                Enter your 11 digit phone number and press continue to
                recieve a confirmation code via text or whatsapp
              </Text>
            </View>
            <View style={styles.SectionStyle}>
            <Icon
                style={styles.iconStyle}
                name='phone'
                type='font-awesome'
                size={26}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPhone => setUserPhone(UserPhone)}
                placeholder="Enter Phone Number" //dummy@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="phone-pad"
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
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Continue</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.belowBox} />
      </View>
    </View>
  );
};
export default PhoneNumberScreen;

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
    fontWeight: 'bold',
    fontSize: 14,
  },
  frontTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 30,
  },
  iconStyle: {
    color: '#FFFFFF',
    marginTop: 10,
    // marginLeft: 10
  },
  belowBox: {
    height: 100,
    width: 100,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 150,
    marginTop: 60
  },
});