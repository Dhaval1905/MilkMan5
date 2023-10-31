import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { GloableStyle } from "../../GloableStyle";
import { Color } from "../../../constants/Colors";
import { horizScale } from "../../../constants/Layout";
import { fontSize } from "../../../constants/Fontsize";
import { API_END_POINT } from "../../../utils/ApiEndPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetLocation from "react-native-get-location";
import * as Location from "expo-location";

const Address = ({ navigation, route }) => {
  const [googleLocation, setGoogleLocation] = useState("");
  const { item, selectedPlan, orderdetail } = route.params;
  console.log("Address Screen route.params",route.params)
  const [userDetails, setUserDetails] = useState({});
  
  const [first, setfirst] = useState("");
  const [second, setsecond] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");

  const finaladdress = first + " " + second + " " + city + " " + pincode;
  const [selectedAddress, setSelectedAddress] = useState("");
  const [locationObj, setLocationObj] = useState({});

  const getUserDetails = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const url = API_END_POINT.get_profile + userId;
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUserDetails(result.data);
      })
      .catch((error) => console.log("error", error));
  };

  const getLiveAddress = async () => {
    let address = await Location.reverseGeocodeAsync({
      latitude: locationObj.latitude,
      longitude: locationObj.longitude,
    });
    console.log("address ->> ", address);
    let a = address[0];
    let fullAddress =
      a.name +
      " " +
      a.district +
      " " +
      a.city +
      ", " +
      a.region +
      ", " +
      a.postalCode +
      ", " +
      a.country;
    setGoogleLocation(fullAddress);
  };

  const getGoogleLocation = async () => {
    await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        console.log(location);
        setLocationObj(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };

  useEffect(() => {
    getGoogleLocation();
    getUserDetails();
    getLiveAddress();
  }, [locationObj]);

  // let requestOptions = {
  //   method: "get",
  //   // body: formdata,
  //   // redirect: "follow",
  // };
  // const Apifetch=()=>{
  //   let result = fetch("https://www.samajutkarsh.com/Milk_Man1/api/user/addcart",
  //   requestOptions)
  //   .then((response)=>response.json())
  //   .then((result)=>{
  //     console.log(result)
  //   })
  // }

  return (
    <SafeAreaView style={GloableStyle.container}>
       {/* <Text onPress={Apifetch}>adsghadjsghjdsa</Text> */}
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={GloableStyle.BackButtonView}
      >
        <Ionicons name="arrow-back" size={22} color={Color.black} />
        <Text style={GloableStyle.backText}>{item.name}</Text>
      </TouchableOpacity>
      <ScrollView>
        <Text style={GloableStyle.headingText}>User Default Address</Text>
        <View
          style={{
            margin: horizScale(20),
            padding: horizScale(15),
            borderWidth: horizScale(3),
            borderRadius: horizScale(10),
            borderColor:
              selectedAddress == "Default" ? Color.green1 : Color.gray,
          }}
        >
          <Text style={{ color: Color.black }}>{userDetails?.address}</Text>
          {
            //   <Text>
            //   {user?.address?.first}, {user?.address?.second}
            // </Text>
            // <Text>
            //   {user?.address?.city}, {user?.address?.pincode}
            // </Text>
          }
        </View>

        <TouchableOpacity
          style={styles.radioButtonView}
          onPress={() => {
            setSelectedAddress("Default");
          }}
        >
          <Ionicons
            name="radio-button-on"
            size={24}
            color={selectedAddress == "Default" ? Color.green1 : Color.gray}
          />
          <Text style={styles.radioText}>Use User Default Adrress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonView}
          onPress={() => {
            setSelectedAddress("Custom");
          }}
        >
          <Ionicons
            name="radio-button-on"
            size={24}
            color={selectedAddress == "Custom" ? Color.green1 : Color.gray}
          />
          <Text style={styles.radioText}>Use Custom Adrress</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.radioButtonView}
          onPress={() => {
            setSelectedAddress("Google");
          }}
        >
          <Ionicons
            name="radio-button-on"
            size={24}
            color={selectedAddress == "Google" ? Color.green1 : Color.gray}
          />
          <Text style={styles.radioText}>Get My Location</Text>
        </TouchableOpacity>

        {selectedAddress == "Custom" && (
          <View>
            <Text style={styles.simpleText}>Address First</Text>
            <TextInput
              value={first}
              placeholder="Building No. or Name*"
              onChangeText={(value) => {
                setfirst(value);
              }}
              style={styles.inputText}
            />
            <Text style={styles.simpleText}>Address Second</Text>
            <TextInput
              value={second}
              placeholder="Near by or Road Name*"
              onChangeText={(value) => {
                setsecond(value);
              }}
              style={styles.inputText}
            />
            <Text style={styles.simpleText}>City/Village Name</Text>
            <TextInput
              value={city}
              placeholder="City/Village Name*"
              onChangeText={(value) => {
                setcity(value);
              }}
              style={styles.inputText}
            />
            <Text style={styles.simpleText}>Pin Code No.</Text>
            <TextInput
              value={pincode}
              placeholder="pin code"
              onChangeText={(value) => {
                setpincode(value);
              }}
              keyboardType="number-pad"
              style={styles.inputText}
            />
          </View>
        )}

        {selectedAddress == "Google" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              flex: 1,
              marginHorizontal: horizScale(10),
            }}
          >
            <View
              style={{
                flex: 0.85,
                margin: horizScale(10),
                padding: horizScale(15),
                borderWidth: horizScale(2),
                borderRadius: horizScale(10),
                borderColor:
                  selectedAddress == "Google" ? Color.green1 : Color.gray,
              }}
            >
              <Text numberOfLines={2} style={{ color: Color.black }}>
                {googleLocation == ""
                  ? "Getting Your Location..."
                  : googleLocation}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 0.15,
                backgroundColor: Color.green1,
                padding: horizScale(15),
                borderRadius: horizScale(10),
              }}
              onPress={() => {
                getGoogleLocation();
              }}
            >
              <Text
                style={{
                  color: Color.white1,
                  fontWeight: "600",
                  fontSize: fontSize.regular,
                  alignSelf: "center",
                }}
              >
                Get
              </Text>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity
          onPress={() => {
            if (selectedAddress == "") {
              ToastAndroid.showWithGravity(
                "Please select an address first",
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              );
            } else {
              navigation.navigate("PaymentMethod", {
                orderdetail: orderdetail,
                selectedPlan: selectedPlan,
                item: item,
                finaladdress:
                  selectedAddress == "Default"
                    ? userDetails?.address
                    : selectedAddress == "Custom"
                    ? finaladdress
                    : googleLocation,
              });
            }
          }}
          style={{
            ...GloableStyle.buttonSmall,
            width: "70%",
            paddingVertical: horizScale(15),
            backgroundColor: selectedAddress == "" ? Color.gray : Color.green1,
          }}
        >
          <Text style={GloableStyle.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Address;

const styles = StyleSheet.create({
  simpleText: {
    marginTop: horizScale(15),
    marginLeft: horizScale(20),
    color: Color.black,
    padding: horizScale(10),
    fontWeight: "600",
    fontSize: fontSize.regular,
  },
  inputText: {
    width: "90%",
    alignSelf: "center",
    borderRadius: horizScale(10),
    borderWidth: horizScale(1.2),
    borderColor: Color.gray,
    color: Color.black,
    padding: horizScale(10),
    fontWeight: "600",
    fontSize: fontSize.regular,
  },
  radioText: {
    marginLeft: horizScale(10),
  },
  radioButtonView: {
    margin: horizScale(20),
    flexDirection: "row",
    alignItems: "center",
  },
});
