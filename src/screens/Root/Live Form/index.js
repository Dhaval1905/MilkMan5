import { FlatList, Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Color } from '../../../constants/Colors'
import { GloableStyle } from '../../GloableStyle'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { horizScale } from '../../../constants/Layout'
import { fontSize } from '../../../constants/Fontsize'
import { CustomImage } from '../../../constants/Images'

const LiveFarm = ({ navigation }) => {
    const [liveFarm, setLiveFarm] = useState([
        {
            id: 2,
            itemname: 'OM  fruit Center',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgMK7p_79B_M7wP1ZhBvddHVjQWj2mowrABw&usqp=CAU',
            status: 0,
            address: 'Bhawarkuaa Indore',
        },
        {
            id: 1,
            itemname: 'Pandey dudh dairy',
            image: 'https://lh3.googleusercontent.com/p/AF1QipOy69z40TVFF4flJxnWrDim-CE4jImnMfkhTKpq=w768-h768-n-o-k-v1',
            status: 1,
            address: 'Palda Naka Indore',
        },
        {
            id: 3,
            itemname: 'S G Coco point',
            image: 'https://2.bp.blogspot.com/-G-lTTd0pmy8/WMtFvM90i6I/AAAAAAAAwJA/KTl8jyVuLzsA2s6qtpwe5rU0VjvExRZdACLcB/s1600/coconut%2Bshop%2Bin%2Bmale.jpg',
            status: 1,
            address: 'Tower Square Indore',
        }])
    return (
        <SafeAreaView style={GloableStyle.container}>
            <StatusBar backgroundColor={Color.greendark} barStyle='light-content' />
            <View style={{ ...GloableStyle.headerView, backgroundColor: Color.greendark, justifyContent: 'space-between' }}>
                <TouchableOpacity
                    style={GloableStyle.BackButtonView}
                    onPress={() => {
                        navigation.goBack()
                    }}>
                    <Ionicons name="arrow-back" size={24} color={Color.white1} />

                    <Text style={GloableStyle.headerText}>Live Farms</Text>
                </TouchableOpacity>


            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={GloableStyle.headingText}>Active</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={liveFarm}
                    renderItem={({ item }) => {
                        if (item.status == 1) {
                            return (
                                <TouchableOpacity

                                    onPress={() => {
                                        navigation.navigate('LocalWendor', { shop: item })
                                    }}

                                    style={{
                                        ...GloableStyle.flexcontainer,
                                        borderWidth: horizScale(2),
                                        borderRadius: horizScale(12),
                                        borderColor: Color.green1,
                                        backgroundColor: Color.green3
                                    }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 0.3, }}>

                                        <Image source={{ uri: item.image }} style={{
                                            height: 90,
                                            width: 90,
                                            resizeMode: 'contain',
                                            borderRadius: horizScale(5)
                                        }} />
                                    </View>
                                    <View style={{ flex: 0.65 }}>

                                        <Text style={GloableStyle.simpleText}>{item.itemname}</Text>
                                        <Text style={{ ...styles.simpleText, color: Color.green1 }}>{item.address}</Text>

                                    </View>
                                    <TouchableOpacity style={{ ...GloableStyle.smallCircleBotton, padding: horizScale(5) }}
                                        disabled
                                        onPress={() => {
                                            // navigation.navigate('LiveFarm')
                                        }}>
                                        <Image source={CustomImage.active} style={styles.active} />
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            )
                        }

                    }}
                />
                <Text style={GloableStyle.headingText}>De Active</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={liveFarm}
                    renderItem={({ item }) => {
                        if (item.status == 0) {
                            return (
                                <TouchableOpacity

                                    disabled={true}
                                    style={{
                                        ...GloableStyle.flexcontainer,
                                        borderWidth: horizScale(2),
                                        borderRadius: horizScale(12),
                                        borderColor: Color.red,
                                        backgroundColor: Color.red1
                                    }}>
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 0.3, }}>

                                        <Image source={{ uri: item.image }} style={{
                                            height: 90,
                                            width: 90,
                                            resizeMode: 'contain',
                                            borderRadius: horizScale(5)
                                        }} />

                                    </View>
                                    <View style={{ flex: 0.65 }}>
                                        <Text style={GloableStyle.simpleText}>{item.itemname}</Text>
                                        <Text style={{ ...styles.simpleText, color: Color.red }}>{item.address}</Text>

                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default LiveFarm

const styles = StyleSheet.create({
    simpleText: {
        fontSize: fontSize.medium,
        fontWeight: '600',
        color: Color.black,
        paddingHorizontal: horizScale(20)
    },
    active: {
        height: horizScale(20),
        width: horizScale(20),
        resizeMode: 'contain',
        tintColor: Color.green1
    }
})