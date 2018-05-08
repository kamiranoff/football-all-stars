import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { SCREEN_HEIGHT } from '../constants';

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  image: { height: SCREEN_HEIGHT / 2 },
  text: { backgroundColor: 'white', padding: 20, textAlign: 'center' }
});

const CardComponent = ({ item }) => (
  <View style={styles.container}>
    <Image source={item.uri} style={styles.image} />
    <Text style={styles.text}>
      {item.text}
    </Text>
  </View>
);

CardComponent.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequred,
    text: PropTypes.string.isRequred,
    uri: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardComponent;