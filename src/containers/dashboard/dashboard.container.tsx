import React from 'react';
import { createAppContainer, SafeAreaView } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Image } from 'react-native';
import {
    BottomNavigation,
    BottomNavigationTab,
    Layout,
    Text
} from 'react-native-ui-kitten';
import { FooterHomeTabIcon, FooterTodosTabIcon, FooterShopTabIcon, FooterMessagesTabIcon, FooterAccountTabIcon } from '../../assets/icons/footer';
import { hp } from '../../utils/utility';

/* INPORT TAB COMPONENTS */
import { MyHomeContainer } from './index';

//RENDER ICON FUNCTIONS
const HomeIcon = (style) => (<FooterHomeTabIcon />);
const ToDosIcon = (style) => (<FooterTodosTabIcon />);
const ShopIcon = (style) => (<FooterShopTabIcon />);
const MessagesIcon = (style) => (<FooterMessagesTabIcon />);
const AccountIcon = (style) => (<FooterAccountTabIcon />);
//END RENDER ICONS

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
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text category='h1'>Account</Text>
    </Layout>
);
//END COMPONENTS TABS

const DashboardContainer = ({ navigation }) => {

    const onSelect = (index) => {
        const selectedTabRoute = navigation.state.routes[index];
        navigation.navigate(selectedTabRoute.routeName);
    };

    return (
        <SafeAreaView>

            <BottomNavigation
                selectedIndex={navigation.state.index}
                onSelect={onSelect}>
                <BottomNavigationTab title='Home' icon={HomeIcon} />
                <BottomNavigationTab title='To-Do`s' icon={ToDosIcon} />
                <BottomNavigationTab title='Shop' icon={ShopIcon} />
                <BottomNavigationTab title='Messages' icon={MessagesIcon} />
                <BottomNavigationTab title='Account' icon={AccountIcon} />
            </BottomNavigation>

        </SafeAreaView>
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


