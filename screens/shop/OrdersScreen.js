import React from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import CustomHeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


const OrdersScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <View style={styles.screen}>
            <FlatList 
                data={orders}
                keyExtractor={item => item.id} 
                renderItem={itemData => <Text>{itemData.item.totalAmount}</Text>}
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
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OrdersScreen;