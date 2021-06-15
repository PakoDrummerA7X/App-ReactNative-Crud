import React from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';
import * as Google from 'expo-google-app-auth';

const LoginScreen = ({ navigation }) => {
  const signInAsync = async () => {
    console.log('LoginScreen.js 6 | loggin in');
    try {
      const { type, user } = await Google.logInAsync({
        iosClientId: `656786428694-d5apaap4mvtmut1li1prd5hdrnl5j18b.apps.googleusercontent.com`,
        androidClientId: `656786428694-7l62jp36h9cqe3gvb14prop89l6d68vk.apps.googleusercontent.com`,
      });
      //ahora crea un boton en la pantalla de login que redirija aqui
      if (type === 'success') {
        // Then you can use the Google REST API
        console.log('LoginScreen.js 17 | success, navigating to profile');
         navigation.navigate("Dashboard", { user });
        //this.props.navigation.navigate('ProfileScreen', { user }); //this.props.navigation.navigate('Signup')}>
      }
    } catch (error) {
      console.log('LoginScreen.js 19 | error with login', error);
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.textStyle}>
        Sign in with your Google Account
    </Text>
    <Image source={{uri: 'http://assets.stickpng.com/images/5a951939c4ffc33e8c148af2.png'}}
       style={{width: 100, height: 100}} />
    <Text style={styles.button}>
    </Text>
      <View style={styles.button}>
      <Button
       title="Login with Google"
      onPress={signInAsync} />
      </View>
    </View>

  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    marginBottom: 7,
  },
});
