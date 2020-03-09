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
    smartShopCard,
    ImageSource
} from '../../assets/images';
import { hp, wp } from '../../utils/utility';
import { Text, Button } from 'react-native-ui-kitten/ui';

interface ComponentProps {

}

export type SmartShopProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
    
}

class SmartShopComponent extends React.Component<SmartShopProps, State> {
    private smartShopCard: ImageSource = smartShopCard;
    public state: State = {
        
    };

    public render(): React.ReactNode {
        const { style, themedStyle, ...restProps } = this.props;

        return (
            <View
                style={[themedStyle.container, style]}
                {...restProps}>
                <ImageBackground
                    source={this.smartShopCard.imageSource}
                    style={[themedStyle.cardStyle]}
                    imageStyle={[themedStyle.imageStyle]}
                >
                    <Text style={themedStyle.topText}>Products for your home.</Text>
                    <Button status='control' style={themedStyle.button}>Shop Now</Button>
                    <Text style={themedStyle.bottomText}>Free 2 Day Shipping with Amazon Prime</Text>
                </ImageBackground>
            </View>
        );
    }
}

export const SmartShop = withStyles(SmartShopComponent, (theme: ThemeType) => ({
    container: {
        padding: 20
    },
    inputLabel: {
        color: 'gray',
        fontSize: hp(2),
        lineHeight: 16,
        paddingLeft: 20
    },
    cardStyle: {
        justifyContent: 'space-around',
        height: hp(33),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center'
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
