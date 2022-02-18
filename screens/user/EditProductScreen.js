import React, { useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValues: updatedValues,
            inputValidities: updatedValidities
        };
    }
    return state;
};

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            image: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            image: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
     });
    
    const submitHandler = useCallback(() => {
        if (!formState.formIsValid) {
            Alert.alert('Algo deu errado!', 'Verifique se os campos foram preenchidos corretamente', [{
                text: 'Certo'
            }]);
            return;
        }
        if (editedProduct) {
            dispatch(productsActions.updateProduct(
                prodId, 
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.image));
        } else {
            dispatch(productsActions.createProduct(
                formState.inputValues.title, 
                formState.inputValues.description, 
                formState.inputValues.image, 
                +formState.inputValues.price));
        };
        props.navigation.goBack();
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const textChangeHandler = (inputIdentifier, text) => {
        let isValid = false;
        if (text.trim().length > 0) {
            isValid = true;
        }
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: text,
            isValid: isValid,
            input: inputIdentifier
        })
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.title}
                        onChangeText={textChangeHandler.bind(this, 'title')}
                        keyboardType='default'
                        autoCapitalize='sentences'
                        returnKeyType='next'
                    />
                    {!formState.inputValidities.title && <Text>Coloque um nome válido!</Text>}
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Imagem</Text>
                    <TextInput 
                        style={styles.input}
                        value={formState.inputValues.image}
                        onChangeText={textChangeHandler.bind(this, 'image')}
                        returnKeyType='next'
                    />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Preço</Text>
                        <TextInput 
                            style={styles.input}
                            value={formState.inputValues.price}
                            onChangeText={textChangeHandler.bind(this, 'price')}
                            keyboardType='decimal-pad'
                        />
                    </View>)}
                    <Input 
                        label='TestOne'
                        value={formState.inputValues.description}
                        onChangeText={textChangeHandler.bind(this, 'description')}
                        keyboardType='default'
                        />
                
            </View>
        </ScrollView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFunc = navData.navigation.getParam('submit');

    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Editar Produto' : 'Adicionar Produto',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                                <Item title='salvar' iconName='ios-checkmark' onPress={submitFunc} />
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