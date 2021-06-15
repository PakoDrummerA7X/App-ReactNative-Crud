import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View } from 'react-native';
import firebase from '../components/firebase';

class EmpleadoDetail extends Component {

  constructor() {
    super();
    this.state = {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      puesto: '',
      mobile: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Empleado').doc(this.props.route.params.empleadokey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const empl = res.data();
        this.setState({
          key: res.id,
          nombre: empl.nombre,
          apellidoPaterno: empl.apellidoPaterno,
          apellidoMaterno: empl.apellidoMaterno,
          puesto: empl.puesto,
          mobile: empl.mobile,
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
  updateEmpleado() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Empleado').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
      apellidoPaterno: this.state.apellidoPaterno,
      apellidoMaterno: this.state.apellidoMaterno,
      puesto: this.state.puesto,
      mobile: this.state.mobile,
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        puesto: '',
        mobile: '',
        isLoading: false,
      });
      this.props.navigation.navigate('EmpleadoScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
   //ELIMINAR
  deleteEmpleado() {
    const dbRef = firebase.firestore().collection('Empleado').doc(this.props.route.params.empleadokey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('EmpleadoScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Employee',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteEmpleado()},
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
            title='Update'
            onPress={() => this.updateEmpleado()} 
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

export default EmpleadoDetail;