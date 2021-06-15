import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../components/firebase';

class PedidoDetail extends Component {

  constructor() {
    super();
    this.state = {
      nombre: '',
      comida: '',
      comidadescripcion: '',
      bebida: '',
      bebidadescripcion: '',
      direccion: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Pedido').doc(this.props.route.params.pedidokey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const ped = res.data();
        this.setState({
          key: res.id,
          nombre: ped.nombre,
          comida: ped.comida,
          comidadescripcion: ped.comidadescripcion,
          bebida: ped.bebida,
          bebidadescripcion: ped.bebidadescripcion,
          direccion: ped.direccion,
          isLoading: false
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  //ACTUALIZAR
  updatePedido() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Pedido').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
      comida: this.state.comida,
      comidadescripcion: this.state.comidadescripcion,
      bebida: this.state.bebida,
      bebidadescripcion: this.state.bebidadescripcion,
      direccion: this.state.direccion,
    }).then((docRef) => {
      this.setState({
        key: '',
        comida: '',
        comidadescripcion: '',
        bebida: '',
        bebidadescripcion: '',
        direccion: '',
        isLoading: false,
      });
      this.props.navigation.navigate('PedidoScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
   //ELIMINAR
  deletePedido() {
    const dbRef = firebase.firestore().collection('Pedido').doc(this.props.route.params.pedidokey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('PedidoScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Employee',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deletePedido()},
        {text: 'No', onPress: () => console.log('No item was removed'), style: 'cancel'},
      ],
      { 
        cancelable: true 
      }
    );
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
              placeholder={'Comida descripcion'}
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
            title='Update'
            onPress={() => this.updatePedido()} 
            color="#19AC52"
          />
          </View>
         <View>
          <Button
            title='Delete'
            onPress={this.openTwoButtonAlert}
            color="#E37399"
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

export default PedidoDetail;