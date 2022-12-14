import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const Title = () => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>ONEBITHEALTH</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#D20038'
    }
})