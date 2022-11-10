
import React, { useEffect, useState } from 'react'
import {
    FlatList, View, Text, StatusBar,
    TextInput, Image, TouchableOpacity, ScrollView, Sl, Dimensions, ImageBackground, Modal, StyleSheet
} from 'react-native'
import { Ionicons, Feather, AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Color } from '../../../constants/Colors'
import { GloableStyle } from '../../GloableStyle'
import { horizScale } from '../../../constants/Layout'





const PaymentMethod = ({ route, navigation }) => {
    const { orderdetail } = route.params;
    const [modalOpen, setModalopen] = useState(false)
    const [isFailed, setIsfailed] = useState(false)
    const [selectedPaymentMethod, setselectedPaymentMethod] = useState("")
    const [total, settotal] = useState()
    // const [orderFood, setorderFood] = useState([])
    const { orderFood,
        addonList,
        totalAddonPrice,
        subTotal,
        promoCode } = route.params
    useEffect(() => {


    }, [])
    //RENDER FUNCTIONS
    const closeModal = () => {
        setModalopen(!modalOpen)
    }

    const renderOrderView = () => {
        return (
            <View style={{ flex: 1, }}>

                <View style={{ flex: 1, paddingVertical: 22, }}>
                    {renderPaymentMethod()}
                </View>
                {/* <View style={[style.coponView, style.shadow, style.rowVIew]}>
                    <Text style={[style.priceText, { color: "#7C798F" }]}>Coupon Code Applied</Text>
                    <Text style={style.couponText}>{promoCode}</Text>
                </View> */}


                <View style={{ flex: 1, backgroundColor: '#FBFBFF', paddingTop: 30, }}>
                    <Text style={[style.summaryText, { paddingHorizontal: 15 }]}>Order Summary</Text>
                    <View style={{ marginTop: 20, paddingHorizontal: 15 }}>
                        <View style={[style.rowVIew, { justifyContent: 'space-between' }]}>
                            <Text style={[style.subtotalText, { color: "#7C798F" }]}>Subtotal</Text>
                            <Text style={[style.subtotalText, { fontFamily: 'RobotoB' }]}>₹{orderdetail?.finalPrice}</Text>
                        </View>
                        {/* <View style={[style.rowVIew, { justifyContent: 'space-between' }]}>
                            <Text style={[style.subtotalText, { color: "#BEBCCB" }]}>Addon price</Text>
                            <Text style={[style.subtotalText, { fontFamily: 'RobotoB' }]}>₹{totalAddonPrice}/-</Text>
                        </View> */}
                        <View style={[style.rowVIew, { justifyContent: 'space-between' }]}>
                            <Text style={[style.subtotalText, { color: "#7C798F" }]}>Tax & Fees</Text>
                            <Text style={[style.subtotalText, { fontFamily: 'RobotoB' }]}>₹5.00</Text>
                        </View>
                        <View style={[style.rowVIew, { justifyContent: 'space-between' }]}>
                            <Text style={[style.subtotalText, { color: "#7C798F" }]}>Delivery</Text>
                            <Text style={[style.subtotalText, { fontFamily: 'RobotoB' }]}>Free</Text>
                        </View>
                        <View style={[style.rowVIew, { justifyContent: 'space-between' }]}>
                            <Text style={[style.subtotalText, { color: "#7C798F" }]}>Discount</Text>
                            <Text style={[style.subtotalText, { fontFamily: 'RobotoB' }]}>- ₹00</Text>
                        </View>
                    </View>
                    <View style={[style.coponView, style.shadow, style.rowVIew, { marginTop: 20 }]}>
                        <Text style={[style.subtotalText, { color: "#7C798F", paddingVertical: 0 }]}>Total</Text>
                        <Text style={[style.subtotalText, {
                            fontFamily: 'RobotoB',
                            color: "#C8171D", paddingVertical: 0, fontSize: 18
                        }]}>₹{orderdetail?.finalPrice - 5}</Text>
                    </View>
                </View>

            </View>
        )
    }

    const renderPaymentMethod = () => {
        return (
            <>
                <Text style={GloableStyle.headingText}>Payment Method</Text>

                <TouchableOpacity activeOpacity={1} onPress={() => { setselectedPaymentMethod("UPI") }}
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

                    <Image style={style.smallImage} source={require('../../../../assets/images/upi.png')} />
                    <Text style={[style.detailsText, { flex: 1 }]}>Bhim UPI</Text>
                    <Image style={{ ...style.tickIcon, tintColor: selectedPaymentMethod == "UPI" ? Color.green1 : Color.gray }} source={require('../../../../assets/images/tick-icn.png')} />

                </TouchableOpacity>

                <TouchableOpacity activeOpacity={1}
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
                    {/* {selectedPaymentMethod == "COD" && <Image style={style.tickIcon} source={require('../../../../assets/images/tick-icnred.png')} />} */}

                </TouchableOpacity>

            </>

        )
    }

    const renderSendBtn = () => {
        return (
            <TouchableOpacity onPress={() => { closeModal() }}>
                <LinearGradient colors={[Color.green1, Color.green]} style={style.sendBtn}>
                    <Text style={style.sendText} >Send Order</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    const renderTrackButton = () => {
        const btnname = isFailed ? "Try Again" : "Done"
        return (
            <TouchableOpacity onPress={() => {
                closeModal()
                if (isFailed) {

                }
                else {
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'MyDrawer' }],
                    });
                }
            }}>
                <LinearGradient colors={[Color.green1, Color.green]} style={style.trackBtn}>
                    <Text style={style.sendText} >{btnname}</Text>
                </LinearGradient>
            </TouchableOpacity>
        )
    }
    // successOrder
    // failedOrder
    const renderModalVIew = () => {
        const iconname = isFailed ? require('../../../../assets/images/failedOrder.png') : require('../../../../assets/images/successOrder.png')
        const icontext = isFailed ? "Sorry, Your Order has failed" : "Thank you for your order"
        const nxtText = isFailed ? "Sorry, somethings went wrong. Please try again to continue your order." : `We will connect you Soon.`
        const paddin = isFailed ? 50 : 100
        return (
            <Modal
                visible={modalOpen}
                animationType="fade"
                transparent={true}
                statusBarTranslucent
                onRequestClose={() => closeModal()}
                style={{ flexGrow: 1 }}
            >
                <View style={{ backgroundColor: "#00000090", flexGrow: 1, justifyContent: 'flex-end' }} >
                    <TouchableOpacity activeOpacity={1} onPress={() => { closeModal() }} style={{ flex: 1 }}></TouchableOpacity>
                    {/* //<ScrollView style={style.modalVIew} contentContainerStyle={{ paddingVertical: 56 }}> */}
                    <View style={style.modalVIew}>
                        <View style={style.imagView}>
                            <Image source={iconname} style={style.successImage} />
                        </View>
                        <Text style={style.thankText}>{icontext}</Text>
                        <Text style={[style.tractText, { paddingHorizontal: paddin }]}>{nxtText}</Text>
                        {renderTrackButton()}
                        {!isFailed &&
                            <Text style={style.orderbelowText}>Order something else!</Text>}
                    </View>
                    {/* </ScrollView> */}
                </View>
            </Modal>
        )
    }

    return (
        <View style={style.mainContainer}>
            <StatusBar translucent={false} />
            <View style={[style.mainContainer, { marginTop: 40, }]}>
                <View style={style.headerView}>
                    <AntDesign onPress={() => { navigation.goBack() }} name='arrowleft' color={"#11074C"} size={18} />
                    <Text style={[style.headerText, { textAlign: 'center' }]}>Checkout</Text>
                    <View style={{ width: 18 }}></View>
                </View>
                <ScrollView overScrollMode='never' showsVerticalScrollIndicator={false} style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    {renderOrderView()}
                    {renderSendBtn()}
                </ScrollView>
                {renderModalVIew()}

            </View>

        </View>
    )
}
export default PaymentMethod

