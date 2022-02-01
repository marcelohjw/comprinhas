import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton'; 

import ProductItem from '../../components/shop/ProductItem';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);

    return (
        <FlatList 
            data={userProducts} 
            renderItem={itemData => (
                                    <ProductItem 
                                        image={itemData.item.imageUrl}
                                        title={itemData.item.title}
                                        price={itemData.item.price}
                                        onViewDetail={() => {}}
                                        onAdd2Cart={() => {}}
                                        />
            )} />
    );
};

UserProductsScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Produtos do Usuário',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title='menu' iconName='ios-menu' onPress={() => {
                            navData.navigation.toggleDrawer();
                        }} />
                    </HeaderButtons>
    }
};

export default UserProductsScreen;