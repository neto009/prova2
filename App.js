import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, StatusBar, FlatList, Image } from 'react-native';

export default function App() {

  const [list, setList] = useState([])

  useEffect(() => {
    loadData();
  }, [])

  const loadData = () =>{
    fetch("https://valorant-api.com/v1/playercards")
      .then(res => res.json())
      .then(res => {
        var data = res.data
        setList(data)
      })
      .catch(error => {
        console.log(error)
      })

  }


  return (
    <SafeAreaView>
      <StatusBar
        barStyle = "ligh-content"
        hidden = {false}
        backgroundColor = "#708090"
        translucent = {false}
        networkActivityIndicatorVisible = {true}
      />
    <View style={styles.container}>
    <View>
      <Text style={styles.title}>
        VALORANT
      </Text>
    </View>
    <FlatList
        data={list}
        numColumns={2}
        pagingEnabled
        keyExtractor={(item, index) => item.uuid}
        renderItem={({item}) => 
        <View style={styles.cards}>
          <Text style={styles.cardText}>{item.displayName}</Text>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: item.smallArt}}/>
        </View>
        }
      />
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#084d6e',
    justifyContent: 'center',
  },
  MainContainer :{
    justifyContent: 'center',
    alignItems:'center',
    flex:1,
  },
  cards: {
    flex: 1, 
    margin: 10,
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor: '#FFEFD5',
    paddingBottom: 15,
    borderRadius: 12
  },
  cardText: {
    padding: 5,
    color: '#2c2c2c',
    fontWeight: 'bold'
  },
  title: {
    padding: 5,
    color: '#4682B4',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    backgroundColor: '#E6E6FA',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  }

});
