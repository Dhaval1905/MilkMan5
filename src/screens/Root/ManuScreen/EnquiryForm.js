import {
    SafeAreaView, StyleSheet, Text,
    TextInput,
    TouchableOpacity, View
} from 'react-native'
import React, { useState } from 'react'
import { GloableStyle } from '../../GloableStyle'
import { Ionicons } from '@expo/vector-icons'
import { Color } from '../../../constants/Colors'
import { horizScale } from '../../../constants/Layout'
import { fontSize } from '../../../constants/Fontsize'

const EnquiryForm = ({ navigation }) => {
    const [query, setquery] = useState('')
    return (
        <SafeAreaView style={GloableStyle.container}>

            <TouchableOpacity onPress={() => {
                navigation.goBack()
            }}
                style={GloableStyle.BackButtonView}>
                <Ionicons name="arrow-back" size={22} color="black" />
                <Text style={GloableStyle.backText}>Back</Text>
            </TouchableOpacity>

            <Text style={GloableStyle.headingText}>How Can We Help You</Text>
            <TextInput
                multiline
                placeholder='Insert You Query Here...'
                style={{ ...styles.inputbox, borderColor: query ? Color.blue : Color.darkgrey }}
                onChangeText={(value) => { setquery(value) }}
            />
            <TouchableOpacity
                onPress={() => {
                    alert('Coming Soon')
                }}
                style={GloableStyle.button}>
                <Text style={{
                    color: Color.white1,
                    fontSize: fontSize.h6,
                }}>Submit</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}

export default EnquiryForm

const styles = StyleSheet.create({
    inputbox: {
        borderBottomWidth: horizScale(1.5),
        marginTop: horizScale(20),
        marginHorizontal: horizScale(20),
        fontSize: fontSize.input,
        paddingVertical: horizScale(10)
    },
})