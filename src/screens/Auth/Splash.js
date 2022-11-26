import { StyleSheet, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Splash = ({ navigation }) => {
  const [user, setUser] = useState("");

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
            navigation.replace("MyDrawer");
          } else {
            navigation.replace("Login");
          }
        }
      });
    } catch (error) {
      console.log("Error in get user on splash -> ", error);
    }
  };

  useEffect(() => {
    // setTimeout(() => {
    getUserFromStorage();
    // }, 1000);
  }, []);

  return (
    <ImageBackground
      style={{
        flex: 1,
        // backgroundColor: "#00000000",
      }}
      source={require("../../../assets/images/milk_splash.png")}
    >
      <StatusBar hidden={false} translucent={true} />
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});
