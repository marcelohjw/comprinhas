import React from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton'; 

import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

const UserProductsScreen = props => {
    const userProducts = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductHandler = id => {
        props.navigation.navigate('EditProduct', { productId: id });
    };

    return (
        <FlatList 
            data={userProducts} 
            renderItem={itemData => (
                                    <ProductItem 
                                        image={itemData.item.imageUrl}
                                        title={itemData.item.title}
                                        price={itemData.item.price}
                                        onSelect={() => {
                                            editProductHandler(itemData.item.id);
                                        }}
                                    >
                                        <Button 
                                            color={Colors.primary} 
                                            title="Editar" 
                                            onPress={() => {
                                                editProductHandler(itemData.item.id);
                                            }}>    
                                        </Button>
                                        <Button 
                                            color={Colors.primary} 
                                            title="Excluir" 
                                            onPress={() => {
                                                dispatch(productsActions.deleteProduct(itemData.item.id));
                                            }}>
                                        </Button>
                                    </ProductItem>
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