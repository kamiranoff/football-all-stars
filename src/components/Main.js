import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import DATA from './../data/data';
import Deck from './Deck';
import CardComponent from './Card';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
  },
});

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