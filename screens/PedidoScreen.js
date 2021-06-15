import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../components/firebase';

class PedidoScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('Pedido');
    this.state = {
      isLoading: true,
      pedidoArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const pedidoArr = [];
    querySnapshot.forEach((res) => {
      const { nombre, comida, comidadescripcion, bebida, bebidadescripcion, direccion } = res.data();
      pedidoArr.push({
        key: res.id,
        res,
        nombre,
        comida,
        comidadescripcion,
        bebida,
        bebidadescripcion,
        direccion,
      });
    });
    this.setState({
      pedidoArr,
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
        onPress={() => this.props.navigation.navigate("AddPedido")}
        title="Create Pedido"
      />
      {this.state.pedidoArr.map((item) => {
        return (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => {
              this.props.navigation.navigate("PedidoDetail", {
                pedidokey: item.key,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://etl.es/wp-content/uploads/2020/05/list-2389219_1280.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{item.nombre}</ListItem.Title>
              <ListItem.Subtitle>{item.comida}</ListItem.Subtitle>
              <ListItem.Subtitle>{item.direccion}</ListItem.Subtitle>
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

export default PedidoScreen;

