import React from 'react';
import { View, StyleSheet, TextInput, Text } from 'react-native';
// import { Picker } from 'react-native-elements';
state = { language: true };


const InterestRate = (props) => {
    const { interestEntered, changeInterest } = props
    return(
        <View style={styles.horizontal}>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    onChangeText={(apr) => changeInterest(apr)}
                    placeholder='9.3'
                    keyboardType = 'number-pad'
                >
                </TextInput>
                {/* <Text>{console.log(interestEntered, "interest test")}</Text> */}
            </View>
            <View style={styles.picker}>
                <Text style={styles.percentage}>%</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
            marginTop: 5,
            backgroundColor: "white",
            width: 205,
            borderRadius: 8,
        },
        input: {
            borderRadius: 8,
            textAlign: 'center',
            alignItems: 'center',
            flex: 1,
            borderWidth: 1,
            borderColor: "#999999",
            fontSize: 16,
        },
        picker: {
            backgroundColor: 'white',
            height: 45,
            borderRadius: 8,
            marginTop: 5,
            marginLeft: 15,
            color: 'white',
            width: 140,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: "#999999"
        },
        horizontal: {
            display: 'flex',
            flexDirection: 'row',
            height: 50
        },
        percentage: {
            color: 'black',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            fontSize: 16,
        }
})

export default InterestRate;