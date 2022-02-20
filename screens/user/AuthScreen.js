import React from 'react';
import { ScrollView, Button, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AuthScreen = props => {
    return (
        <KeyboardAvoidingView
            behavior="padding" 
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id="email" 
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize='none'
                            errorMessage="Coloque um email válido."
                            onInputChange={() => {}}
                            initialValue='' 
                        />
                        <Input 
                            id="password" 
                            label="Senha"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            errorMessage="Coloque uma senha válida."
                            onInputChange={() => {}}
                            initialValue='' 
                        />
                        <View style={styles.buttonContainer}>
                            <Button title='Login' color={Colors.primary} onPress={() => {}}/>
                        </View>
                        <View style={styles.buttonContainer}>
                            <Button title='Registrar' color={Colors.secondary} onPress={() => {}}/>
                        </View>
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
};

AuthScreen.navigationOptions = {
    headerTitle: 'Entrar'
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default AuthScreen;