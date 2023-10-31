import {
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
import { GloableStyle } from "../../GloableStyle";
import { Color } from "../../../constants/Colors";
import { horizScale, vertScale } from "../../../constants/Layout";
import { fontSize } from "../../../constants/Fontsize";
import {
  Ionicons,
  Feather,
  AntDesign,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_END_POINT } from "../../../utils/ApiEndPoint";

const Wallet = ({ navigation }) => {
  const [rupey, setRupey] = useState();
  const [walletData, setWalletData] = useState(0.00);
  const [modalOpen, setModalopen] = useState(false);
  const [isFailed, setIsfailed] = useState(false);
  const [selectedPaymentMethod, setselectedPaymentMethod] = useState("UPI");
  const closeModal = () => {
    setModalopen(!modalOpen);
  };

  const getWalletData = async () => {
    const userId = await AsyncStorage.getItem("userId");

    let formdata = new FormData();
    formdata.append("user_id", userId);

    let requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

  //   fetch(API_END_POINT.wallet, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => setWalletData(result))
  //     .catch((error) => console.log("error", error));
  // };
  fetch(API_END_POINT.wallet, requestOptions)
    .then((response) => response.json())
    .then((result) => {
     // Assuming 'result' contains the user's wallet data
      // and 'productPrice' contains the price of the product
      const userWalletBalance = result.balance;
      const productPrice = productPrice // Replace with the actual product price

      if (userWalletBalance >= productPrice) {
        // Deduct the product price from the user's wallet
        const newBalance = userWalletBalance - productPrice;

        // Update the user's wallet balance locally
        setWalletData({ ...result, balance: newBalance });

        // You should also make an API call to update the backend with the new balance
        updateWalletBalance(userId, newBalance);
      } else {
        console.log('Insufficient balance.');
      }
    })
    .catch((error) => console.log("error", error));
};

// Function to update the wallet balance on the backend
const updateWalletBalance = async (userId, newBalance) => {
  let formdata = new FormData();
  formdata.append("user_id", userId);
  formdata.append("new_balance", newBalance);

  let requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch(API_END_POINT.updateWallet, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log('Wallet balance updated on the backend:', result);
    })
    .catch((error) => console.log("error", error));


  };

  useEffect(() => {
    getWalletData();
  }, []);

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

        {/* <TouchableOpacity activeOpacity={1}
                    onPress={() => { setselectedPaymentMethod("COD") }}
                    style={{
                        flexDirection: 'row',
                        width: '90%',
                        backgroundColor: Color.green3,
                        alignSelf: 'center',
                        padding: horizScale(10),
                        borderRadius: horizScale(10),
                        elevation: 8,
                        marginTop: horizScale(20)
                    }}>

                    <Image style={style.smallImage} source={require('../../../../assets/images/caseDelivery.png')} />
                    <Text style={[style.detailsText, { flex: 1 }]}>Case on Delivery</Text>
                    <Image style={{ ...style.tickIcon, tintColor: selectedPaymentMethod == "COD" ? Color.green1 : Color.gray }} source={require('../../../../assets/images/tick-icn.png')} />
                    {/* {selectedPaymentMethod == "COD" && <Image style={style.tickIcon} source={require('../../../../assets/images/tick-icnred.png')} />} 

                </TouchableOpacity> */}
      </>
    );
  };

  const renderSendBtn = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          closeModal();
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
  // successOrder
  // failedOrder
  const renderModalVIew = () => {
    const iconname = isFailed
      ? require("../../../../assets/images/failedOrder.png")
      : require("../../../../assets/images/successOrder.png");
    const icontext = isFailed
      ? "Sorry, Your Order has failed"
      : "Wallet Recharge Successfully...";
    const nxtText = isFailed
      ? "Sorry, somethings went wrong. Please try again to continue your order."
      : `We will update you Soon.`;
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
            {/* {!isFailed &&
                            <Text style={style.orderbelowText}>Order something else!</Text>} */}
          </View>
          {/* </ScrollView> */}
        </View>
      </Modal>
    );
  };
  return (
    <SafeAreaView style={GloableStyle.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={GloableStyle.BackButtonView}
      >
        <Ionicons name="arrow-back" size={22} color="black" />
        <Text style={GloableStyle.backText}>Back</Text>
      </TouchableOpacity>
      <View
        style={{
          ...GloableStyle.rowtwoitem,
          justifyContent: "space-between",
          marginVertical: horizScale(20),
        }}
      >
        <Text style={GloableStyle.headingText}>Current Wallet Balance</Text>
        <Text
          style={{
            ...GloableStyle.headerText,
            color: Color.green1,
            marginRight: horizScale(20),
          }}
        >
          ₹ {walletData}
        </Text>
      </View>

      <Text style={GloableStyle.headingText}>Recharge Ammount</Text>
      <TextInput
        placeholder="Recharge Ammount*"
        onChangeText={(value) => {
          setRupey(value);
        }}
        keyboardType="number-pad"
        style={style.input}
      />

      {renderPaymentMethod()}
      {renderSendBtn()}
      {renderModalVIew()}
    </SafeAreaView>
  );
};

export default Wallet;

const { height, width } = Dimensions.get("window");
const style = StyleSheet.create({
  input: {
    width: "90%",
    // height: vertScale(40),
    color: Color.black,
    borderColor: Color.green,
    borderRadius: horizScale(15),
    borderWidth: horizScale(0.5),
    marginVertical: vertScale(15),
    fontSize: fontSize.medium,
    //  paddingLeft: horizScale(12),
    alignSelf: "center",
    backgroundColor: Color.white1,
    paddingHorizontal: horizScale(20),
    paddingVertical: horizScale(8),
    marginHorizontal: horizScale(20),
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
});
