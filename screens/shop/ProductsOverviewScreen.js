import React, { useEffect } from 'react';
import { FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import Colors from "../../constants/Colors";


const ProductsOverviewScreen = props => {
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(productActions.fetchProducts());
    }, [dispatch]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductsDetail', {
            productId: id,
            productTitle: title
        })
    };

    return <FlatList 
                data={products} 
                renderItem={itemData => 
                <ProductItem 
                    image={itemData.item.imageUrl}
                    title={itemData.item.title}
                    price={itemData.item.price}
                    onSelect={() => {
                        selectItemHandler(itemData.item.id, itemData.item.title);
                    }} 
                >
                    <Button 
                        color={Colors.primary} 
                        title="Ver Detalhes" 
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}>    
                    </Button>
                    <Button 
                        color={Colors.primary} 
                        title="Adicionar ao Carrinho" 
                        onPress={() => {
                            dispatch(cartActions.add2Cart(itemData.item))
                        }}>
                    </Button>
                </ProductItem>
                                    }
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