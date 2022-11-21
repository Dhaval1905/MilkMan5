import React from "react";
import { Dimensions } from "react-native";

const REFERENCE_WIDTH = 414;
const REFERENCE_HEIGHT = 736;
const removeTag = /(<([^>]+)>)/gi; // to remove html tag from content
const removeNBSP = /\&nbsp;/g;
const { height, width } = Dimensions.get("window");
const horizScale = (val) => width * (val / REFERENCE_WIDTH);
const vertScale = (val) => height * (val / REFERENCE_HEIGHT);

const getLocalDate = (strDate) => {
  var date = new Date(strDate);

  var dd = date.getDate();
  var mm = date.getMonth() + 1;

  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = dd + "-" + mm + "-" + yyyy;
  return date.toString();
};

const getApiDate = (strDate) => {
  var date = new Date(strDate);

  var dd = date.getDate();
  var mm = date.getMonth() + 1;

  var yyyy = date.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  date = yyyy + "-" + mm + "-" + dd;
  return date.toString();
};

const days = (date1, date2) => {
  let date_1 = new Date(date1);
  let date_2 = new Date(date2);
  let difference = date_2.getTime() - date_1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return TotalDays + 1;
};
export {
  horizScale,
  vertScale,
  removeTag,
  removeNBSP,
  getLocalDate,
  days,
  getApiDate,
};
