import { View, Text, StatusBar } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Color } from "../../../constants/Colors";
import { GloableStyle } from "../../GloableStyle";
import { TouchableOpacity } from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { getLocalDate, horizScale } from "../../../constants/Layout";
import { FlatList } from "react-native";
import { fontSize } from "../../../constants/Fontsize";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { API_END_POINT } from "../../../utils/ApiEndPoint";

const ActivePlan = ({ navigation, route }) => {
  const { item } = route.params;
  const [orderData, setOrderData] = useState([]);

  const getOrderDetails = () => {
    let formdata = new FormData();
    formdata.append("id", item.orderid);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(API_END_POINT.getOrderDetails, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.response) {
          setOrderData(result.data);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const cancelOrder = (id) => {
    let formdata = new FormData();
    formdata.append("id", id);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(API_END_POINT.cancelOrder, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.response) {
          getOrderDetails();
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <SafeAreaView style={GloableStyle.container}>
      <StatusBar backgroundColor={Color.green1} barStyle="light-content" />
      <View
        style={{
          ...GloableStyle.headerView,
          backgroundColor: Color.green1,
          flexDirection: "column",
        }}
      >
        <View
          style={{
            ...GloableStyle.rowtwoitem,
            backgroundColor: Color.green1,
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", flex: 0.17, alignItems: "center" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back" size={20} color={Color.white1} />
            <Text
              style={{
                ...GloableStyle.backText,
                marginLeft: horizScale(1),
                color: Color.white1,
              }}
            >
              Back
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              ...GloableStyle.headerText,
              flex: 0.68,
              textAlign: "right",
              color: Color.white1,
              marginRight: horizScale(10),
            }}
          >
            {item.uname}
          </Text>
          <TouchableOpacity
            style={{
              ...GloableStyle.smallCircleBotton,
              flex: 0.15,
              padding: horizScale(4),
            }}
            onPress={() => {
              // navigation.navigate('LiveFarm')
            }}
          >
            <FontAwesome name="user-circle" size={45} color={Color.greendark} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            ...GloableStyle.rowtwoitem,
            justifyContent: "space-evenly",
            marginVertical: horizScale(8),
          }}
        >
          <Text
            style={{
              ...GloableStyle.headerText,
              flex: 0.4,
              textAlign: "center",
              color: Color.white1,
              fontSize: fontSize.regular,
            }}
          >
            Wallet Balance {"\n"}
            {item.wallet_balance}₹ /-
          </Text>
          <Text
            style={{
              ...GloableStyle.headerText,
              flex: 0.4,
              textAlign: "center",
              color: Color.white1,
              fontSize: fontSize.medium,
            }}
          >
            Quantity: {item.quantity}
          </Text>
        </View>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View>
          <FlatList
            data={orderData}
            ListHeaderComponent={() => {
              return (
                <View style={styles.table}>
                  <Text
                    style={{ ...styles.oneHeadingText, width: horizScale(50) }}
                  >
                    S.{"\n"} no.
                  </Text>
                  <Text
                    style={{ ...styles.oneHeadingText, width: horizScale(120) }}
                  >
                    Delivery {"\n"} Date
                  </Text>
                  <Text
                    style={{ ...styles.oneHeadingText, width: horizScale(90) }}
                  >
                    Delivery {"\n"} Status
                  </Text>
                  <Text
                    style={{ ...styles.oneHeadingText, width: horizScale(120) }}
                  >
                    Botal {"\n"} Return
                  </Text>
                  <Text
                    style={{ ...styles.oneHeadingText, width: horizScale(100) }}
                  >
                    Today {"\n"} Price
                  </Text>
                  <Text
                    style={{ ...styles.oneHeadingText, width: horizScale(130) }}
                  >
                    Bottle {"\n"} Returned
                  </Text>
                  <Text
                    style={{ ...styles.oneHeadingText, width: horizScale(130) }}
                  >
                    Cancel today's order
                  </Text>
                </View>
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <View style={styles.table}>
                    <Text style={{ ...styles.one, width: horizScale(50) }}>
                      {index + 1}
                    </Text>
                    <Text style={{ ...styles.one, width: horizScale(120) }}>
                      {getLocalDate(item.ddate)}
                    </Text>
                    <Text
                      style={{
                        ...styles.one,
                        width: horizScale(90),
                        color: item.status == 0 ? Color.red : Color.green1,
                      }}
                    >
                      {item.status == 0 ? "Pending" : "Deliverd"}
                    </Text>
                    <Text
                      style={{
                        ...styles.one,
                        width: horizScale(120),
                        fontSize: fontSize.medium,
                      }}
                    >
                      {item.no_of_return}
                    </Text>
                    <Text style={{ ...styles.one, width: horizScale(100) }}>
                      {item.daily} ₹/-
                    </Text>
                    <Text
                      style={{
                        ...styles.one,
                        width: horizScale(130),
                        color:
                          item.return_bottle == 0 ? Color.red : Color.green1,
                      }}
                    >
                      {item.return_bottle == 0 ? "Not \n Returned" : "Returned"}
                    </Text>
                    <View
                      style={{
                        ...styles.one,
                        width: horizScale(130),
                      }}
                    >
                      {
                        <TouchableOpacity
                          disabled={item.cancel == 1 ? true : false}
                          onPress={() => {
                            cancelOrder(item.id);
                          }}
                          style={{
                            ...GloableStyle.buttonSmall,
                            backgroundColor:
                              item.cancel == 1 ? Color.red : Color.green1,
                          }}
                        >
                          <Text
                            style={{
                              ...GloableStyle.buttonTextSmall,
                              fontSize: fontSize.small,
                            }}
                          >
                            {item.cancel == 1 ? "Cancelled" : "Cancel"}
                          </Text>
                        </TouchableOpacity>
                      }
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivePlan;
const styles = StyleSheet.create({
  one: {
    borderWidth: horizScale(1),
    borderColor: Color.gray1,
    color: Color.black,
    fontSize: fontSize.regular,
    fontWeight: "600",
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: horizScale(10),
  },

  oneHeadingText: {
    borderWidth: horizScale(1),
    borderColor: Color.gray1,
    color: Color.black,
    fontSize: fontSize.regular,
    fontWeight: "700",
    textAlign: "center",
    textAlignVertical: "center",
    paddingVertical: horizScale(10),
  },
  table: {
    flexDirection: "row",
    height: 100,
  },
});

// <FlatList
//   contentContainerStyle={{ margin: horizScale(20) }}
//   data={item.date}
//   ListHeaderComponent={() => {
//     return (
//       <View style={styles.table}>
//         <Text style={{ ...styles.oneHeadingText, width: horizScale(50) }}>
//           S.{"\n"} no.
//         </Text>
//         <Text style={{ ...styles.oneHeadingText, width: horizScale(120) }}>
//           Date
//         </Text>
//         <Text style={{ ...styles.oneHeadingText, width: horizScale(90) }}>
//           Delivery Status
//         </Text>
//         <Text style={{ ...styles.oneHeadingText, width: horizScale(120) }}>
//           Botal return status
//         </Text>
//         <Text style={{ ...styles.oneHeadingText, width: horizScale(100) }}>
//           Today Ammount
//         </Text>
//         <Text style={{ ...styles.oneHeadingText, width: horizScale(130) }}>
//           Remaining Balance
//         </Text>
//       </View>
//     );
//   }}
//   renderItem={({ item, index }) => {
//     return (
//       <View style={styles.table}>
//         <Text style={{ ...styles.one, width: horizScale(50) }}>
//           {index + 1}
//         </Text>
//         <Text style={{ ...styles.one, width: horizScale(120) }}>
//           {item.date}
//         </Text>
//         <Text
//           style={{
//             ...styles.one,
//             width: horizScale(90),
//             color: item.status == 0 ? Color.red : Color.green1,
//           }}
//         >
//           {item.delivery_status == 0 ? "Deliverd" : "Pending"}
//         </Text>
//         <Text
//           style={{
//             ...styles.one,
//             width: horizScale(120),
//             fontSize: fontSize.medium,
//           }}
//         >
//           {item.status == 0 ? item.botlestatus : "Pending"}
//         </Text>
//         <Text style={{ ...styles.one, width: horizScale(100) }}>
//           {item.status == 0 ? item.todayAmount : "Coming Soon"}
//         </Text>
//         {item.status == 0 ? (
//           <Text style={{ ...styles.one, width: horizScale(130) }}>
//             {" "}
//             {item.walletBalance}
//           </Text>
//         ) : (
//           <View
//             style={{
//               ...styles.one,
//               width: horizScale(130),
//             }}
//           >
//             <TouchableOpacity
//               onPress={() => {
//                 alert("Coming Soon");
//               }}
//               style={{ ...GloableStyle.buttonSmall, marginVertical: 0 }}
//             >
//               <Text style={GloableStyle.buttonTextSmall}>Cencel</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//         {/* <Text style={{ ...styles.one, width: horizScale(130) }}>{item.status == 0 ? item.walletBalance : 'Cencel'}</Text> */}
//       </View>
//     );
//   }}
// />;
