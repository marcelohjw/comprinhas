import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';


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

ProductsOverviewScreen.navigationOptions = {
    headerTitle: 'Produtos'
};

export default ProductsOverviewScreen;