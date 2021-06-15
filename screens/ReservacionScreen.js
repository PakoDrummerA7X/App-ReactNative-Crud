import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Button } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../components/firebase';

class ReservacionScreen extends Component {

  constructor() {
    super();
    this.firestoreRef = firebase.firestore().collection('Reservacion');
    this.state = {
      isLoading: true,
      reservacionArr: []
    };
  }

  componentDidMount() {
    this.unsubscribe = this.firestoreRef.onSnapshot(this.getCollection);
  }

  componentWillUnmount(){
    this.unsubscribe();
  }

  getCollection = (querySnapshot) => {
    const reservacionArr = [];
    querySnapshot.forEach((res) => {
      const { nombre, numeropersonas, numeromesa, date, hora } = res.data();
      reservacionArr.push({
        key: res.id,
        res,
        nombre,
        numeropersonas,
        numeromesa,
        date,
        hora,
      });
    });
    this.setState({
      reservacionArr,
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
        onPress={() => this.props.navigation.navigate("AddReservacion")}
        title="Create Reservacion"
      />
      {this.state.reservacionArr.map((item) => {
        return (
          <ListItem
            key={item.id}
            bottomDivider
            onPress={() => {
              this.props.navigation.navigate("ReservacionDetail", {
                reservacionkey: item.key,
              });
            }}
          >
            <ListItem.Chevron />
            <Avatar
              source={{
                uri:
                  "https://png.pngtree.com/element_our/png_detail/20190103/vector-calendar-icon-png_308701.jpg",
              }}
              rounded
            />
            <ListItem.Content>
              <ListItem.Title>{item.nombre}</ListItem.Title>
              <ListItem.Subtitle>{item.date}</ListItem.Subtitle>
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

export default ReservacionScreen;