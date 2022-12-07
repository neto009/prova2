import { useState } from 'react';
import { StyleSheet, ActivityIndicator, Text, View, StatusBar, TextInput, Button, Image } from 'react-native';

export default function App() {

  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [url, setUrl] = useState();
  const [enviado, setEnviado] = useState(false);
  const [buscou, setBuscou] = useState(false);

  const loadData = () =>{
    setEnviado(true);
    console.log("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date="+data)
    fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date="+data)
      .then(res => res.json())
      .then(res => {
        setUrl(res.url)
        console.log(url)
        if(url != "undefined"){
          setBuscou(true)
        }
      })
      .catch(error => {
        console.log(error)
      })

  }

  const back =() => {
    setEnviado(false)
  }


  return (
    <View>
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
        BUSCADOR DE IMAGEM NASA!
      </Text>
    </View>
    {!enviado ? (
        <>
          <TextInput
            style={styles.box}
            onChangeText={texto => setData(texto)}
            value={data}
          />
        <View style={styles.buttons}>
          <Button
              title="Buscar"
              onPress={() => {
                loadData();
              }}
            />
        </View>
        </>
      ) : !buscou ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <View style={styles.buttons}>
            <Button
                title="Voltar"
                onPress={() => {
                  back();
                }}
              />
          </View>
          <Image
            style={{width: "100%", height: "83%"}}
            resizeMode='contain'
            source={{uri: url}}
            />
          </View>
      )}
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  box: { 
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    padding: 5,
    color: '#4682B4',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#E6E6FA',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25
  },
  buttons: {
    margin: 20
  }

});
