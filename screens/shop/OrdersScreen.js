import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';


const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false);

    const orders = useSelector(state => state.orders.orders);
    const dispatch = useDispatch();

    useEffect( async () => {
        setIsLoading(true);
        await dispatch(ordersActions.fetchOrders());
        setIsLoading(false);
    }, [dispatch])

    if(isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size={'large'} color={Colors.primary}/>
            </View>
        );
    }

    if(orders.length === 0) {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text>Nenhuma compra detectada</Text>
                <Text>Tente comprar algum produto disponível</Text>
            </View>
        );
    }

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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default OrdersScreen;