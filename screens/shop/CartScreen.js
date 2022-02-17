import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import Card from '../../components/UI/Card';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders'

const CartScreen = props => {
    const cartAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
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
        return transformedCartItems.sort((a, b) => a.productId > b.productId ? 1 : -1);
    });
    const dispatch = useDispatch();

    return (
        <View style={styles.screen}>
            <Card style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: <Text style={styles.amount}>R${Math.round(cartAmount.toFixed(2) * 100 / 100)}</Text>
                </Text>
                <Button 
                    color={Colors.secondary} 
                    title='Comprar' 
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(orderActions.addOrder(cartItems, cartAmount));
                        props.navigation.navigate('Orders');
                    }}
                />
            </Card>
            <FlatList 
                data={cartItems} 
                keyExtractor={item => item.productId} 
                renderItem={itemData => (
                    <CartItem 
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable={true}
                        onRemove={() => {
                            dispatch(cartActions.removeFromCart(itemData.item.productId));
                        }}
                    />
                )} 
            />
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