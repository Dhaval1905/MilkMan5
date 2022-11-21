import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Color } from "../../constants/Colors";
import { fontSize } from "../../constants/Fontsize";
import { horizScale } from "../../constants/Layout";
import ApiCall from "../../utils/ApiCall";
import { API_END_POINT } from "../../utils/ApiEndPoint";
import Loader from "../../utils/Loader";
import { GloableStyle } from "../GloableStyle";

export default function Product({ navigation }) {
  const [currentOption, setCurrentOption] = useState("Products");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setLoader(true);
    ApiCall("get", null, API_END_POINT.get_products_main_category)
      .then((response) => {
        // console.log(
        //   "get product list api red => ",
        //   JSON.stringify(response.data)
        // );
        setLoader(false);

        if (response.data?.response) {
          setImageUrl(response?.data?.img);
          setProductList(response?.data?.data);
        } else {
        }
      })
      .catch((error) => {
        console.log("get product list api error => ", error);
        setLoader(false);
      })
      .finally(() => {
        setLoader(false);
      });
  };

  const [imageUrl, setImageUrl] = useState("");

  const [productList, setProductList] = useState([
    // {
    //   id: 1,
    //   image:
    //     "https://post.healthline.com/wp-content/uploads/2019/11/milk-soy-hemp-almond-non-dairy-1200x628-facebook.jpg",
    //   items: "3 Item",
    //   sname: "milk",
    // },
    // {
    //   id: 2,
    //   image:
    //     "https://upload.wikimedia.org/wikipedia/commons/2/2f/Culinary_fruits_front_view.jpg",
    //   items: "8 Item",
    //   sname: "Fruits",
    // },
    // {
    //   id: 3,
    //   image:
    //     "https://media.istockphoto.com/photos/fresh-green-coconut-with-green-leaf-isolated-on-white-background-picture-id1025162260?k=20&m=1025162260&s=612x612&w=0&h=IqgFaJUrekmvt0SCGS9qJXKB7QRr64MaC0UBO57A3J8=",
    //   items: "4 Item",
    //   sname: "Country Specials",
    // },
    // {
    //   id: 4,
    //   image:
    //     "https://news.sanfordhealth.org/wp-content/uploads/2020/06/Dairy-products.jpg",
    //   items: "6 Item",
    //   sname: "Milk Products",
    // },
  ]);

  const [order, setOrder] = useState([
    {
      id: 3,
      orderId: 100035,
      itemname: "Saboroo Milk",
      price: "35",
      image: "https://whitespreadfoods.com/images/varient1-L.png",
      quantity: "1",
      quantityType: "litre",
      status: "active",
      orderDate: "12-07-2022",
      categoryId: 1,
      date: [
        {
          date: "12-07-2022",
          status: 0,
          todayAmount: 52,
          walletBalance: 250,
          botlestatus: "Return on next delivery",
        },
        {
          date: "15-07-2022",
          status: 0,
          todayAmount: 50,
          walletBalance: 198,
          botlestatus: "Return",
        },
        {
          date: "20-07-2022",
          status: 1,
          todayAmount: 54,
          walletBalance: 198,
          botlestatus: "Break 1",
        },
        {
          date: "27-07-2022",
          status: 1,
          todayAmount: 50,
          walletBalance: 198,
          botlestatus: "return on next delivery",
        },
        {
          date: "04-08-2022",
          status: 1,
          todayAmount: 50,
          walletBalance: 198,
          botlestatus: "return on next delivery",
        },
      ],
    },
  ]);

  return (
    <SafeAreaView style={GloableStyle.container}>
      <Loader loading={loader} />
      <View
        style={{ ...GloableStyle.headerView, backgroundColor: Color.green3 }}
      >
        <TouchableOpacity
          style={{ width: horizScale(130) }}
          onPress={() => {
            setCurrentOption("Products");
            getProducts();
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              color: currentOption == "Products" ? Color.green1 : Color.black,
            }}
          >
            Products
          </Text>
          {currentOption == "Products" && (
            <View style={GloableStyle.horzlinehalf} />
          )}
        </TouchableOpacity>
        {
          //  <TouchableOpacity
          //   style={{ width: horizScale(130) }}
          //   onPress={() => {
          //     setCurrentOption("MySub");
          //   }}
          // >
          //   <Text
          //     style={{
          //       textAlign: "center",
          //       fontWeight: "700",
          //       color: currentOption == "MySub" ? Color.green1 : Color.black,
          //     }}
          //   >
          //     My Subscription
          //   </Text>
          //   {currentOption == "MySub" && (
          //     <View style={GloableStyle.horzlinehalf} />
          //   )}
          // </TouchableOpacity>
        }
      </View>
      {currentOption == "Products" && (
        <FlatList
          data={productList}
          numColumns={2}
          style={{
            flexGrow: 1,
            flex: 1,
          }}
          contentContainerStyle={{ marginVertical: horizScale(20) }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SubProduct", {
                    id: item.id,
                    name: item.sname,
                  });
                }}
                style={styles.flexcontainer}
              >
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: horizScale(150),
                    width: "95%",
                    alignSelf: "center",
                    borderRadius: horizScale(5),
                    marginVertical: horizScale(3),
                  }}
                />
                <Text style={styles.nametext}>{item.sname}</Text>
                <Text style={styles.itemsstyle}>{item.items}</Text>
              </TouchableOpacity>
            );
          }}
        />
      )}
      {currentOption == "MySub" && (
        <View>
          <FlatList
            data={order}
            renderItem={({ item }) => {
              if (item.status == "active") {
                return (
                  <View style={styles.flexcontainer2}>
                    <View
                      style={{
                        ...GloableStyle.rowtwoitem,
                        justifyContent: "space-evenly",
                        paddingVertical: horizScale(10),
                      }}
                    >
                      <View>
                        <Text style={GloableStyle.headingText}>
                          Order No. {item.orderId}
                        </Text>
                        <Text
                          style={{
                            ...GloableStyle.headingText,
                            color: Color.green1,
                            fontSize: fontSize.regular,
                            textDecorationLine: "underline",
                          }}
                        >
                          {item.itemname}
                        </Text>
                        <Text style={GloableStyle.headingText}>
                          Price : {item.price}
                        </Text>
                      </View>
                      <Image
                        source={{ uri: item.image }}
                        style={GloableStyle.itemImage}
                      />
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View style={{ flex: 0.7 }}>
                        <Text style={GloableStyle.simpleText}>
                          {item.quantity} {item.quantityType}
                        </Text>
                        <Text style={GloableStyle.simpleText}>
                          {item.status == "active"
                            ? "Start from :"
                            : "Order on :"}{" "}
                          {item.orderDate}
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
                          navigation.navigate("ActivePlan", { item: item });
                        }}
                      >
                        <Text style={GloableStyle.buttonTextSmall}>
                          {item.status == "active" ? "See More" : "Re-order"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }
            }}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flexcontainer2: {
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
  flexcontainer: {
    // width: "48%",
    flex: 1,
    paddingVertical: horizScale(5),
    backgroundColor: Color.white1,
    alignSelf: "center",
    elevation: 10,
    borderRadius: 10,
    margin: horizScale(10),
  },
  icon: {
    width: 25,
    height: 25,
    alignSelf: "center",
    resizeMode: "contain",
  },
  nametext: {
    textAlign: "center",
    marginTop: horizScale(5),
    fontWeight: "bold",
    color: Color.black,
    fontSize: fontSize.regular,
  },
  itemsstyle: {
    textAlign: "left",
    marginTop: horizScale(5),
    marginLeft: horizScale(10),
    fontWeight: "600",
    color: Color.black,
    fontSize: fontSize.small,
  },
});
