import {ToastAndroid, Platform, AlertIOS} from 'react-native';

// export const ShowToastMessage = msg => {
export const ShowMessage = msg => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT, ToastAndroid.BOTTOM);
  } else {
    AlertIOS.alert(msg);
  }
};

export const validatePassword = text => {
  // console.log(text);
  let reg =
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$/;
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
  if (reg.test(text) === false) {
    console.log('Password is Not Correct');
    return false;
  } else {
    console.log('Password is Correct');
    return true;
  }
};

export const validateEmail = text => {
  console.log(text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  if (reg.test(text) === false) {
    console.log('Email is Not Correct');
    return false;
  } else {
    console.log('Email is Correct');
    return true;
  }
};

export const validateMobileNumber = text => {
  var reg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    // alert("message");
    return true;
  }
};

export const validateFieldNotEmpty = text => {
  if (text === '') {
    return true;
  } else {
    return false;
  }
};

export const validateVehicleNumber = text => {
  var reg = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/;
  if (reg.test(text) === false) {
    return false;
  } else {
    return true;
  }
};
