import React from 'react';
import {
    View,
    ViewProps,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from 'react-native-ui-kitten/theme';
import {
    FooterShopTabIcon
} from '../../assets/icons/footer';
import { hp } from '../../utils/utility';
import { Text } from 'react-native-ui-kitten/ui';
import Carousel from 'react-native-snap-carousel';

const screen = Dimensions.get('screen');

const regularCardWidth = hp(15);

interface ComponentProps {
    //gotoScreen: (navigate: string, navigateOptions?: any) => void,

}


export type SmartShopCarouselProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
    cards: Array<Object> | undefined;
    currentIndex: Number | undefined;
}

class SmartShopCarouselComponent extends React.Component<SmartShopCarouselProps, State> {
    public _carousel: any;
    public state: State = {
        cards: [
            {
                title: 'Classic Chair',
                width: regularCardWidth,
                text: '',
                image: 'https://homekey-staging.s3.amazonaws.com/smart-shop/chair.png',
                onPress: () => {
                    //this.props.gotoScreen('items', { type: 'Rooms' });
                }
            },
            {
                title: 'Google Home',
                width: regularCardWidth,
                text: '',
                image: 'https://homekey-staging.s3.amazonaws.com/smart-shop/googlehome.png',
                onPress: () => {
                    //this.props.gotoScreen('items', { type: 'Home Systems' });
                }
            },
            {
                title: 'Glass Cleaner',
                width: regularCardWidth,
                text: '',
                image: 'https://homekey-staging.s3.amazonaws.com/smart-shop/glass-cleaner.png',
                onPress: () => {
                    //this.props.gotoScreen('items', { type: 'Outdoors' });
                }
            },
            {
                title: 'Outdoor Lights',
                width: regularCardWidth,
                text: '',
                image: 'https://homekey-staging.s3.amazonaws.com/smart-shop/lighting.jpg',
                onPress: () => { console.log('navigate') }
            },
        ],
        currentIndex: 0
    };

    private _renderItem = ({ item, index }) => {
        const { style, themedStyle } = this.props;
        return (
            <TouchableOpacity
                style={[themedStyle.cardStyle, { width: item.width }]}
                onPress={item.onPress}
            >
                <Image
                    source={{ uri: item.image || 'https://homekey-staging.s3.amazonaws.com/home-item-image/1570038002-sample.jpg' }}
                    resizeMode='cover'
                    style={themedStyle.logoImage}
                />
                {item.text != '' ?
                    <Text numberOfLines={2} style={themedStyle.cardText}>{item.text}</Text>
                    : null}
                <Text style={themedStyle.cardTitle}>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    public render(): React.ReactNode {
        const { style, themedStyle, ...restProps } = this.props;

        return (
            <View
                style={[themedStyle.container, style]}
                {...restProps}>
                <View style={themedStyle.title}>
                    <FooterShopTabIcon />
                    <Text style={themedStyle.title1}>Smart</Text>
                    <Text style={themedStyle.title2}>Shop</Text>

                </View>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.cards}
                    renderItem={this._renderItem}
                    sliderWidth={screen.width}
                    itemWidth={regularCardWidth}
                    activeSlideAlignment={'start'}
                    //layoutCardOffset={'100'}
                    slideStyle={{ padding: hp(2) }}

                    //onScroll={(event) => { console.log(event) } }
                    onBeforeSnapToItem={(slideIndex) => { this.setState({ currentIndex: slideIndex }) }}
                    useScrollView
                />
            </View>
        );
    }
}

export const SmartShopCarousel = withStyles(SmartShopCarouselComponent, (theme: ThemeType) => ({
    container: {
        paddingTop: 20
    },
    inputLabel: {
        color: theme['color-primary-700'],
        fontSize: hp(2),
        lineHeight: 16,
        //marginBottom: 6,
        paddingLeft: 20
    },
    cardText: {
        color: '#4169E1',
        fontSize: hp(1.5),
        fontWeight: '300'
    },
    cardTitle: {
        color: '#696969',
        fontSize: hp(1),

    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    title1: {
        color: theme['color-primary-500'],
        fontWeight: 'bold',
        fontSize: hp(2)
    },
    title2: {
        color: theme['color-primary-800'],
        fontWeight: 'bold',
        fontSize: hp(2)
    },
    logoImage: {
        height: hp(6),
        width: hp(6),
    },
    cardStyle: {
        justifyContent: 'space-between',
        height: hp(15),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: hp(2),

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
}));
