import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import Colors from '../constants/Colors';

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
    defaultNavigationOptions: defaultNavigatorOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
}, {
    defaultNavigationOptions: defaultNavigatorOptions
});

export default createAppContainer(ProductsNavigator);