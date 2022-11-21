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

const Address = ({ navigation, route }) => {
  const { item, selectedPlan, orderdetail } = route.params;
  // const [user, setUser] = useState({
  //   name: "Rohit Carpenter",
  //   address: {
  //     first: "115 sunderam complex",
  //     second: "bhavarkuaa road",
  //     city: "indore",
  //     pincode: "452001",
  //   },
  // });
  const [userDetails, setUserDetails] = useState({});
  const [first, setfirst] = useState("");
  const [second, setsecond] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");

  const finaladdress = first + " " + second + " " + city + " " + pincode;
  const [selectedAddress, setSelectedAddress] = useState("");

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

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <SafeAreaView style={GloableStyle.container}>
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
                    : finaladdress,
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
