import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import Deck from './Deck';
import CardComponent from './Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
});

const sane = require('./../assets/leroy-sane.png');
const bravo = require('./../assets/claudio-bravo.png');
const aguero = require('./../assets/sergio-aguero.png');

const DATA = [
  { id: 1, text: 'Sergio Aguero', uri: aguero },
  { id: 2, text: 'Claudio Bravo', uri: bravo },
  { id: 3, text: 'Leroy Sane', uri: sane },
];

class Main extends Component {

  renderCard(item) {
    return (<CardComponent
      key={item.id}
      item={item}
    />);
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
        />
      </View>
    );
  }
}

export default Main;