import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../components/firebase';

class RestauranteDetail extends Component {

  constructor() {
    super();
    this.state = {
      nombre: '',
      calle: '',
      numero: '',
      colonia: '',
      codigopostal: '',
      mobile: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Restaurante').doc(this.props.route.params.restaurantekey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const restaurtant = res.data();
        this.setState({
          key: res.id,
          nombre: restaurtant.nombre,
          calle: restaurtant.calle,
          numero: restaurtant.numero,
          colonia: restaurtant.colonia,
          codigopostal: restaurtant.codigopostal,
          mobile: restaurtant.mobile,
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
  updateRestaurante() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Restaurante').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
      calle: this.state.calle,
      numero: this.state.numero,
      colonia: this.state.colonia,
      codigopostal: this.state.codigopostal,
      mobile: this.state.mobile,
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        calle: '',
        numero: '',
        colonia: '',
        codigopostal: '',
        mobile: '',
        isLoading: false,
      });
      this.props.navigation.navigate('RestauranteScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
  //ELIMINAR
  deleteRestaurante() {
    const dbRef = firebase.firestore().collection('Restaurante').doc(this.props.route.params.restaurantekey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('RestauranteScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Restaurante',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteRestaurante()},
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
            title='Update'
            onPress={() => this.updateRestaurante()} 
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

export default RestauranteDetail;