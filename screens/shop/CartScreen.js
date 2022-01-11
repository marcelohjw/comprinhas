import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import Colors from '../../constants/Colors';

const CartScreen = props => {
    const cartAmount = useSelector(state => state.cart.totalAmount);
    const cartitems = useSelector(state => {
        const transformedCartItems = [];
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            });
        }
        return transformedCartItems;
    });

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>R${cartAmount.toFixed(2)}</Text>
                </Text>
                <Button color={Colors.secondary} title='Comprar' disabled={cartitems.length === 0}></Button>
            </View>
            <View>
                <Text>CART ITEMS</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: 'white'
    },
    summaryText: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    }
});

CartScreen.navigationOptions = {
    headerTitle: 'Carrinho',

};

export default CartScreen;