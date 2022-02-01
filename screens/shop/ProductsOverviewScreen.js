import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import CustomHeaderButton from '../../components/UI/HeaderButton';


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    return <FlatList 
                data={products} 
                renderItem={itemData => <ProductItem 
                                            image={itemData.item.imageUrl}
                                            title={itemData.item.title}
                                            price={itemData.item.price}
                                            onViewDetail={() => {
                                                props.navigation.navigate('ProductsDetail', {
                                                    productId: itemData.item.id,
                                                    productTitle: itemData.item.title
                                                })
                                            }} 
                                            onAdd2Cart={() => {
                                                dispatch(cartActions.add2Cart(itemData.item))
                                            }} 
                                        />}
            />
};

ProductsOverviewScreen.navigationOptions = navData => {
    return {
    headerTitle: 'Todos os Produtos',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                        <Item title='menu' iconName='ios-menu' onPress={() => {
                            navData.navigation.toggleDrawer();
                        }} />
                    </HeaderButtons>,
    headerRight: () =>  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                            <Item title='cart' iconName='ios-cart' onPress={() => {
                                navData.navigation.navigate('Cart')
                            }} />
                        </HeaderButtons>
    };
};

export default ProductsOverviewScreen;