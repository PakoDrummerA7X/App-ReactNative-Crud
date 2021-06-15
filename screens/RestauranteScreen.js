import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../components/firebase';

class RestauranteScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('Restaurante');
    this.state = {
      isLoading: true,
      restauranteArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const restauranteArr = [];
    querySnapshot.forEach((res) => {
      const { nombre, calle, numero, colonia, codigopostal,mobile } = res.data();
      restauranteArr.push({
        key: res.id,
        res,
        nombre,
        calle,
        numero,
        colonia,
        codigopostal,
        mobile,
      });
    });
    this.setState({
      restauranteArr,
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
        onPress={() => this.props.navigation.navigate("AddRestaurante")}
        title="Create Restaurant"
      />
      {this.state.restauranteArr.map((item) => {
        return (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => {
              this.props.navigation.navigate("RestauranteDetail", {
                restaurantekey: item.key,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://www.alberguepirenarium.com/wp-content/uploads/restaurante-icon.png",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{item.nombre}</ListItem.Title>
              <ListItem.Subtitle>{item.mobile}</ListItem.Subtitle>
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

export default RestauranteScreen;