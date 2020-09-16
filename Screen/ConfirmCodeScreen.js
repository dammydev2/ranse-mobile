/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState } from 'react';
import CountDown from 'react-native-countdown-component';
import Icon from 'react-native-vector-icons/FontAwesome';
import OTPInputView from '@twotalltotems/react-native-otp-input'

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

const ConfirmCodeScreen = props => {
  //  const {userPhone} = props.navigation.getParam('phone', 'no data');
  let [code, setCode] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');

  var phone = props.navigation.getParam('phone', 'no data');

  // resending code
  const handleResendPress = () => {
    setLoading(true);
    var dataToSend = { phone: phone };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    fetch('http://192.168.43.190:8000/api/get_number', {
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
          props.navigation.navigate('ConfirmCodeScreen', { phone: phone });
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
  }

  const handleSubmitPress = () => {
    setErrortext('');
    if (!code) {
      alert('Please Enter Code');
      return;
    }
    console.log(code)
    setLoading(true);
    var dataToSend = { phone: phone, code: code };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

   fetch('http://192.168.0.196:8000/api/check_number', {
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
          console.log(responseJson.data[0].user_id);
          props.navigation.navigate('RegisterScreen', { phone: phone });
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
      <ScrollView keyboardShouldPersistTaps="handled">
        <View>
          <KeyboardAvoidingView enabled>
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
            <View>
              <CountDown
                until={60 * 3 + 30}
                size={10}
                onFinish={() => alert('Finished')}
                digitStyle={{ backgroundColor: '#FFF' }}
                digitTxtStyle={{ color: '#1CC625' }}
                timeToShow={['M', 'S']}
                timeLabels={{ m: 'MM', s: 'SS' }}
              />
            </View>
            <View>
              <Text style={styles.frontTextStyle}>
                Enter the code you recieve via sms or whatsapp here
              </Text>

              <OTPInputView
                style={{ width: '80%', height: 10, marginLeft: 40 }}
                pinCount={4}
                // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                // onCodeChanged = {code => setCode(code)}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => setCode(code)}
              />


            </View>
            {/* <View style={styles.SectionStyle}>
              <Icon
                style={styles.iconStyle}
                name='unlock'
                type='font-awesome'
                underlineColorAndroid={'black'}
                size={26}
              />
              <TextInput
                style={styles.inputStyle}
                onChangeText={code => setCode(code)}
                placeholder="Enter Code" //dummy@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="numeric"
                // ref={ref => {
                //   this._emailinput = ref;
                // }}
                returnKeyType="next"
                onSubmitEditing={() =>
                  this._passwordinput && this._passwordinput.focus()
                }
                blurOnSubmit={false}
              />
            </View> */}
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>Confirm</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
        <View>
          <TouchableOpacity
            style={styles.resendStyle}
            activeOpacity={0.5}
            onPress={handleResendPress}>
            <Text style={styles.resendButtonStyle}>Did not recieve a code: Resend</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={styles.belowBox} />
      </View>
    </View>
  );
};
export default ConfirmCodeScreen;

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
    marginTop: 40,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#800199',
    paddingVertical: 10,
    fontSize: 16,
  },
  resendButtonStyle: {
    color: '#FFFFFF',
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
    marginTop: 20
  },
  frontTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    padding: 10,
    margin: 30
  },
  resendStyle: {
    marginLeft: 40,
  },
  belowBox: {
    height: 100,
    width: 100,
    backgroundColor: '#ffffff',
    borderTopRightRadius: 150,
    marginTop: 30
  },
  iconStyle: {
    color: '#FFFFFF',
    marginTop: 10,
    // marginLeft: 10
  },
  borderStyleBase: {
    width: 30,
    height: 45
  },

  borderStyleHighLighted: {
    borderColor: "#03DAC6",
  },

  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 2,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: "#03DAC6",
  },
});
