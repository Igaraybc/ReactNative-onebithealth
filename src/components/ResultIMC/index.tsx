import { Icon } from '@rneui/themed';
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share} from "react-native";


type props = {
    messageResult: string | null,
    imc: number | null
}

export const ResultIMC = ({imc, messageResult} : props) => {
    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'Meu IMC hoje é: ' + imc,
          });
        } catch (error: any) {
          alert(error.message);
        }
      };

    return(
        <View style={styles.resultContainer}>
            <Text style={styles.messageResult}>{messageResult}</Text>
            <Text style={styles.result}>{imc}</Text>
            <View style={styles.shareButtonContainer}>
                <TouchableOpacity onPress={onShare}>
                    <Text><Icon name="share" size={30}/></Text>
                </TouchableOpacity> 
            <View />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    resultContainer: {
       flex:1,
       marginTop: 15,
       paddingTop: 20,
       borderRadius: 50,
       alignItems: 'center',
       width: '100%'
    },
    messageResult: {
        textAlign:'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#d30039'
    },
    result: {
        textAlign: 'center',
        fontSize: 50,
        fontWeight: 'bold',
        color: '#d30039'
    },
    shareButtonContainer: {
        marginTop: 10,
        width: '100%',
        alignItems: 'center' 
    }
})