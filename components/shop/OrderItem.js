import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import CartItem from './CartItem';
import Colors from '../../constants/Colors';
import Card from '../UI/Card';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <Card style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.totalAmount}>R${props.amount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button 
                color={Colors.primary} 
                title={ showDetails ? 'Esconder': 'Ver Detalhes' }
                onPress={() => {
                    setShowDetails(prevState => !prevState);
                }} 
            />
            {showDetails && <View style={styles.itemsCart}>
                {props.items.map(cartItem => <CartItem
                                                key={cartItem.productId} 
                                                quantity={cartItem.quantity} 
                                                amount={cartItem.sum}
                                                title={cartItem.productTitle}
                                                deletable={false} 
                                            />)}
            </View>}
        </Card>
    );
};

const styles = StyleSheet.create({
    orderItem: {
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },
    totalAmount: {
        fontFamily: 'open-sans-bold',
        fontSize: 16
    },
    date: {
        fontSize: 16,
        fontFamily: 'open-sans',
        color: '#888'
    },
    itemsCart: {
        width: '100%'
    }
});

export default OrderItem;