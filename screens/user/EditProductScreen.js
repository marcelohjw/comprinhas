import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const EditProductScreen = props => {
    return (
        <View style={styles.Main}>
            <Text>The Edit Product Screen!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Main: {
        flex: 1,
        flexDirection: 'row',
        textAlign: 'center',
        justifyContent: 'center',
    }
});

EditProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Editar',
    }
};

export default EditProductScreen;