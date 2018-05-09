import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Animated,
  PanResponder,
  UIManager,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';

import {
  SCREEN_WIDTH,
  SWIPE_THRESOLD,
  SWIPE_OUT_DURATION
} from '../constants/index';

const styles = StyleSheet.create({
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH,
    right: 0,
  }
});

class Deck extends Component {

  constructor() {
    super();
    const position = new Animated.ValueXY();
    const panResponder = this.createPanResponder(position);

    this.position = position;
    this.state = {
      panResponder,
      index: 0
    };
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  createPanResponder(position) {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: 0 });
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESOLD) { // right
          const directiontoRight = SCREEN_WIDTH * 1.2;
          this.forceSwipe(directiontoRight);
        } else if (gesture.dx < -SWIPE_THRESOLD) { // left
          const directionToLeft = -SCREEN_WIDTH * 1.2;
          this.forceSwipe(directionToLeft);
        } else {
          this.resetPosition();
        }
      },
    });
  }

  getCardStyle() {
    const rotatationRange = SCREEN_WIDTH * 1.5;
    const rotate = this.position.x.interpolate({
      inputRange: [-rotatationRange, 0, rotatationRange],
      outputRange: ['-90deg', '0deg', '90deg'],
    });
    return {
      ...this.position.getLayout(),
      transform: [{ rotate }]
    }
  }

  forceSwipe(direction) {
    Animated.timing(this.position, {
      toValue: { x: direction, y: 0 },
      duration: SWIPE_OUT_DURATION,
    }).start(() => this.onSwipeComplete(direction));
  }

  onSwipeComplete() {
    const { data } = this.props;
    this.position.setValue({ x: 0, y: 0 });
    if (this.state.index === data.length - 1) {
      return this.setState({ index: 0 });
    }
    this.setState({ index: this.state.index + 1 });
  }

  resetPosition() {
    Animated.spring(this.position, {
      toValue: { x: 0, y: 0 }
    }).start();
  }

  renderCards() {
    const currentCardIndex = this.state.index;
    const { data, renderCard } = this.props;

    return data.map((item, index) => {
      if (index < currentCardIndex) {
        return null;
      }
      if (index === currentCardIndex) {
        return (
          <Animated.View
            key={item.id}
            style={[this.getCardStyle(), styles.cardStyle]}
            {...this.state.panResponder.panHandlers}
          >
            {renderCard(item)}
          </Animated.View>
        );
      }
      return (
        <Animated.View
          style={styles.cardStyle}
          key={item.id}
        >
          {this.props.renderCard(item)}
        </Animated.View>);
    }).reverse();
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

Deck.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    uri: PropTypes.number.isRequired,
  })).isRequired,
  renderCard: PropTypes.func.isRequired,
};


export default Deck;
