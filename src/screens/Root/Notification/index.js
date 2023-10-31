import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, SafeAreaView, View, TouchableOpacity, StyleSheet, FlatList, StatusBar } from "react-native";
import { Color } from "../../../constants/Colors";
import { fontSize } from "../../../constants/Fontsize";
import { horizScale, vertScale } from "../../../constants/Layout";
import { GloableStyle } from "../../GloableStyle";
export default function Notification(props) {
    const [message, setMessage] = useState([
        {
            tital: `Offer`,
            time: `12:36PM 12-04-2022`,
            msg: `Hello Rohit Carpenter,Today your Offer for shopping to save 30% by UPI payment.Hello Rohit Carpenter,Today your Offer for shopping to save 30% by UPI payment.Hello Rohit Carpenter, Today your Offer for shopping to save 30% by UPI payment.`
        },
        {
            tital: `Your Order`,
            time: `12:36PM 12-04-2022`,
            msg: 'Hello Rohit Carpenter,Today your Offer for shopping to save 30% by UPI payment.'
        },
        {
            tital: `Cashback`,
            time: `12:36PM 12-04-2022`,
            msg: 'Hello Rohit Carpenter 30 Rupay Cashback for you'
        },
        {
            tital: `Flat Discount`,
            time: `12:36PM 12-04-2022`,
            msg: `Hello Rohit Carpenter,Today your Offer for shopping to save 30% by UPI payment.Hello Rohit Carpenter,Today your Offer for shopping to save 30% by UPI payment.Hello Rohit Carpenter, Today your Offer for shopping to save 30% by UPI payment.`
        },
        {
            tital: `Offer`,
            time: `12:36PM 12-04-2022`,
            msg: 'Hello Rohit Carpenter,Today your Offer for shopping to save 30% by UPI payment.'
        },
        {
            tital: `Discount`,
            time: `12:36PM 12-04-2022`,
            msg: 'Hello Rohit Carpenter,Today your Offer for shopping to save 30% by UPI payment.'
        },
        {
            tital: `Offer`,
            time: `12:36PM 12-04-2022`,
            msg: 'Hello Rohit Carpenter'
        },
    ])
    return (
        <SafeAreaView style={GloableStyle.container}>
            <StatusBar backgroundColor={Color.white2} barStyle={'dark-content'} />
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }}
                style={GloableStyle.BackButtonView}>
                <Ionicons name="arrow-back" size={22} color="black" />
                <Text style={GloableStyle.backText}>Back</Text>
            </TouchableOpacity>

            <FlatList
                style={{ marginBottom: vertScale(30) }}
                data={message}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.messageview}>
                            <View style={styles.header}>
                                <Text style={GloableStyle.headingText}>
                                    {item.tital}
                                </Text>
                                <Text style={styles.headerTime}>
                                    {item.time}
                                </Text>
                            </View>
                            <Text style={styles.textstyle}>{item.msg}</Text>
                        </View>
                    )
                }}
            />

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    headerTitle: {
        flex: 0.6,
        color: Color.black
    },
    headerTime: {
        flex: 0.3,
        textAlign: "right",
        fontSize: fontSize.tiny
    },
    header: {
        flexDirection: 'row',
        flex: 1,
        margin: horizScale(10),
        justifyContent: 'space-between'
    },
    messageview: {
        alignSelf: 'center',
        backgroundColor: Color.white1,
        borderRadius: horizScale(15),
        width: '90%',
        elevation: 10,
        marginVertical: vertScale(10)
    },
    textstyle: {
        paddingVertical: vertScale(10),
        paddingHorizontal: horizScale(10),

    }
})