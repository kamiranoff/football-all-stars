import { Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SWIPE_THRESOLD = 0.25 * SCREEN_WIDTH;
const SWIPE_OUT_DURATION = 250;

export { SCREEN_WIDTH, SCREEN_HEIGHT, SWIPE_THRESOLD, SWIPE_OUT_DURATION };
