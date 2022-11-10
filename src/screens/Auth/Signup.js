import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import { Color } from "../../constants/Colors";
import { fontSize } from "../../constants/Fontsize";
import { CustomImage } from "../../constants/Images";
import { horizScale, vertScale } from "../../constants/Layout";
import { GloableStyle } from "../GloableStyle";
import { Ionicons } from "@expo/vector-icons";
import { API_END_POINT } from "../../utils/ApiEndPoint";
import ApiCall from "../../utils/ApiCall";
import { ShowMessage } from "../../utils/ShowMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../utils/Loader";
function Signup({ navigation }) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);

  const signup = () => {
    const url = API_END_POINT.get_otp;

    setLoader(true);

    const body = {
      mobile: mobile,
    };

    ApiCall("post", body, url)
      .then((result) => {
        if (result.data.response) {
          ShowMessage("" + result.data.message);
          navigation.navigate("OtpVerify", {
            data: {
              username: name,
              email: email,
              mobile: mobile,
              password: newPassword,
              fcmtoken: "FCM_TOKEN",
            },
            intentFromSignup: true,
            otp: result.data?.data + "",
          });
        } else {
          ShowMessage("" + result.data.message);
          navigation.navigate("OtpVerify", {
            data: {
              username: name,
              email: email,
              mobile: mobile,
              password: newPassword,
              fcmtoken: "FCM_TOKEN",
            },
            intentFromSignup: true,
            otp: result.data?.data + "",
          });
        }
        console.log(result.data);
      })
      .catch((err) => {
        console.log("ERROR IN SIGN UP API => ", err);

        setLoader(false);
        ToastAndroid.showWithGravity(
          "Something went wrong",
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM
        );
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <SafeAreaView
      style={{ ...GloableStyle.container, backgroundColor: Color.green2 }}
    >
      <ScrollView>
        <StatusBar
          hidden={false}
          backgroundColor={Color.white1}
          translucent={true}
          barStyle="dark-content"
        />
        <Loader loading={loader} />
        <View
          style={{
            borderBottomLeftRadius: horizScale(30),
            borderBottomRightRadius: horizScale(30),
            height: horizScale(200),
            backgroundColor: Color.white1,
            justifyContent: "space-evenly",
            alignItems: "center",
            flexDirection: "row",
            elevation: 10,
          }}
        >
          <View style={{ flex: 0.6 }}>
            <Text
              style={{
                fontSize: fontSize.h3,
                color: Color.black,
                fontWeight: "700",
                lineHeight: horizScale(38),
              }}
            >
              Create
            </Text>
            <Text
              style={{
                lineHeight: horizScale(30),
                fontSize: fontSize.h4,
                color: Color.green,
                fontWeight: "700",
              }}
            >
              New Account
            </Text>
          </View>
          <Image
            source={CustomImage.logo}
            style={{
              height: horizScale(90),
              width: horizScale(90),
              resizeMode: "contain",
            }}
          />
        </View>

        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              lineHeight: horizScale(30),
              fontSize: fontSize.h6,
              color: Color.black,
              fontWeight: "700",
              paddingVertical: horizScale(20),
            }}
          >
            User Details
          </Text>
          <TextInput
            onChangeText={(value) => {
              setName(value);
            }}
            placeholder="Enter Name*"
            placeholderTextColor={"grey"}
            style={styles.input}
          ></TextInput>

          <TextInput
            onChangeText={(value) => {
              setEmail(value);
            }}
            placeholder="Email Id"
            placeholderTextColor={"grey"}
            style={styles.input}
            autoCapitalize={"none"}
            keyboardType="email-address"
            autoCorrect={false}
          ></TextInput>
          <TextInput
            onChangeText={(value) => {
              setMobile(value);
            }}
            placeholder="Mobile Number*"
            placeholderTextColor={"grey"}
            style={styles.input}
          ></TextInput>
          <TextInput
            onChangeText={(value) => {
              setNewPassword(value);
            }}
            placeholder="Enter Password*"
            placeholderTextColor={"grey"}
            style={styles.input}
          ></TextInput>
          <TextInput
            onChangeText={(value) => {
              setConfirmPassword(value);
            }}
            placeholder="Confirm password*"
            placeholderTextColor={"grey"}
            style={styles.input}
          ></TextInput>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-evenly",
              width: "100%",
              marginTop: horizScale(40),
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{
                width: "40%",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: horizScale(25),
                paddingVertical: horizScale(10),
                borderRadius: horizScale(15),
                borderWidth: horizScale(1.3),
                borderColor: Color.green,
                flexDirection: "row",
              }}
            >
              <Ionicons name="ios-arrow-back-outline" size={25} color="black" />
              {/* <Image source={CustomImage.google} style={{ height: horizScale(25), width: horizScale(25), resizeMode: 'contain' }} /> */}
              <Text
                style={{
                  marginLeft: horizScale(10),
                  fontWeight: "700",
                  fontSize: fontSize.medium,
                  color: Color.black,
                }}
              >
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Color.green,
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
                marginVertical: horizScale(25),
                alignSelf: "center",
                paddingVertical: horizScale(15),
                borderRadius: horizScale(30),
                elevation: horizScale(10),
                flexDirection: "row",
              }}
              onPress={() => {
                if (name.length < 2) {
                  ToastAndroid.showWithGravity(
                    "Please insert a valid Name",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                } else if (email.length < 0) {
                  ToastAndroid.showWithGravity(
                    "Please insert valid email Id",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                } else if (!email.includes("@gmail.com")) {
                  ToastAndroid.showWithGravity(
                    "Please insert valid email Id",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                } else if (mobile == null || mobile.length < 10) {
                  ToastAndroid.showWithGravity(
                    "Please insert valid mobile number",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                } else if (newPassword.length < 7) {
                  ToastAndroid.showWithGravity(
                    "Insert password more then 8 digit",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                } else if (confirmPassword !== newPassword) {
                  ToastAndroid.showWithGravity(
                    "Password and Confirm password mismatch",
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM
                  );
                } else {
                  signup();
                }
              }}
            >
              {/* <Image source={CustomImage.facebook} style={{
                            height: horizScale(25), width: horizScale(25), borderRadius: horizScale(20),
                            resizeMode: 'cover', backgroundColor: Color.white1
                        }} /> */}
              <Text
                style={{
                  // marginLeft: horizScale(30),
                  fontWeight: "700",
                  fontSize: fontSize.medium,
                  color: Color.white1,
                }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white2,
  },
  input: {
    width: "80%",
    // height: vertScale(40),
    color: Color.black,
    borderColor: Color.green,
    borderRadius: horizScale(15),
    borderWidth: horizScale(0.5),
    marginTop: vertScale(15),
    fontSize: fontSize.medium,
    //  paddingLeft: horizScale(12),
    alignSelf: "center",
    backgroundColor: Color.white1,
    paddingHorizontal: horizScale(20),
    paddingVertical: horizScale(8),
  },
  textcna: {
    fontSize: fontSize.h4,
    marginLeft: horizScale(30),
    marginTop: vertScale(20),
    color: Color.blue,
    fontWeight: "bold",
  },
  imagephoto: {
    width: horizScale(100),
    height: vertScale(100),
    justifyContent: "center",
    alignSelf: "center",
    marginTop: vertScale(10),
  },
  button1: {
    padding: horizScale(12),
    backgroundColor: Color.blue,
    width: horizScale(330),
    alignItems: "center",
    borderRadius: 40,
    elevation: 10,
    justifyContent: "center",
    marginTop: horizScale(40),
    alignSelf: "center",
  },
});
export default Signup;
