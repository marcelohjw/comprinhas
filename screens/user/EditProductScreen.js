import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, ScrollView, KeyboardAvoidingView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';
import Colors from '../../constants/Colors';

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

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''
        }, 
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false
     });

     useEffect(() => {
         if (error) {
            Alert.alert('Algo deu errado!', error, [{ text: 'Ok'}]);
         }
     }, [error]);
    
    const submitHandler = useCallback( async () => {
        if (!formState.formIsValid) {
            Alert.alert('Algo deu errado!', 'Verifique se os campos foram preenchidos corretamente', [{
                text: 'Certo'
            }]);
            return;
        }
        setError(null);
        setIsLoading(true);
        try {
            if (editedProduct) {
                await dispatch(productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl));
            } else {
                await dispatch(productsActions.createProduct(
                    formState.inputValues.title, 
                    formState.inputValues.description, 
                    formState.inputValues.imageUrl, 
                    +formState.inputValues.price));
            }
            props.navigation.goBack();
        } catch(err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, prodId, formState]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE, 
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size={'large'} color={Colors.primary}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView 
            style={{flex: 1}}
            behavior='padding'
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        label='Nome'
                        errorText='Coloque um texto válido!' 
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    <Input
                        id='imageUrl'
                        label='Imagem'
                        errorText='Coloque o link de uma imagem válida!' 
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />
                    {editedProduct ? null : (
                        <Input
                            id='price'
                            label='Preço'
                            errorText='Coloque um preço válido!' 
                            keyboardType='decimal-pad'
                            onInputChange={inputChangeHandler}
                            returnKeyType='next'
                            required
                            min={0}
                        />)}
                        <Input 
                            id='description'
                            label='Descrição'
                            value={formState.inputValues.description}
                            errorText='Coloque uma descrição válida!'
                            onInputChange={inputChangeHandler}
                            initialValue={editedProduct ? editedProduct.description : ''} 
                            multiline
                            required
                            minLength={5}
                        />
                    
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default EditProductScreen;