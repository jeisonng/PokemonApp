import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
const {width, height} = Dimensions.get('screen');

interface Pokemon {
  name: string;
  url: string;
}

interface Moves {
  name: string;
}

interface Types {
  name: string;
}

interface PokemonDetail {
  name: string;
  photoUrl: string;
  moves: Moves[];
  types: Types[];
  id:number;
}

interface Item {
  item: Pokemon;
}

interface Params {
  params: Item;
}

interface Props {
  route: Params;
}

const PokemonDetail: React.FC<Props> = (props) => {
  const [pokemon, setPokemon] = useState<PokemonDetail>();
  const [loading, setLoading] = useState<boolean>(false);

  function selectColor(color: string) {
    switch (color) {
      case 'grass':
        return '#1aff1a';
      case 'poison':
        return '#7a00cc';
      case 'fire':
        return '#cc0000';
      case 'flying':
        return '#f5e2e2';
      case 'water':
        return '#000099';
      case 'bug':
        return '#009900';
      case 'steel':
        return '#e4e2e2';
      case 'dragon':
        return '#b36b00';
    }
  }

  useEffect(() => {
    async function getPokemon() {
      try {
        setLoading(true);
        const item: Pokemon = props.route.params.item;
        const {data} = await axios.get(item.url);
        const moves: Moves[] = data.moves.map((e: any) => {
          return {name: e.move.name};
        });
        const types: Types[] = data.types.map((e: any) => {
          return {name: e.type.name};
        });
        const photoUrl: string = data.sprites.front_default;
        const name: string = data.name;
        const id: number = data.id;
        const pokemon: PokemonDetail = {
          name,
          photoUrl,
          moves,
          types,
          id
        };
        setPokemon(pokemon);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getPokemon();
  }, []);

  if (loading)
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator color="green" size="large" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.cardContainer}>
        <View
          style={{
            alignSelf: 'flex-start',
            backgroundColor: 'tomato',
            marginLeft: -5,
            marginTop: -5,
            padding: 5,
            borderTopStartRadius:5,
            borderBottomRightRadius:5
          }}>
          <Text>#{pokemon?.id}</Text>
        </View>
        <Image
          style={styles.image}
          resizeMode="stretch"
          source={{
            uri: pokemon?.photoUrl,
          }}
        />
        <Text style={styles.name}>{pokemon?.name.toUpperCase()}</Text>
        <View style={styles.containerType}>
          {pokemon?.types.map((e, key) => {
            return (
              <Text style={{color: selectColor(e.name)}}>
                {e.name}
                <Text style={{color: 'black'}}>
                  {key === pokemon.types.length - 1 ? '' : ' / '}
                </Text>
              </Text>
            );
          })}
        </View>
      </View>
      <Text style={styles.moveTitle}>Movimentos</Text>
      <FlatList<Moves>
        data={pokemon?.moves || []}
        renderItem={({item}) => {
          return (
            <View style={styles.listMoves}>
              <Text>{item.name}</Text>
            </View>
          );
        }}
        keyExtractor={(item, key) =>
          String(key+item.name)
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderWidth: 1,
  },
  listMoves: {
    width: width * 0.9,
    padding: 10,
    borderColor: 'darkgray',
    borderRadius: 2,
    marginBottom: 3,
    marginHorizontal: 5,
    elevation: 2,
  },
  moveTitle: {
    width: width * 0.9,
    marginLeft: 10,
    fontSize: 20,
    marginBottom: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'tomato',
  },
  containerType: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: '#737373',
  },
});

export default PokemonDetail;
