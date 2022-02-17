import React, { useState, useEffect, useCallback } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import * as productsActions from '../../store/actions/products';

const EditProductScreen = props => {
    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => 
        state.products.userProducts.find(prod => prod.id === prodId)
    );

    const dispatch = useDispatch();
    
    const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    const [image, setImage] = useState(editedProduct ? editedProduct.imageUrl : '');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

    const submitHandler = useCallback(() => {
        props.navigation.goBack();
        if (editedProduct) {
            dispatch(productsActions.updateProduct(prodId, title, description, image));
        } else {
            dispatch(productsActions.createProduct(title, description, image, +price));
        };
    }, [dispatch, prodId, title, description, image, price]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    return (
        <ScrollView>
            <View style={styles.form}>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput 
                        style={styles.input}
                        value={title}
                        onChangeText={text => setTitle(text)}
                    />
                </View>
                <View style={styles.formControl}>
                    <Text style={styles.label}>Imagem</Text>
                    <TextInput 
                        style={styles.input}
                        value={image}
                        onChangeText={text => setImage(text)}
                    />
                </View>
                {editedProduct ? null : (
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Preço</Text>
                        <TextInput 
                            style={styles.input}
                            value={price}
                            onChangeText={text => setPrice(text)}
                        />
                    </View>)}
                <View style={styles.formControl}>
                    <Text style={styles.label}>Descrição</Text>
                    <TextInput 
                        style={styles.input}
                        value={description}
                        onChangeText={text => setDescription(text)}
                    />
                </View>
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