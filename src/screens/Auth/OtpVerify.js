import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { horizScale, vertScale } from "../../constants/Layout";
import { GloableStyle } from "../GloableStyle";
import { CustomImage } from "../../constants/Images";
import { fontSize } from "../../constants/Fontsize";
import { Color } from "../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { ShowMessage } from "../../utils/ShowMessage";
import Signup from "./Signup";
import { API_END_POINT } from "../../utils/ApiEndPoint";
import ApiCall from "../../utils/ApiCall";
import Loader from "../../utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtpVerify = ({ navigation, route }) => {
  const [code, setCode] = useState("");
  const [receivedOtp, setReceivedOtp] = useState("");
  const [receivedData, setReceivedData] = useState({});
  const [intentFromSignup, setIntentFromSignup] = useState("");

  useEffect(() => {
    let { data } = route.params;
    const data1 = data;
    // console.log("this came from route", anuj.address);
    let { intentFromSignup } = route.params;
    let { otp } = route.params;

    setIntentFromSignup(intentFromSignup);
    setReceivedOtp(otp + "");
    setReceivedData(data1);
    // console.log(
    //   "RECEIVED DATA -> ",
    //   JSON.stringify(data) +
    //     " intentFromSignup => " +
    //     intentFromSignup +
    //     " otp => " +
    //     otp
    // );
  }, []);

  const checkUserOtp = () => {
    if (receivedOtp === code) {
      signup();
    } else {
      ShowMessage("Please enter valid OTP");
      // navigation.navigate("MyDrawer");
    }
  };
  const [loader, setLoader] = useState(false);

  const signup = () => {
    if (intentFromSignup) {
      const url = API_END_POINT.signup;
      const data = new FormData();
      data.append("username", receivedData?.username);
      data.append("email", receivedData?.email);
      data.append("mobile", receivedData?.mobile);
      data.append("password", receivedData?.password);
      data.append("fcmtoken", receivedData?.fcmtoken);
      data.append("city_id", receivedData?.city_id);
      data.append("region_id", receivedData?.region_id);
      data.append("area_id", receivedData?.area_id);
      data.append("address", receivedData?.address);

      setLoader(true);

      const body = {
        username: receivedData?.username,
        email: receivedData?.email,
        mobile: receivedData?.mobile,
        password: receivedData?.password,
        fcmtoken: receivedData?.fcmtoken,
        city_id: receivedData?.city_id,
        region_id: receivedData?.region_id,
        area_id: receivedData?.area_id,
        address: receivedData?.address,
      };

      console.log("data api se pehle", body);
      ApiCall("post", body, url)
        .then((result) => {
          console.log("", result);
          if (result.data.response) {
            ShowMessage("" + result.data.message);
            AsyncStorage.setItem("userData", JSON.stringify(result.data.data));
            navigation.replace("MyDrawer");
          } else {
            ShowMessage("" + result.data.message);
          }
          // console.log(result.data);
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
    } else {
      const url = API_END_POINT.check_otp;

      setLoader(true);

      const body = {
        mobile: receivedData?.mobile,
        otp: receivedOtp,
      };
      console.log("ERROR IN SIGN UP API => ", JSON.stringify(body));

      ApiCall("post", body, url)
        .then((result) => {
          if (result.data.response) {
            getUserProfile(result.data.data + "");
            ShowMessage("" + result.data.message);
            navigation.replace("MyDrawer");

            // AsyncStorage.setItem("userData", JSON.stringify(result.data.data));
          } else {
            ShowMessage("" + result.data.message);
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
    }
  };

  const getUserProfile = (id) => {
    const url = API_END_POINT.get_profile;

    setLoader(true);

    ApiCall("get", null, url + id)
      .then((result) => {
        if (result.data.response) {
          // ShowMessage("" + result.data.message);
          console.log("userData", JSON.stringify(result.data.data));
          AsyncStorage.setItem("userData", JSON.stringify(result.data.data));
          AsyncStorage.setItem("userId", id + "");
        } else {
          ShowMessage("" + result.data.message);
        }
        // console.log(result.data);
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
    <View style={GloableStyle.container}>
      <Loader loading={loader} />
      <Image
        style={{
          marginVertical: horizScale(100),
          height: horizScale(200),
          width: horizScale(200),
          resizeMode: "contain",
          alignSelf: "center",
        }}
        source={CustomImage.logo}
      />
      <View
        style={{
          backgroundColor: Color.green2,
          width: "80%",
          alignSelf: "center",
          borderRadius: horizScale(20),
          elevation: 10,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            fontSize: fontSize.das,
            marginTop: horizScale(30),
            color: Color.black,
          }}
        >
          Enter 4 digit OTP to verify{"\n"}Your mobile number!
        </Text>

        <Text
          style={{
            textAlign: "center",
            fontSize: fontSize.das,
            marginTop: horizScale(30),
            color: Color.black,
          }}
        >
          Your otp is: {receivedOtp}
        </Text>
        <View
          style={{
            width: "88%",
            alignSelf: "center",
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <SmoothPinCodeInput
            cellStyle={{
              borderBottomWidth: 2,
              borderColor: "gray",
            }}
            cellSize={40}
            codeLength={6}
            password={true}
            cellStyleFocused={{
              borderColor: "black",
            }}
            value={code}
            onTextChange={(code) => setCode(code)}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            // navigation.replace("MyDrawer");
            checkUserOtp();
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
            // marginTop: vertScale(70),
          }}
        >
          <Text style={GloableStyle.buttonText}>Verify</Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={24}
            color={Color.white1}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OtpVerify;

const styles = StyleSheet.create({});

/**
 * welcome to niche logo lagana hai
 * black color not use
 * high resolution image
 * font size
 *
 *
 *
 */
