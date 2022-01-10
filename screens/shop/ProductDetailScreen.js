import React from "react";
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
         state.products.availableProducts.find(prod => prod.id === productId));

         const dispatch = useDispatch();

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: selectedProduct.imageUrl}}/>
            <View style={styles.actions}>
                <Button color={Colors.primary} title="Adicionar ao Carrinho" onPress={() => {
                    dispatch(cartActions.add2Cart(selectedProduct))
                }}/>
            </View>
            <Text style={styles.price}>R${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    );
};

ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    };
};


const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: 300
    },
    price: {
        fontFamily: 'open-sans-bold',
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontFamily: 'open-sans',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 50
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    }
});

export default ProductDetailScreen;