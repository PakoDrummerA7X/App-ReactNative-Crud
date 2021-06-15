import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../components/firebase';

class ClienteScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('cliente');
    this.state = {
      isLoading: true,
      clienteArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const clienteArr = [];
    querySnapshot.forEach((res) => {
      const { nombre, apellidoPaterno, apellidoMaterno, email, mobile } = res.data();
      clienteArr.push({
        key: res.id,
        res,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        email,
        mobile,
      });
    });
    this.setState({
      clienteArr,
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
        onPress={() => this.props.navigation.navigate("AddCliente")}
        title="Create Cliente"
      />
      {this.state.clienteArr.map((item) => {
        return (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => {
              this.props.navigation.navigate("ClienteDetail", {
                clientekey: item.key,
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
              <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        );
      })}
    </ScrollView>

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

export default ClienteScreen;

