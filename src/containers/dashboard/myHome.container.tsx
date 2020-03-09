import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Platform, StyleSheet, ScrollView, View, Image } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {
    BottomNavigation,
    BottomNavigationTab,
    Layout,
    Text,
    Spinner
} from 'react-native-ui-kitten';
import {
    FooterHomeTabIcon,
    FooterTodosTabIcon,
    FooterShopTabIcon,
    FooterMessagesTabIcon,
    FooterAccountTabIcon
} from '../../assets/icons/footer';
import { hp } from '../../utils/utility';
import {
    imageSmallLogo,
    ImageSource
} from '../../assets/images';

import { MyHome, Ideas, Todos, SmartShop, ItemsListItem, MyAccount } from '../../components/dashboard';
import ItemsListContainer from './itemsList/itemsList.container';
import ItemDetailsContainer from './itemDetail/itemDetail.container';
import PaintsListContainer from './paintsList/paintsList.container';
import PaintDetailsContainer from './paintDetail/paintDetail.container';
import {
    HomeDetails
} from '../../components/dashboard';

import APIService from '../../utils/services/api';

interface State {
    loading: boolean;
    navigate: string;
    navigateOptions: any;
    dashboard: any;
}

export class MyHomeContainer extends React.Component<{}, State> {

    public state = {
        loading: true,
        navigate: '',
        navigateOptions: {},
        dashboard: {
            home: {},
            ideas: [],
            todos: [],
            smartShop: {}
        }
    }

    private logoImage: ImageSource = imageSmallLogo;

    private navigationKey: string = 'MyHomeContainer';

    componentDidMount() {
        APIService.getDashboard().then(dashboard => {
            this.setState({ dashboard: dashboard, loading: false })
        })
    }

    private gotoScreen = (navigate: string, navigateOptions?: any) => {
        this.setState({ navigate, navigateOptions })
    }

    public render(): React.ReactNode {
        
        if (this.state.navigate === 'items') {
            return (
                <ItemsListContainer gotoScreen={this.gotoScreen} options={this.state.navigateOptions} />
            );
        } else if (this.state.navigate === 'item details' || this.state.navigate === 'subitem details') {
            return (
                <ItemDetailsContainer gotoScreen={this.gotoScreen} options={this.state.navigateOptions} />
            );
        } else if (this.state.navigate === 'home details') {
            return (
                <HomeDetails gotoScreen={this.gotoScreen} options={this.state.navigateOptions} />
            )
        } else if (this.state.navigate === 'paints') {
            return (
                <PaintsListContainer gotoScreen={this.gotoScreen} options={this.state.navigateOptions} />
            );
        } else if (this.state.navigate === 'paint details') {
            return (
                <PaintDetailsContainer gotoScreen={this.gotoScreen} options={this.state.navigateOptions} />
            );
        }
        
        return (
            <Layout style={style.layout}>
                <View
                    style={style.topNav}
                >
                    <Image
                        source={this.logoImage.imageSource}
                        style={{
                            height: Platform.select({
                                ios: getStatusBarHeight(),
                                android: 0,
                            }),

                        }}
                        resizeMode='contain'
                    />
                </View>
                {this.state.loading ?
                    <View style={style.spinnerContainer}>
                        <Spinner />
                    </View>
                    :
                    <ScrollView style={style.scrollView}>
                        <MyHome home={this.state.dashboard.home} gotoScreen={this.gotoScreen} />
                        <Ideas />
                        <Todos />
                        <SmartShop />
                    </ScrollView>
                }
            </Layout>
        );
    }
}

const style = StyleSheet.create({
    layout: {
        backgroundColor: '#FAFAFA',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
    },
    spinnerContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {

    },
    topNav: {
        paddingTop: hp(5),
        paddingBottom: hp(1),
        marginBottom: hp(2),
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

//RENDER ICON FUNCTIONS
const HomeIcon = (style) => (<FooterHomeTabIcon />);
const ToDosIcon = (style) => (<FooterTodosTabIcon />);
const ShopIcon = (style) => (<FooterShopTabIcon />);
const MessagesIcon = (style) => (<FooterMessagesTabIcon />);
const AccountIcon = (style) => (<FooterAccountTabIcon />);
//COMPONENTS TABS
const MyHomeScreen = () => (
    <MyHomeContainer />
);

const ToDosScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>ToDo`s</Text>
    </Layout>
);

const ShopScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Shop</Text>
    </Layout>
);

const MessagesScreen = () => (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Messages</Text>
    </Layout>
);

const AccountScreen = () => (
    <MyAccount />
);
//END COMPONENTS TABS

const DashboardContainer = ({ navigation }) => {

    const onSelect = (index) => {
        const selectedTabRoute = navigation.state.routes[index];
        navigation.navigate(selectedTabRoute.routeName);
    };

    return (
        <BottomNavigation
            style={{
                marginVertical: 8,
                paddingTop: 0,
                borderTopWidth: 10,
                borderTopColor: '#ffffff',
            }}
            appearance='noIndicator'
            selectedIndex={navigation.state.index}
            onSelect={onSelect}>
            <BottomNavigationTab title='Home' icon={HomeIcon} />
            <BottomNavigationTab title='To-Do`s' icon={ToDosIcon} />
            <BottomNavigationTab title='Shop' icon={ShopIcon} />
            <BottomNavigationTab title='Messages' icon={MessagesIcon} />
            <BottomNavigationTab title='Account' icon={AccountIcon} />
        </BottomNavigation>
    );
}

const DashboardNavigator = createBottomTabNavigator({
    MyHome: MyHomeScreen,
    ToDos: ToDosScreen,
    Shop: ShopScreen,
    Messages: MessagesScreen,
    Account: AccountScreen,
}, {
    tabBarComponent: DashboardContainer,
});

export const DashboardNav = createAppContainer(DashboardNavigator);

