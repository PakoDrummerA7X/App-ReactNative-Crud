import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Login
import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
//Cliente
import AddCliente from './screens/AddCliente';
import ClienteScreen from './screens/ClienteScreen';
import ClienteDetail from './screens/ClienteDetail';
//Empleaddo
import AddEmpleado from './screens/AddEmpleado';
import EmpleadoScreen from './screens/EmpleadoScreen';
import EmpleadoDetail from './screens/EmpleadoDetail';
//Pedido
import AddPedido from './screens/AddPedido';
import PedidoScreen from './screens/PedidoScreen';
import PedidoDetail from './screens/PedidoDetail';
//Reservacion
import AddReservacion from './screens/AddReservacion';
import ReservacionScreen from './screens/ReservacionScreen';
import ReservacionDetail from './screens/ReservacionDetail';
//Restaurante
import AddRestaurante from './screens/AddRestaurante';
import RestauranteScreen from './screens/RestauranteScreen';
import RestauranteDetail from './screens/RestauranteDetail';

//import ProfileScreen from './screens/ProfileScreen'

import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
        <Stack.Screen 
        name="LoginScreen" 
        component={LoginScreen}
        options={{title: 'Login Screen'}} 
        />
        <Stack.Screen name="Profile" 
        component={ProfileScreen}
        options={{title: 'Profile Screen'}} 
        />
      <Stack.Screen 
       name="Dashboard" 
       component={Dashboard} 
       options={
         { title: 'Dashboard' },
         {headerLeft: null} 
       }
      />
      
      <Stack.Screen 
        name="AddCliente" 
        component={AddCliente} 
        options={{ title: 'Add Cliente' }}
      />
      <Stack.Screen 
        name="ClienteScreen" 
        component={ClienteScreen} 
        options={{ title: 'Clientes List' }}
      />
      <Stack.Screen 
       name="ClienteDetail" 
       component={ClienteDetail} 
       options={{ title: 'Cliente Detail' }}
      />
      
      <Stack.Screen 
        name="AddEmpleado" 
        component={AddEmpleado} 
        options={{ title: 'Add Empleado' }}
      />
      <Stack.Screen 
        name="EmpleadoScreen" 
        component={EmpleadoScreen} 
        options={{ title: 'Empleados List' }}
      />
      <Stack.Screen 
       name="EmpleadoDetail" 
       component={EmpleadoDetail} 
       options={{ title: 'Empleado Detail' }}
      />
      <Stack.Screen 
        name="AddPedido" 
        component={AddPedido} 
        options={{ title: 'Add Pedido' }}
      />
      <Stack.Screen 
        name="PedidoScreen" 
        component={PedidoScreen} 
        options={{ title: 'Pedidos List' }}
      />
      <Stack.Screen 
       name="PedidoDetail" 
       component={PedidoDetail} 
       options={{ title: 'Pedido Detail' }}
      />
      <Stack.Screen 
        name="AddReservacion" 
        component={AddReservacion} 
        options={{ title: 'Add Reservacion' }}
      />
      <Stack.Screen 
        name="ReservacionScreen" 
        component={ReservacionScreen} 
        options={{ title: 'Reservacion List' }}
      />
      <Stack.Screen 
       name="ReservacionDetail" 
       component={ReservacionDetail} 
       options={{ title: 'Reservacion Detail' }}
      />
      <Stack.Screen 
        name="AddRestaurante" 
        component={AddRestaurante} 
        options={{ title: 'Add Restaurante' }}
      />
      <Stack.Screen 
        name="RestauranteScreen" 
        component={RestauranteScreen} 
        options={{ title: 'Restaurante List' }}
      />
      <Stack.Screen 
       name="RestauranteDetail" 
       component={RestauranteDetail} 
       options={{ title: 'Restaurante Detail' }}
      />
    </Stack.Navigator>

  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}