import React, { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Vibration, Pressable, Keyboard, FlatList } from "react-native";
import { ResultIMC } from "../ResultIMC";

export const Form = () => {
    const [height, setHeight] = useState<any>(null);
    const [weight, setWeight] = useState<any>(null);
    const [messageIMC, setMessageIMC] = useState<string | null>(null);
    const [imc, setImc] = useState<number | null>(null);
    const [textButton, setTextButton] = useState('Calcular IMC');
    const [errorHeight, setErrorHeight] = useState<string | null>(null);
    const [errorWeight, setErrorWeight] = useState<string | null>(null);
    const [imcList, setImcList] = useState<{id:number, imc:number}[]>([]);

    function imcCalculator() {
        let heightFormat = height.replace(",", ".");
        let weightFormat = weight.replace(",", ".");
        let totalImc = +(weightFormat/(heightFormat*heightFormat)).toFixed(2);
        setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }]);
        setImc(totalImc);
    }

    function verification(){
        if(!weight){
            setErrorWeight(null)
            setTimeout(()=>{
                setErrorWeight('Peso é obrigatório!');
            }, 50);
        }
        if(!height){
            setErrorHeight(null);
            setTimeout(()=>{
                setErrorHeight('Altura é obrigatória!');
            }, 50);
        }
    }

    function validatorImc(){
        if(weight && height){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setMessageIMC('Seu IMC é igual:')
            setTextButton('Calcular novamente')
            Keyboard.dismiss()
        }
        else if(imc){
            setImc(null);
        }
        else{
            Vibration.vibrate();
            verification();
            setImc(null)
            setTextButton('Calcular IMC')
            setMessageIMC('Preencha o peso e a altura!')
        }
        
    }   

    useEffect(() => {
      if(height){
        setErrorHeight(null)
      }
    }, [height]);

    useEffect(() => {
        if(weight){
            setErrorWeight(null)
        }
    }, [weight])
    
    

    return(
        <View style={styles.formContainer}>
            { !imc ? 
            <Pressable style={styles.form} onPress={Keyboard.dismiss}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput placeholder="Digite sua altura" keyboardType="numeric" onChangeText={setHeight} 
                value={height} style={styles.input}/>
                <Text style={styles.errorMessage}>{errorHeight}</Text>
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput placeholder="Digite seu peso" keyboardType="numeric" onChangeText={setWeight}
                value={weight} style={styles.input}/>
                <Text style={styles.errorMessage}>{errorWeight}</Text>
                <TouchableOpacity style={styles.button} onPress={() => validatorImc()}>
                    <Text style={styles.textButtom}>{textButton}</Text>
                </TouchableOpacity>
            </Pressable> :
            <View style={styles.resultContainer}>
                <ResultIMC messageResult={messageIMC} imc={imc}/>
                <TouchableOpacity style={styles.button} onPress={() => validatorImc()}>
                    <Text style={styles.textButtom}>{textButton}</Text>
                </TouchableOpacity>
            </View>
        }
        <FlatList showsVerticalScrollIndicator={false} style={styles.listContainer} data={imcList.slice(0).reverse()} renderItem={({item}) => {
            return (<Text style={styles.resultItem}>
                <Text style={styles.resultItemText}> Resultado IMC = </Text>
                {item.imc}
                </Text>)
            }
        } keyExtractor={({id}) => id.toString()}>
        //renderItem = para cada item do meu data retorne tal coisa
        </FlatList>
        </View> 

    )
}

const styles = StyleSheet.create({
    formContainer: {  
        flex: 1,
        marginTop: 30,
        backgroundColor: '#fff',
        alignItems: 'center',
        paddingTop: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    form:{
        width: '90%',
        paddingTop: 20
    },
    formLabel:{
        fontSize: 18,
        paddingLeft: 20
    },
    input: {
        width: '90%',
        borderRadius: 50,
        backgroundColor: '#F6F6F6',
        height: 45,
        marginHorizontal: 12,
        marginVertical: 5,
        paddingLeft: 10
    },
    button: {
        fontSize: 20,
        backgroundColor: '#D30039',
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingVertical: 14,
        marginLeft: 12,
        margin: 15
    },
    textButtom: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    errorMessage: {
        fontSize: 12,
        color: 'red',
        paddingLeft: 20,
        marginBottom: 20
    },
    resultContainer: {
        width: '100%',
        height: '50%'
    },
    listContainer: {
        marginTop: 20,
    },
    resultItem: {
        fontSize: 24,
        color: 'red',
        height: 50, 
        width: '100%',
        paddingRight: 20
    },
    resultItemText: {
        fontSize: 16
    }
})


