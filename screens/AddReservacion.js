import React, { Component, useState } from 'react';
import { Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Alert, SafeAreaView, Text } from 'react-native';
import firebase from '../components/firebase';
import DatePicker from 'react-native-datepicker';//fechas



class AddReservacion extends Component {
  
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection('Reservacion');
    this.state = {
      nombre: '',
      numeropersonas: '',
      numeromesa: '',
      date:"2021-01-01",
      hora: '',
      isLoading: false
    };
  }
  
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  
  storeReservacion() {
    if(this.state.nombre === '' || this.state.numeropersonas === '' || this.state.numeromesa === '' ||
       this.state.date === '' || this.state.hora === ''){
     Alert.alert('the data is empty!')
    } else {
      this.setState({
        isLoading: true,
      });      
      this.dbRef.add({
        nombre: this.state.nombre,
        numeropersonas: this.state.numeropersonas,
        numeromesa: this.state.numeromesa,
        date: this.state.date,
        hora: this.state.hora,
      }).then((res) => {
        this.setState({
          nombre: '',
          numeropersonas: '',
          numeromesa: '',
          date: '',
          hora: '',
          isLoading: false,
        });
        this.props.navigation.navigate('ReservacionScreen')
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
              placeholder={'Numero de personas'}
              value={this.state.numeropersonas}
              onChangeText={(val) => this.inputValueUpdate(val, 'numeropersonas')}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Numero de mesa'}
              value={this.state.numeromesa}
              onChangeText={(val) => this.inputValueUpdate(val, 'numeromesa')}
          />
        </View>
        <DatePicker
          style={styles.datePickerStyle}
          date={this.state.date} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder="select date"
          format="YYYY-MM-DD"
          minDate="2015-01-01"
          maxDate="2050-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              //display: 'none',
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(date) => {this.setState({date: date})}}
        />
        <View style={styles.inputGroup}>
          <TextInput
              placeholder={'Hora'}
              value={this.state.hora}
              onChangeText={(val) => this.inputValueUpdate(val, 'hora')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title='Add Reservacion'
            onPress={() => this.storeReservacion()} 
            color="#19AC52"
          />
        </View>
        <View style={styles.button}>
          <Button
            title='List Reservacion'
            onPress={() => this.props.navigation.navigate('ReservacionScreen')} 
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
    padding: 35,
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
  datePickerStyle: {
    width: 200,
    marginTop: 20,
  },
  button: {
    marginBottom: 7, 
  },

})

export default AddReservacion;