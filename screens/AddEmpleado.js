import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import firebase from '../components/firebase';

class AddEmpleado extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Empleado');
    this.state = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      puesto: '',
      mobile: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeEmpleado() {
    if(this.state.nombre === '' || this.state.apellidoPaterno === '' || this.state.apellidoMaterno === '' ||
       this.state.puesto === '' || this.state.mobile === ''){
     alert('Los datos están Vacíos!')
     
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombre: this.state.nombre,
        apellidoPaterno: this.state.apellidoPaterno,
        apellidoMaterno: this.state.apellidoMaterno,
        puesto: this.state.puesto,
        mobile: this.state.mobile,
      }).then((res) => {
        this.setState({
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          puesto: '',
          mobile: '',
          isLoading: false,
        });
        this.props.navigation.navigate('EmpleadoScreen')
      })
      
      .catch((err) => {
        console.error("Error found: ", err);
        this.setState({
          isLoading: false,
        });
      });
      
    }
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Nombre'}
              value={this.state.nombre}
              onChangeText={(val) => this.inputValueUpdate(val, 'nombre')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'ApellidoPaterno'}
              value={this.state.apellidoPaterno}
              onChangeText={(val) => this.inputValueUpdate(val, 'apellidoPaterno')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'ApellidoMaterno'}
              value={this.state.apellidoMaterno}
              onChangeText={(val) => this.inputValueUpdate(val, 'apellidoMaterno')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Puesto'}
              value={this.state.puesto}
              onChangeText={(val) => this.inputValueUpdate(val, 'puesto')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Mobile'}
              value={this.state.mobile}
              onChangeText={(val) => this.inputValueUpdate(val, 'mobile')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Empleado'
            onPress={() => this.storeEmpleado()} 
            color="#19AC52"
          />
        </View>
        <View style={styles.button}>
          <Button
            title='List Empleado'
            onPress={() => this.props.navigation.navigate('EmpleadoScreen')} 
            color="#3740FE"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    marginBottom: 7, 
  }
})

export default AddEmpleado;