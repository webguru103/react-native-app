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
import { NavigationStackScreenProps } from 'react-navigation-stack';

import { hp, wp } from '../../utils/utility';
import { Text, Menu, Spinner } from 'react-native-ui-kitten/ui';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthService from '../../utils/services/auth';
import { withNavigation } from 'react-navigation';
import { AsyncStorage } from 'react-native';

interface ComponentProps {

}

export type MyAccountProps = ThemedComponentProps & ViewProps & ComponentProps & NavigationStackScreenProps;

interface State {
    user: object,
    version: string,
    selectedIndex: number,
    isLoading: boolean,
    isLoadingData: boolean,
    //navigate: string,
    //navigateOptions: any,
}

const MenuIcon = (url) => (
    <Image
        source={{ uri: url }}
        resizeMode={'contain'}
        style={{ width: hp(4), height: hp(4) }}
    />
);

class MyAccountComponent extends React.Component<MyAccountProps, State> {
    public state: State = {
        user: {
            id: '',
            firstname: '',
            lastname: '',
            email: '',
            admin: '',
            phone: '',
            homeId: ''
        },
        version: '1.0',
        selectedIndex: null,
        isLoading: false,
        isLoadingData: true,
        //navigate: '',
        //navigateOptions: {}
    };

    private menuData = [
        { title: 'My Profile', icon: () => MenuIcon('https://homekey-staging.s3.amazonaws.com/icons/icon-24-userprofile.png') },
        { title: 'Add Family Member', icon: () => MenuIcon('https://homekey-staging.s3.amazonaws.com/icons/icon-24-adduser.png') },
        { title: 'Feedback & Support', icon: () => MenuIcon('https://homekey-staging.s3.amazonaws.com/icons/icon-24-support.png') },
        { title: 'Sign Out', icon: () => this.state.isLoading ? <Spinner /> : MenuIcon('https://homekey-staging.s3.amazonaws.com/icons/icon-24-signout.png') },
    ];

    private onMenuItemSelect = async (i) => {
        this.setState({ selectedIndex: i, isLoading: true });
        switch (this.menuData[i].title) {
            case 'Sign Out':
                let signout = await AuthService.logout();
                if (signout == 'Done') {
                    this.props.navigation.navigate('Sign In')
                }
                else {
                    console.log('Something went wrong!')
                    console.log(signout)
                }
                this.setState({ isLoading: false });
                break;

            default:
                console.log('no action specified')
                this.setState({ isLoading: false });
                break;
        }
    }

    async componentDidMount() {
        let user = await AsyncStorage.getItem('user');
        let userObj = JSON.parse(user)
        this.setState({ user: userObj, isLoadingData: false })
    }

    public render(): React.ReactNode {
        const { style, themedStyle, ...restProps } = this.props;
        const { user } = this.state;
        return (
            <View
                style={[themedStyle.container, style]}
                {...restProps}>
                <View style={themedStyle.header}>
                    <View style={themedStyle.headerLogoContainer}>
                        <Image
                            source={{ uri: 'https://homekey-staging.s3.amazonaws.com/icons/keycode-icon.png' }}
                            resizeMode={'contain'}
                            style={themedStyle.headerLogo}
                        />
                    </View>

                    {this.state.isLoadingData ?
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                            <Spinner />
                        </View>
                        :
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
                            <Text category='h6' style={themedStyle.headerName}>{user.firstname || ''} {user.lastname || ''}</Text>
                            <Text category='s1' style={themedStyle.headerEmail}>{user.email || ''}</Text>
                        </View>
                    }

                </View>
                <View style={themedStyle.menu}>
                    <Menu
                        data={this.menuData}
                        selectedIndex={this.state.selectedIndex}
                        onSelect={this.onMenuItemSelect}
                        style={{ flex: 1, height: '100%', backgroundColor: 'white', paddingHorizontal: 20 }}
                    />
                </View>
                <View style={themedStyle.footer}>
                    <TouchableOpacity>
                        <Text category='s1' style={themedStyle.footerTerms}>Terms and Conditions</Text>
                    </TouchableOpacity>
                    <Text category='s2' style={themedStyle.footerText}>Version {this.state.version}</Text>
                    <Text category='s2' style={themedStyle.footerText}>HomeKey Systems, Inc.</Text>
                </View>
            </View>
        );
    }
}

export const MyAccount = withStyles(withNavigation(MyAccountComponent), (theme: ThemeType) => ({
    container: {
        flex: 1,
        //padding: 20
    },
    //HEADER SECTION
    header: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'red',
        borderBottomWidth: 1,
        borderBottomColor: theme['color-primary-200']
    },
    headerLogoContainer: {
        flex: 3,
        justifyContent: 'flex-end'
    },
    headerLogo: {
        //flex: 1,
        width: wp(50),
        height: wp(50),
    },
    headerName: {
        color: theme['color-primary-600']
    },
    headerEmail: {
        color: theme['color-basic-700']
    },
    //MENU LIST SECTION
    menu: {
        flex: 2,
        borderBottomWidth: 1,
        borderBottomColor: theme['color-primary-200']
    },
    menuItem: {

    },
    //FOOTER SECTION
    footer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerTerms: {
        color: theme['color-primary-500']
    },
    footerText: {
        color: theme['color-basic-600']
    }
}));