const { height, width } = Dimensions.get('window')
const style = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Color.white2
    },
    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20
    },
    headerText: {
        fontSize: 16,
        fontFamily: "RobotoM",
        color: "#11074C"
    },

    orderTopview: {
        paddingTop: 20,
        paddingBottom: 16,
        paddingHorizontal: 12,
        flexDirection: 'row'
    },
    profiledataView: {
        paddingLeft: 5
    },
    restronameText: {
        fontFamily: 'RobotoM',
        fontSize: 16,
        color: "#C8171D",
    },
    briefCaseImage: {
        height: 16,
        width: 16,
        resizeMode: 'contain'
    },
    rowVIew: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    changeText: {
        fontFamily: 'Roboto',
        fontSize: 10,
        color: "#C8171D",
        paddingBottom: 2
    },
    bottomDash: {
        borderWidth: 0.5,
        borderColor: "#848484",
        borderStyle: "dashed",
        borderRadius: 1,
        paddingHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    verifedImage: {
        height: 32,
        width: 32,
        resizeMode: 'contain'
    },
    addressTypeText: {
        fontFamily: 'RobotoM',
        fontSize: 18,
        color: "#11074C",
    },
    addressText: {
        fontFamily: 'RobotoM',
        fontSize: 12,
        color: "#11074C",
        maxWidth: width * 0.6
    },
    trackText: {
        fontFamily: 'Roboto',
        fontSize: 10,
        color: "#848484",
        paddingTop: 5
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
        fontFamily: 'Roboto',
        color: "#848484",
        paddingHorizontal: 16
    },
    addminusView: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderColor: "#11074C",
        borderWidth: 1,
        marginVertical: 2
    },
    countText: {
        paddingVertical: 3,
        paddingHorizontal: 10,
        backgroundColor: "#F4F2FF",
        fontFamily: "RobotoM",
        fontSize: 14,
        color: "#11074C"
    },
    shadow: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,
        elevation: 13,
    },
    priceText: {
        fontFamily: "RobotoM",
        fontSize: 12,
        color: "#C8171D"
    },
    addMoreText: {
        fontFamily: "Roboto",
        fontSize: 11,
        color: "#7C798F"
    },
    applyCodeText: {
        fontFamily: 'Roboto',
        fontSize: 12,
        color: "#C8171D",
        paddingBottom: 2
    },
    subtotalText: {
        paddingVertical: 5,
        fontFamily: "RobotoM",
        fontSize: 14,
        color: "#11074C"
    },
    coponView: {
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingTop: 18,
        paddingBottom: 20
    },
    couponText: {
        fontFamily: 'RobotoB',
        fontSize: 12,
        color: "#C8171D",
    },
    summaryText: {
        fontFamily: 'RobotoM',
        fontSize: 20,
        color: "#11074C",
    },

    detailsText: {
        fontSize: 16,
        fontFamily: 'RobotoM',
        color: "#11074C"
    },
    smallImage: {
        height: 20,
        width: 30,
        marginRight: 11,
        resizeMode: 'contain'
    },
    tickIcon: {
        height: 20,
        width: 20,
        resizeMode: 'contain',
        marginRight: 10
    },
    addBtn: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#DEDDE5",
        paddingVertical: 5,
        paddingHorizontal: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addBtnText: {
        color: "#11074C",
        fontFamily: "RobotoM",
        fontSize: 11,
        marginRight: 5
    },
    sendBtn: {
        marginHorizontal: 23,
        marginVertical: 40,
        borderRadius: 24,
        padding: 14,
        overflow: 'hidden',
        alignItems: 'center'
    },
    sendText: {
        fontSize: 16,
        fontFamily: "Roboto",
        color: '#FFF'
    },
    successImage: {
        height: "100%",
        resizeMode: 'contain',
        width: '100%'
    },
    modalVIew: {
        maxHeight: height * 0.80,
        backgroundColor: '#FFF',
    },
    imagView: {
        height: height * 0.3,
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        paddingVertical: horizScale(10)
    },
    thankText: {
        fontSize: 24,
        fontFamily: 'RobotoB',
        color: "#11074C",
        textAlign: 'center',
        paddingHorizontal: 100,
        paddingTop: 30,
        lineHeight: 22
    },
    tractText: {
        fontSize: 16,
        fontFamily: 'Roboto',
        color: "#7C798F",
        textAlign: 'center',
        paddingTop: 10,
        lineHeight: 22
    },
    orderbelowText: {
        fontSize: 16,
        fontFamily: 'RobotoM',
        color: "#11074C",
        textAlign: 'center',
        lineHeight: 21,
        paddingBottom: 22
    },
    trackBtn: {
        marginHorizontal: 23,
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 24,
        padding: 14,
        overflow: 'hidden',
        alignItems: 'center'
    },

})