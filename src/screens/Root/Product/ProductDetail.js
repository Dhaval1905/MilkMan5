import {
  FlatList,
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GloableStyle } from "../../GloableStyle";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  days,
  getLocalDate,
  horizScale,
  vertScale,
} from "../../../constants/Layout";
import { fontSize } from "../../../constants/Fontsize";
import { Color } from "../../../constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import ApiCall from "../../../utils/ApiCall";
import { API_END_POINT } from "../../../utils/ApiEndPoint";
import { ShowMessage } from "../../../utils/ShowMessage";
const ProductDetail = ({ navigation, route }) => {
  const { item } = route.params;
  console.log("ITEM -> ", item);

  const [count, setCount] = useState(0);
  const [Sun, setSun] = useState(0);
  const [Mon, setMon] = useState(0);
  const [Tue, setTue] = useState(0);
  const [Wed, setWed] = useState(0);
  const [Thu, setThu] = useState(0);
  const [Fri, setFri] = useState(0);
  const [Sat, setSat] = useState(0);
  const [selectedPlan, setselectedPlan] = useState("");
  const [plan, setplan] = useState([
    { id: 1, name: "Daily" },
    { id: 2, name: "Alternate Days" },
    { id: 3, name: "One Time" },
    { id: 4, name: "Custom" },
  ]);
  const [calenderModal, setCalenderModal] = useState(false);
  // const today = new Date()
  // const tomorrow = new Date()

  // tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = new Date(2022, 6, 1);
  const maxDate = new Date(2025, 12, 31);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [alternateDays, setAlternateDays] = useState([]);
  const [oneTime, setOneTime] = useState(null);
  const inserAlternateDays = (date) => {
    alternateDays.push({
      date: date,
      style: { backgroundColor: Color.green1 },
      textStyle: { color: Color.white1 },
      containerStyle: [],
      allowDisabled: true,
    });
  };
  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setEndDate(date);
    } else {
      setStartDate(date);
    }
  };
  const oneTimeDate = (date) => {
    setOneTime(date);
  };

  const add_to_cart = () => {
    let data = {
      uid: "235",
      date: "2022-11-22",
      quantity: "2",
      prod_id: "41",
      plan1: "daily",
      plan2: "A",
      days: "2",
      // plantype: "A",
      // product_name: `["Milk","lassi","Dahi"]`,
      // price: "250",
      // quantity: "10",
    };

    ApiCall("post", data, API_END_POINT.addcart)
      .then((response) => {
        console.log(
          "RESPONSE in ADD TO CART API => ",
          JSON.stringify(response)
        );

        if (response.data?.response) {
          ShowMessage("Added to cart");
        } else {
          ShowMessage("Unable to add to cart");
        }
      })
      .catch((error) => {
        console.log("ERROR in ADD TO CART API => ", error);
      });
  };

  useEffect(() => {}, [alternateDays]);
  return (
    <SafeAreaView style={GloableStyle.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={GloableStyle.BackButtonView}
      >
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text style={GloableStyle.backText}>{item.pname}</Text>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <Text style={GloableStyle.headingText}>{item.pname}</Text> */}
        <Image
          source={{
            uri:
              "https://www.samajutkarsh.com/Milk_Man1/images/product/" +
              item.pimage,
          }}
          style={{ ...GloableStyle.splashImage, alignSelf: "center" }}
        />
        <View
          style={{
            ...GloableStyle.BackButtonView,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flex: 0.6 }}>
            <Text style={GloableStyle.boldText}>
              {item.pname} {item.quantityType}
            </Text>
            <Text>₹ {item.sale_cost}</Text>
          </View>
          <View style={{ flex: 0.4, alignItems: "center" }}>
            <TouchableOpacity
              disabled={count !== 0}
              onPress={() => {
                setCount((pre) => pre + 1);
              }}
              style={GloableStyle.countbuttonView}
            >
              <TouchableOpacity
                style={styles.button}
                disabled={count == 0}
                onPress={() => {
                  setCount((pre) => pre - 1);
                }}
              >
                {count !== 0 && (
                  <FontAwesome5 name="minus" size={15} color="red" />
                )}
              </TouchableOpacity>

              <Text
                style={{
                  textAlign: "center",
                  fontSize: fontSize.regular,

                  fontWeight: "700",
                }}
              >
                {count == 0 ? "Add" : count}
              </Text>
              <TouchableOpacity
                style={styles.button}
                disabled={count == 0}
                onPress={() => {
                  setCount((pre) => pre + 1);
                }}
              >
                {count !== 0 && (
                  <FontAwesome name="plus" size={15} color={Color.green} />
                )}
              </TouchableOpacity>
            </TouchableOpacity>
            <Text style={GloableStyle.boldText}>
              {" "}
              {count != 0 ? `Total price : ${item.sale_cost * count}` : null}
            </Text>
          </View>
        </View>
        <Text style={styles.button}>{item?.description}</Text>

        {item?.plan == true ? (
          <Text style={GloableStyle.headingText}>Plan Type</Text>
        ) : (
          <View style={GloableStyle.rowcenter}>
            <TouchableOpacity
              onPress={() => {
                if (count > 0) {
                  add_to_cart();
                } else {
                  Platform.OS === "android"
                    ? ToastAndroid.showWithGravity(
                        "Please add product",
                        ToastAndroid.SHORT,
                        ToastAndroid.BOTTOM
                      )
                    : null;
                }
              }}
              style={GloableStyle.buttonSmall}
            >
              <Text style={GloableStyle.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Address", {
                  item: item,
                  selectedPlan: selectedPlan,
                  orderdetail: {
                    quantity: count,
                    finalPrice: count * item.sale_cost,
                  },
                });
              }}
              style={GloableStyle.buttonSmall}
            >
              <Text style={GloableStyle.buttonText}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
        )}
        {item?.plan == true && (
          <FlatList
            data={plan}
            contentContainerStyle={{
              marginLeft: horizScale(25),
              marginVertical: horizScale(20),
            }}
            numColumns={3}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  //   setState({ ...state, selectedfoodType: foodType });
                  setselectedPlan(item.pname);
                  (alternateDays.length = 0), setOneTime(null);
                  setStartDate(null);
                  setEndDate(null);
                  setCalenderModal(true);
                }}
                style={{
                  ...styles.multiChoiceBox,
                  backgroundColor:
                    selectedPlan === item.pname ? Color.green : Color.white1,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {selectedPlan === item.pname ? (
                    <MaterialIcons name="done" size={20} color={Color.white1} />
                  ) : // <Image source={CustomImage.right} style={{ height: horizScale(15), width: horizScale(15), tintColor: Color.white1 }} />
                  null}
                  <Text
                    style={{
                      ...styles.multiChoiceBoxText,
                      color:
                        selectedPlan === item.pname
                          ? Color.white1
                          : Color.black,
                    }}
                  >
                    {item.pname}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
        {selectedPlan == "Daily" && startDate !== null && endDate !== null && (
          <View style={styles.datecontainer}>
            <View style={styles.datemsg}>
              <View style={{ flex: 0.85 }}>
                <View style={GloableStyle.rowtwoitem}>
                  <Text style={{ width: horizScale(90) }}>Start From</Text>
                  <Text style={styles.date}>{getLocalDate(startDate)}</Text>
                </View>
                <View style={GloableStyle.rowtwoitem}>
                  <Text style={{ width: horizScale(90) }}>To</Text>
                  <Text style={styles.date}>{getLocalDate(endDate)}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  backgroundColor: Color.white1,
                  alignItems: "center",
                  padding: horizScale(8),
                  borderRadius: horizScale(50),
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setCalenderModal(true);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={24}
                  color={Color.green}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.datemsg}>
              <View>
                <Text style={styles.date}>Price</Text>
                <Text style={styles.date}>{item.sale_cost}</Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Days</Text>
                <Text style={styles.date}>{days(startDate, endDate)}</Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Quantity</Text>
                <Text style={styles.date}>{count}</Text>
              </View>
              <View>
                <Text style={styles.date}>=</Text>
                <Text style={styles.date}>=</Text>
              </View>
              <View>
                <Text style={styles.date}>Amount</Text>
                <Text style={styles.date}>
                  {days(startDate, endDate) * item.sale_cost * count}
                </Text>
              </View>
            </View>
          </View>
        )}
        {selectedPlan == "Alternate Days" && alternateDays.length !== 0 && (
          <View style={styles.datecontainer}>
            <View style={styles.datemsg}>
              <View style={{ flex: 0.9 }}>
                <FlatList
                  //  contentContainerStyle={{ marginLeft: horizScale(25), marginVertical: horizScale(20) }}
                  data={alternateDays?.sort(
                    (a, b) => Number(a.date) - Number(b.date)
                  )}
                  extraData={alternateDays}
                  numColumns={3}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          const d = alternateDays.splice(index, 1);
                          var arr = alternateDays.filter(
                            (id) => id.date !== d.date
                          );
                          setAlternateDays(arr);
                          if (alternateDays.length == 0 || arr.length == 0) {
                            setselectedPlan("");
                          }
                        }}
                        style={{
                          flexDirection: "row",
                          paddingHorizontal: horizScale(8),
                          height: vertScale(28),
                          borderRadius: horizScale(25),
                          alignItems: "center",
                          justifyContent: "center",
                          margin: horizScale(5),
                          backgroundColor: Color.green1,
                        }}
                      >
                        <Text
                          style={{
                            color: Color.white1,
                            fontSize: fontSize.das,
                            fontWeight: "600",
                          }}
                        >
                          {getLocalDate(item.date)}
                        </Text>

                        <Entypo name="cross" size={15} color={Color.white1} />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  backgroundColor: Color.white1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: horizScale(8),
                  borderRadius: horizScale(50),
                  height: horizScale(50),
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setCalenderModal(true);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={24}
                  color={Color.green}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.datemsg}>
              <View>
                <Text style={styles.date}>Price</Text>
                <Text style={styles.date}>{item.sale_cost}</Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Days</Text>
                <Text style={styles.date}>{alternateDays.length}</Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Quantity</Text>
                <Text style={styles.date}>{count}</Text>
              </View>
              <View>
                <Text style={styles.date}>=</Text>
                <Text style={styles.date}>=</Text>
              </View>
              <View>
                <Text style={styles.date}>Amount</Text>
                <Text style={styles.date}>
                  {alternateDays.length * item.sale_cost * count}
                </Text>
              </View>
            </View>
          </View>
        )}
        {selectedPlan == "One Time" && oneTime !== null && (
          <View style={styles.datecontainer}>
            <View style={styles.datemsg}>
              <View style={{ flex: 0.85 }}>
                <View style={GloableStyle.rowtwoitem}>
                  <Text style={{ width: horizScale(90) }}>On Date</Text>
                  <Text style={styles.date}>{getLocalDate(oneTime)}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  backgroundColor: Color.white1,
                  alignItems: "center",
                  padding: horizScale(8),
                  borderRadius: horizScale(50),
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setCalenderModal(true);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={24}
                  color={Color.green}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.datemsg}>
              <View>
                <Text style={styles.date}>Price</Text>
                <Text style={styles.date}>{item.sale_cost}</Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Days</Text>
                <Text style={styles.date}>1</Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Quantity</Text>
                <Text style={styles.date}>{count}</Text>
              </View>
              <View>
                <Text style={styles.date}>=</Text>
                <Text style={styles.date}>=</Text>
              </View>
              <View>
                <Text style={styles.date}>Amount</Text>
                <Text style={styles.date}>{1 * item.sale_cost * count}</Text>
              </View>
            </View>
          </View>
        )}
        {selectedPlan == "Custom" && oneTime !== null && (
          <View style={styles.datecontainer}>
            <View style={styles.datemsg}>
              <View style={{ flex: 0.85 }}>
                <View style={GloableStyle.rowtwoitem}>
                  <Text style={{ width: horizScale(90) }}>Start From </Text>
                  <Text style={styles.date}>{getLocalDate(oneTime)}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  backgroundColor: Color.white1,
                  alignItems: "center",
                  padding: horizScale(8),
                  borderRadius: horizScale(50),
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setCalenderModal(true);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={24}
                  color={Color.green}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                ...GloableStyle.BackButtonView,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={GloableStyle.boldText}>Sunday</Text>
                {/* <Text>Item price : {item.sale_cost}</Text> */}
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <TouchableOpacity
                  disabled={Sun !== 0}
                  onPress={() => {
                    setSun((pre) => pre + 1);
                  }}
                  style={{
                    ...GloableStyle.countbuttonView,
                    borderWidth: horizScale(1),
                    borderColor: Color.red,
                    borderRadius: horizScale(8),
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Sun == 0}
                    onPress={() => {
                      setSun((pre) => pre - 1);
                    }}
                  >
                    {Sun !== 0 && (
                      <FontAwesome5 name="minus" size={15} color="red" />
                    )}
                  </TouchableOpacity>
                  {Sun == 0 && (
                    <FontAwesome name="plus" size={15} color={Color.green} />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: fontSize.regular,

                      fontWeight: "700",
                    }}
                  >
                    {Sun == 0 ? "Add" : Sun}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Sun == 0}
                    onPress={() => {
                      setSun((pre) => pre + 1);
                    }}
                  >
                    {Sun !== 0 && (
                      <FontAwesome name="plus" size={15} color={Color.green} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {/* <Text style={GloableStyle.boldText}> Total price : {item.sale_cost * count}</Text> */}
              </View>
            </View>
            <View
              style={{
                ...GloableStyle.BackButtonView,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={GloableStyle.boldText}>Monday</Text>
                {/* <Text>Item price : {item.sale_cost}</Text> */}
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <TouchableOpacity
                  disabled={Mon !== 0}
                  onPress={() => {
                    setMon((pre) => pre + 1);
                  }}
                  style={{
                    ...GloableStyle.countbuttonView,
                    borderWidth: horizScale(1),
                    borderColor: Color.red,
                    borderRadius: horizScale(8),
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Mon == 0}
                    onPress={() => {
                      setMon((pre) => pre - 1);
                    }}
                  >
                    {Mon !== 0 && (
                      <FontAwesome5 name="minus" size={15} color="red" />
                    )}
                  </TouchableOpacity>
                  {Mon == 0 && (
                    <FontAwesome name="plus" size={15} color={Color.green} />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: fontSize.regular,

                      fontWeight: "700",
                    }}
                  >
                    {Mon == 0 ? "Add" : Mon}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Mon == 0}
                    onPress={() => {
                      setMon((pre) => pre + 1);
                    }}
                  >
                    {Mon !== 0 && (
                      <FontAwesome name="plus" size={15} color={Color.green} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {/* <Text style={GloableStyle.boldText}> Total price : {item.sale_cost * count}</Text> */}
              </View>
            </View>
            <View
              style={{
                ...GloableStyle.BackButtonView,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={GloableStyle.boldText}>Tuesday</Text>
                {/* <Text>Item price : {item.sale_cost}</Text> */}
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <TouchableOpacity
                  disabled={Tue !== 0}
                  onPress={() => {
                    setTue((pre) => pre + 1);
                  }}
                  style={{
                    ...GloableStyle.countbuttonView,
                    borderWidth: horizScale(1),
                    borderColor: Color.red,
                    borderRadius: horizScale(8),
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Tue == 0}
                    onPress={() => {
                      setTue((pre) => pre - 1);
                    }}
                  >
                    {Tue !== 0 && (
                      <FontAwesome5 name="minus" size={15} color="red" />
                    )}
                  </TouchableOpacity>
                  {Tue == 0 && (
                    <FontAwesome name="plus" size={15} color={Color.green} />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: fontSize.regular,

                      fontWeight: "700",
                    }}
                  >
                    {Tue == 0 ? "Add" : Tue}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Tue == 0}
                    onPress={() => {
                      setTue((pre) => pre + 1);
                    }}
                  >
                    {Tue !== 0 && (
                      <FontAwesome name="plus" size={15} color={Color.green} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {/* <Text style={GloableStyle.boldText}> Total price : {item.sale_cost * count}</Text> */}
              </View>
            </View>
            <View
              style={{
                ...GloableStyle.BackButtonView,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={GloableStyle.boldText}>Wednesday</Text>
                {/* <Text>Item price : {item.sale_cost}</Text> */}
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <TouchableOpacity
                  disabled={Wed !== 0}
                  onPress={() => {
                    setWed((pre) => pre + 1);
                  }}
                  style={{
                    ...GloableStyle.countbuttonView,
                    borderWidth: horizScale(1),
                    borderColor: Color.red,
                    borderRadius: horizScale(8),
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Wed == 0}
                    onPress={() => {
                      setWed((pre) => pre - 1);
                    }}
                  >
                    {Wed !== 0 && (
                      <FontAwesome5 name="minus" size={15} color="red" />
                    )}
                  </TouchableOpacity>
                  {Wed == 0 && (
                    <FontAwesome name="plus" size={15} color={Color.green} />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: fontSize.regular,

                      fontWeight: "700",
                    }}
                  >
                    {Wed == 0 ? "Add" : Wed}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Wed == 0}
                    onPress={() => {
                      setWed((pre) => pre + 1);
                    }}
                  >
                    {Wed !== 0 && (
                      <FontAwesome name="plus" size={15} color={Color.green} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {/* <Text style={GloableStyle.boldText}> Total price : {item.sale_cost * count}</Text> */}
              </View>
            </View>
            <View
              style={{
                ...GloableStyle.BackButtonView,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={GloableStyle.boldText}>Thursday</Text>
                {/* <Text>Item price : {item.sale_cost}</Text> */}
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <TouchableOpacity
                  disabled={Thu !== 0}
                  onPress={() => {
                    setThu((pre) => pre + 1);
                  }}
                  style={{
                    ...GloableStyle.countbuttonView,
                    borderWidth: horizScale(1),
                    borderColor: Color.red,
                    borderRadius: horizScale(8),
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Thu == 0}
                    onPress={() => {
                      setThu((pre) => pre - 1);
                    }}
                  >
                    {Thu !== 0 && (
                      <FontAwesome5 name="minus" size={15} color="red" />
                    )}
                  </TouchableOpacity>
                  {Thu == 0 && (
                    <FontAwesome name="plus" size={15} color={Color.green} />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: fontSize.regular,

                      fontWeight: "700",
                    }}
                  >
                    {Thu == 0 ? "Add" : Thu}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Thu == 0}
                    onPress={() => {
                      setThu((pre) => pre + 1);
                    }}
                  >
                    {Thu !== 0 && (
                      <FontAwesome name="plus" size={15} color={Color.green} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {/* <Text style={GloableStyle.boldText}> Total price : {item.sale_cost * count}</Text> */}
              </View>
            </View>
            <View
              style={{
                ...GloableStyle.BackButtonView,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={GloableStyle.boldText}>Friday</Text>
                {/* <Text>Item price : {item.sale_cost}</Text> */}
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <TouchableOpacity
                  disabled={Fri !== 0}
                  onPress={() => {
                    setFri((pre) => pre + 1);
                  }}
                  style={{
                    ...GloableStyle.countbuttonView,
                    borderWidth: horizScale(1),
                    borderColor: Color.red,
                    borderRadius: horizScale(8),
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Fri == 0}
                    onPress={() => {
                      setFri((pre) => pre - 1);
                    }}
                  >
                    {Fri !== 0 && (
                      <FontAwesome5 name="minus" size={15} color="red" />
                    )}
                  </TouchableOpacity>
                  {Fri == 0 && (
                    <FontAwesome name="plus" size={15} color={Color.green} />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: fontSize.regular,

                      fontWeight: "700",
                    }}
                  >
                    {Fri == 0 ? "Add" : Fri}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Fri == 0}
                    onPress={() => {
                      setFri((pre) => pre + 1);
                    }}
                  >
                    {Fri !== 0 && (
                      <FontAwesome name="plus" size={15} color={Color.green} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {/* <Text style={GloableStyle.boldText}> Total price : {item.sale_cost * count}</Text> */}
              </View>
            </View>
            <View
              style={{
                ...GloableStyle.BackButtonView,
                justifyContent: "space-between",
              }}
            >
              <View style={{ flex: 0.6 }}>
                <Text style={GloableStyle.boldText}>Saturday</Text>
                {/* <Text>Item price : {item.sale_cost}</Text> */}
              </View>
              <View style={{ flex: 0.4, alignItems: "center" }}>
                <TouchableOpacity
                  disabled={Sat !== 0}
                  onPress={() => {
                    setSat((pre) => pre + 1);
                  }}
                  style={{
                    ...GloableStyle.countbuttonView,
                    borderWidth: horizScale(1),
                    borderColor: Color.red,
                    borderRadius: horizScale(8),
                  }}
                >
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Sat == 0}
                    onPress={() => {
                      setSat((pre) => pre - 1);
                    }}
                  >
                    {Sat !== 0 && (
                      <FontAwesome5 name="minus" size={15} color="red" />
                    )}
                  </TouchableOpacity>
                  {Sat == 0 && (
                    <FontAwesome name="plus" size={15} color={Color.green} />
                  )}
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: fontSize.regular,

                      fontWeight: "700",
                    }}
                  >
                    {Sat == 0 ? "Add" : Sat}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    disabled={Sat == 0}
                    onPress={() => {
                      setSat((pre) => pre + 1);
                    }}
                  >
                    {Sat !== 0 && (
                      <FontAwesome name="plus" size={15} color={Color.green} />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
                {/* <Text style={GloableStyle.boldText}> Total price : {item.sale_cost * count}</Text> */}
              </View>
            </View>
            <View style={styles.datemsg}>
              <View>
                <Text style={styles.date}>Price</Text>
                <Text style={styles.date}>{item.sale_cost}</Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Days</Text>
                <Text style={styles.date}>
                  {Sun + Mon + Tue + Wed + Thu + Fri + Sat}
                </Text>
              </View>
              <View>
                <Text style={styles.date}>*</Text>
                <Text style={styles.date}>*</Text>
              </View>
              <View>
                <Text style={styles.date}>Quantity</Text>
                <Text style={styles.date}>{count}</Text>
              </View>
              <View>
                <Text style={styles.date}>=</Text>
                <Text style={styles.date}>=</Text>
              </View>
              <View>
                <Text style={styles.date}>Amount</Text>
                <Text style={styles.date}>
                  {Sun +
                    Mon +
                    Tue +
                    Wed +
                    Thu +
                    Fri +
                    Sat * item.sale_cost * count}
                </Text>
              </View>
            </View>
          </View>
        )}
        {selectedPlan !== "" && (
          <View style={GloableStyle.rowcenter}>
            <TouchableOpacity style={GloableStyle.buttonSmall}>
              <Text style={GloableStyle.buttonText}>ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Address", {
                  item: item,
                  selectedPlan: selectedPlan,
                  orderdetail:
                    selectedPlan == "Daily"
                      ? {
                          quantity: count,
                          finalPrice:
                            days(startDate, endDate) * item.sale_cost * count,
                        }
                      : selectedPlan == "Alternate Days"
                      ? {
                          quantity: count,
                          finalPrice:
                            alternateDays.length * item.sale_cost * count,
                        }
                      : selectedPlan == "One Time"
                      ? {
                          quantity: count,
                          finalPrice: 1 * item.sale_cost * count,
                        }
                      : selectedPlan == "Custom"
                      ? {
                          quantity: count,
                          finalPrice:
                            Sun +
                            Mon +
                            Tue +
                            Wed +
                            Thu +
                            Fri +
                            Sat * item.sale_cost * count,
                        }
                      : null,
                });
              }}
              style={GloableStyle.buttonSmall}
            >
              <Text style={GloableStyle.buttonText}>BUY NOW</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      <Modal // Daily
        visible={calenderModal}
        transparent
        onRequestClose={() => {
          setCalenderModal(false);
        }}
      >
        <View
          style={{
            backgroundColor: "rgba(52,52,52,0.8)",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <StatusBar backgroundColor={"rgba(52,52,52,0.8)"} />
          <View
            style={{
              backgroundColor: Color.green2,
              width: horizScale(380),
              alignSelf: "center",
              paddingVertical: horizScale(20),
              borderRadius: horizScale(20),
            }}
          >
            {selectedPlan == "Daily" && (
              <CalendarPicker
                allowBackwardRangeSelect={true}
                allowRangeSelection={true}
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor={Color.greendark}
                selectedDayColor={Color.green1}
                selectedDayTextColor="#FFFFFF"
                onDateChange={onDateChange}
                previousTitle={"Back"}
                previousTitleStyle={{ left: 10 }}
                nextTitleStyle={{ right: 10 }}
              />
            )}
            {selectedPlan == "Alternate Days" && (
              <CalendarPicker
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor={Color.greendark}
                selectedDayColor={Color.green1}
                selectedDayTextColor="#FFFFFF"
                onDateChange={inserAlternateDays}
                previousTitle={"Back"}
                previousTitleStyle={{ left: 10 }}
                nextTitleStyle={{ right: 10 }}
                customDatesStyles={alternateDays}
              />
            )}
            {selectedPlan == "One Time" && (
              <CalendarPicker
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor={Color.greendark}
                selectedDayColor={Color.green1}
                selectedDayTextColor="#FFFFFF"
                onDateChange={oneTimeDate}
                previousTitle={"Back"}
                previousTitleStyle={{ left: 10 }}
                nextTitleStyle={{ right: 10 }}
                customDatesStyles={alternateDays}
              />
            )}
            {selectedPlan == "Custom" && (
              <CalendarPicker
                minDate={minDate}
                maxDate={maxDate}
                todayBackgroundColor={Color.greendark}
                selectedDayColor={Color.green1}
                selectedDayTextColor="#FFFFFF"
                onDateChange={oneTimeDate}
                previousTitle={"Back"}
                previousTitleStyle={{ left: 10 }}
                nextTitleStyle={{ right: 10 }}
                customDatesStyles={alternateDays}
              />
            )}
          </View>
          <TouchableOpacity
            style={GloableStyle.buttonSmall}
            onPress={() => {
              setCalenderModal(false);
            }}
          >
            <Text style={GloableStyle.buttonTextSmall}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  datecontainer: {
    backgroundColor: Color.green2,
    borderRadius: horizScale(10),
    marginHorizontal: horizScale(10),
    elevation: 9,
    marginVertical: horizScale(20),
  },
  date: {
    color: Color.black,
    fontSize: fontSize.regular,
    fontWeight: "700",
    textAlign: "center",
  },
  datemsg: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-evenly",
    padding: horizScale(10),
    width: "100%",
  },
  calenderbutton: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: horizScale(15),
  },
  multiChoiceBox: {
    flexDirection: "row",
    borderWidth: horizScale(1),
    //  width: horizScale(93),
    paddingHorizontal: horizScale(20),
    height: vertScale(28),
    borderRadius: horizScale(25),
    borderColor: Color.green,
    // backgroundColor: condition ? Color : Color,
    alignItems: "center",
    justifyContent: "center",
    margin: horizScale(5),
  },
  multiChoiceBoxText: {
    fontSize: fontSize.das,
    // color: condition:Colors:Colors,
    paddingHorizontal: horizScale(5),
  },
});

/**
 * 1. payment type
 * 2. total amount
 * 3. tax
 * 4. discount
 * 5. delivery amount
 *
 * 6. baaki product ki sab details
 *
 *
 */

/**
1. getRecommendedProduct 
type - get

2. trending products banner
type - get

3. latest products
type  - get

4. refer and earn
type - post
params -user id

5. safety measures
type - get

*/
