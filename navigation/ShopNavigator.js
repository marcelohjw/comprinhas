import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';


import EditProductScreen from '../screens/user/EditProductScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const defaultNavigatorOptions = {
    headerStyle: {
        backgroundColor: 'white'
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Colors.primary
};

const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductsDetail: ProductDetailScreen,
    Cart: CartScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name='ios-cart' size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavigatorOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name='ios-list' size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavigatorOptions
});

const AdminNavigator = createStackNavigator(
    {
    UserProducts: UserProductsScreen,
    EditProduct: EditProductScreen
    }, 
    {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name='ios-create' size={23} color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavigatorOptions
});


const ShopNavigator = createDrawerNavigator({
    Products: {
        screen: ProductsNavigator,
        navigationOptions: {
            title: 'Produtos'
        }
    },
    Orders: {
        screen: OrdersNavigator,
        navigationOptions: {
            title: 'Compras Efetuadas'
        }
    },
    Admin: {
        screen: AdminNavigator,
        navigationOptions: {
            title: 'Produtos do Usuário'
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(ShopNavigator);