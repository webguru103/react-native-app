import React from 'react';
import {
    View,
    ViewProps,
    ScrollView,
    Image,
    TouchableOpacity,

} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from 'react-native-ui-kitten/theme';
import {
    Spinner
} from 'react-native-ui-kitten';
import {
    homeDetail,
    builderLogo2,
} from '../../assets/images';
import {
    LotPlanIcon,
    FloorPlanIcon
} from '../../assets/icons/categories';
import { hp, wp } from '../../utils/utility';
import { Text, Button, Icon, Modal, Layout } from 'react-native-ui-kitten/ui';
import APIService from '../../utils/services/api';

interface ComponentProps {
    gotoScreen: (navigate: string, navigationOptions?: any) => void;
    options: any;
}

export type HomeDetailsProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
    details: any,
    loading: boolean,
    showModal: boolean,
    modalImage: string,
}

const CloseIcon = (style) => (
    <Icon {...style} name='close' />
);

class HomeDetailsComponent extends React.Component<HomeDetailsProps, State> {
    //private HomeDetailsCard: ImageSource = HomeDetailsCard;
    public state: State = {
        loading: true,
        details: {},
        showModal: false,
        modalImage: ''
    };

    componentDidMount() {
        const { id } = this.props.options;
        APIService.getHomeDetail(id).then(details => {
            this.setState({ details: details, loading: false })
        })

    }

    private _onPressPlan(image) {
        this.setState({ modalImage: image, showModal: true })
    }

    private _handleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    private navigationKey: string = 'HomeDetails';
    public render(): React.ReactNode {
        const { style, themedStyle, ...restProps } = this.props;
        const { home, community, builder } = this.state.details;
        return (
            <View style={{ flex: 1, position: 'relative' }}>
                {this.state.loading ?
                    <View style={themedStyle.spinnerContainer}>
                        <Spinner />
                    </View>
                    :
                    <ScrollView
                        style={[themedStyle.container, style]}
                        {...restProps}>
                        <Image
                            source={{ uri: home.imageurl }}
                            resizeMode='cover'
                            style={themedStyle.headerImage}
                        />
                        <View style={themedStyle.info}>
                            <Text style={themedStyle.address}>{home.address1}, {home.city}, {home.zipcode}</Text>
                            <View style={themedStyle.specs}>
                                <Text style={themedStyle.specText}>{`${home.beds} Bed`}</Text>
                                <Text style={themedStyle.specText}>{`${home.baths} Bath`}</Text>
                                <Text style={themedStyle.specText}>{`${home.garages} Garage`}</Text>
                                <Text style={themedStyle.specText}>{`${home.squarefeets} sqft`}</Text>
                            </View>
                            <View >
                                <Text style={themedStyle.title}>COMMUNITY</Text>
                                <Text style={themedStyle.specText}>{`${community.name}`}</Text>
                            </View>
                            <View style={[themedStyle.specs, {}]}>
                                <View style={{ flex: 1 }}>
                                    <Text style={themedStyle.title}>LOT SIZE</Text>
                                    <Text style={themedStyle.specText}>{`${home.lotsize}`}</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Text style={themedStyle.title}>PARCEL</Text>
                                    <Text style={themedStyle.specText}>{`${home.parcelnumber}`}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={themedStyle.info}>
                            <View style={themedStyle.builderBox}>
                                <View style={themedStyle.boxHeader}>
                                    <Text style={[themedStyle.titleBuilder]}>HOME BUILT BY</Text>
                                    <View style={themedStyle.boxSubheader}>
                                        <Image
                                            source={builderLogo2.imageSource}
                                            style={themedStyle.builderLogo}
                                            resizeMode={'contain'}
                                        />
                                        <Text category='s1' style={themedStyle.builderName}>{builder.companyname}</Text>
                                    </View>
                                </View>
                                <View style={[themedStyle.specs, {}]}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={themedStyle.title}>YEAR BUILT</Text>
                                        <Text style={themedStyle.specText}>{`${home.yearbuilt}`}</Text>
                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <Text style={themedStyle.title}>LOT</Text>
                                        <Text style={themedStyle.specText}>{`${home.lot}`}</Text>
                                    </View>
                                </View>
                                <View style={[themedStyle.specs, {}]}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={themedStyle.title}>MODEL</Text>
                                        <Text style={themedStyle.specText}>{`${home.modelname}`}</Text>
                                    </View>

                                </View>
                                <Button
                                    appearance='outline'
                                    status='info'
                                    style={themedStyle.button}
                                >
                                    {`${builder.companyname} Website`}
                                </Button>
                            </View>

                        </View>
                        <View style={themedStyle.roomsContainer}>
                            <TouchableOpacity
                                style={[themedStyle.cardStyle]}
                                onPress={() => { this._onPressPlan(home.floorplanurl) }}
                            >
                                <FloorPlanIcon />
                                <Text style={themedStyle.cardTitle}>Floor Plan</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[themedStyle.cardStyle]}
                                onPress={() => { this._onPressPlan(home.lotplanurl) }}
                            >
                                <LotPlanIcon />
                                <Text style={themedStyle.cardTitle}>Lot Plan</Text>
                            </TouchableOpacity>
                        </View>

                    </ScrollView>
                }
                <Modal
                    visible={this.state.showModal}
                    allowBackdrop={true}
                    backdropStyle={themedStyle.backdrop}
                    onBackdropPress={() => { this._handleModal() }}
                >
                    <Layout
                        style={{ width: wp(90) }}
                    >
                        <Image
                            source={{ uri: this.state.modalImage }}
                            resizeMode='cover'
                            style={themedStyle.modalImage}
                        />
                        <Button
                            onPress={() => { this._handleModal() }}
                            style={themedStyle.closeButtonModal}
                            appearance='outline'
                            status='info'
                            icon={CloseIcon} />
                    </Layout>
                </Modal>
                <Button
                    onPress={() => { this.props.gotoScreen('') }}
                    style={themedStyle.closeButton}
                    appearance='outline'
                    status='info'
                    icon={CloseIcon} />
            </View>
        );
    }
}

