import React from "react";
import { View, ScrollView, Text, Image, Button, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId');
    const selectedProduct = useSelector(state =>
         state.products.availableProducts.find(prod => prod.id === productId));

    return (
        <View style={styles.content}>
            <Text>{selectedProduct.title}</Text>
            <Text>The Product Detail Screen!</Text>
        </View>
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
    }
});

export default ProductDetailScreen;