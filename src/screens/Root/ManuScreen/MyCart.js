import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  ToastAndroid,
  Modal,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { CustomImage } from "../../../constants/Images";
import { days, getLocalDate, horizScale } from "../../../constants/Layout";
import { Color } from "../../../constants/Colors";
import { fontSize } from "../../../constants/Fontsize";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { AppColor } from "../../../utils/AppColor";
import { API_END_POINT } from "../../../utils/ApiEndPoint";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../../../utils/Loader";
import { GloableStyle } from "../../GloableStyle";

const MyCart = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pIdForDel, setPIdForDel] = useState(null);
  const [cartTotal, setCartTotal] = useState("");
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState([]);

  // const updateQuantity = (id, value) => {
  //   let tempArr = [...data];
  //   tempArr.map((item, index) => {
  //     if (item.prod_id == id) {
  //       tempArr[index].prod_quantity = value;
  //     }
  //   });
  //   setData(tempArr);
  // };





















  const cartDataFunc = async () => {
    const userid = await AsyncStorage.getItem("userId");
    const url = API_END_POINT.cart;

    let formdata = new FormData();
    formdata.append("uid", userid);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };
    setLoader(true);
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("hagdsjgsdajdsjha ===== result ====",result)
        setCartTotal(result.cart_total);
        setData(result.data);


        setShow(result.data)
        console.log("setData ==================>",show[0].days)

        setLoader(false);
      })
      .catch((error) => {
        setLoader(false);
        console.log("error", error);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  useEffect(() => {
    cartDataFunc();
  }, []);

  const removeFromCartFunc = () => {
    // alert(pIdForDel);

    let formdata = new FormData();
    formdata.append("id", pIdForDel);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(API_END_POINT.deleteCart, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setIsModalVisible(false);
        cartDataFunc();
        if (result.response) {
          ToastAndroid.showWithGravity(
            "Item removed from cart",
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
          );
        }
      })
      .catch((error) => {
        setIsModalVisible(false);
        console.log("error", error);
      })
      .finally(() => {
        setIsModalVisible(false);
      });
  };

  const cartItems = ({ item }) => {
    return (
      <View style={styles.mainCardView}>
      <View style={styles.cartItemView}>
        <Image source={{ uri: item.image }} style={styles.cartImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.proName}>{item.pname}</Text>
          <Text style={styles.price}>Price: ₹ {item.sale_cost}</Text>
          <Text style={styles.qty}>Qty: {item.prod_quantity}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => {
              setIsModalVisible(true);
              setPIdForDel(item.cartid);
            }}
          >
            {
              //   <TouchableOpacity
              //   style={styles.button}
              //   // disabled={item.prod_quantity <= 1}
              //   onPress={() => {
              //     if (item.prod_quantity == 1) {
              //       // removeFromCartFunc(item.id);
              //       setIsModalVisible(true);
              //       setPIdForDel(item.cartid);
              //     } else {
              //       updateQuantity(
              //         item.prod_id,
              //         parseInt(item.prod_quantity) - 1
              //       );
              //     }
              //   }}
              // >
              //   {item.prod_quantity !== 0 && (
              //     <FontAwesome5 name="minus" size={15} color="red" />
              //   )}
              // </TouchableOpacity>
            }
            <Image
              source={CustomImage.cancel}
              style={{ height: horizScale(15), width: horizScale(15) }}
            />
            <Text
              style={{
                color: Color.black,
                textAlign: "center",
                fontSize: fontSize.medium,
                fontWeight: "700",
              }}
            >
              Remove
            </Text>
            {
              //   <TouchableOpacity
              //   style={styles.button}
              //   onPress={() => {
              //     updateQuantity(item.prod_id, parseInt(item.prod_quantity) + 1);
              //   }}
              // >
              //   {item.prod_quantity !== 0 && (
              //     <FontAwesome name="plus" size={15} color={Color.green} />
              //   )}
              // </TouchableOpacity>
            }
          </TouchableOpacity>
          <Text style={styles.totalPrice}>
            {item.prod_quantity > 0
              ? `Total price : ${item.sale_cost * item.prod_quantity}`
              : null}
          </Text>
        </View>

        
      </View>



{/* Show */}


      <View>



      {
        item.plan=="A"?   <View style={styles.datecontainer}>
        <View style={styles.datemsg}>
          <View style={{ flex: 0.85 }}>
            <View style={GloableStyle.rowtwoitem}>
              <Text style={{ width: horizScale(90) }}>Start From</Text>
              {/* <Text style={styles.date}>{getLocalDate(startDate)}</Text> */}
              <Text style={styles.date}>{getLocalDate(item.date)}</Text>
            </View>
            {/* <View style={GloableStyle.rowtwoitem}>
              <Text style={{ width: horizScale(90) }}>To</Text>
              <Text style={styles.date}>{getLocalDate(item.date)}</Text>
            </View> */}
          </View>
          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              backgroundColor: Color.white1,
              alignItems: "center",
              padding: horizScale(8),
              borderRadius: horizScale(50),
            }}
            activeOpacity={0.8}
            onPress={() => {
              // setCalenderModal(true);
            }}
          >
            <MaterialCommunityIcons
              name="calendar-edit"
              size={24}
              color={Color.green}
            />
          </TouchableOpacity> */}
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
            <Text style={styles.date}>{item.days}</Text>
          </View>
          <View>
            <Text style={styles.date}>*</Text>
            <Text style={styles.date}>*</Text>
          </View>
          <View>
            <Text style={styles.date}>Quantity</Text>
            <Text style={styles.date}>{item.prod_quantity}</Text>
          </View>
          <View>
            <Text style={styles.date}>=</Text>
            <Text style={styles.date}>=</Text>
          </View>
          <View>
            <Text style={styles.date}>Amount</Text>
            <Text style={styles.date}>
{item.total}
            </Text>
          </View>
        </View>
      </View>:null
      }

          
      </View>
     </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.white1 }}>
      <StatusBar backgroundColor={Color.greendark} barStyle={"light-content"} />
      <Loader loading={loader} />
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Image source={CustomImage.back} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.cartText}>My Cart</Text>
      </View>
      <ScrollView>
        <FlatList
          data={data}
          renderItem={cartItems}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => {
            return <Text style={styles.cartEmpty}>No items in the cart.</Text>;
          }}
        />
        {data.length !== 0 ? (
          <View style={styles.checkoutView}>
            <Text style={styles.totalText}>Total Amount</Text>
            <View style={styles.rowView}>
              <Text style={styles.priceText}>Total Price</Text>
              <Text style={{ ...styles.priceAmount, color: Color.black }}>
                ₹ {cartTotal}
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.priceText}>Discount</Text>
              <Text style={{ ...styles.priceAmount, color: Color.green }}>
                ₹ 00
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.priceText}>Delivery Charges</Text>
              <Text style={{ ...styles.priceAmount, color: Color.red }}>
                Free
              </Text>
            </View>
            <View style={styles.rowView}>
              <Text style={styles.priceText}>Payable Price</Text>
              <Text style={{ ...styles.priceAmount, color: Color.black }}>
                ₹ {cartTotal}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkBtn}
              onPress={() => {
                navigation.navigate("Address", {
                  item: {},
                  selectedPlan: "",
                  orderdetail: {},
                });
              }}
            >
              <Text style={styles.chelBtnText}>Checkout ₹ {cartTotal}</Text>
              <Image source={CustomImage.check} style={styles.checkIcon} />
            </TouchableOpacity>

          </View>
        ) : null}
      </ScrollView>
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(false);
        }}
        animationType="slide"
        statusBarTranslucent
        // style={{ flexGrow: 1 }}
      >
        <View style={{ flex: 1, backgroundColor: "rgba(52,52,52,0.5)" }}>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(false);
            }}
            style={{
              flex: 1,
            }}
          ></TouchableOpacity>
          <View style={styles.mainView}>
            <Image source={CustomImage.orderFaild} style={styles.modalImg} />
            <Text style={styles.modalText}>Remove Item From Cart ?</Text>
            <Text style={styles.modalDes}>
              Are you really want to remove the item from the cart ?
            </Text>
            <View style={styles.btnView}>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  setIsModalVisible(false);
                  setPIdForDel(null);
                }}
              >
                <Image style={styles.mdlBtnIcon} source={CustomImage.cancel} />
                <Text style={styles.btnText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => {
                  removeFromCartFunc();
                }}
              >
                <Image style={styles.mdlBtnIcon} source={CustomImage.right} />
                <Text style={styles.btnText}>Sure</Text>
              </TouchableOpacity>
            </View>
          </View>
         
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MyCart;

