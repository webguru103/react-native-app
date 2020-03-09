import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Layout, Text } from 'react-native-ui-kitten';

import { wp, hp } from '../utils/utility';

const ExampleItems = [
  {
    title: 'Home Details',
    subtitle: 'Pensacola, FL 32502',
    illustration: 'https://i.imgur.com/UYiroysl.jpg',
  },
  {
    title: 'Rooms',
    subtitle: 'Lorem ipsum',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg',
  },
  {
    title: 'Home Systems',
    subtitle: 'Lorem ipsum',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg',
  },
  {
    title: 'Outside',
    subtitle: 'Lorem ipsum',
    illustration: 'https://i.imgur.com/KZsmUi2l.jpg',
  },
  {
    title: 'Paint Colors',
    subtitle: 'Lorem ipsum',
    illustration: 'https://i.imgur.com/2nCt3Sbl.jpg',
  },
  {
    title: 'Floors',
    subtitle: 'Lorem ipsum',
    illustration: 'https://i.imgur.com/lceHsT6l.jpg',
  },
];

const sliderWidth = wp(100);
const itemWidth = wp(75) + 2 * wp(2);
const sliderHeight = hp(36);

class HomeListC extends Component<{}, {}> {

  private renderItems = ({item, index}) => {
    return (
      <Layout level='2'>
        <Text>{item.title}</Text>
        <Image source={{ uri: item.illustration }} style={styles.image} />
      </Layout>
    )
  }

  public render() {
    return (
      <Layout style={styles.container}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={ExampleItems}
          renderItem={this.renderItems}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    height: sliderHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default HomeListC;
