import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../components/firebase';

class EmpleadoScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('Empleado');
    this.state = {
      isLoading: true,
      empleadoArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const empleadoArr = [];
    querySnapshot.forEach((res) => {
      const { nombre, apellidoPaterno, apellidoMaterno, puesto, mobile } = res.data();
      empleadoArr.push({
        key: res.id,
        res,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        puesto,
        mobile,
      });
    });
    this.setState({
      empleadoArr,
      isLoading: false,
   });
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
      <Button
        onPress={() => this.props.navigation.navigate("AddEmpleado")}
        title="Create Empleado"
      />
      {this.state.empleadoArr.map((item) => {
        return (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => {
              this.props.navigation.navigate("EmpleadoDetail", {
                empleadokey: item.key,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_960_720.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{item.nombre}</ListItem.Title>
              <ListItem.Subtitle>{item.puesto}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>
     /*<ScrollView style={styles.container}>
          {
            this.state.empleadoArr.map((item, i) => {
              return (
                <ListItem
                  key={i}
                  chevron
                  bottomDivider
                  title={item.nombre}
                  subtitle={item.puesto}
                  onPress={() => {
                    this.props.navigation.navigate('EmpleadoDetail', {
                      empleadokey: item.key
                    });
                  }}/>
              );
            })
          }
      </ScrollView>*/
     

     
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default EmpleadoScreen;