import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import CustomHeaderButton from '../../components/UI/HeaderButton';

import Colors from "../../constants/Colors";


const ProductsOverviewScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const products = useSelector(state => state.products.availableProducts);
    const dispatch = useDispatch();

    const loadProducts = useCallback(async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(productActions.fetchProducts());
        } catch (err) {
            setError(err.message);
        }
        setIsLoading(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {     
        loadProducts();
    }, [dispatch, loadProducts]);

    const selectItemHandler = (id, title) => {
        props.navigation.navigate('ProductsDetail', {
            productId: id,
            productTitle: title
        })
    };

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>{error}</Text>
                <Button 
                    title='Tentar Novamente' 
                    onPress={loadProducts}
                    color={Colors.primary}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={Colors.primary}/>
            </View>
        );
    };

    if (!isLoading && products.length === 0) {
        return (
            <View style={styles.centered}>
                <Text>Nenhum produto cadastrado.</Text>
            </View>
        );
    }

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

const styles = StyleSheet.create({
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center'}
});

export default ProductsOverviewScreen;