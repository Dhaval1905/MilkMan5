// export const BASE_URL = "https://rajivalse.co.in/Milk_Man/api/";
export const BASE_URL = "https://www.samajutkarsh.com/Milk_Man1/api/";

export const API_END_POINT = {
  signup: `${BASE_URL}sign_up`,
  get_otp: `${BASE_URL}get_otp`,
  facebook_login: `${BASE_URL}flogin`,
  google_login: `${BASE_URL}glogin`,
  check_otp: `${BASE_URL}check_otp`,
  get_profile: `${BASE_URL}gprofile/`, // need to append user id in the main url at last == type = GET
  edit_profile: `${BASE_URL}editprofile/`, // need to append user id in the main url at last == type = POST

  // product related api
  get_products_main_category: `${BASE_URL}products`,
  get_products_category: `${BASE_URL}products_category/`,
  addcart: `${BASE_URL}user/addcart`,
  getorder: `${BASE_URL}user/getorder`,
  wallet: `${BASE_URL}user/wallet1`,
  cart: `${BASE_URL}user/cart`,
  deleteCart: `${BASE_URL}user/delete_cart`,
  getCityApi: `${BASE_URL}user/getcity`,
  getRegionApi: `${BASE_URL}user/getregion`,
  getAreaApi: `${BASE_URL}user/getarea`,
  addOrder: `${BASE_URL}addorder`,
};
