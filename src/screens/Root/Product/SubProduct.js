import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GloableStyle } from "../../GloableStyle";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import { horizScale } from "../../../constants/Layout";
import { Color } from "../../../constants/Colors";
import { fontSize } from "../../../constants/Fontsize";
import { API_END_POINT } from "../../../utils/ApiEndPoint";
import ApiCall from "../../../utils/ApiCall";
const SubProduct = ({ navigation, route }) => {
  const { id, name } = route.params;

  useEffect(() => {
    getCategoryProducts();
  }, []);

  const getCategoryProducts = () => {
    // console.log("ApI uRL => ", `${API_END_POINT.get_products_category}/${id}`);

    ApiCall("get", null, API_END_POINT.get_products_category + id + "")
      // ApiCall(
      //   "get",
      //   null,
      //   `https://rajivalse.co.in/Milk_Man/api/products_category/8`
      // )
      .then((response) => {
        if (response.data?.response) {
          //   console.log(
          //     "ApI uRL => ",
          //     API_END_POINT.get_products_category +
          //       id +
          //       "" +
          //       " data  => " +
          //       JSON.stringify(response.data)
          //   );
          setSubItem(response?.data?.data);
        } else {
        }
      })
      .catch((error) => {
        console.log("get product list api error => ", error);
      });
  };

  const [imageUrl, setImageUrl] = useState(
    "https://www.samajutkarsh.com/Milk_Man1/images/product/"
  );
  const [subItem, setSubItem] = useState([
    // {
    //   id: 1,
    //   categoryId: 1,
    //   plan: true,
    //   name: "Sachi Milk",
    //   mrp: 55,
    //   quantityType: "per litre",
    //   uri: "https://www.thehitavada.com/Encyc/2020/6/11/2_09_42_05_Sanchi-Dugdh-_1_H@@IGHT_396_W@@IDTH_455.jpg",
    // },
    // {
    //   id: 2,
    //   categoryId: 1,
    //   plan: true,
    //   name: "Saboro Milk",
    //   mrp: 60,
    //   quantityType: "per litre",
    //   uri: "https://whitespreadfoods.com/images/varient1-L.png",
    // },
    // {
    //   id: 3,
    //   categoryId: 1,
    //   plan: true,
    //   name: "Normal Milk",
    //   mrp: 50,
    //   quantityType: "per litre",
    //   uri: "http://bsmedia.business-standard.com/_media/bs/img/article/2015-11/17/full/1447707418-0389.jpg",
    // },
    // {
    //   id: 4,
    //   categoryId: 2,
    //   name: "Banana",
    //   mrp: 40,
    //   quantityType: "per Dozen",
    //   uri: "https://149366112.v2.pressablecdn.com/wp-content/uploads/2019/09/shutterstock_518328943-scaled.jpg",
    // },
    // {
    //   id: 5,
    //   categoryId: 2,
    //   name: "Apple",
    //   mrp: 80,
    //   quantityType: "per KG",
    //   uri: "https://5.imimg.com/data5/AK/RA/MY-68428614/apple-500x500.jpg",
    // },
    // {
    //   id: 6,
    //   categoryId: 2,
    //   name: "Mango",
    //   mrp: 60,
    //   quantityType: "per Kg",
    //   uri: "https://5.imimg.com/data5/ANDROID/Default/2022/2/TJ/HS/EL/148381412/fb-img-1635769273496-jpg-500x500.jpg",
    // },
    // {
    //   id: 7,
    //   categoryId: 4,
    //   name: "Ghee",
    //   mrp: 580,
    //   quantityType: "per litre",
    //   uri: "https://5.imimg.com/data5/HI/PR/MY-9948889/dairy-farm-ghee-500x500.jpg",
    // },
    // {
    //   id: 8,
    //   categoryId: 4,
    //   name: "Chhachh",
    //   plan: true,
    //   mrp: 30,
    //   quantityType: "per litre",
    //   uri: "https://akm-img-a-in.tosshub.com/aajtak/images/story/201603/buttermilk_145690782552_650_030216020840.jpg?size=1200:675",
    // },
    // {
    //   id: 9,
    //   categoryId: 4,
    //   name: "Dahi",
    //   mrp: 340,
    //   quantityType: "per KG",
    //   uri: "https://images.squarespace-cdn.com/content/v1/57b9b7d4ebbd1a60cf7a5e3b/1600883581694-7IRO8E7VWR2UTO33HWLP/iorganic-make-dahi-curd-at-home.jpg?format=1500w",
    // },
    // {
    //   id: 10,
    //   categoryId: 3,
    //   name: "Coconut",
    //   mrp: 40,
    //   quantityType: "per Piece",
    //   uri: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/09/02/Pictures/_18165104-ecee-11ea-8bd0-e81a49b765f6.jpg",
    // },
  ]);
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
      <Text style={GloableStyle.headingText}>
        {name ? name : "Select "} Item
      </Text>
      <FlatList
        data={subItem}
        numColumns={2}
        ListEmptyComponent={() => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginVertical: 100,
                }}
              >
                No Products Available
              </Text>
            </View>
          );
        }}
        contentContainerStyle={{ marginVertical: horizScale(20) }}
        renderItem={({ item }) => {
          //   if (id == item.categoryId) {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProductDetail", { item: item });
              }}
              style={styles.flexcontainer}
            >
              <Image
                source={{ uri: imageUrl + item.pimage }}
                style={{
                  height: horizScale(160),
                  width: "95%",
                  alignSelf: "center",
                  borderRadius: horizScale(5),
                  marginVertical: horizScale(3),
                }}
              />
              <Text style={styles.nametext}>{item.pname}</Text>
              <Text style={styles.itemsstyle}>
                {item.mrp} {item.quantityType}
              </Text>
            </TouchableOpacity>
          );
          //   }
        }}
      />
    </SafeAreaView>
  );
};

export default SubProduct;

const styles = StyleSheet.create({
  flexcontainer: {
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
