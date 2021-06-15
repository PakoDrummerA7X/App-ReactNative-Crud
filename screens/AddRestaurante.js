import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import firebase from '../components/firebase';

class AddRestaurante extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Restaurante');
    this.state = {
      nombre: '',
      calle: '',
      numero: '',
      colonia: '',
      codigopostal: '',
      mobile: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storeRestaurante() {
    if(this.state.nombre === '' || this.state.calle === '' || this.state.numero === '' ||
       this.state.colonia === '' || this.state.codigopostal === '' || this.state.mobile === ''){
     Alert.alert('the data is empty!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombre: this.state.nombre,
        calle: this.state.calle,
        numero: this.state.numero,
        colonia: this.state.colonia,
        codigopostal: this.state.codigopostal,
        mobile: this.state.mobile,
      }).then((res) => {
        this.setState({
          nombre: '',
          calle: '',
          numero: '',
          colonia: '',
          codigopostal: '',
          mobile: '',
          isLoading: false,
        });
        this.props.navigation.navigate('RestauranteScreen')
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
              placeholder={'Calle'}
              value={this.state.calle}
              onChangeText={(val) => this.inputValueUpdate(val, 'calle')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Numero'}
              value={this.state.numero}
              onChangeText={(val) => this.inputValueUpdate(val, 'numero')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Colonia'}
              value={this.state.colonia}
              onChangeText={(val) => this.inputValueUpdate(val, 'colonia')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Codigo postal'}
              value={this.state.codigopostal}
              onChangeText={(val) => this.inputValueUpdate(val, 'codigopostal')}
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
            title='Add Restaurant'
            onPress={() => this.storeRestaurante()} 
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title='List Restaurant'
            onPress={() => this.props.navigation.navigate('RestauranteScreen')} 
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

export default AddRestaurante;