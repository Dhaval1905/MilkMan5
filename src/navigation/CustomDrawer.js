import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ToastAndroid,
  Platform,
  Keyboard,
  FlatList,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  getDrawerStatusFromState,
} from "@react-navigation/drawer";
import { Color } from "../constants/Colors";
import { fontSize } from "../constants/Fontsize";
import { horizScale, vertScale } from "../constants/Layout";
import { CustomImage } from "../constants/Images";
import {
  Ionicons,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_END_POINT } from "../utils/ApiEndPoint";
import ApiCall from "../utils/ApiCall";

export default function CustomDrawer(props) {
  const [state, setState] = useState({
    id: "",
    profile:
      "https://indianmodels.in/tim/timthumb.php?src=/images/im_1572351570_IMG-20191021-WA0022.jpg&w=640&h=480&zc=1&cc=",
    isopne: false,
    name: "Rohit Carpenter",
    mobile: "8959XXXXXX",
  });
  // const getData = async () => {
  //     const jValue = await AsyncStorage.getItem("userId")
  //     if (jValue !== null) {
  //         setState({ ...state, id: JSON.parse(jValue) })
  //     }

  // }

  // const [category, setcategory] = useState([])
  // const getCategories = () => {
  //     const api = getCategory_api

  //     fetch(api)
  //         .then(res => res.json())
  //         .then((result) => {
  //             if (result.response) {

  //                 setcategory(result.data)
  //             }
  //             else {

  //                 ToastAndroid.showWithGravity(
  //                     'Somthing went wrong',
  //                     ToastAndroid.SHORT,
  //                     ToastAndroid.BOTTOM
  //                 )
  //             }
  //             //  console.log(result.data)
  //         })
  //         .catch(err => {

  //             ToastAndroid.showWithGravity(
  //                 'Somthing went wrong',
  //                 ToastAndroid.SHORT,
  //                 ToastAndroid.BOTTOM
  //             )
  //         })
  //         .finally(() => {

  //         })
  // }
  // const [user, setUser] = useState({})
  // const getUser = () => {
  //     const api = getuserprofile_api
  //     const data = new FormData()
  //     data.append('id', state.id)
  //     fetch(api, {
  //         method: 'POST',
  //         body: data,
  //         redirect: 'follow'
  //     })
  //         .then(res => res.json())
  //         .then((result) => {
  //             if (result.response) {
  //                 setUser(result.data)
  //                 setState({ ...state, name: result.data.fullname, mobile: result.data.mobile })
  //             }
  //             else {

  //                 ToastAndroid.showWithGravity(
  //                     'Somthing went wrong',
  //                     ToastAndroid.SHORT,
  //                     ToastAndroid.BOTTOM
  //                 )
  //             }
  //             // console.log(result.data)
  //         })
  //         .catch(err => {

  //             ToastAndroid.showWithGravity(
  //                 'Somthing went wrong',
  //                 ToastAndroid.SHORT,
  //                 ToastAndroid.BOTTOM
  //             )
  //         })
  //         .finally(() => {

  //         })
  // }
  // useEffect(() => {
  //     getData()
  //     getCategories()
  //     getUser()
  //     let keyboardEventListeners;
  //     if (Platform.OS === 'android') {
  //         keyboardEventListeners = [
  //             Keyboard.addListener('DrawerClose', () => setState({ ...state, isopen: false })),
  //             Keyboard.addListener('drawerOpen', () => setState({ ...state, isopen: true })),
  //         ];
  //     }
  //     return () => {
  //         if (Platform.OS === 'android') {
  //             keyboardEventListeners &&
  //                 keyboardEventListeners.forEach(eventListener => eventListener.remove());
  //         }
  //     };
  // }, [state.id, state.name]);

  const getUserProfile = (id) => {
    const url = API_END_POINT.get_profile;
    ApiCall("get", null, url + id)
      .then((result) => {
        // console.log("userData menu screen", JSON.stringify(result.data));
        if (result.data.response) {
          // ShowMessage("" + result.data.message);
          setState(result.data.data);
        } else {
          ShowMessage("" + result.data.message);
        }
        // console.log(result.data);
      })
      .catch((err) => {
        console.log("ERROR IN SIGN UP API MENU => ", err);

        Platform.OS === "android"
          ? ToastAndroid.showWithGravity(
              "Something went wrong",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
          : null;
      })
      .finally(() => {});
  };

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
            getUserProfile(value);
          } else {
            // navigation.replace('login');
          }
        }
      });
    } catch (error) {
      console.log("Error in get user on splash -> ", error);
    }
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  return (
    <ImageBackground
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        backgroundColor: Color.green3,
      }}
      source={CustomImage.drawer}
    >
      <StatusBar
        translucent={state.isopne}
        backgroundColor={Color.green3}
        barStyle="dark-content"
      />
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={{
            marginHorizontal: horizScale(15),
            marginTop: vertScale(40),
            marginBottom: vertScale(10),
            // alignItems: 'center',
          }}
          onPress={() => {
            props.navigation.navigate("ViewProfile");
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: horizScale(70),
                width: horizScale(70),
                borderRadius: horizScale(35),
                resizeMode: "cover",
              }}
              source={CustomImage.user}
            />

            <View style={{ marginLeft: horizScale(20) }}>
              <Text style={{ color: Color.black, fontWeight: "700" }}>
                {state.uname}
              </Text>
              <Text
                style={{
                  color: Color.black,
                  fontWeight: "700",
                  fontSize: fontSize.small,
                }}
              >
                {state.mobile}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Home"
          icon={() => (
            <Ionicons name="md-home" size={24} color={Color.green1} />
          )}
          onPress={() => props.navigation.navigate("TabOne")}
        />
        <View
          style={{
            height: horizScale(0.8),
            width: "100%",
            backgroundColor: Color.green,
            marginVertical: horizScale(10),
          }}
        />
        <Text style={{ marginLeft: horizScale(20), color: Color.black }}>
          User
        </Text>
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="My Orders"
          icon={() => (
            <FontAwesome5
              name="clipboard-check"
              size={24}
              color={Color.green1}
            />
          )}
          onPress={() => props.navigation.navigate("TabThree")}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="My Profile"
          icon={() => (
            <FontAwesome name="user-o" size={24} color={Color.green1} />
          )}
          onPress={() => props.navigation.navigate("ViewProfile")}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Enquiry Form"
          icon={() => (
            <Image style={styles.image} source={CustomImage.enquiry} />
          )}
          onPress={() => props.navigation.navigate("EnquiryForm")}
        />
        <View
          style={{
            height: horizScale(0.8),
            width: "100%",
            backgroundColor: Color.green,
            marginVertical: horizScale(10),
          }}
        />
        <Text style={{ marginLeft: horizScale(20), color: Color.black }}>
          Help & suggestion
        </Text>
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Support"
          icon={() => (
            <MaterialIcons
              name="support-agent"
              size={24}
              color={Color.green1}
            />
          )}
          onPress={() => props.navigation.navigate("Support")}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="About Us"
          icon={() => <Image style={styles.image} source={CustomImage.about} />}
          onPress={() => props.navigation.navigate("AboutUs")}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Terms & Condition"
          icon={() => (
            <FontAwesome5 name="file-contract" size={24} color={Color.green1} />
          )}
          onPress={() => props.navigation.navigate("TermsCondition")}
        />
        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Share with Friends"
          icon={() => (
            <AntDesign name="sharealt" size={24} color={Color.green1} />
          )}
          onPress={() => props.navigation.navigate("ReferEarn")}
        />

        {/* <View style={{ height: horizScale(0.8), width: "100%", backgroundColor: Color.green, marginVertical: horizScale(10) }} />
                <Text style={{ marginLeft: horizScale(20), color: Color.black }}></Text> */}

        <DrawerItem
          labelStyle={styles.labelStyle}
          label="Logout"
          icon={() => <Entypo name="log-out" size={24} color={Color.green1} />}
          onPress={async () => {
            await AsyncStorage.clear();
            props.navigation.replace("Auth");
          }}
        />
      </DrawerContentScrollView>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  image: {
    width: horizScale(24),
    height: horizScale(24),
    resizeMode: "contain",
    tintColor: Color.green1,
  },
  labelStyle: {
    color: Color.black,
    fontSize: fontSize.medium,
    fontWeight: "700",
  },
});
