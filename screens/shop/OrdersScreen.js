import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList 
            data={orders}
            keyExtractor={item => item.id} 
            renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
        />
    );
};

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Suas compras',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item title='menu' iconName='ios-menu' onPress={() => {
                                navData.navigation.toggleDrawer();
                            }} />
                        </HeaderButtons>
    };
};

export default OrdersScreen;