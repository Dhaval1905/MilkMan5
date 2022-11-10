import {
    SafeAreaView, StyleSheet, Text,
    TouchableOpacity, View
} from 'react-native'
import React from 'react'
import { GloableStyle } from '../../GloableStyle'
import { Ionicons } from '@expo/vector-icons'

const AboutUs = ({ navigation }) => {
    return (
        <SafeAreaView style={GloableStyle.container}>

            <TouchableOpacity onPress={() => {
                navigation.goBack()
            }}
                style={GloableStyle.BackButtonView}>
                <Ionicons name="arrow-back" size={22} color="black" />
                <Text style={GloableStyle.backText}>Back</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AboutUs

const styles = StyleSheet.create({})