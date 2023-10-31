import { StyleSheet } from "react-native";
import { Color } from "../constants/Colors";

import { horizScale } from "../constants/Layout";
import { AppColor } from "../utils/AppColor";

const GloableStyle = StyleSheet.create({
  profileView: {
    alignItems: "center",
    justifyContent: "space-around",
    paddingVertical: horizScale(40),
  },
  headingView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: AppColor.grey,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: AppColor.green1,
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    alignSelf: "center",
    paddingVertical: horizScale(13),
    borderRadius: 30,
    elevation: horizScale(10),
  },

  smallIcon: {
    height: 20,
    width: 20,
    resizeMode: "contain",
  },
  profileImage: {
    width: horizScale(65),
    height: horizScale(65),
    borderRadius: horizScale(8),
  },
  buttonSmall: {
    paddingHorizontal: horizScale(30),
    paddingVertical: horizScale(10),
    borderRadius: horizScale(40),
    backgroundColor: AppColor.green1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginVertical: horizScale(20),
  },
  buttonTextSmall: {
    color: AppColor.white1,
    fontSize: 14,
    fontWeight: "600",
  },
  countbuttonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: horizScale(8),
    backgroundColor: AppColor.green2,
    width: horizScale(120),
    height: horizScale(50),
  },
  headingText: {
    marginLeft: horizScale(15),
    color: AppColor.black,
    fontSize: 16,
    fontWeight: "600",
  },
  boldText: {
    color: AppColor.black,
    fontSize: 16,
    fontWeight: "700",
  },
  backText: {
    marginLeft: horizScale(5),
    color: AppColor.black,
    fontSize: 18,
    fontWeight: "600",
  },
  BackButtonView: {
    flexDirection: "row",
    alignItems: "center",
    margin: horizScale(20),
  },
  contentCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    height: 300,
    width: 300,
    resizeMode: "contain",
  },
  itemImage: {
    height: 120,
    width: 120,
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    backgroundColor: AppColor.white1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: AppColor.white1,
  },
  simpleText: {
    fontSize: 14,
    fontWeight: "600",
    color: AppColor.black,
    paddingHorizontal: horizScale(20),
  },
  profilesize: {
    height: horizScale(40),
    width: horizScale(40),
    resizeMode: "contain",
  },
  headerView: {
    paddingVertical: horizScale(20),
    paddingHorizontal: horizScale(20),
    flexDirection: "row",
    borderBottomRightRadius: horizScale(20),
    borderBottomLeftRadius: horizScale(20),
    elevation: 9,
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    marginLeft: horizScale(15),
    color: AppColor.white,
    fontSize: 20,
    fontWeight: "600",
  },
  smallBotton: {
    borderWidth: horizScale(2),
    borderRadius: horizScale(10),
    height: horizScale(35),
    paddingRight: horizScale(10),
    borderColor: AppColor.green,
    flexDirection: "row",
    alignItems: "center",
  },
  smallCircleBotton: {
    backgroundColor: AppColor.white1,
    elevation: 9,
    padding: horizScale(10),
    borderRadius: horizScale(30),
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: horizScale(390),
    height: horizScale(170),
    resizeMode: "contain",
    borderRadius: horizScale(10),
  },
  horzlinehalf: {
    backgroundColor: AppColor.red,
    height: horizScale(4),
    borderRadius: horizScale(10),
    width: horizScale(130),
    marginTop: horizScale(5),
  },
  rowtwoitem: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowcenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  flexcontainer: {
    marginVertical: 10,
    width: "95%",

    backgroundColor: AppColor.white1,
    alignSelf: "center",
    elevation: 10,
    borderRadius: 10,
    shadowColor: AppColor.green,
    shadowOpacity: 0.5,
    paddingVertical: horizScale(10),
    shadowOffset: {
      height: 2,
      width: 0,
    },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerView3: {
    paddingVertical: horizScale(5),
    paddingHorizontal: horizScale(5),
    flexDirection: "row",
    borderBottomRightRadius: horizScale(20),
    borderBottomLeftRadius: horizScale(20),
    elevation: 9,
    alignItems: "center",
    justifyContent: "space-around",
  },
  backText1: {
    marginLeft: horizScale(5),
    color: AppColor.white,
    fontSize: 18,
    fontWeight: "600",
  },
});
export { GloableStyle };