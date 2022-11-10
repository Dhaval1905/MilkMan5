import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GloableStyle } from "../GloableStyle";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Color } from "../../constants/Colors";
import { horizScale, vertScale } from "../../constants/Layout";
import { CustomImage } from "../../constants/Images";
import { fontSize } from "../../constants/Fontsize";
import { API_END_POINT } from "../../utils/ApiEndPoint";
import ApiCall from "../../utils/ApiCall";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Orders = ({ navigation }) => {
  const [filter, setfilter] = useState("active");
  const [order, setOrder] = useState([
    // {
    //   id: 1,
    //   orderId: 562312,
    //   itemname: "Banana",
    //   price: "35",
    //   image:
    //     "https://149366112.v2.pressablecdn.com/wp-content/uploads/2019/09/shutterstock_518328943-scaled.jpg",
    //   quantity: "1",
    //   quantityType: "Dozen",
    //   status: "pending",
    //   orderDate: "12-07-2022",
    //   categoryId: 2,
    // },
    // {
    //   id: 2,
    //   orderId: 124675,
    //   itemname: "Ghee",
    //   price: "580",
    //   image:
    //     "https://5.imimg.com/data5/HI/PR/MY-9948889/dairy-farm-ghee-500x500.jpg",
    //   quantity: "1",
    //   quantityType: "KG",
    //   status: "complete",
    //   orderDate: "12-07-2022",
    //   categoryId: 4,
    // },
    // {
    //   id: 3,
    //   orderId: 100035,
    //   itemname: "Saboro Milk",
    //   price: "35",
    //   image: "https://whitespreadfoods.com/images/varient1-L.png",
    //   quantity: "1",
    //   quantityType: "litre",
    //   status: "active",
    //   orderDate: "12-07-2022",
    //   categoryId: 1,
    //   date: [
    //     {
    //       date: "12-07-2022",
    //       status: 0,
    //       todayAmount: 52,
    //       walletBalance: 250,
    //       botlestatus: "Return on next delivery",
    //     },
    //     {
    //       date: "15-07-2022",
    //       status: 0,
    //       todayAmount: 50,
    //       walletBalance: 198,
    //       botlestatus: "Return",
    //     },
    //     {
    //       date: "20-07-2022",
    //       status: 1,
    //       todayAmount: 54,
    //       walletBalance: 198,
    //       botlestatus: "Break 1",
    //     },
    //     {
    //       date: "27-07-2022",
    //       status: 1,
    //       todayAmount: 50,
    //       walletBalance: 198,
    //       botlestatus: "return on next delivery",
    //     },
    //     {
    //       date: "04-08-2022",
    //       status: 1,
    //       todayAmount: 50,
    //       walletBalance: 198,
    //       botlestatus: "return on next delivery",
    //     },
    //   ],
    // },
  ]);

  useEffect(() => {
    getUserFromStorage();
  }, []);
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
            getOrders(value);

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

  const getOrders = (id) => {
    ApiCall("get", null, API_END_POINT.getorder + "235")
      .then((response) => {
        // console.log(
        //   "get order list api red => ",
        //   JSON.stringify(response.data.data[0])
        // );

        if (response.data?.response) {
          //   setImageUrl(response?.data?.img);
          setOrder(response?.data?.data);
        } else {
        }
      })
      .catch((error) => {
        console.log("get product list api error => ", error);
      });
  };
  /**
   * {"id":51,"prod_name":"33","dtype":"delivery","delivery_date":"2022-08-11","order_time":null,
   * "plan":"daily","plan_type":"A","delivery_status":0,"return_bottle":0,"bottle_penalty":"0",
   * "prod_price":"99.00","price":"198","total_price":238,"quantity":"2","wallet_balance":238,
   * "customer_action":"OK","reason":"OK","delivery_id":14,"pmode":"cod","customer_id":235,
   * "created_at":"2022-08-09 00:00:00","updated_at":"2022-08-09 06:37:39","status":0,
   * "hub":2,"track_id":null,"cname":null,"days":"2","to_date":"2022-08-13","penalty_status":null}
   */
  return (
    <SafeAreaView style={GloableStyle.container}>
      <StatusBar backgroundColor={Color.greendark} barStyle="light-content" />
      <View
        style={{ ...GloableStyle.headerView, backgroundColor: Color.greendark }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <AntDesign name="arrowright" size={24} color={Color.white1} />
        </TouchableOpacity>
        <Text style={GloableStyle.headerText}>My Orders</Text>
        <TouchableOpacity
          style={GloableStyle.smallCircleBotton}
          onPress={() => {
            navigation.navigate("MyCart");
          }}
        >
          <FontAwesome name="cart-plus" size={20} color={Color.green1} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...GloableStyle.rowcenter,
          margin: horizScale(15),
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setfilter("active");
          }}
          style={{ ...styles.filterView, backgroundColor: Color.green1 }}
        >
          {filter == "active" && (
            <AntDesign name="checkcircle" size={18} color={Color.white1} />
          )}
          <Text style={GloableStyle.buttonTextSmall}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setfilter("pending");
          }}
          style={{ ...styles.filterView, backgroundColor: Color.yellow }}
        >
          {filter == "pending" && (
            <AntDesign name="checkcircle" size={18} color={Color.white1} />
          )}
          <Text style={GloableStyle.buttonTextSmall}>Pending</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setfilter("complete");
          }}
          style={{ ...styles.filterView, backgroundColor: Color.red }}
        >
          {filter == "complete" && (
            <AntDesign name="checkcircle" size={18} color={Color.white1} />
          )}
          <Text style={GloableStyle.buttonTextSmall}>Complete</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={order}
        renderItem={({ item }) => {
          //   if (item.status == filter) {
          return (
            <View style={styles.flexcontainer}>
              <View
                style={{
                  ...GloableStyle.rowtwoitem,
                  justifyContent: "space-evenly",
                  paddingVertical: horizScale(10),
                }}
              >
                <View>
                  <Text style={GloableStyle.headingText}>
                    Order No. {item.id}
                  </Text>
                  <Text
                    style={{
                      ...GloableStyle.headingText,
                      color: Color.green1,
                      fontSize: fontSize.regular,
                      textDecorationLine: "underline",
                    }}
                  >
                    {item.prod_name}
                  </Text>
                  <Text style={GloableStyle.headingText}>
                    Price : ₹{item.price}
                  </Text>
                </View>
                <Image
                  source={{ uri: item.image }}
                  style={GloableStyle.itemImage}
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flex: 0.7 }}>
                  <Text style={GloableStyle.simpleText}>
                    Quantity : {item.quantity} {item.quantityType}
                  </Text>
                  <Text style={GloableStyle.simpleText}>
                    {item.status == "active" ? "Start from :" : "Order on :"}{" "}
                    {item.delivery_date}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{
                    backgroundColor:
                      item.status == "active"
                        ? Color.green1
                        : item.status == "pending"
                        ? Color.yellow
                        : Color.red,
                    flex: 0.25,
                    paddingVertical: horizScale(8),
                    alignItems: "center",
                    borderRadius: horizScale(8),
                  }}
                  onPress={() => {
                    if (item.status == "active") {
                      navigation.navigate("ActivePlan", { item: item });
                    } else {
                      navigation.navigate("SubProduct", {
                        id: item.categoryId,
                      });
                    }
                  }}
                >
                  <Text style={GloableStyle.buttonTextSmall}>
                    {item.status == "active" ? "See More" : "Re-order"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
          //   }
        }}
      />
    </SafeAreaView>
  );
};

export default Orders;

const styles = StyleSheet.create({
  filterView: {
    flex: 0.3,
    flexDirection: "row",
    paddingVertical: horizScale(12),
    borderRadius: horizScale(50),
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  profile: {
    height: horizScale(50),
    width: horizScale(50),
  },
  flexcontainer: {
    marginVertical: 10,
    width: "95%",
    height: 200,
    backgroundColor: Color.white1,
    alignSelf: "center",
    elevation: 10,
    borderRadius: 10,
    shadowColor: Color.green,
    shadowOpacity: 0.5,
    // shadowRadius: 8,
    shadowOffset: {
      height: 2,
      width: 0,
    },
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
