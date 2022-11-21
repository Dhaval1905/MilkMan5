/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Image } from "react-native";
import Login from "../screens/Auth/Login";
import OtpVerify from "../screens/Auth/OtpVerify";
import Signup from "../screens/Auth/Signup";
import Splash from "../screens/Auth/Splash";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={Auth} />
      <Stack.Screen name="MyDrawer" component={MyDrawer} />
      <Stack.Screen
        name="LiveFarm"
        component={LiveFarm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SubProduct"
        component={SubProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Address"
        component={Address}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethod}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ActivePlan"
        component={ActivePlan}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocalWendor"
        component={LocalWendor}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ViewProfile"
        component={ViewProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MyCart"
        component={MyCart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Wallet"
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReferEarn"
        component={ReferEarn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Support"
        component={Support}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TermsCondition"
        component={TermsCondition}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EnquiryForm"
        component={EnquiryForm}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
function Auth() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OtpVerify"
        component={OtpVerify}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./CustomDrawer";
import Home from "../screens/Root/Home";
import Product from "../screens/Root/Product";
import Orders from "../screens/Root/Orders";
import Manu from "../screens/Root/Manu";
import LiveFarm from "../screens/Root/Live Form";
import SubProduct from "../screens/Root/Product/SubProduct";
import ProductDetail from "../screens/Root/Product/ProductDetail";
import Address from "../screens/Root/Address";
import PaymentMethod from "../screens/Root/PaymentMethod";
import ActivePlan from "../screens/Root/ActivePlan";
import LocalWendor from "../screens/Root/Live Form/LocalWendor";
import Notification from "../screens/Root/Notification";
import ViewProfile from "../screens/Root/ManuScreen/ViewProfile";
import EditProfile from "../screens/Root/ManuScreen/EditProfile";
import MyCart from "../screens/Root/ManuScreen/MyCart";
import Wallet from "../screens/Root/ManuScreen/Wallet";
import ReferEarn from "../screens/Root/ManuScreen/ReferEarn";
import Support from "../screens/Root/ManuScreen/Support";
import TermsCondition from "../screens/Root/ManuScreen/TermsCondition";
import EnquiryForm from "../screens/Root/ManuScreen/EnquiryForm";
import AboutUs from "../screens/Root/ManuScreen/AboutUs";

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} />}>
      <Drawer.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={Home}
        options={{
          unmountOnBlur: true,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/home.png")}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? "green" : "gray",
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={Product}
        options={{
          unmountOnBlur: true,
          title: "Product",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/product.png")}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? "green" : "gray",
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabThree"
        component={Orders}
        options={{
          unmountOnBlur: true,
          title: "Orders",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/milk.png")}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? "green" : "gray",
              }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="TabFour"
        component={Manu}
        options={{
          unmountOnBlur: true,
          title: "Menu",
          tabBarIcon: ({ focused }) => (
            <Image
              source={require("../../assets/images/manu.png")}
              style={{
                height: 20,
                width: 20,
                tintColor: focused ? "green" : "gray",
              }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
