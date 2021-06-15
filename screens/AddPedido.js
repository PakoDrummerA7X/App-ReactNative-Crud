import React, { Component } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert } from 'react-native';
import firebase from '../components/firebase';

class AddPedido extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Pedido');
    this.state = {
      nombre: '',
      comida: '',
      comidadescripcion: '',
      bebida: '',
      bebidadescripcion: '',
      direccion: '',
      isLoading: false
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }

  storePedido() {
    if(this.state.nombre === '' || this.state.comida === '' || this.state.comidadescripcion === '' ||  
       this.state.bebida === '' || this.state.bebidadescripcion === '' || this.state.direccion === ''){
     alert('Los datos están Vacíos!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombre: this.state.nombre,
        comida: this.state.comida,
        comidadescripcion: this.state.comidadescripcion,
        bebida: this.state.bebida,
        bebidadescripcion: this.state.bebidadescripcion,
        direccion: this.state.direccion,
      }).then((res) => {
        this.setState({
          nombre: '',
          comida: '',
          comidadescripcion: '',
          bebida: '',
          bebidadescripcion: '',
          direccion: '',
          isLoading: false,
        });
        this.props.navigation.navigate('PedidoScreen')
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
              placeholder={'Comida'}
              value={this.state.comida}
              onChangeText={(val) => this.inputValueUpdate(val, 'comida')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Comidadescripcion'}
              value={this.state.comidadescripcion}
              onChangeText={(val) => this.inputValueUpdate(val, 'comidadescripcion')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Bebida'}
              value={this.state.bebida}
              onChangeText={(val) => this.inputValueUpdate(val, 'bebida')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Bebida descripcion'}
              value={this.state.bebidadescripcion}
              onChangeText={(val) => this.inputValueUpdate(val, 'bebidadescripcion')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Direccion'}
              value={this.state.direccion}
              onChangeText={(val) => this.inputValueUpdate(val, 'direccion')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Pedido'
            onPress={() => this.storePedido()} 
            color="#19AC52"
          />
        </View>
        <View style={styles.button}>
          <Button
            title='List Pedido'
            onPress={() => this.props.navigation.navigate('PedidoScreen')} 
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

export default AddPedido;