export const HomeDetails = withStyles(HomeDetailsComponent, (theme: ThemeType) => ({
    container: {
        //backgroundColor: theme['color-basic-200']
    },
    headerImage: {
        height: hp(40),
        width: '100%'
    },
    modalImage: {
        height: hp(40),
        width: '100%'
    },
    info: {
        padding: 20
    },
    title: {
        fontSize: hp(1.2),
        color: theme['color-basic-700'],
        marginTop: 10
    },
    address: {
        fontSize: hp(1.5),
        color: theme['color-basic-700'],
    },
    specs: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    specText: {
        fontSize: hp(2),
        borderRightColor: 'black',
        borderRightWidth: 1,
        paddingRight: 10,
        color: theme['color-basic-800'],
        fontWeight: 'bold'
    },
    //Builder section
    builderBox: {
        padding: 20,
        backgroundColor: theme['color-basic-400'],
        borderRadius: 10,

    },
    boxHeader: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxSubheader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    builderLogo: {
        height: hp(7),
        width: hp(7),
        //flex: 1
    },
    builderName: {
        //flex: 1,
        fontSize: hp(2.5),
        lineHeight: hp(7),
        paddingLeft: 10,
        fontWeight: '300',
        color: theme['color-primary-900']
    },
    titleBuilder: {
        fontSize: hp(2),
        color: theme['color-basic-600'],
        fontWeight: 'bold'

    },
    button: {
        marginTop: 20,
        backgroundColor: 'white'
    },
    //HOME ROOMS
    roomsContainer: {
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cardStyle: {
        flex: 1,
        justifyContent: 'space-between',
        height: hp(20),
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: hp(2),
        marginHorizontal: 10,
        marginBottom: 30,
        shadowColor: theme['color-basic-600'],
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    //FIXED CLOSE BUTTON
    closeButton: {
        flex: 1,
        backgroundColor: 'white',
        width: 10,
        borderRadius: 50,
        position: 'absolute',
        top: 40,
        right: 30,
        borderColor: 'transparent'
    },
    closeButtonModal: {
        flex: 1,
        backgroundColor: 'white',
        width: 5,
        top: 5,
        left: 5,
        borderRadius: 50,
        position: 'absolute',
    },
    spinnerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}));
