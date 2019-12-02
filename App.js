/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, StyleSheet, Dimensions, Animated, PanResponder, ScrollView, Image, Slider } from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class AppleMusicsUI extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isScrollEnabled: false,
    }
  }
  componentWillMount() {
    this.scrollOffset = 0
    this.animation = new Animated.ValueXY({ x: 0, y: SCREEN_HEIGHT - 80 })

    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        if ((this.state.isScrollEnabled && this.scrollOffset <= 0 && gestureState.dy > 0) || (!this.state.isScrollEnabled && gestureState.dy < 0)) {
          return true
        } else {
          return false
        }
      },
      onPanResponderGrant: (evt, gestureState) => {
        this.animation.extractOffset()
      },
      onPanResponderMove: (evt, gestureState) => {
        this.animation.setValue({ x: 0, y: gestureState.dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.moveY > SCREEN_HEIGHT - 120) {
          Animated.spring(this.animation.y, {
            toValue: 0, tension: 1
          }).start()
        }
        else if (gestureState.moveY < 120) {
          Animated.spring(this.animation.y, {
            toValue: 0, tension: 1
          }).start()
        }
        else if (gestureState.dy < 0) {
          this.setState({ isScrollEnabled: true })
          Animated.spring(this.animation.y, {
            toValue: -SCREEN_HEIGHT + 120,
            tension: 1
          }).start()
        }
        else if (gestureState.dy > 0) {
          this.setState({ isScrollEnabled: false })
          Animated.spring(this.animation.y, {
            toValue: SCREEN_HEIGHT - 120,
            tension: 1
          }).start()
        }
      }
    })
  }

  render() {

    const animatedHeight = {
      transform: this.animation.getTranslateTransform()
    }
    animatedImageHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 80],
      outputRange: [200, 32],
      extrapolate: 'clamp'
    })
    animatedSongTitleOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 80],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    })
    animatedImageMarginLeft = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 80],
      outputRange: [SCREEN_WIDTH / 2 - 100, 10],
      extrapolate: 'clamp'
    })
    animatedHeaderHeight = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 80],
      outputRange: [SCREEN_HEIGHT / 2, 80],
      extrapolate: 'clamp'
    })
    animatedSongsDetailsOpacity = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 500, SCREEN_HEIGHT - 80],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    })
    animatedBackgroundColor = this.animation.y.interpolate({
      inputRange: [0, SCREEN_HEIGHT - 80],
      outputRange: ['rgba(0,0,0,0.5)', 'white'],
      extrapolate: 'clamp'
    })
    return (
      <Animated.View style={{ flex: 1, backgroundColor: animatedBackgroundColor }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text style={{ color: '#fa95ed', fontSize: 22 }}>Hello World.....!</Text></View>
        <Animated.View {...this.panResponder.panHandlers} style={[animatedHeight, { position: 'absolute', left: 0, right: 0, zIndex: 10, backgroundColor: '#fff', height: SCREEN_HEIGHT }]}>
          <ScrollView scrollEnabled={this.state.isScrollEnabled}
            scrollEventThrottle={16}
            onScroll={event => {
              this.scrollOffset = event.nativeEvent.contentOffset.y

            }}
          >
            <Animated.View style={{ height: animatedHeaderHeight, borderTopWidth: 1, borderTopColor: '#ebe5e5', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', flex: 6, alignItems: 'center' }}>
                <Animated.View style={{ height: animatedImageHeight, width: animatedImageHeight, marginLeft: animatedImageMarginLeft }}>
                  <Image style={{ flex: 1, width: null, height: null }} source={require('./src/images/manas.jpg')} />
                </Animated.View>
                <Animated.Text style={{ opacity: animatedSongTitleOpacity, fontSize: 18, paddingLeft: 10 }}>
                  Michael Jackson - You Are Not Alone
              </Animated.Text>
              </View>
              <Animated.View style={{ flex: 1, flexDirection: 'row', opacity: animatedSongTitleOpacity, justifyContent: 'space-around' }}>
                <Icons name="md-pause" size={28} />
                <Icons name="md-play" size={28} />
              </Animated.View>
            </Animated.View>

            <Animated.View style={{ height: animatedHeaderHeight, opacity: animatedSongsDetailsOpacity }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Text style={{ fontWeight: 'bold', fontSize: 22 }}>Michael Jackson - You Are Not Alone</Text>
                <Text style={{ color: '#fa95ed', fontSize: 22 }}>Michael Jackson</Text>
              </View>
              <View style={{ height: 40, width: SCREEN_WIDTH, alignItems: 'center' }}>
                <Slider
                  style={{ width: 300 }}
                  step={1}
                  minimumValue={18}
                  maximumValue={71}
                  value={18}
                />
              </View>
              <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                <Icons name="md-rewind" size={40} />
                <Icons name="md-pause" size={50} />
                <Icons name="md-fastforward" size={40} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 20 }}>
                <Icons name="md-add" size={32} style={{ color: '#fa95ed' }} />
                <Icons name="md-more" size={32} style={{ color: '#fa95ed' }} />
              </View>
            </Animated.View>
            <View style={{ height: 1000 }} />
          </ScrollView>
        </Animated.View>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({

});