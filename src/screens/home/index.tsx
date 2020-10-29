import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import * as routes from '../../Routes/consts';

const {width, height} = Dimensions.get('screen');

interface Pokemons {
  name: string;
  url: string;
}

interface Nav {
  item: Pokemons;
  navigation: any;
}

interface Item {
  item: Pokemons;
  onPress: Function;
}

const Item: React.FC<Item> = (item) => (
  <TouchableOpacity onPress={() => item.onPress()} style={styles.item}>
    <Text style={styles.title}>{item.item.name.toUpperCase()}</Text>
  </TouchableOpacity>
);

const renderItem: React.FC<Nav> = ({item, navigation}) => {
  return (
    <Item
      item={item}
      onPress={() => {
        navigation.navigate(routes.POKEMON_DETAIL, {item});
      }}
    />
  );
};

const home: React.FC = ({}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemons[]>([]);
  const [index, setIndex] = useState<number>(0);

  async function getPokemons(num?: Number) {
    try {
      setLoading(true);
      const {data} = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${num || 0}&limit=10`,
      );
      const results: Pokemons[] = data.results;
      setPokemons(pokemons.concat(results).sort());
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPokemons();
  }, []);

  useEffect(() => {
    getPokemons(index);
  }, [index]);

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="green" size="large" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList<Pokemons>
        data={pokemons}
        renderItem={({item}) => renderItem({item, navigation})}
        keyExtractor={(item,key) => String(Math.floor(Math.random() * 1000000000))}
        onEndReached={() => setIndex(index + 10)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    width: width * 0.9,
    borderRadius:3,
    shadowOffset:{width:1,height:1},
    shadowOpacity:0.3,
    shadowRadius:5,
    shadowColor:'black',
    elevation:2
  },
  title: {
    fontSize: 32,
    fontWeight:'bold'
  },
});

export default home;
