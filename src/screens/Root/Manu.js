import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  BackHandler,
  ScrollView,
  ToastAndroid,
  Platform,
} from "react-native";
import { Color } from "../../constants/Colors";
import { fontSize } from "../../constants/Fontsize";
import { CustomImage } from "../../constants/Images";
import { horizScale } from "../../constants/Layout";
import ApiCall from "../../utils/ApiCall";
import { API_END_POINT } from "../../utils/ApiEndPoint";
import Loader from "../../utils/Loader";
import { ShowMessage } from "../../utils/ShowMessage";
import { GloableStyle } from "../GloableStyle";

const Manu = ({ navigation }) => {
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
      <StatusBar backgroundColor={Color.green1} barStyle="light-content" />
      <Loader loading={loader} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            ...GloableStyle.headerView,
            flex: 0.1,
            backgroundColor: Color.green1,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.openDrawer();
            }}
          >
            <Ionicons
              name="reorder-three-outline"
              size={30}
              color={Color.white1}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              AsyncStorage.clear();
              navigation.replace("Auth");
              // BackHandler.exitApp();
            }}
          >
            <Ionicons name="ios-exit-outline" size={24} color={Color.white1} />
            <Text style={{ color: Color.white1 }}>Exit</Text>
          </TouchableOpacity>
        </View>
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
        <View style={[styles.footerView, { flexGrow: 1 }]}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ViewProfile");
            }}
            style={styles.navigateButton}
          >
            <MaterialCommunityIcons
              name="eye-arrow-right-outline"
              size={24}
              color={Color.black}
            />
            <Text style={styles.navigateButtonText}>View Profile</Text>
            <Feather name="arrow-right" size={24} color={Color.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
            style={styles.navigateButton}
          >
            <FontAwesome name="edit" size={24} color={Color.black} />
            <Text style={styles.navigateButtonText}>Edit Profile</Text>
            <Feather name="arrow-right" size={24} color={Color.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("MyCart");
            }}
            style={styles.navigateButton}
          >
            <FontAwesome name="cart-plus" size={24} color={Color.black} />
            <Text style={styles.navigateButtonText}>My Cart</Text>
            <Feather name="arrow-right" size={24} color={Color.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Wallet");
            }}
            style={styles.navigateButton}
          >
            <SimpleLineIcons name="wallet" size={24} color={Color.black} />
            <Text style={styles.navigateButtonText}>Wallet</Text>
            <Feather name="arrow-right" size={24} color={Color.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EnquiryForm");
            }}
            style={styles.navigateButton}
          >
            <Image style={styles.image} source={CustomImage.enquiry} />
            <Text style={styles.navigateButtonText}>Enquiry Form</Text>
            <Feather name="arrow-right" size={24} color={Color.black} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ReferEarn");
            }}
            style={styles.navigateButton}
          >
            <Feather name="send" size={24} color={Color.black} />
            <Text style={styles.navigateButtonText}>Refer & Earn</Text>
            <Feather name="arrow-right" size={24} color={Color.black} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Support");
            }}
            style={styles.navigateButton}
          >
            <MaterialIcons name="support-agent" size={24} color={Color.black} />
            <Text style={styles.navigateButtonText}>Support</Text>
            <Feather name="arrow-right" size={24} color={Color.black} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Manu;
const styles = StyleSheet.create({
  footerView: {
    alignItems: "center",
    backgroundColor: Color.green2,
    paddingVertical: horizScale(20),
    borderTopLeftRadius: horizScale(20),
    borderTopRightRadius: horizScale(20),
    flex: 0.7,
  },
  navigateButton: {
    borderWidth: horizScale(0.6),
    borderRadius: horizScale(13),
    borderColor: Color.greendark,
    flexDirection: "row",
    width: "80%",
    paddingHorizontal: horizScale(20),
    justifyContent: "space-between",
    paddingVertical: horizScale(10),
    marginBottom: horizScale(20),
    backgroundColor: Color.white2,
    elevation: 9,
    alignSelf: "center",
  },
  navigateButtonText: {
    color: Color.black,
    fontSize: fontSize.regular,
    fontWeight: "500",
    flex: 0.7,
  },
  image: {
    width: horizScale(24),
    height: horizScale(24),
    resizeMode: "contain",
    tintColor: Color.black,
  },
});
