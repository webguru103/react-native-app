import React from 'react';
import {
    View,
    ScrollView,
    TouchableWithoutFeedback
} from 'react-native';
import {
    StyleType,
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from 'react-native-ui-kitten/theme';
import {
    Layout,
    Text,
    Icon,
    Spinner
} from 'react-native-ui-kitten/ui';
import {
    PaintsListItem
} from '../../../components/dashboard';
import {
    wp,
    hp
} from '../../../utils/utility';

interface ComponentProps {
    onPaintsDetail: (item: any) => void;
    onBackToDashboard: () => void;
    itemType: string;
    items: Array<Object> | undefined;
    loading: boolean;
}

export type PaintsListProps = ThemedComponentProps & ComponentProps;

interface State {
    items: Array<Object> | undefined;
}

class PaintsListComponent extends React.Component<PaintsListProps, State> {

    public state: State = {
        items: undefined,
    };

    public render(): React.ReactNode {
        const { themedStyle, items, loading } = this.props;
        console.log(this.props)
        return (
            <Layout style={themedStyle.mainContainer}>
                <View style={themedStyle.headerContainer}>
                    <TouchableWithoutFeedback onPress={this.props.onBackToDashboard} style={themedStyle.backIcon}>
                        <Icon name='arrow-left' width={15} height={15} fill='#2D2F78' />
                    </TouchableWithoutFeedback>
                    <Text
                        style={themedStyle.headerLabel}
                        category='h4'
                    >
                        {this.props.itemType}
                    </Text>
                </View>
                {this.props.loading && (
                    <View style={themedStyle.spinContainer}>
                        <Spinner />
                    </View>
                )}
                {!this.props.loading &&
                    (
                        <ScrollView contentContainerStyle={themedStyle.container}>
                            {items.length == 0 ?
                                <View style={{ width: '100%', marginTop: hp(30), justifyContent: 'center', alignItems: 'center' }}>
                                    <Text >Any paints added so far</Text>
                                </View>
                                :
                                items.map((paint: any) => (
                                    <PaintsListItem
                                        key={`${paint.id}-${paint.item.name}`}
                                        title={paint.item.name}
                                        url={paint.item.colorSwatchUrl}
                                        item={{ ...paint.item, rooms: paint.room }}
                                        onItemsDetail={this.props.onPaintsDetail}

                                    />
                                ))}
                        </ScrollView>
                    )}
            </Layout>
        );
    }
}

export const PaintsList = withStyles(PaintsListComponent, (theme: ThemeType) => ({
    mainContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
    },
    spinContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(40)
    },
    container: {
        paddingHorizontal: wp(6),
        paddingTop: hp(4),
        width: wp(100),
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    bgImage: {
        resizeMode: 'stretch',
    },
    headerContainer: {
        paddingHorizontal: wp(3),
        paddingTop: hp(6),
        paddingBottom: hp(2),
        position: 'relative',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#BDBDBD',
    },
    backIcon: {
        color: '#2D2F78',
        position: 'absolute',
        zIndex: 3,
    },
    headerLabel: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        lineHeight: 24,
        textAlign: 'center',
        color: '#2D2F78',
        paddingRight: 15
    },
}));

