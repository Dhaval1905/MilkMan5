import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Easing, Linking, StatusBar, TextInput } from "react-native";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
  Modal,
} from "react-native";
import { Color } from "../../../constants/Colors";
import { fontSize } from "../../../constants/Fontsize";
import { CustomImage } from "../../../constants/Images";
import { horizScale, vertScale } from "../../../constants/Layout";
import { GloableStyle } from "../../GloableStyle";

export default function Support({ navigation }) {
  const [number, setNumber] = useState("+91 7014054590");
  const [showIn, setshowIn] = useState(0);
  const [query, setquery] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // First set up animation

  // Next, interpolate beginning and end values (in this case 0 and 1)

  return (
    <SafeAreaView style={GloableStyle.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          ...GloableStyle.headingView,
          paddingVertical: 18,
          backgroundColor: Color.white2,
        }}
      >
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text
          style={{
            fontSize: fontSize.medium,
          }}
        >
          Customer Support
        </Text>
      </TouchableOpacity>
      <ScrollView nestedScrollEnabled={true}>
        <View style={styles.contactstyle}>
          <Text
            style={{
              fontSize: fontSize.regular,
              color: Color.black,
              fontWeight: "bold",
            }}
          >
            Contact Us{" "}
          </Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${number}`);
            }}
          >
            <Ionicons name="ios-call" size={24} color={Color.green1} />
          </TouchableOpacity>
        </View>

        <Text style={styles.textstyle}>I have a issue with </Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              setshowIn(showIn == 0 ? 1 : 0);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: vertScale(20),
            }}
          >
            <Text style={styles.header}>On Order</Text>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  ...styles.arrowimg,
                  transform:
                    showIn == 1
                      ? [{ rotate: "90 deg" }]
                      : [{ rotate: "0 deg" }],
                }}
                source={CustomImage.go}
              />
            </View>
          </TouchableOpacity>
          {showIn == 1 ? (
            <View>
              <Text>How Can We Help You</Text>
              <TextInput
                placeholder="Insert You Query Here..."
                style={{
                  ...styles.inputbox,
                  borderColor: query ? Color.blue : Color.darkgrey,
                }}
                onChangeText={(value) => {
                  setquery(value);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={GloableStyle.button}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              setshowIn(showIn == 0 ? 2 : 0);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: vertScale(20),
            }}
          >
            <Text style={styles.header}>Add to Card</Text>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  ...styles.arrowimg,
                  transform:
                    showIn == 2
                      ? [{ rotate: "90 deg" }]
                      : [{ rotate: "0 deg" }],
                }}
                source={CustomImage.go}
              />
            </View>
          </TouchableOpacity>
          {showIn == 2 ? (
            <View>
              <Text>How Can We Help You</Text>
              <TextInput
                placeholder="Insert You Query Here..."
                style={{
                  ...styles.inputbox,
                  borderColor: query ? Color.blue : Color.darkgrey,
                }}
                onChangeText={(value) => {
                  setquery(value);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={GloableStyle.button}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              setshowIn(showIn == 0 ? 3 : 0);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: vertScale(20),
            }}
          >
            <Text style={styles.header}>Payment</Text>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  ...styles.arrowimg,
                  transform:
                    showIn == 3
                      ? [{ rotate: "90 deg" }]
                      : [{ rotate: "0 deg" }],
                }}
                source={CustomImage.go}
              />
            </View>
          </TouchableOpacity>
          {showIn == 3 ? (
            <View>
              <Text>How Can We Help You</Text>
              <TextInput
                placeholder="Insert You Query Here..."
                style={{
                  ...styles.inputbox,
                  borderColor: query ? Color.blue : Color.darkgrey,
                }}
                onChangeText={(value) => {
                  setquery(value);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={GloableStyle.button}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>

        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              setshowIn(showIn == 0 ? 5 : 0);
            }}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingVertical: vertScale(20),
            }}
          >
            <Text style={styles.header}>Other</Text>
            <View
              style={{
                flex: 0.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  ...styles.arrowimg,
                  transform:
                    showIn == 5
                      ? [{ rotate: "90 deg" }]
                      : [{ rotate: "0 deg" }],
                }}
                source={CustomImage.go}
              />
            </View>
          </TouchableOpacity>
          {showIn == 5 ? (
            <View>
              <Text>How Can We Help You</Text>
              <TextInput
                placeholder="Insert You Query Here..."
                style={{
                  ...styles.inputbox,
                  borderColor: query ? Color.blue : Color.darkgrey,
                }}
                onChangeText={(value) => {
                  setquery(value);
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
                style={GloableStyle.button}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </ScrollView>
      <Modal
        style={{ margin: 0, justifyContent: "center" }}
        animationType="slide"
        visible={modalVisible}
        onBackdropPress={() => setModalVisible(!modalVisible)}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <StatusBar backgroundColor={"rgba(52,52,52,0.88)"} />
        <View style={styles.modalView}>
          <Text style={styles.mprofieText}>
            We got your issue don't worry, Team will connect you soon.
          </Text>
          <TouchableOpacity
            style={GloableStyle.button}
            onPress={() => {
              setshowIn(0);
              setModalVisible(!modalVisible);
            }}
          >
            <Text style={styles.buttonText}>Ok</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 0.4,
    backgroundColor: Color.white,
    marginHorizontal: horizScale(30),
    borderRadius: horizScale(15),
    elevation: horizScale(10),
    justifyContent: "center",
    alignItems: "center",
  },
  mprofieText: {
    fontSize: fontSize.regular,
    color: Color.black,
    lineHeight: vertScale(30),
    fontWeight: "bold",
    width: "70%",
    textAlign: "center",
  },
  buttonText: {
    color: Color.white,
    fontSize: fontSize.regular,
  },
  inputbox: {
    borderBottomWidth: horizScale(1.5),
  },
  header: {
    fontWeight: "bold",
    color: Color.black,
    fontSize: fontSize.regular,
  },
  textstyle: {
    color: Color.pink,
    fontSize: fontSize.input,
    marginLeft: horizScale(25),
    fontWeight: "bold",
    marginVertical: horizScale(20),
  },
  button: {
    width: "90%",
    alignSelf: "center",
    // backgroundColor: Color.green1,
    borderRadius: 10,

    marginVertical: vertScale(7),
    paddingHorizontal: horizScale(15),
    backgroundColor: Color.white1,
    elevation: horizScale(8),
  },
  contactstyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: horizScale(40),
  },
  arrowimg: {
    height: vertScale(20),
    width: horizScale(20),
    tintColor: Color.darkgrey,
  },
});
