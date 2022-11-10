import {
    Image, SafeAreaView, StatusBar, StyleSheet, FlatList,
    Text, TouchableOpacity, View
} from 'react-native'
import React, { useState } from 'react'
import { GloableStyle } from '../../GloableStyle'
import { Ionicons } from '@expo/vector-icons';
import { horizScale } from '../../../constants/Layout';
import { Color } from '../../../constants/Colors';
import { fontSize } from '../../../constants/Fontsize';
import { ScrollView } from 'react-native-gesture-handler';
const LocalWendor = ({ navigation, route }) => {
    const { shop } = route.params
    const [subItem, setSubItem] = useState([
        {
            id: 1,
            categoryId: 1,
            plan: true,
            name: 'Cow Milk',
            mrp: 55,
            quantityType: 'per litre',
            uri: 'https://media.istockphoto.com/photos/raw-milk-being-poured-into-container-picture-id1297005860?k=20&m=1297005860&s=612x612&w=0&h=cY-FysF35lBL-8WLk7Ppz3n82jony8ucynpsWF46txg='
        },
        {
            id: 2,
            categoryId: 1,
            plan: true,
            name: 'Super Milk',
            mrp: 50,
            quantityType: 'per litre',
            uri: 'https://www.jammuvirasat.com/wp-content/uploads/2019/06/milk-dairy.jpg'
        },
        {
            id: 3,
            categoryId: 1,
            plan: true,
            name: 'Normal Milk',
            mrp: 45,
            quantityType: 'per litre',
            uri: 'http://bsmedia.business-standard.com/_media/bs/img/article/2015-11/17/full/1447707418-0389.jpg'
        },
        {
            id: 4,
            categoryId: 2,
            name: 'Banana',
            mrp: 40,
            quantityType: 'per Dozen',
            uri: 'https://149366112.v2.pressablecdn.com/wp-content/uploads/2019/09/shutterstock_518328943-scaled.jpg'
        },
        {
            id: 5,
            categoryId: 2,
            name: 'Apple',
            mrp: 80,
            quantityType: 'per KG',
            uri: 'https://5.imimg.com/data5/AK/RA/MY-68428614/apple-500x500.jpg'
        },
        {
            id: 6,
            categoryId: 2,
            name: 'Mango',
            mrp: 60,
            quantityType: 'per Kg',
            uri: 'https://5.imimg.com/data5/ANDROID/Default/2022/2/TJ/HS/EL/148381412/fb-img-1635769273496-jpg-500x500.jpg'
        },
        {
            id: 7,
            categoryId: 1,
            name: 'Ghee',
            mrp: 580,
            quantityType: 'per litre',
            uri: 'https://5.imimg.com/data5/HI/PR/MY-9948889/dairy-farm-ghee-500x500.jpg'
        },
        {
            id: 8,
            categoryId: 1,
            name: 'Chhachh',
            plan: true,
            mrp: 30,
            quantityType: 'per litre',
            uri: 'https://akm-img-a-in.tosshub.com/aajtak/images/story/201603/buttermilk_145690782552_650_030216020840.jpg?size=1200:675'
        },
        {
            id: 9,
            categoryId: 1,
            name: 'Dahi',
            mrp: 340,
            quantityType: 'per KG',
            uri: 'https://images.squarespace-cdn.com/content/v1/57b9b7d4ebbd1a60cf7a5e3b/1600883581694-7IRO8E7VWR2UTO33HWLP/iorganic-make-dahi-curd-at-home.jpg?format=1500w'
        },
        {
            id: 10,
            categoryId: 3,
            name: 'Coconut',
            mrp: 40,
            quantityType: 'per Piece',
            uri: 'https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2020/09/02/Pictures/_18165104-ecee-11ea-8bd0-e81a49b765f6.jpg'
        },
    ])
    return (
        <SafeAreaView style={GloableStyle.container}>

            <StatusBar backgroundColor={Color.green1} barStyle='light-content' />
            <View style={{ ...GloableStyle.headerView, backgroundColor: Color.green1, }}>
                <View style={{ backgroundColor: Color.green1, justifyContent: 'space-between', }}>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', flex: 0.17, alignItems: 'center' }}
                        onPress={() => {
                            navigation.goBack()
                        }}>
                        <Ionicons name="arrow-back" size={20} color={Color.white1} />
                        <Text style={{ ...GloableStyle.backText, marginLeft: horizScale(1), color: Color.white1 }}>Back</Text>
                    </TouchableOpacity>

                    <View style={{
                        flex: 0.68, marginRight: horizScale(10), alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{
                            ...GloableStyle.headerText,
                            textAlign: 'right', color: Color.white1,
                        }}>{shop.itemname}</Text>
                        <Text style={{
                            ...GloableStyle.backText,
                            textAlign: 'right', color: Color.white1,
                        }}>{shop.address}</Text>
                    </View>

                </View>
                <View style={{ ...GloableStyle.rowtwoitem, justifyContent: 'space-evenly', marginVertical: horizScale(8) }}>
                    <Image style={{ ...GloableStyle.itemImage, borderRadius: horizScale(10) }} source={{ uri: shop.image }} />

                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <FlatList
                    data={subItem}
                    numColumns={2}
                    contentContainerStyle={{ marginVertical: horizScale(20), }}
                    renderItem={({ item }) => {
                        if (shop.id == item.categoryId) {
                            return (
                                <TouchableOpacity
                                    onPress={() => { navigation.navigate('ProductDetail', { item: item }) }}
                                    style={styles.flexcontainer}>
                                    <Image source={{ uri: item.uri }} style={{
                                        height: horizScale(160),
                                        width: "95%",
                                        alignSelf: 'center',
                                        borderRadius: horizScale(5),
                                        marginVertical: horizScale(3)
                                    }} />
                                    <Text style={styles.nametext}>{item.name}</Text>
                                    <Text style={styles.itemsstyle}>{item.mrp} {item.quantityType}</Text>

                                </TouchableOpacity>
                            )
                        }
                    }}
                />
            </ScrollView>
        </SafeAreaView>
    )
}

export default LocalWendor

const styles = StyleSheet.create({
    flexcontainer: {

        width: "48%",
        paddingVertical: horizScale(5),
        backgroundColor: Color.white1,
        alignSelf: "center",
        elevation: 10,
        borderRadius: 10,
        margin: horizScale(5)
    },
    icon: {
        width: 25,
        height: 25,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    nametext: {
        textAlign: 'center',
        marginTop: horizScale(5),
        fontWeight: "bold",
        color: Color.black,
        fontSize: fontSize.regular
    },
    itemsstyle: {
        textAlign: 'left',
        marginTop: horizScale(5),
        marginLeft: horizScale(10),
        fontWeight: "600",
        color: Color.black,
        fontSize: fontSize.small
    }
})