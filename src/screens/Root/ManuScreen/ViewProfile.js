import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GloableStyle } from "../../GloableStyle";
import { Color } from "../../../constants/Colors";
import {
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { horizScale, vertScale } from "../../../constants/Layout";
import { CustomImage } from "../../../constants/Images";
import { fontSize } from "../../../constants/Fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_END_POINT } from "../../../utils/ApiEndPoint";
import ApiCall from "../../../utils/ApiCall";
import { ShowMessage } from "../../../utils/ShowMessage";
import Loader from "../../../utils/Loader";

const ViewProfile = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState({});
  const [user, setUser] = useState("");

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const getUserFromStorage = async () => {
    try {
      await AsyncStorage.getItem("userId", (error, value) => {
        if (error) {
          console.log(
            "Error in if condition getting user from async storage -> ",
            error
          );
        } else {
          if (value !== null) {
            setUser(value);
            getUserProfile(value);

            // getData(value);
            // navigation.replace('home');
          } else {
            // navigation.replace('login');
          }
        }
      });
    } catch (error) {
      console.log("Error in get user on splash -> ", error);
    }
  };

  const getUserProfile = (id) => {
    const url = API_END_POINT.get_profile;
    // console.log("userData menu screen", url + id);

    setLoader(true);

    ApiCall("get", null, url + id)
      .then((result) => {
        // console.log("userData menu screen", JSON.stringify(result.data));
        if (result.data.response) {
          // ShowMessage("" + result.data.message);
          setData(result.data.data);
        } else {
          ShowMessage("" + result.data.message);
        }
        // console.log(result.data);
      })
      .catch((err) => {
        console.log("ERROR IN SIGN UP API MENU => ", err);

        setLoader(false);
        Platform.OS === "android"
          ? ToastAndroid.showWithGravity(
              "Something went wrong",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
          : null;
      })
      .finally(() => {
        setLoader(false);
      });
  };

  return (
    <SafeAreaView style={GloableStyle.container}>
      <StatusBar backgroundColor={Color.green3} barStyle="dark-content" />
      <Loader loading={loader} />
      <View
        style={{
          ...GloableStyle.headerView,
          backgroundColor: Color.green3,
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          style={GloableStyle.rowtwoitem}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={24} color={Color.black} />

          <Text style={GloableStyle.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={GloableStyle.rowtwoitem}
          onPress={() => {
            navigation.navigate("EditProfile");
          }}
        >
          <FontAwesome name="edit" size={20} color={Color.black} />

          <Text style={GloableStyle.backText}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ ...GloableStyle.profileView, flex: 0.2 }}>
          <Image
            style={GloableStyle.profileImage}
            source={{
              uri: "https://indianmodels.in/tim/timthumb.php?src=/images/im_1572351570_IMG-20191021-WA0022.jpg&w=640&h=480&zc=1&cc=",
            }}
          />
          <Text
            style={[GloableStyle.headingText, { marginLeft: 0, fontSize: 18 }]}
          >
            {data?.uname}
          </Text>
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(30) }}>
          <Feather name="user" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 0.85 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Name
            </Text>
            <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              {data?.uname}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(30) }}>
          <Entypo name="old-mobile" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 0.85 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Number
            </Text>
            <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              +91 {data?.mobile}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(30) }}>
          <MaterialIcons name="attach-email" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 0.85 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Email
            </Text>
            <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              {data?.email}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(30) }}>
          <Entypo name="address" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 0.85 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Address
            </Text>
            <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              {data?.address}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ViewProfile;

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: horizScale(15),
    paddingHorizontal: horizScale(20),
    backgroundColor: Color.white,
    paddingVertical: horizScale(10),
    marginHorizontal: horizScale(15),
    marginVertical: horizScale(5),
    flex: 1,
  },
});
