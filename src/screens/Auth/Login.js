import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  ToastAndroid,
} from "react-native";
import { Color } from "../../constants/Colors";
import { GloableStyle } from "../GloableStyle";

import PhoneInput from "react-native-phone-number-input";
import { horizScale, vertScale } from "../../constants/Layout";
import { fontSize } from "../../constants/Fontsize";
import { CustomImage } from "../../constants/Images";

import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ApiCall from "../../utils/ApiCall";
import { API_END_POINT } from "../../utils/ApiEndPoint";
import Loader from "../../utils/Loader";

WebBrowser.maybeCompleteAuthSession();

function Login({ navigation }) {
  const [value, setValue] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [formattedValue, setFormattedValue] = useState("+91");
  const [count, setCount] = useState(0);
  const androidClientId =
    "968279304510-lta6p2r0pp31jnb10o93lcnonk6m2kf7.apps.googleusercontent.com";
  const iosClientId = "";
  const expoClientId =
    "968279304510-89clehvsj0apbptdrdgus9reil97tb99.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    expoClientId: expoClientId,
  });
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState();
  const [accessToken, setAccessToken] = useState();
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // getTokenFromStorage();
    console.log("RESPONSE -> ", JSON.stringify(response));
    setMessage(JSON.stringify(response));
    // if (count < 2) {
    if (response?.type === "success") {
      setAccessToken(response?.authentication?.accessToken);
      setCount(count + 1);
      getUserData(response?.authentication?.accessToken);
    }
    console.log("user info", userInfo, "MSG=========", message);
    // }
  }, [response]);

  async function getUserData(token) {
    let userInfoResponse = await fetch(
      "https://www.googleapis.com/userinfo/v2/me",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("RESPONSE -> ", JSON.stringify(userInfoResponse));

    userInfoResponse.json().then((data) => {
      SignUpGoogle(data.id, data.name, data.email, data.picture);
    });
  }

  function SignUpGoogle(gId, gName, gEmail, photoUrl) {
    // const url = "https://rajivalse.co.in/Milk_Man/api/glogin";
    const url = "https://www.samajutkarsh.com/Milk_Man/api/glogin";

    const params = new FormData();
    params.append("uniqueID", gId);
    params.append("name", gName);
    params.append("email", gEmail);
    params.append("fcmtoken", "FCM_TOKEN");

    setLoading(true);
    setTimeout(() => {
      // console.log("url  -> ", url + "  >>body -> " + JSON.stringify(params));
      fetch(url, {
        method: "POST",
        body: params,
        redirect: "follow",
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.response === true) {
            AsyncStorage.setItem("userId", result.data);
            Platform.OS === "android"
              ? ToastAndroid.showWithGravity(
                  "Sign up successfully",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              : null;
            navigation.navigate("MyDrawer");
          } else {
            Platform.OS === "android"
              ? ToastAndroid.showWithGravity(
                  "Email already exist...",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              : null;
          }

          console.log("google api result -> ", result);
        })
        .catch((error) => console.log("error", error))
        .finally(() => {});
    }, 800);
  }

  const getOtpToNumber = () => {
    if (mobileNumber.length < 10) {
      Platform.OS === "android"
        ? ToastAndroid.showWithGravity(
            "Please enter valid mobile number",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          )
        : null;
    } else {
      setLoading(true);
      let r = mobileNumber.replace("+91", "");
      let d = { mobile: r };
      console.log("MOBILE NUMBER => ", JSON.stringify(d));

      ApiCall("post", d, API_END_POINT.get_otp)
        .then((response) => {
          if (response.data?.response) {
            Platform.OS === "android"
              ? ToastAndroid.showWithGravity(
                  response.data.message + "",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              : null;
            // navigation.navigate("OtpVerify", { item: response.data.data + "" });

            navigation.navigate("OtpVerify", {
              data: {
                username: "",
                email: "",
                mobile: r,
                password: "",
                fcmtoken: "FCM_TOKEN",
              },
              intentFromSignup: false,
              otp: response.data?.data + "",
            });
          } else {
            Platform.OS === "android"
              ? ToastAndroid.showWithGravity(
                  "Failed to send OTP",
                  ToastAndroid.SHORT,
                  ToastAndroid.BOTTOM
                )
              : null;
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log("ERROR IN GET OTP API -> ", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView
      style={{ ...GloableStyle.container, backgroundColor: Color.white1 }}
    >
      <StatusBar
        hidden={false}
        backgroundColor={Color.white1}
        translucent={true}
        barStyle="dark-content"
      />
      <Loader loading={loading} />
      <View
        style={{
          flex: 0.4,
          justifyContent: "space-evenly",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 0.6 }}>
          <Text
            style={{
              marginTop: horizScale(15),
              fontSize: fontSize.h4,
              color: Color.black,
              fontWeight: "700",
            }}
          >
            Hello,
          </Text>
          <Text
            style={{
              fontSize: fontSize.h3,
              color: Color.green,
              fontWeight: "700",
              lineHeight: horizScale(38),
            }}
          >
            Milk Man
          </Text>
          <Text
            style={{
              lineHeight: horizScale(30),
              fontSize: fontSize.h4,
              color: Color.green,
              fontWeight: "700",
            }}
          >
            Here...
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
          flex: 0.6,
          backgroundColor: Color.green2,
          borderTopLeftRadius: horizScale(30),
          borderTopRightRadius: horizScale(30),
          alignItems: "center",
        }}
      >
        <PhoneInput
          defaultValue={value}
          defaultCode="IN"
          layout="first"
          placeholder="Enter Mobile Number"
          onChangeText={(text) => {
            setValue(text);
            setMobileNumber(text);
          }}
          onChangeFormattedText={(text) => {
            setFormattedValue(text);
            setMobileNumber(text);
          }}
          //  withDarkTheme
          withShadow
          containerStyle={{
            marginTop: horizScale(20),
            backgroundColor: Color.white1,
            // borderRadius: horizScale(30),
            height: vertScale(55),
            borderRadius: horizScale(15),
            elevation: 0,
            borderBottomWidth: horizScale(0.8),
            borderBottomColor: Color.grey,
            alignSelf: "center",
          }}
          textContainerStyle={{
            borderRadius: horizScale(15),
            backgroundColor: Color.white1,
            //borderRadius: horizScale(30),
            //height: horizScale(50)
            height: vertScale(55),

            //  padding: 0,
            paddingVertical: 0,
            borderBottomWidth: horizScale(0.8),
            borderBottomColor: Color.grey,
          }}
          textInputStyle={{ fontSize: fontSize.medium, color: Color.black }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: fontSize.das,
            marginTop: horizScale(30),
            color: Color.darkgrey,
          }}
        >
          A 4 digit OTP will be sent via SMS to verify{"\n"}Your mobile number!
        </Text>
        <TouchableOpacity
          onPress={() => {
            getOtpToNumber();
            // navigation.navigate("MyDrawer");
            // navigation.navigate("OtpVerify");
          }}
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
        >
          <Text
            style={{
              color: Color.white1,
              fontWeight: "700",
              fontSize: fontSize.regular,
            }}
          >
            Continue
          </Text>
          {/* <Image style={{
                        height: horizScale(15),
                        width: horizScale(15),
                        resizeMode: 'contain', marginLeft: horizScale(15), tintColor: Color.white1
                    }} source={CustomImage.arrowright} /> */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={{ marginTop: horizScale(10), opacity: 0.5 }}
        >
          <Text style={{ color: Color.darkgrey }}>
            Not a Member?{" "}
            <Text
              style={{
                color: Color.green,
                fontWeight: "700",
                fontSize: fontSize.regular,
              }}
            >
              Signup
            </Text>
          </Text>
        </TouchableOpacity>
        <View
          style={{
            height: horizScale(0.8),
            width: "80%",
            backgroundColor: Color.white1,
            marginVertical: horizScale(20),
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              promptAsync({ showInRecents: true });
            }}
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: horizScale(25),
              paddingVertical: horizScale(15),
              borderRadius: horizScale(15),
              borderWidth: horizScale(1.3),
              borderColor: Color.green,
              flexDirection: "row",
              opacity: 0.0,
            }}
          >
            {/* <Image source={CustomImage.google} style={{ height: horizScale(25), width: horizScale(25), resizeMode: 'contain' }} /> */}
            <Text
              style={{
                // marginLeft: horizScale(30),
                fontWeight: "700",
                fontSize: fontSize.medium,
                color: Color.black,
              }}
            >
              Google Login
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={{
              width: "40%",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: horizScale(5),
              paddingVertical: horizScale(15),
              borderRadius: horizScale(15),
              borderWidth: horizScale(1.3),
              borderColor: "#3d6ad6",
              backgroundColor: "#3d6ad6",
              flexDirection: "row",
            }}
          >
            {/* <Image source={CustomImage.facebook} style={{
                            height: horizScale(25), width: horizScale(25), borderRadius: horizScale(20),
                            resizeMode: 'cover', backgroundColor: Color.white1
                        }} /> 
            <Text
              style={{
                // marginLeft: horizScale(30),
                fontWeight: "700",
                fontSize: fontSize.medium,
                color: Color.white1,
              }}
            >
              Facebook Login
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({});
export default Login;
