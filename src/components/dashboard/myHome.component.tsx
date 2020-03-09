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
    CategoryMyHomeIcon,
    CategoryRoomsIcon,
    CategoryHomeSystemsIcon,
    CategoryOutsideIcon,
    CategorySolarIcon
} from '../../assets/icons/categories';
import { hp } from '../../utils/utility';
import { Text } from 'react-native-ui-kitten/ui';
import Carousel from 'react-native-snap-carousel';

const screen = Dimensions.get('screen');
const mainCardWidth = screen.width * 0.60;
const regularCardWidth = screen.width * 0.45;

interface ComponentProps {
    gotoScreen: (navigate: string, navigateOptions?: any) => void,
    home: {
        id: '',
        address1: '',
        address2: '',
        city: '',
        zipcode: ''
    }
}


export type MyHomeProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
    cards: Array<Object> | undefined;
    currentIndex: Number | undefined;
}

class MyHomeComponent extends React.Component<MyHomeProps, State> {
    public _carousel: any;
    public state: State = {
        cards: [
            {
                title: 'Home Details',
                width: mainCardWidth,
                text: `${this.props.home.address1}, ${this.props.home.city}, ${this.props.home.zipcode}`,
                icon: <CategoryMyHomeIcon />,
                onPress: () => { this.props.gotoScreen('home details', { id: this.props.home.id }); }
            },
            {
                title: 'Rooms',
                width: regularCardWidth,
                text: '',
                icon: <CategoryRoomsIcon />,
                onPress: () => {
                    this.props.gotoScreen('items', { type: 'Rooms' });
                }
            },
            {
                title: 'Home Systems',
                width: regularCardWidth,
                text: '',
                icon: <CategoryHomeSystemsIcon />,
                onPress: () => {
                    this.props.gotoScreen('items', { type: 'Home Systems' });
                }
            },
            {
                title: 'Outside',
                width: regularCardWidth,
                text: '',
                icon: <CategoryOutsideIcon />,
                onPress: () => {
                    this.props.gotoScreen('items', { type: 'Outdoors' });
                }
            },
            {
                title: 'Paint Colors',
                width: regularCardWidth,
                text: '',
                icon: <CategorySolarIcon />,
                onPress: () => { this.props.gotoScreen('paints', { type: 'Paint Colors' }) }
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
                {item.icon}
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
                <Text
                    style={themedStyle.inputLabel}
                    category='label'
                >
                    MY HOME
                </Text>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.cards}
                    renderItem={this._renderItem}
                    sliderWidth={screen.width}
                    itemWidth={regularCardWidth}
                    activeSlideAlignment={'start'}
                    //layoutCardOffset={'100'}
                    slideStyle={{ padding: hp(2), marginRight: this.state.currentIndex == 0 ? mainCardWidth - regularCardWidth : 0 }}

                    //onScroll={(event) => { console.log(event) } }
                    onBeforeSnapToItem={(slideIndex) => { this.setState({ currentIndex: slideIndex }) }}
                    useScrollView
                />
            </View>
        );
    }
}

export const MyHome = withStyles(MyHomeComponent, (theme: ThemeType) => ({
    container: {
        //padding: 20
    },
    inputLabel: {
        color: 'gray',
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
        fontSize: hp(2),
        fontWeight: 'bold'
    },
    logoImage: {
        height: hp(5),

    },
    cardStyle: {
        justifyContent: 'space-between',
        height: hp(22),
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
