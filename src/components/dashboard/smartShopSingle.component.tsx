import React from 'react';
import {
    View,
    ViewProps,
    Image,
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from 'react-native-ui-kitten/theme';
import {
    FooterShopTabIcon
} from '../../assets/icons/footer';
import {
    smartShopCard,
    ImageSource
} from '../../assets/images';
import { hp, wp } from '../../utils/utility';
import { Text, Button } from 'react-native-ui-kitten/ui';


interface ComponentProps {

}

export type SmartShopSingleProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {

}

class SmartShopSingleComponent extends React.Component<SmartShopSingleProps, State> {
    private smartShopCard: ImageSource = smartShopCard;
    public state: State = {

    };

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
                <View
                    style={[themedStyle.cardStyle]}
                >
                    <View style={themedStyle.cardTop}>
                        <Image
                            source={{ uri: 'https://homekey-staging.s3.amazonaws.com/smart-shop/googlehome.png' }}
                            style={themedStyle.image}
                            resizeMode='contain'
                        />
                        <View style={{ flex: 2, alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                            <Text category='label'>LOWE'S HOME IMPROVEMENT</Text>
                            <Text category='s1' style={themedStyle.price}>$21,98 / GALLON</Text>
                            <Button size='small' status='info' appearance='outline'>Buy Now</Button>
                        </View>
                    </View>
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
                        <Text category='c1'>Price shown as of 08/09/19.</Text>
                        <Text category='c1'>Current price can be seen when clicking Buy Now</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export const SmartShopSingle = withStyles(SmartShopSingleComponent, (theme: ThemeType) => ({
    container: {
        padding: 20,
        backgroundColor: theme['color-basic-200']
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
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
    price: {
        color: theme['color-primary-700']
    },
    image: {
        flex: 1,
        width: '100%'
    },
    inputLabel: {
        color: 'gray',
        fontSize: hp(2),
        lineHeight: 16,
        paddingLeft: 20
    },
    cardStyle: {
        justifyContent: 'space-around',
        backgroundColor: 'white',
        height: hp(25),
        borderColor: 'white',
        borderWidth: 1,
        alignItems: 'center',
        //SHADOW
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    cardTop: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    imageStyle: {
        borderRadius: 10
    },
    topText: {
        color: 'white',
        paddingTop: hp(3),
        textAlign: 'center',
        fontSize: hp(3),
        fontWeight: 'bold'
    },
    bottomText: {
        color: 'white',
        paddingBottom: hp(1),
        textAlign: 'center',
        fontSize: hp(1.5)
    },
    button: {
        width: '50%'
    }
}));
