import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import firebase from '../components/firebase';



export default class Dashboard extends Component {
  
  constructor() {
    super();
    this.state = { 
      uid: '',
      
    }
  }
 
  signOut = () => {
    firebase.auth().signOut().then(() => { 
      this.props.navigation.navigate('Login')
    })
    .catch(error => this.setState({ errorMessage: error.message }))
  }  
  render() {
    this.state = { 
      displayName: firebase.auth().currentUser.displayName,
      uid: firebase.auth().currentUser.uid
    }    

    return (
      <View style={styles.container}>
        <Text style = {styles.textStyle}>
          Welcome {this.state.displayName}
        </Text>
 
        <Text style={styles.textStyle}>
        
        </Text>
        <View style={styles.button}>
        <Button 
          color="#19AC52"
          title="Add Cliente"
          onPress={() => this.props.navigation.navigate('AddCliente')
          }
        />
        </View>
        <View style={styles.button}>
        <Button 
          color="#FF0000"
          title="Add Empleado"
          onPress={() => this.props.navigation.navigate('AddEmpleado')
          }
        />
        </View>
        <View style={styles.button}>
        <Button 
          color="#FF6100"
          title="Add Pedido"
          onPress={() => this.props.navigation.navigate('AddPedido')
          }
        />
        </View>
        <View style={styles.button}>
        <Button 
          color="#7B0598"
          title="Add Reservacion"
          onPress={() =>
            this.props.navigation.navigate('AddReservacion')
          }
        />
        </View>
         <View style={styles.button}>
        <Button 
          color="#00B1C2"
          title="Add Restaurante"
          onPress={() => this.props.navigation.navigate('AddRestaurante')
          }        
        />
        </View>
        <Text 
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Login')}>
          Logout
        </Text>       
      </View>

    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    //display: "flex",
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 35,
    backgroundColor: '#fff'
  },
  textStyle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    alignItems: 'center',
  },
  loginText: {
    color: '#3740FE',
    marginTop: 25,
    textAlign: 'center',
    fontSize: 15
  },
  button: {
    marginBottom: 7,
  },
});