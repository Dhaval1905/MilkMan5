import {
  Image,
  Modal,
  PermissionsAndroid,
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
import React, { useState, useEffect } from "react";
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
import * as ImagePicker from "expo-image-picker";
import { fontSize } from "../../../constants/Fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_END_POINT } from "../../../utils/ApiEndPoint";
import ApiCall from "../../../utils/ApiCall";
import { ShowMessage } from "../../../utils/ShowMessage";
import Loader from "../../../utils/Loader";
import axios from "axios";

const EditProfile = ({ navigation }) => {
  const [profileImage, setprofileImage] = useState({});
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState(null);
  const [email, setEmail] = useState("");
  const [first, setfirst] = useState("");
  const [second, setsecond] = useState("");
  const [city, setcity] = useState("");
  const [pincode, setpincode] = useState("");
  const [edit, setEdit] = useState("");
  const [modal, setModal] = useState(false);

  const cameraLaunch = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    setprofileImage(result);
  };

  console.log("This is profile properties", profileImage);

  const imageGalleryLaunch = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    console.log("image===>>>", result);
    setprofileImage(result);
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Milk Man App Camera Permission",
          message:
            "Milk Man App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        cameraLaunch();
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied==");
      }
    } catch (err) {
      console.warn(err);
    }
  };

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
        // console.log(
        //   "userData EDIT PROFILE screen",
        //   JSON.stringify(result.data)
        // );
        if (result.data.response) {
          // ShowMessage("" + result.data.message);
          setData(result.data.data);

          setName(result.data.data?.uname);
          setMobile(result.data.data?.mobile);
          setEmail(result.data.data?.email);
          setfirst(result.data.data?.address);
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

  const handleUpdate = () => {
    setLoader(true);
    const url = API_END_POINT.edit_profile + user;
    let data = {
      uname: name,
      email: email,
      address: first,
      // photo: "fb",
      photo: {
        name: "babu",
        type: "image/jpeg",
        uri: profileImage.uri,
      },
    };

    let formdata = new FormData();
    formdata.append("uname", name);
    formdata.append("email", email);
    formdata.append("address", first);
    formdata.append("photo", {
      uri: profileImage.uri,
      name: profileImage.uri,
      type: "image/jpeg",
    });

    // let headers = { "Content-Type": "multipart/form-data" };
    // ApiCall("post", formdata, url)

    // let config = {
    //   method: "post",
    //   url: "https://www.samajutkarsh.com/Milk_Man1/api/editprofile/235",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   data: data,
    // };

    // axios(config)
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.data.response) {
          ShowMessage("Profile updated successfully");
          setData(result.data.data);
          setName(result.data.data?.uname);
          setMobile(result.data.data?.mobile);
          setEmail(result.data.data?.email);
          setfirst(result.data.data?.address);
        } else {
          setLoader(false);
          ShowMessage("Unable to update profile");
        }
      })
      .catch((err) => {
        ShowMessage("Something went wrong");
        setLoader(false);
        console.log("ERROR IN EDIT PROFILE UP API MENU => ", err);
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
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ ...GloableStyle.profileView, flex: 0.2 }}>
          <Image
            style={GloableStyle.profileImage}
            source={{
              uri: profileImage.uri
                ? profileImage.uri
                : "https://indianmodels.in/tim/timthumb.php?src=/images/im_1572351570_IMG-20191021-WA0022.jpg&w=640&h=480&zc=1&cc=",
            }}
          />

          <View style={styles.pickerView}>
            <TouchableOpacity
              onPress={() => {
                requestCameraPermission();
              }}
              style={styles.camera}
            >
              <Entypo name="camera" size={20} color={Color.gray} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                imageGalleryLaunch();
              }}
              style={styles.camera}
            >
              <Feather name="image" size={20} color={Color.gray} />
            </TouchableOpacity>
          </View>
          {/* <Text style={GloableStyle.headingText}>Rohit Carpenter</Text> */}
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(1) }}>
          <Feather name="user" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 1 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Name
            </Text>
            {/* <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              {name}
            </Text> */}
            <TextInput
              onChangeText={(value) => {
                setName(value);
              }}
              placeholder="Enter Name*"
              placeholderTextColor={"grey"}
              style={styles.input}
              value={name}
            ></TextInput>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              setEdit("Name"), setModal(true);
            }}
          >
            <FontAwesome name="edit" size={20} color={Color.black} />
          </TouchableOpacity> */}
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(1) }}>
          <Entypo name="old-mobile" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 1 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Number
            </Text>
            {/* <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              +91 8959xxxxxx
            </Text> */}
            <TextInput
              onChangeText={(value) => {
                setMobile(value);
              }}
              placeholder="Enter Mobile Number*"
              placeholderTextColor={"grey"}
              style={styles.input}
              value={mobile}
            ></TextInput>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              setEdit("Number"), setModal(true);
            }}
          >
            <FontAwesome name="edit" size={20} color={Color.black} />
          </TouchableOpacity> */}
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(1) }}>
          <MaterialIcons name="attach-email" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 1 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Email
            </Text>
            {/* <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              RohitCar525@gmail.com
            </Text> */}
            <TextInput
              onChangeText={(value) => {
                setEmail(value);
              }}
              placeholder="Enter Email id*"
              placeholderTextColor={"grey"}
              style={styles.input}
              value={email}
            ></TextInput>
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              setEdit("Email"), setModal(true);
            }}
          >
            <FontAwesome name="edit" size={20} color={Color.black} />
          </TouchableOpacity> */}
        </View>
        <View style={{ ...styles.box, marginTop: vertScale(1) }}>
          <Entypo name="address" size={24} color="black" />
          <View style={{ marginLeft: horizScale(20), flex: 1 }}>
            <Text
              style={{
                width: horizScale(210),
                fontSize: fontSize.small,
              }}
            >
              Address
            </Text>
            {/* <Text
              style={{
                fontSize: fontSize.medium,
                color: Color.black,
                marginLeft: horizScale(2),
                fontWeight: "bold",
              }}
            >
              115, Sunderam complex , Bhawarkuaa road Indore
            </Text> */}

            <TextInput
              placeholder="Full address"
              onChangeText={(value) => {
                setfirst(value);
              }}
              style={styles.input}
              value={first}
            />
          </View>
          {/* <TouchableOpacity
            onPress={() => {
              setEdit("Address"), setModal(true);
            }}
          >
            <FontAwesome name="edit" size={20} color={Color.black} />
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: Color.green1,
            width: "90%",
            height: 50,
            //   flex: 1,
            //   paddingVertical: horizScale(8),
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            borderRadius: horizScale(8),
            marginVertical: 15,
          }}
          onPress={() => {
            handleUpdate();
          }}
        >
          <Text style={[GloableStyle.buttonTextSmall, { fontSize: 18 }]}>
            Update
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Modal
        transparent={true}
        animationType={"slide"}
        visible={modal}
        onRequestClose={() => {
          console.log("close modal");
          setModal(false);
        }}
      >
        <View style={styles.modalBackground}>
          <StatusBar backgroundColor={"rgba(52,52,52,0.8)"} />
          <View style={styles.viewstyle}>
            {edit == "Name" && (
              <View style={{ width: horizScale(300) }}>
                <Text style={GloableStyle.headingText}>Name</Text>
                <TextInput
                  onChangeText={(value) => {
                    setName(value);
                  }}
                  placeholder="Enter Name*"
                  placeholderTextColor={"grey"}
                  style={styles.input}
                ></TextInput>
              </View>
            )}
            {edit == "Email" && (
              <View style={{ width: horizScale(300) }}>
                <Text style={GloableStyle.headingText}>Email ID</Text>
                <TextInput
                  onChangeText={(value) => {
                    setEmail(value);
                  }}
                  placeholder="Enter Email id*"
                  placeholderTextColor={"grey"}
                  style={styles.input}
                ></TextInput>
              </View>
            )}
            {edit == "Number" && (
              <View style={{ width: horizScale(300) }}>
                <Text style={GloableStyle.headingText}>Mobile Number</Text>
                <TextInput
                  onChangeText={(value) => {
                    setMobile(value);
                  }}
                  placeholder="Enter Mobile Number*"
                  placeholderTextColor={"grey"}
                  style={styles.input}
                ></TextInput>
              </View>
            )}
            {edit == "Address" && (
              <View style={{ width: horizScale(300) }}>
                <Text style={styles.simpleText}>Address First</Text>
                <TextInput
                  placeholder="Building No. or Name*"
                  onChangeText={(value) => {
                    setfirst(value);
                  }}
                  style={styles.input}
                />
                <Text style={styles.simpleText}>Address Second</Text>
                <TextInput
                  placeholder="Near by or Road Name*"
                  onChangeText={(value) => {
                    setsecond(value);
                  }}
                  style={styles.input}
                />
                <Text style={styles.simpleText}>City/Village Name</Text>
                <TextInput
                  placeholder="City/Village Name*"
                  onChangeText={(value) => {
                    setcity(value);
                  }}
                  style={styles.input}
                />
                <Text style={styles.simpleText}>Pin Code No.</Text>
                <TextInput
                  placeholder="pin code"
                  onChangeText={(value) => {
                    setpincode(value);
                  }}
                  keyboardType="number-pad"
                  style={styles.input}
                />
              </View>
            )}

            <View
              style={{
                ...GloableStyle.rowtwoitem,
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModal(false);
                }}
                style={GloableStyle.buttonSmall}
              >
                <Text style={GloableStyle.buttonTextSmall}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // setModal(false)
                  alert("Coming Soon");
                }}
                style={{
                  ...GloableStyle.buttonSmall,
                  marginLeft: horizScale(20),
                }}
              >
                <Text style={GloableStyle.buttonTextSmall}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  input: {
    width: "100%",
    // height: vertScale(40),
    color: Color.black,
    borderColor: Color.green,
    borderRadius: horizScale(10),
    borderWidth: horizScale(0.5),
    marginVertical: vertScale(5),
    fontSize: fontSize.medium,
    //  paddingLeft: horizScale(12),
    alignSelf: "center",
    backgroundColor: Color.white1,
    paddingHorizontal: horizScale(10),
    paddingVertical: horizScale(8),
    marginHorizontal: horizScale(10),
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  viewstyle: {
    backgroundColor: "#FFFFFF",
    width: "85%",
    paddingVertical: horizScale(20),
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },

  camera: {
    padding: horizScale(8),
    borderRadius: horizScale(30),
    backgroundColor: Color.green2,
  },
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
  pickerView: {
    marginLeft: horizScale(5),
    justifyContent: "space-between",
    ...GloableStyle.rowtwoitem,
    width: "25%",
    marginVertical: horizScale(10),
  },
});
