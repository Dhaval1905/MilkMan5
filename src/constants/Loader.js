// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator, Image } from "react-native";
import { Customimage } from "./Customimage";

import { horizScale } from "./Layout";

const Loader = (props) => {
    const { loading, ...attributes } = props;

    return (
        <Modal
            transparent={true}
            animationType={"none"}
            visible={loading}
            onRequestClose={() => {
                console.log("close modal");
            }}
        >
            <View style={styles.modalBackground}>
                <View style={styles.viewstyle}>
                    <Image
                        source={Customimage?.loader}
                        style={styles.activityIndicator}
                    />
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#00000040",
    },
    viewstyle: {
        backgroundColor: "#FFFFFF",
        height: horizScale(200),
        width: horizScale(200),
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
    },
    activityIndicator: {
        alignItems: "center",
        height: horizScale(170),
        width: horizScale(170),
    },
});