const styles = StyleSheet.create({
  btnText: {
    color: Color.white1,
    fontSize: fontSize.medium,
    fontWeight: "600",
    marginHorizontal: horizScale(5),
  },
  mdlBtnIcon: {
    height: horizScale(20),
    width: horizScale(20),
    marginHorizontal: horizScale(5),
  },
  modalBtn: {
    backgroundColor: Color.green,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizScale(30),
    paddingVertical: horizScale(15),
    borderRadius: horizScale(20),
  },
  btnView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalText: {
    fontSize: fontSize.h5,
    fontWeight: "600",
  },
  modalImg: {
    height: horizScale(200),
    width: horizScale(200),
  },
  mainView: {
    height: "50%",
    width: "100%",
    position: "absolute",
    backgroundColor: Color.white1,
    borderRadius: horizScale(10),
    padding: horizScale(20),
    alignItems: "center",
    justifyContent: "space-between",
    bottom: horizScale(0),
  },
  checkIcon: {
    height: horizScale(15),
    width: horizScale(15),
    marginHorizontal: horizScale(10),
    tintColor: Color.white1,
  },
  chelBtnText: {
    color: Color.white1,
    fontWeight: "bold",
    textAlign: "center",
  },
  checkBtn: {
    backgroundColor: Color.green,
    padding: horizScale(15),
    borderRadius: horizScale(10),
    marginVertical: horizScale(10),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  priceAmount: {
    fontWeight: "700",
    fontSize: fontSize.regular,
  },
  priceText: {
    color: Color.black,
    fontWeight: "600",
    fontSize: fontSize.regular,
  },
  rowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: horizScale(5),
  },
  totalText: {
    color: Color.black,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: fontSize.h4,
  },
  cartEmpty: {
    color: Color.black,
    textAlign: "center",
    fontSize: fontSize.h5,
    marginVertical: horizScale(20),
  },
  checkoutView: {
    backgroundColor: Color.white1,
    margin: horizScale(10),
    padding: horizScale(10),
    borderRadius: horizScale(10),
    elevation: 20,
  },
  totalPrice: {
    color: Color.black,
    fontWeight: "600",
    marginTop: horizScale(10),
  },
  qty: {
    color: Color.black,
  },
  price: {
    color: Color.green,
    fontWeight: "600",
  },
  proName: {
    color: Color.black,
    fontWeight: "bold",
  },
  cartBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: horizScale(8),
    backgroundColor: AppColor.green2,
    width: horizScale(90),
    height: horizScale(35),
  },
  cartImage: {
    height: horizScale(100),
    width: horizScale(100),
    margin: horizScale(10),
    borderRadius: horizScale(7),
  },
  cartItemView: {
    backgroundColor: Color.green3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: horizScale(10),
    marginVertical: horizScale(5),
    borderRadius: horizScale(10),
    elevation: 5,
  },
  cartText: {
    color: Color.white1,
    fontWeight: "bold",
    fontSize: fontSize.input,
  },
  backIcon: {
    height: horizScale(20),
    width: horizScale(20),
    marginHorizontal: horizScale(10),
    tintColor: Color.white1,
  },
  headerView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.greendark,
    paddingVertical: horizScale(20),
    paddingHorizontal: horizScale(20),
    borderBottomLeftRadius: horizScale(20),
    borderBottomRightRadius: horizScale(20),
    marginBottom: horizScale(5),
  },
  datemsg: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: horizScale(10),
    width: "100%",
  },
  date: {
    color: Color.black,
    fontSize: fontSize.regular,
    fontWeight: "700",
    textAlign: "center",
  },
  datecontainer: {
    backgroundColor: Color.green2,
    borderRadius: horizScale(10),

    marginHorizontal: horizScale(10),
    elevation: 9,
    // marginVertical: horizScale(20),
  },
  mainCardView:{
    marginBottom: 40
  }
});
