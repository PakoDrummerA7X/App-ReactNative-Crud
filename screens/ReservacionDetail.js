import React, { Component } from 'react';
import { Alert, Button, StyleSheet, TextInput, ScrollView, ActivityIndicator, View, Text } from 'react-native';
import firebase from '../components/firebase';
import DatePicker from 'react-native-datepicker';//fechas

class ReservacionDetail extends Component {

  constructor() {
    super();
    this.state = {
      nombre: '',
      numeropersonas: '',
      numeromesa: '',
      date: "2021-01-01",
      hora: '',
      isLoading: true
    };
  }
 
  componentDidMount() {
    const dbRef = firebase.firestore().collection('Reservacion').doc(this.props.route.params.reservacionkey)
    dbRef.get().then((res) => {
      if (res.exists) {
        const ped = res.data();
        this.setState({
          key: res.id,
          nombre: ped.nombre,
          numeropersonas: ped.numeropersonas,
          numeromesa: ped.numeromesa,
          date: ped.date,
          hora: ped.hora,
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
  updateReservacionn() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase.firestore().collection('Reservacion').doc(this.state.key);
    updateDBRef.set({
      nombre: this.state.nombre,
      numeropersonas: this.state.numeropersonas,
      numeromesa: this.state.numeromesa,
      date: this.state.date,
      hora: this.state.hora,
    }).then((docRef) => {
      this.setState({
        key: '',
        nombre: '',
        numeropersonas: '',
        numeromesa: '',
        date: '',
        hora: '',
        isLoading: false,
      });
      this.props.navigation.navigate('ReservacionScreen');
    })
    .catch((error) => {
      console.error("Error: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }
   //ELIMINAR
  deleteReservacion() {
    const dbRef = firebase.firestore().collection('Reservacion').doc(this.props.route.params.reservacionkey)
      dbRef.delete().then((res) => {
          console.log('Item removed from database')
          this.props.navigation.navigate('ReservacionScreen');
      })
  }

  openTwoButtonAlert=()=>{
    Alert.alert(
      'Delete Reservation',
      'Are you sure?',
      [
        {text: 'Yes', onPress: () => this.deleteReservacion()},
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
            title='Update'
            onPress={() => this.updateReservacionn()} 
            color="#19AC52"
          />
        </View>
        <View style={styles.button}>
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
  },
})

export default ReservacionDetail;