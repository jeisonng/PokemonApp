import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from "../screens/home";
import PokemonDetail from '../screens/PokemonDetail';
import * as routes from "./consts";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{title:"Pokemons"}} name={routes.HOME} component={Home} />
        <Stack.Screen options={{title:"Detalhe"}} name={routes.POKEMON_DETAIL} component={PokemonDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;