import React from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton'; 

const EditProductScreen = props => {
    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Imagem</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Preço</Text>
                    <TextInput style={styles.input}/>
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput style={styles.input}/>
                </View>
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Editar Produto' : 'Adicionar Produto',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item title='salvar' iconName='ios-checkmark' onPress={() => {
                                    console.log('Adicionar Produto');
                                }} />
                            </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        fontFamily: 'open-sans-bold',
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;