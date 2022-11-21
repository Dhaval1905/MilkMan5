import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Color } from "../../constants/Colors";
import { CustomImage } from "../../constants/Images";
import { GloableStyle } from "../GloableStyle";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { fontSize } from "../../constants/Fontsize";
import { horizScale } from "../../constants/Layout";
import CalendarStrip from "react-native-calendar-strip";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_END_POINT } from "../../utils/ApiEndPoint";
import ApiCall from "../../utils/ApiCall";
import { ShowMessage } from "../../utils/ShowMessage";

export default function Home({ navigation }) {
  const [wallet, setWallet] = useState(200.11);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [banner, setBanner] = useState([
    {
      id: 1,
      image:
        "https://thumbs.dreamstime.com/b/colorful-abstract-batik-banner-template-dummy-text-web-design-landing-page-print-material-195149182.jpg",
      navigate: "TabTwo",
    },

    {
      id: 3,
      image:
        "https://cdn.pixabay.com/photo/2015/08/31/08/30/header-915119_960_720.jpg",
      navigate: "TabTwo",
    },

    {
      id: 4,
      image:
        "https://cdn.pixabay.com/photo/2015/08/31/08/30/header-915119_960_720.jpg",
      navigate: "TabTwo",
    },
    {
      id: 5,
      image:
        "https://cdn.pixabay.com/photo/2015/08/31/08/30/header-915119_960_720.jpg",
      navigate: "TabTwo",
    },
  ]);

  // const [trending, setTrending] = useState([
  //   {
  //     id: 1,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTnA2hnTuaWVEx4iWVW2G-VWEAGQK8d5vrNUfPtSHj6wf4uYBEzF1qDLu2YE1TLIF59yg&usqp=CAU",
  //     navigate: "TabTwo",
  //   },

  //   {
  //     id: 3,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ-pHEUen7J4PFOeSLwIxwGdhA8pS-J6SSjg&usqp=CAU",
  //     navigate: "TabTwo",
  //   },
  //   {
  //     id: 4,
  //     image:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRreQoc5giwsy2Cczo_6ZXIQBRFDGQ7WNSzHg&usqp=CAU",
  //     navigate: "TabTwo",
  //   },
  // ]);

  const [latest, setLatest] = useState([
    {
      id: 1,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRX6saXhL4lIJgQGCzCVd1dqBNhSuv-UGhX2Q&usqp=CAU",
      navigate: "TabTwo",
    },

    {
      id: 3,
      image:
        "data:image/jpeg;base64,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",
      navigate: "TabTwo",
    },

    {
      id: 4,
      image:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxATEhURExIWFhUXGBYVFhcXGBIVGBUXFhUXGBcVFRUYHSggGBolGxUVIjEhJSktLi4uFx8zODUsNygtLisBCgoKDg0OGxAQGy0lICYtLTUtLS8tLTAtMC0vLjAvLy0vLi0wLy0tLS0uLy0tLy8tLy0tMC0tLy8vLy0vLS0tLf/AABEIAPAA0gMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQcDBAYCAf/EAEoQAAEDAgMEBAUPCwQDAAAAAAEAAhEDIQQSMQUGQVETImFxMoGRodIHFBYjQlJTcqKxwcLR0/AzQ1Ric4KDkpOjshUkNLMl4eL/xAAbAQEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADcRAAEDAgMECQMDBAMBAAAAAAEAAhEDIQQxUQUSQWETcYGRobHB0fAVIlIGMtIUYoLhQqLxI//aAAwDAQACEQMRAD8AvFERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERFwO194cWyrUa2pAa4gDIw2DiBwUW/e/HD85/bZ6KrjtOiCRDrdXutZqgK0kVS1t9sc387J/Z0/RWJ+/GOi1S/7Jlr9rVaYalVxDG1GsIDjYmO+xMARmY5SotTaNFhLTmPkdat9FTfs42n8L/ap/Yvns52p8If6VP7FO+mVfyHj7KP9Zofi7/r/ACVyoqa9nW0/hD/Rp+ins72l78/0Wein0yrqPH2T6zh9HeH8lcqKnWb+bR4vJ/hN9FbDN98cfzh/ps9FQsTQr0M6bnDVsHwkO7wt9PaWHfkY64HrHiraRVU3fDaB0f8A26forM3evaHvz/TZ6KqH7VosMODgdIHqVLbVDslZ6KtRvPjvhD/TZ6K9N3mx3wn9tnorD61h9Hdw/ks5VkIq8ZvLjONT5DPRXcbNql1Km4mS5jSTpJIk2UrC46niCQwG2sehKSttERTF6iIiIiIiIiIiIiIiIiIiIqt25TPT1bHw3cuZ/WUPVaeXzemp/blL26oQ6+d0ghnMxwUTXp9g8jeC4109K4DOT5lR6gCgMY45j3dn3iwT+LfeLYqMcTNvIF6w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",
      navigate: "TabTwo",
    },
    {
      id: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZ5JYb8qr3s2XBzjatx-N-xu-qHhLrDbNsug&usqp=CAU",
      navigate: "TabTwo",
    },
  ]);

  const [imageUrl, setImageUrl] = useState("");
  const [recommended, setRecommended] = useState([]);
  const [trending, setTrending] = useState([]);
  const [state, setState] = useState({});

  const getRecommendedProduct = () => {
    axios
      .post(
        "https://www.samajutkarsh.com/Milk_Man1/api/user/getRecommended",
        null,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response?.data?.response) {
          setRecommended(response?.data?.img);
        } else {
          setRecommended([]);
        }
      })
      .catch((err) => {
        console.log("");
      })
      .finally(() => {});
  };

  const getTrendingProduct = () => {
    axios
      .post(
        "https://www.samajutkarsh.com/Milk_Man1/api/user/getTrending",
        null,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response?.data?.response) {
          // console.log("trending img -> ", response?.data);
          setTrending(response?.data?.img);
        } else {
          setTrending([]);
        }
      })
      .catch((err) => {
        console.log("");
      })
      .finally(() => {});
  };

  const getReferEarn = () => {
    const body = {
      user_id: "256",
    };
    axios
      .post("https://www.samajutkarsh.com/Milk_Man1/api/user/referearn", body, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response?.data?.response) {
        } else {
        }
      })
      .catch((err) => {
        console.log("");
      })
      .finally(() => {});
  };

  const getUserProfile = (id) => {
    const url = API_END_POINT.get_profile;
    ApiCall("get", null, url + id)
      .then((result) => {
        // console.log("userData menu screen", JSON.stringify(result.data));
        if (result.data.response) {
          // ShowMessage("" + result.data.message);
          setState(result.data.data);
        } else {
          ShowMessage("" + result.data.message);
        }
        // console.log(result.data);
      })
      .catch((err) => {
        console.log("ERROR IN SIGN UP API MENU => ", err);

        Platform.OS === "android"
          ? ToastAndroid.showWithGravity(
              "Something went wrong",
              ToastAndroid.SHORT,
              ToastAndroid.BOTTOM
            )
          : null;
      })
      .finally(() => {});
  };

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
            getUserProfile(value);
            console.log(value, "This is useridddddddd");
          } else {
            // navigation.replace('login');
          }
        }
      });
    } catch (error) {
      console.log("Error in get user on splash -> ", error);
    }
  };

  useEffect(() => {
    getRecommendedProduct();
    getTrendingProduct();
    getReferEarn();
    getUserFromStorage();
  }, []);

  const renderCarouselItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {}}
        style={{
          borderRadius: 10,
          marginVertical: 10,
          backgroundColor: "#fff",
          elevation: 10,
        }}
      >
        <Image
          source={{ uri: item }}
          style={{
            width: "100%",
            height: 200,
            alignSelf: "center",
            borderRadius: 10,
            resizeMode: "stretch",
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={GloableStyle.container}>
      <View
        style={{ ...GloableStyle.headerView, backgroundColor: Color.green3 }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Image style={GloableStyle.profilesize} source={CustomImage.logo} />
        </TouchableOpacity>
        <TouchableOpacity
          style={GloableStyle.smallBotton}
          onPress={() => {
            navigation.navigate("LiveFarm");
          }}
        >
          <Image source={CustomImage.greenActive} style={styles.active} />
          <Text style={{ fontSize: fontSize.small, fontWeight: "500" }}>
            Live Farm
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...GloableStyle.smallBotton,
            borderColor: Color.red,
            paddingHorizontal: horizScale(10),
          }}
          onPress={() => {
            navigation.navigate("Wallet");
          }}
        >
          <Ionicons name="wallet-outline" size={20} color={Color.red} />
          <Text
            style={{
              color: Color.red,
              fontSize: fontSize.small,
              fontWeight: "500",
              marginLeft: horizScale(5),
            }}
          >
            {wallet}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={GloableStyle.smallCircleBotton}
          onPress={() => {
            navigation.navigate("Notification");
          }}
        >
          <FontAwesome name="bell" size={20} color={Color.green1} />
        </TouchableOpacity>
      </View>
      {/* calender */}
      <Text
        style={{
          color: Color.black,
          // fontWeight: "bold",
          marginBottom: horizScale(10),
          // marginTop: horizScale(10),
          marginTop: horizScale(10),
          fontSize: horizScale(20),
          alignSelf: "center",
        }}
      >
        Welcome {state.uname}
      </Text>

      <ScrollView>
        <View>
          <CalendarStrip
            scrollable
            style={{
              height: horizScale(140),
              paddingTop: 10,
              paddingBottom: 10,
              marginVertical: horizScale(20),
            }}
            // calendarColor={Color.green2}
            // calendarHeaderStyle={{ color: Color.green }}
            dateNumberStyle={{ color: Color.black }}
            dateNameStyle={{ color: Color.red }}
            iconContainer={{ flex: 0.1 }}
            selectedDate={selectedDate}
            onDateSelected={(value) => {
              console.log("onDateSelected ->>", value);
              setSelectedDate(value);
            }}
            scrollToOnSetSelectedDate={true}
            highlightDateNameStyle={{
              backgroundColor: Color.green1,
              color: Color.white1,
              width: horizScale(35),
              paddingTop: horizScale(5),
              borderTopLeftRadius: horizScale(5),
              borderTopRightRadius: horizScale(5),
            }}
            highlightDateNumberStyle={{
              color: Color.white1,
            }}
            highlightDateNumberContainerStyle={{
              backgroundColor: Color.green1,
              width: horizScale(35),
              paddingBottom: horizScale(5),
              borderBottomLeftRadius: horizScale(5),
              borderBottomRightRadius: horizScale(5),
            }}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            borderColor: Color.green1,
            padding: 10,
            margin: 10,
            marginTop: -20,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              color: Color.black,

              // marginStart: 15,
              textAlign: "center",
              fontSize: 16,
            }}
          >
            Look's like your bag is empty
          </Text>

          <Text
            onPress={() => {
              navigation.navigate("TabTwo");
            }}
            style={{
              color: Color.white1,
              backgroundColor: Color.green1,
              // marginStart: 15,
              fontWeight: "bold",
              alignSelf: "center",
              textAlign: "center",
              paddingVertical: 15,
              borderRadius: 15,
              paddingHorizontal: 15,
              fontSize: 16,
              marginTop: 20,
            }}
          >
            + Add Item
          </Text>
        </View>

        <Text
          style={{
            color: Color.black,
            fontWeight: "bold",
            marginTop: horizScale(10),
            marginStart: horizScale(10),
            fontSize: horizScale(20),
          }}
        >
          Recommended Products
        </Text>

        <FlatList
          data={recommended}
          numColumns={2}
          style={{
            // marginHorizontal: 10,
            alignSelf: "center",
          }}
          ItemSeparatorComponent={() => (
            <View style={{ height: horizScale(10) }} />
          )}
          ListFooterComponent={() => (
            <View style={{ height: horizScale(10) }} />
          )}
          renderItem={({ item, index }) => {
            return (
              <Image
                source={{
                  uri: item,
                }}
                style={{
                  height: horizScale(250),
                  width: "95%",
                  resizeMode: "cover",
                  // borderRadius: horizScale(5),
                }}
              />
              // <TouchableOpacity
              //   activeOpacity={0.8}
              //   onPress={() => {
              //     // navigation.navigate("SubProduct", {
              //     //   id: item.id,
              //     //   name: item.sname,
              //     // });
              //   }}
              //   style={styles.flexcontainer}
              // >
              //   <View
              //     style={{
              //       backgroundColor: "#f5f5f5",
              //       // backgroundColor: "#ffff",
              //       borderTopRightRadius: 8,
              //       borderTopLeftRadius: 8,
              //     }}
              //   >
              //* #00b86c

              //   </View>
              //   <Text
              //     style={{
              //       fontSize: horizScale(17),
              //       fontWeight: "bold",
              //       marginHorizontal: 10,
              //       marginTop: 5,
              //       color: Color.black,
              //     }}
              //   >
              //     Taaza Paneer
              //   </Text>
              //   <Text
              //     style={{
              //       fontSize: horizScale(16),
              //       marginHorizontal: 10,
              //       color: Color.gray,
              //     }}
              //   >
              //     180 gm
              //   </Text>

              //   <View
              //     style={{
              //       // paddingBottom: 15,
              //       marginTop: 15,
              //       flexDirection: "row",
              //       justifyContent: "space-between",
              //     }}
              //   >
              //     <View>
              //       <Text
              //         style={{
              //           fontSize: horizScale(13),
              //           marginHorizontal: 10,
              //           color: Color.black,
              //         }}
              //       >
              //         VIP Price
              //       </Text>
              //       <Text
              //         style={{
              //           fontSize: horizScale(17),
              //           fontWeight: "bold",
              //           marginHorizontal: 10,
              //           color: Color.green1,
              //         }}
              //       >
              //         ₹ 67.5
              //       </Text>
              //     </View>
              //     <View>
              //       <Text
              //         style={{
              //           fontSize: horizScale(13),
              //           marginHorizontal: 10,
              //           color: Color.black,
              //         }}
              //       >
              //         Regular Price
              //       </Text>
              //       <View
              //         style={{
              //           flexDirection: "row",
              //           marginStart: 5,
              //         }}
              //       >
              //         <Text
              //           style={{
              //             fontSize: horizScale(17),
              //             // fontWeight: "bold",
              //             marginHorizontal: 5,
              //             color: Color.black,
              //           }}
              //         >
              //           ₹ 89
              //         </Text>
              //         <Text
              //           style={{
              //             fontSize: horizScale(14),
              //             marginTop: 2,
              //             color: Color.gray,
              //             textDecorationLine: "line-through",
              //           }}
              //         >
              //           ₹ 97
              //         </Text>
              //       </View>
              //     </View>
              //   </View>

              //   <TouchableOpacity
              //     activeOpacity={0.8}
              //     style={{
              //       height: horizScale(40),
              //       width: horizScale(130),
              //       backgroundColor: Color.green1,
              //       justifyContent: "center",
              //       alignItems: "center",
              //       alignSelf: "center",
              //       marginVertical: horizScale(10),
              //       borderRadius: horizScale(40),
              //     }}
              //   >
              //     <Text
              //       style={{
              //         fontSize: horizScale(17),
              //         fontWeight: "bold",
              //         marginHorizontal: 5,
              //         color: Color.white1,
              //       }}
              //     >
              //       Add
              //     </Text>
              //   </TouchableOpacity>
              // </TouchableOpacity>
            );
          }}
        />
        <Text
          style={{
            color: Color.black,
            fontWeight: "bold",
            marginTop: horizScale(10),
            marginStart: horizScale(10),
            fontSize: horizScale(20),
          }}
        >
          Trending
        </Text>
        {trending && (
          <Carousel
            // ref={(c) => { this._carousel = c; }}
            data={trending}
            renderItem={renderCarouselItem}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width - 80}
            autoplay={true}
            autoplayDelay={1000}
            autoplayInterval={3000}
            loop={true}
            enableSnap={true}
          />
        )}

        <Text
          style={{
            color: Color.black,
            fontWeight: "bold",
            marginTop: horizScale(10),
            marginStart: horizScale(10),
            fontSize: horizScale(20),
          }}
        >
          Latest Products
        </Text>
        {latest && (
          <Carousel
            // ref={(c) => { this._carousel = c; }}
            data={trending}
            renderItem={renderCarouselItem}
            sliderWidth={Dimensions.get("screen").width}
            itemWidth={Dimensions.get("screen").width - 80}
            autoplay={true}
            autoplayDelay={1000}
            autoplayInterval={3000}
            loop={true}
            enableSnap={true}
          />
        )}

        {/* <Text
          style={{
            color: Color.black,
            fontWeight: "bold",
            marginTop: horizScale(10),
            marginStart: horizScale(10),
            fontSize: horizScale(20),
          }}
        >
          Refer your family &amp; friends
        </Text> */}

        {/* <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          style={{
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1313205042/photo/refer-a-friend-written-under-orange-torn-paper.webp?s=612x612&w=is&k=20&c=wtVp-xinahVmzFuXKM62nW8-Y2S7OP7hHbg_bxkjUpA=",
            }}
            style={{
              width: "95%",
              height: 200,
              alignSelf: "center",
              borderRadius: 10,
              resizeMode: "stretch",
            }}
          />
        </TouchableOpacity> */}

        <Text
          style={{
            color: Color.black,
            fontWeight: "bold",
            marginTop: horizScale(10),
            marginStart: horizScale(10),
            fontSize: horizScale(20),
          }}
        >
          Safety Measures
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {}}
          style={{
            borderRadius: 10,
            marginVertical: 10,
          }}
        >
          <Image
            source={{
              uri: "https://blog-images.pharmeasy.in/2020/05/12210931/blog-to-send-revised.jpg",
            }}
            style={{
              width: "95%",
              height: 200,
              alignSelf: "center",
              borderRadius: 10,
              resizeMode: "stretch",
            }}
          />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  active: {
    height: horizScale(20),
    width: horizScale(20),
  },
  flexcontainer: {
    width: "46%",
    // flex: 1,
    // paddingVertical: horizScale(5),
    backgroundColor: Color.white1,
    alignSelf: "center",
    // elevation: 10,
    borderRadius: 10,
    margin: horizScale(8),

    // borderColor: Color.gray,
    borderColor: "#f4f4f4",
    borderWidth: 1,
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

/**
1- admin panel main data wrong show ho rha h
2- search not working
3- Episode not play and crash ho rha h 
4- payment gerway 
5- share time poster and web series name
 */
