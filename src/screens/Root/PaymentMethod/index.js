import React, { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  StatusBar,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Sl,
  Dimensions,
  ImageBackground,
  Modal,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Color } from "../../../constants/Colors";
import { GloableStyle } from "../../GloableStyle";
import { days, getLocalDate, horizScale } from "../../../constants/Layout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_END_POINT } from "../../../utils/ApiEndPoint";
import RazorpayCheckout from "react-native-razorpay";
import { WebView } from "react-native-webview";
import { CustomImage } from "../../../constants/Images";
import { fontSize } from "../../../constants/Fontsize";
import { AppColor } from "../../../utils/AppColor";
const PaymentMethod = ({ route, navigation }) => {
  const { orderdetail, selectedPlan, item, finaladdress } = route.params;
  const [modalOpen, setModalopen] = useState(false);
  const [isFailed, setIsfailed] = useState(false);
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState("");
  const [cartTotal, setCartTotal] = useState("");
  const [data, setData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pIdForDel, setPIdForDel] = useState(null);






























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
      <View style={style.mainCardView}>
      <View style={style.cartItemView}>
        <Image source={{ uri: item.image }} style={style.cartImage} />
        <View style={{ flex: 1 }}>
          <Text style={style.proName}>{item.pname}</Text>
          <Text style={style.price}>Price: ₹ {item.sale_cost}</Text>
          <Text style={style.qty}>Qty: {item.prod_quantity}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={style.cartBtn}
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
          <Text style={style.totalPrice}>
            {item.prod_quantity > 0
              ? `Total price : ${item.sale_cost * item.prod_quantity}`
              : null}
          </Text>
        </View>

        
      </View>



{/* Show */}


     {
      item.plan == "A"  ?  <View>
      <View style={style.datecontainer}>
            <View style={style.datemsg}>
              <View style={{ flex: 0.85 }}>
                <View style={GloableStyle.rowtwoitem}>
                  <Text style={{ width: horizScale(90) }}>Start From</Text>
                  {/* <Text style={styles.date}>{getLocalDate(startDate)}</Text> */}
                  <Text style={style.date}>{getLocalDate(item.date)}</Text>
                </View>
                {/* <View style={GloableStyle.rowtwoitem}>
                  <Text style={{ width: horizScale(90) }}>To</Text>
                  <Text style={styles.date}>{getLocalDate(item.date)}</Text>
                </View> */}
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
                  // setCalenderModal(true);
                }}
              >
                <MaterialCommunityIcons
                  name="calendar-edit"
                  size={24}
                  color={Color.green}
                />
              </TouchableOpacity>
            </View>

            <View style={style.datemsg}>
              <View>
                <Text style={style.date}>Price</Text>
                <Text style={style.date}>{item.sale_cost}</Text>
              </View>
              <View>
                <Text style={style.date}>*</Text>
                <Text style={style.date}>*</Text>
              </View>
              <View>
                <Text style={style.date}>Days</Text>
                <Text style={style.date}>{item.days}</Text>
              </View>
              <View>
                <Text style={style.date}>*</Text>
                <Text style={style.date}>*</Text>
              </View>
              <View>
                <Text style={style.date}>Quantity</Text>
                <Text style={style.date}>{item.prod_quantity}</Text>
              </View>
              <View>
                <Text style={style.date}>=</Text>
                <Text style={style.date}>=</Text>
              </View>
              <View>
                <Text style={style.date}>Amount</Text>
                <Text style={style.date}>
                    {item.sale_cost * item.prod_quantity * item.days }
                </Text>
              </View>
            </View>
          </View>
      </View>:null
     }





     </View>
    );
  };





















































  // Payment gateway functions start
  const step1 = () => {
    var options = {
      // order_id: "order_K9P8XNwtT3je4j",
      description: "Payment To Milk Man",
      image: "https://www.samajutkarsh.com/Milk_Man1/images/milkman.jpeg",
      currency: "INR",
      key: "rzp_live_5WkUCfPHQRw2BW",
      amount: 1 * 100,
      name: "Milk Man",
      prefill: {
        email: userInfo.email,
        contact: userInfo.mobile,
        name: userInfo.name,
      },
      theme: { color: Color.green1 },
    };
    step2(options);
  };
  const step2 = (info) => {
    RazorpayCheckout.open(info)
      .then((data) => {
        const orderid = data;
        const url = "https://api.razorpay.com/v1/payments/" + orderid;

        //
        var myHeaders = new Headers();
        myHeaders.append(
          "Authorization",
          "Basic cnpwX3Rlc3Rfbkp5WXkyQ1V6OUh5c1E6UGNTdW1rZjQ4eVBhOUlUZElPWnNreUln"
        );

        var requestOptions = {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        };
        fetch(url, requestOptions)
          .then((response) => response.json())
          .then((result) => {
            placeOrderUpi(orderid.razorpay_payment_id);
            console.log(
              `id-->>: ${JSON.stringify(orderid)} \nSuccess: ${JSON.stringify(
                result
              )}`
            );
            // alert(`id: ${orderid} \nSuccess: ${JSON.stringify(result)}`);
          })
          .catch((error) => console.log("error", error));
      })
      .catch((error) => {
        // handle failure
        // console.log(`Error: code ->
        //  ${JSON.stringify(error.code)} |||||||||||||
        //  desc->  ${JSON.stringify(error.description)}`);
        // alert(`Error: code ->
        //  ${JSON.stringify(error.code)} |||||||||||||
        //  desc->  ${JSON.stringify(error.description)}`);
        setModalopen(true);
      });
  };
  // Payment gateway functions end

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

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setCartTotal(result.cart_total);
        setData(result.data);
        console.log("Payment screen =======>",result.data)
      })
      .catch((error) => console.log("error", error));
  };

  const getUserDetails = async () => {
    const userid = await AsyncStorage.getItem("userId");
    const url = API_END_POINT.get_profile + userid;

    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => setUserInfo(result.data))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getUserDetails();
    cartDataFunc();
  }, []);

  const closeModal = () => {
    setModalopen(!modalOpen);
  };

  const placeOrderFunc = () => {
    // alert("Place order function");
    // console.log("uid", userInfo.id);
    // console.log("name", userInfo.uname);
    // console.log("email", userInfo.email);
    // console.log("mobile", userInfo.mobile);

    let formdata = new FormData();
    formdata.append("uid", userInfo.id);
    formdata.append("name", userInfo.uname);
    formdata.append("email", userInfo.email);
    formdata.append("mobile", userInfo.mobile);
    formdata.append("address", finaladdress);
    // formdata.append("payment_id", "123");

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(API_END_POINT.addOrder, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("order successful = >",result);
        if (result.response) {
          setModalopen(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const placeOrderUpi = (pid) => {
    // alert(pid);
    let formdata = new FormData();
    formdata.append("uid", userInfo.id);
    formdata.append("name", userInfo.uname);
    formdata.append("email", userInfo.email);
    formdata.append("mobile", userInfo.mobile);
    formdata.append("address", finaladdress);
    formdata.append("payment_id", pid);
    formdata.append("pmode", "online");

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(API_END_POINT.addOrder, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.response) {
          setModalopen(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const renderOrderView = () => {
    return (
      <View style={{ flex: 1 }}>


<View>
<FlatList
          data={data}
          renderItem={cartItems}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={() => {
            return <Text >No items in the cart.</Text>;
          }}
        />
</View>














        
        <View style={{ flex: 1, paddingVertical: 22 }}>
          {renderPaymentMethod()}
         
        </View>
        {/* <View style={[style.coponView, style.shadow, style.rowVIew]}>
                    <Text style={[style.priceText, { color: "#7C798F" }]}>Coupon Code Applied</Text>
                    <Text style={style.couponText}>{promoCode}</Text>
                </View> */}
        <View style={{ flex: 1, backgroundColor: "#FBFBFF", paddingTop: 30 }}>
          <Text style={[style.summaryText, { paddingHorizontal: 15 }]}>
            Order Summary
          </Text>
          <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
            <View style={[style.rowVIew, { justifyContent: "space-between" }]}>
              <Text style={[style.subtotalText, { color: "#7C798F" }]}>
                Subtotal
              </Text>
              <Text style={[style.subtotalText, { fontFamily: "RobotoB" }]}>
                ₹{cartTotal}
              </Text>
            </View>
            {/* <View style={[style.rowVIew, { justifyContent: 'space-between' }]}>
                            <Text style={[style.subtotalText, { color: "#BEBCCB" }]}>Addon price</Text>
                            <Text style={[style.subtotalText, { fontFamily: 'RobotoB' }]}>₹{totalAddonPrice}/-</Text>
                        </View> */}
            <View style={[style.rowVIew, { justifyContent: "space-between" }]}>
              <Text style={[style.subtotalText, { color: "#7C798F" }]}>
                Tax & Fees
              </Text>
              <Text style={[style.subtotalText, { fontFamily: "RobotoB" }]}>
                ₹0.00
              </Text>
            </View>
            <View style={[style.rowVIew, { justifyContent: "space-between" }]}>
              <Text style={[style.subtotalText, { color: "#7C798F" }]}>
                Delivery
              </Text>
              <Text style={[style.subtotalText, { fontFamily: "RobotoB" }]}>
                Free
              </Text>
            </View>
            <View style={[style.rowVIew, { justifyContent: "space-between" }]}>
              <Text style={[style.subtotalText, { color: "#7C798F" }]}>
                Discount
              </Text>
              <Text style={[style.subtotalText, { fontFamily: "RobotoB" }]}>
                - ₹00
              </Text>
            </View>
          </View>
          <View
            style={[
              style.coponView,
              style.shadow,
              style.rowVIew,
              { marginTop: 20 },
            ]}
          >
            <Text
              style={[
                style.subtotalText,
                { color: "#7C798F", paddingVertical: 0 },
              ]}
            >
              Total
            </Text>
            <Text
              style={[
                style.subtotalText,
                {
                  fontFamily: "RobotoB",
                  color: "#C8171D",
                  paddingVertical: 0,
                  fontSize: 18,
                },
              ]}
            >
              ₹{cartTotal}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const renderPaymentMethod = () => {
    return (
      <>
        <Text style={GloableStyle.headingText}>Payment Method</Text>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setselectedPaymentMethod("UPI");
          }}
          style={{
            flexDirection: "row",
            width: "90%",
            backgroundColor: Color.green3,
            alignSelf: "center",
            padding: horizScale(10),
            borderRadius: horizScale(10),
            elevation: 8,
            marginTop: horizScale(20),
          }}
        >
          <Image
            style={style.smallImage}
            source={require("../../../../assets/images/upi.png")}
          />
          <Text style={[style.detailsText, { flex: 1 }]}>Bhim UPI</Text>
          <Image
            style={{
              ...style.tickIcon,
              tintColor:
                selectedPaymentMethod == "UPI" ? Color.green1 : Color.gray,
            }}
            source={require("../../../../assets/images/tick-icn.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setselectedPaymentMethod("Wallet");
          }}
          style={{
            flexDirection: "row",
            width: "90%",
            backgroundColor: Color.green3,
            alignSelf: "center",
            padding: horizScale(10),
            borderRadius: horizScale(10),
            elevation: 8,
            marginTop: horizScale(20),
          }}
        >
          {/* <Image
            style={style.smallImage}
            source={require("../../../../assets/images/upi.png")}
          /> */}
                  <Ionicons name="wallet-outline" size={20} color={Color.red} />
          <Text style={[style.detailsText, { flex: 1, marginLeft:'6%' }]}>Wallet</Text>
          <Image
            style={{
              ...style.tickIcon,
              tintColor:
                selectedPaymentMethod == "Wallet" ? Color.green1 : Color.gray,
            }}
            source={require("../../../../assets/images/tick-icn.png")}
          />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            setselectedPaymentMethod("COD");
          }}
          style={{
            flexDirection: "row",
            width: "90%",
            backgroundColor: Color.green3,
            alignSelf: "center",
            padding: horizScale(10),
            borderRadius: horizScale(10),
            elevation: 8,
            marginTop: horizScale(20),
          }}
        >
          <Image
            style={style.smallImage}
            source={require("../../../../assets/images/caseDelivery.png")}
          />
          <Text style={[style.detailsText, { flex: 1 }]}>Cash on Delivery</Text>
          <Image
            style={{
              ...style.tickIcon,
              tintColor:
                selectedPaymentMethod == "COD" ? Color.green1 : Color.gray,
            }}
            source={require("../../../../assets/images/tick-icn.png")}
          />
          {/* {selectedPaymentMethod == "COD" && <Image style={style.tickIcon} source={require('../../../../assets/images/tick-icnred.png')} />} */}
        </TouchableOpacity>
      </>
    );
  };

  const renderSendBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          // closeModal();
          if (selectedPaymentMethod == "") {
            alert("Please select payment method");
          } else {
            if (selectedPaymentMethod == "UPI") {
              step1();
            } else {
              placeOrderFunc();
            }
          }
        }}
      >
        <LinearGradient
          colors={[Color.green1, Color.green]}
          style={style.sendBtn}
        >
          <Text style={style.sendText}>Send Order</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };
  const renderTrackButton = () => {
    const btnname = isFailed ? "Try Again" : "Done";
    return (
      <TouchableOpacity
        onPress={() => {
          closeModal();
          if (isFailed) {
          } else {
            navigation.reset({
              index: 0,
              routes: [{ name: "MyDrawer" }],
            });
          }
        }}
      >
        <LinearGradient
          colors={[Color.green1, Color.green]}
          style={style.trackBtn}
        >
          <Text style={style.sendText}>{btnname}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderModalVIew = () => {
    const iconname = isFailed
      ? require("../../../../assets/images/failedOrder.png")
      : require("../../../../assets/images/successOrder.png");
    const icontext = isFailed
      ? "Sorry, Your Order has failed"
      : "Thank you for your order";
    const nxtText = isFailed
      ? "Sorry, somethings went wrong. Please try again to continue your order."
      : `We will connect you Soon.`;
    const paddin = isFailed ? 50 : 100;
    return (
      <Modal
        visible={modalOpen}
        animationType="fade"
        transparent={true}
        statusBarTranslucent
        onRequestClose={() => closeModal()}
        style={{ flexGrow: 1 }}
      >
        <View
          style={{
            backgroundColor: "#00000090",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {
              closeModal();
              if (isFailed) {
              } else {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "MyDrawer" }],
                });
              }
            }}
            style={{ flex: 1 }}
          ></TouchableOpacity>
          {/* //<ScrollView style={style.modalVIew} contentContainerStyle={{ paddingVertical: 56 }}> */}
          <View style={style.modalVIew}>
            <View style={style.imagView}>
              <Image source={iconname} style={style.successImage} />
            </View>
            <Text style={style.thankText}>{icontext}</Text>
            <Text style={[style.tractText, { paddingHorizontal: paddin }]}>
              {nxtText}
            </Text>
            {renderTrackButton()}
            {!isFailed && (
              <Text style={style.orderbelowText}>Order something else!</Text>
            )}
          </View>
          {/* </ScrollView> */}
        </View>
      </Modal>
    );
  };

  return (
    <View style={style.mainContainer}>
      <StatusBar translucent={false} />
      <View style={[style.mainContainer, { marginTop: 40 }]}>
        <View style={style.headerView}>
          <AntDesign
            onPress={() => {
              navigation.goBack();
            }}
            name="arrowleft"
            color={"#11074C"}
            size={18}
          />
          <Text style={[style.headerText, { textAlign: "center" }]}>
            Checkout
          </Text>
          <View style={{ width: 18 }}></View>
        </View>
        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {renderOrderView()}
          {renderSendBtn()}
        </ScrollView>
        {renderModalVIew()}
      </View>















      <View>

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
          <View style={style.mainView}>
            <Image source={CustomImage.orderFaild} style={style.modalImg} />
            <Text style={style.modalText}>Remove Item From Cart ?</Text>
            <Text style={style.modalDes}>
              Are you really want to remove the item from the cart ?
            </Text>
            <View style={style.btnView}>
              <TouchableOpacity
                style={style.modalBtn}
                onPress={() => {
                  setIsModalVisible(false);
                  setPIdForDel(null);
                }}
              >
                <Image style={style.mdlBtnIcon} source={CustomImage.cancel} />
                <Text style={style.btnText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={style.modalBtn}
                onPress={() => {
                  removeFromCartFunc();
                }}
              >
                <Image style={style.mdlBtnIcon} source={CustomImage.right} />
                <Text style={style.btnText}>Sure</Text>
              </TouchableOpacity>
            </View>
          </View>
         
        </View>
      </Modal>







      </View>
    </View>
  );
};

export default PaymentMethod;

const { height, width } = Dimensions.get("window");

const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.white2,
  },
  headerView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 16,
    fontFamily: "RobotoM",
    color: "#11074C",
  },

  orderTopview: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 12,
    flexDirection: "row",
  },
  profiledataView: {
    paddingLeft: 5,
  },
  restronameText: {
    fontFamily: "RobotoM",
    fontSize: 16,
    color: "#C8171D",
  },
  briefCaseImage: {
    height: 16,
    width: 16,
    resizeMode: "contain",
  },
  rowVIew: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontFamily: "Roboto",
    fontSize: 10,
    color: "#C8171D",
    paddingBottom: 2,
  },
  bottomDash: {
    borderWidth: 0.5,
    borderColor: "#848484",
    borderStyle: "dashed",
    borderRadius: 1,
    paddingHorizontal: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  verifedImage: {
    height: 32,
    width: 32,
    resizeMode: "contain",
  },
  addressTypeText: {
    fontFamily: "RobotoM",
    fontSize: 18,
    color: "#11074C",
  },
  addressText: {
    fontFamily: "RobotoM",
    fontSize: 12,
    color: "#11074C",
    maxWidth: width * 0.6,
  },
  trackText: {
    fontFamily: "Roboto",
    fontSize: 10,
    color: "#848484",
    paddingTop: 5,
  },
  vegImage: {
    height: 17,
    width: 17,
  },
  foodNameText: {
    color: "#11074C",
    fontFamily: "RobotoM",
    fontSize: 17,
  },
  totalItemText: {
    fontSize: 12,
    fontFamily: "Roboto",
    color: "#848484",
    paddingHorizontal: 16,
  },
  addminusView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 5,
    borderColor: "#11074C",
    borderWidth: 1,
    marginVertical: 2,
  },
  countText: {
    paddingVertical: 3,
    paddingHorizontal: 10,
    backgroundColor: "#F4F2FF",
    fontFamily: "RobotoM",
    fontSize: 14,
    color: "#11074C",
  },
  shadow: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  priceText: {
    fontFamily: "RobotoM",
    fontSize: 12,
    color: "#C8171D",
  },
  addMoreText: {
    fontFamily: "Roboto",
    fontSize: 11,
    color: "#7C798F",
  },
  applyCodeText: {
    fontFamily: "Roboto",
    fontSize: 12,
    color: "#C8171D",
    paddingBottom: 2,
  },
  subtotalText: {
    paddingVertical: 5,
    fontFamily: "RobotoM",
    fontSize: 14,
    color: "#11074C",
  },
  coponView: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingTop: 18,
    paddingBottom: 20,
  },
  couponText: {
    fontFamily: "RobotoB",
    fontSize: 12,
    color: "#C8171D",
  },
  summaryText: {
    fontFamily: "RobotoM",
    fontSize: 20,
    color: "#11074C",
  },

  detailsText: {
    fontSize: 16,
    fontFamily: "RobotoM",
    color: "#11074C",
  },
  smallImage: {
    height: 20,
    width: 30,
    marginRight: 11,
    resizeMode: "contain",
  },
  tickIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
  addBtn: {
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#DEDDE5",
    paddingVertical: 5,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  addBtnText: {
    color: "#11074C",
    fontFamily: "RobotoM",
    fontSize: 11,
    marginRight: 5,
  },
  sendBtn: {
    marginHorizontal: 23,
    marginVertical: 40,
    borderRadius: 24,
    padding: 14,
    overflow: "hidden",
    alignItems: "center",
  },
  sendText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#FFF",
  },
  successImage: {
    height: "100%",
    resizeMode: "contain",
    width: "100%",
  },
  modalVIew: {
    maxHeight: height * 0.8,
    backgroundColor: "#FFF",
  },
  imagView: {
    height: height * 0.3,
    marginHorizontal: 50,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    paddingVertical: horizScale(10),
  },
  thankText: {
    fontSize: 24,
    fontFamily: "RobotoB",
    color: "#11074C",
    textAlign: "center",
    paddingHorizontal: 100,
    paddingTop: 30,
    lineHeight: 22,
  },
  tractText: {
    fontSize: 16,
    fontFamily: "Roboto",
    color: "#7C798F",
    textAlign: "center",
    paddingTop: 10,
    lineHeight: 22,
  },
  orderbelowText: {
    fontSize: 16,
    fontFamily: "RobotoM",
    color: "#11074C",
    textAlign: "center",
    lineHeight: 21,
    paddingBottom: 22,
  },
  trackBtn: {
    marginHorizontal: 23,
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 24,
    padding: 14,
    overflow: "hidden",
    alignItems: "center",
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
  cartImage: {
    height: horizScale(100),
    width: horizScale(100),
    margin: horizScale(10),
    borderRadius: horizScale(7),
  },
  proName: {
    color: Color.black,
    fontWeight: "bold",
  },
  price: {
    color: Color.green,
    fontWeight: "600",
  },
  qty: {
    color: Color.black,
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
  totalPrice: {
    color: Color.black,
    fontWeight: "600",
    marginTop: horizScale(10),
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
  modalImg: {
    height: horizScale(200),
    width: horizScale(200),
  },
  modalText: {
    fontSize: fontSize.h5,
    fontWeight: "600",
  },
  btnView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  modalBtn: {
    backgroundColor: Color.green,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: horizScale(30),
    paddingVertical: horizScale(15),
    borderRadius: horizScale(20),
  },
  mdlBtnIcon: {
    height: horizScale(20),
    width: horizScale(20),
    marginHorizontal: horizScale(5),
  },
  btnText: {
    color: Color.white1,
    fontSize: fontSize.medium,
    fontWeight: "600",
    marginHorizontal: horizScale(5),
  },
});