
import React from 'react'
import { GloableStyle } from '../../GloableStyle'
import { Ionicons } from '@expo/vector-icons'

import {
    StyleSheet, View, SafeAreaView, Image,
    TouchableOpacity, ScrollView, Alert, Linking, Text, Share
} from 'react-native'
import { CustomImage } from '../../../constants/Images'
import { fontSize } from '../../../constants/Fontsize'
import { Color } from '../../../constants/Colors'
import { horizScale, vertScale } from '../../../constants/Layout'


const ReferEarn = (props) => {
    const onShare = async (message) => {
        try {
            const result = await Share.share({
                message: message,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };
    return (
        <SafeAreaView style={GloableStyle.container}>
            <TouchableOpacity onPress={() => {
                props.navigation.goBack()
            }}
                style={GloableStyle.BackButtonView}>
                <Ionicons name="arrow-back" size={22} color="black" />
                <Text style={GloableStyle.backText}>Back</Text>
            </TouchableOpacity>
            <ScrollView nestedScrollEnabled={true}>

                <Image
                    source={CustomImage.logo}
                    resizeMode="contain"
                    style={styles.medicalimg}
                />

                <Text style={{ ...GloableStyle.headingText, marginVertical: horizScale(20) }}>Refer & Earn on our Milk Man App</Text>


                <Text style={{ marginLeft: horizScale(20), fontSize: fontSize.regular, }}>If you refer to to your friend and he register in the app and add money to wallet then you can earn up to ₹ 200/- , so quickly refer to your friends </Text>
                <View style={{ ...GloableStyle.horzlinehalf, marginLeft: horizScale(20) }} />

                <TouchableOpacity style={styles.button}
                    onPress={() => {
                        // Linking.openURL(`https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US`)
                        onShare(`Hii Friend,
                        Download Milk Man App from below link
                        https://drive.google.com/file/d/1zepKKS52bGbIUMOFlvAwkrT7lHkQLcL1/view?usp=sharing`)
                    }}>
                    <Text style={styles.text}>Share Now</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    )
}

export default ReferEarn;

const styles = StyleSheet.create({
    heading: {
        color: Color.black,
        fontSize: fontSize.h5,
        marginLeft: horizScale(20),

    },
    medicalimg: {
        height: vertScale(250),
        width: horizScale(380),
        alignSelf: 'center'
    },
    text: {
        color: Color.white1,
        fontSize: fontSize.medium
    },
    button: {
        height: vertScale(50),
        width: '85%',
        alignSelf: 'center',
        backgroundColor: Color.green,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: horizScale(30)
    }
})