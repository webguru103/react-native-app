import React from 'react';
import {
    View,
    ViewProps,
    ImageBackground,
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from 'react-native-ui-kitten/theme';
import {
    walmartGiftCard,
    insuranceGiftCard,
    amazonGiftCard,
    googleGiftCard,
    ImageSource
} from '../../assets/images';
import { hp, wp } from '../../utils/utility';
import { Text, Button } from 'react-native-ui-kitten/ui';
import Carousel from 'react-native-snap-carousel';

interface ComponentProps {

}

export type IdeasProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
    cards: Array<Object> | undefined;
    currentIndex: Number | undefined;
}

class IdeasComponent extends React.Component<IdeasProps, State> {
    private amazonCard: ImageSource = amazonGiftCard;
    private walmartCard: ImageSource = walmartGiftCard;
    private insuranceCard: ImageSource = insuranceGiftCard;
    private googleCard: ImageSource = googleGiftCard;
    public _carousel: any;
    public state: State = {
        cards: [
            {
                message: {
                    text: 'Custom text which can be fetched from API service',
                    style: { color: 'white', fontSize: hp(2.5), alignSelf: 'center', margin: 20 }
                },
                image: {
                    source: this.amazonCard.imageSource,
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                button: {
                    title: 'Action Title',
                    props: {
                        onPress: () => { console.log('Custom onPress action') },
                        appearance: 'ghost',
                        style: {
                            backgroundColor: 'white',
                            width: '50%',
                            alignSelf: 'center',
                            marginBottom: 10,
                            borderColor: 'white'
                        },
                        textStyle: {
                            color: 'orange'
                        }
                    }
                }
            },
            {
                message: false,
                image: {
                    source: this.walmartCard.imageSource,
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                button: false
            },
            {
                message: false,
                containerStyle: {
                    justifyContent: 'flex-end',
                    aligItems: 'flex-end'
                },
                image: {
                    source: this.insuranceCard.imageSource,
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                button: {
                    title: 'Only Button',
                    props: {
                        onPress: () => { console.log('Custom onPress action') },
                        appearance: 'outline',
                        style: {
                            backgroundColor: 'transparent',
                            width: '50%',
                            alignSelf: 'center',
                            marginBottom: 10,
                            borderColor: 'white'
                        },
                        textStyle: {
                            color: 'blue'
                        }
                    }
                }
            },
            {
                containerStyle: {
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                },
                message: {
                    text: 'Text without button...',
                    style: { color: 'white', fontSize: 20, fontWeight: 'bold' }
                },
                image: {
                    source: this.googleCard.imageSource,
                    style: {
                        width: '100%',
                        height: '100%'
                    }
                },
                button: false
            }
        ],
        currentIndex: 0
    };

    private _renderItem = ({ item, index }) => {
        const { style, themedStyle } = this.props;
        return (
            <ImageBackground
                source={item.image.source}
                style={[themedStyle.cardStyle, item.containerStyle ? item.containerStyle : null ]}
                imageStyle={[themedStyle.imageStyle, item.image.style ? item.image.style : null]}
            >
                {item.message ?
                    <Text style={item.message.style}>{item.message.text}</Text>
                    : null}
                {item.button ?
                    <Button {...item.button.props ? item.button.props : null}>{item.button.title}</Button>
                    : null}
            </ImageBackground>
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
                    IDEAS
                </Text>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={this.state.cards}
                    renderItem={this._renderItem}
                    sliderWidth={wp(100)}
                    itemWidth={wp(85)}
                    //activeSlideAlignment={'start'}
                    slideStyle={{ paddingVertical: hp(2) }}
                    onBeforeSnapToItem={(slideIndex) => { this.setState({ currentIndex: slideIndex }) }}
                    useScrollView
                />
            </View>
        );
    }
}

export const Ideas = withStyles(IdeasComponent, (theme: ThemeType) => ({
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
    cardStyle: {
        justifyContent: 'space-between',
        height: hp(25),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
    imageStyle: {
        borderRadius: 10
    }
}));
