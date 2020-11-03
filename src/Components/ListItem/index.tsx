import React, {useEffect, useState, memo} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

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

const ListItem: React.FC<Item> = (item) => {
  const [photo, setPhoto] = useState('');

  useEffect(() => {
    (async () => {
      const {data} = await axios.get(item.item.url);
      const photoUrl: string = data.sprites.front_default;
      setPhoto(photoUrl);
    })();
  }, []);

  return (
    <TouchableOpacity onPress={() => item.onPress()} style={styles.item}>
      <Text style={styles.title}>{item.item.name.toUpperCase()}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    width: width * 0.9,
    borderRadius: 5,
    borderWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default memo(ListItem);
