import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';


const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <View>
            <FlatList 
                data={orders}
                keyExtractor={item => item.id} 
                renderItem={itemData => <OrderItem 
                                            amount={itemData.item.totalAmount}
                                            date={itemData.item.readableDate}
                                            items={itemData.item.items} 
                                        />}
            />
        </View>
    );
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Compras Efetuadas',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item title='menu' iconName='ios-menu' onPress={() => {
                                navData.navigation.toggleDrawer();
                            }} />
                        </HeaderButtons>
    };
};


export default OrdersScreen;