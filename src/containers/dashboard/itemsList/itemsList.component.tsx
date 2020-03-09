import React from 'react';
import {
  ButtonProps,
  ImageProps,
  ImageStyle,
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
  Button,
  Text,
  Icon,
  Spinner
} from 'react-native-ui-kitten/ui';
import {
  ItemsListItem
} from '../../../components/dashboard';
import {
  BedroomIcon,
  BathroomOneIcon,
  BathroomIcon,
  GarageIcon,
  OfficeIcon,
  DiningIcon,
  KitchenIcon,
  UtilityRoomIcon,
  LivingroomIcon
} from '../../../assets/icons/items';
import {
  ArrowIosBackFill
} from '../../../assets/icons';
import {
  wp,
  hp
} from '../../../utils/utility';

interface ComponentProps {
  onItemsDetail: (item: any) => void;
  onBackToDashboard: () => void;
  itemType: string;
  items: Array<Object> | undefined;
  loading: boolean;
}

export type ItemsListProps = ThemedComponentProps & ComponentProps;

interface State {
  items: Array<Object> | undefined;
}

class ItemsListComponent extends React.Component<ItemsListProps, State> {

  public state: State = {
    items: [
      {
        icon: <LivingroomIcon />,
        title: 'Great Room',
        item: {
          id: 'i-1'
        },
      },
      {
        icon: <OfficeIcon />,
        title: 'Home Office',
        item: {
          id: 'i-2'
        },
      },
      {
        icon: <KitchenIcon />,
        title: 'Kitchen',
        item: {
          id: 'i-3'
        },
      },
      {
        icon: <DiningIcon />,
        title: 'Dining',
        item: {
          id: 'i-4'
        },
      },
      {
        icon: <BedroomIcon />,
        title: 'Master Bedroom',
        item: {
          id: 'i-5'
        },
      },
      {
        icon: <BathroomOneIcon />,
        title: 'Master Bathroom',
        item: {
          id: 'i-6'
        },
      },
      {
        icon: <BedroomIcon />,
        title: 'Bedroom 2',
        item: {
          id: 'i-7'
        },
      },
      {
        icon: <BedroomIcon />,
        title: 'Bedroom 3',
        item: {
          id: 'i-8'
        },
      },
      {
        icon: <BathroomIcon />,
        title: 'Guest Bathroom',
        item: {
          id: 'i-9'
        },
      },
      {
        icon: <UtilityRoomIcon />,
        title: 'Utility Room',
        item: {
          id: 'i-10'
        },
      },
      {
        icon: <GarageIcon />,
        title: 'Garage',
        item: {
          id: 'i-11'
        },
      },
    ],
  };

  private getIcon(item_type_id: any) {
    const type = parseInt(item_type_id);
    if (type < 3) {
      return (<LivingroomIcon />);
    } else if (type === 3) {
      return (<DiningIcon />);
    } else if (type === 4) {
      return (<KitchenIcon />);
    } else if (type === 5) {
      return (<OfficeIcon />);
    } else if (type === 6) {
      return (<LivingroomIcon />);
    } else if (type >= 7 && type < 16) {
      return (<BedroomIcon />)
    } else if (type === 16) {
      return (<BathroomOneIcon />);
    } else if (type >= 17 && type < 23) {
      return (<BathroomIcon />);
    } else if (type === 23) {
      return (<UtilityRoomIcon />);
    } else if (type >= 24 && type < 27) {
      return (<GarageIcon />);
    } else {
      return (<UtilityRoomIcon />);
    }
  }

  private getItemsFromProps = () => {
    const { items, itemType } = this.props;
    if (!items) {
      return [];
    }

    let newItems;
    if (itemType === 'Rooms') {
      newItems = items.map((item: any) => {
        const title = item.room.name;
        const newItem = { id: item.room.id };
        const icon = this.getIcon(item.room.roomTypeId);
        return {
          icon,
          title,
          item: newItem,
        }
      });
    } else if (itemType === 'Outdoors') {
      newItems = items.map((item: any) => {
        const title = item.outdoor.name;
        const newItem = { id: item.outdoor.id };
        const icon = this.getIcon(item.outdoor.outdoorTypeId);
        return {
          icon,
          title,
          item: newItem,
        }
      });
    } else {
      newItems = items.map((item: any) => {
        const title = item.system.name;
        const newItem = { id: item.system.id };
        const icon = this.getIcon(item.system.systemTypeId);
        return {
          icon,
          title,
          item: newItem,
        }
      });
    }

    return newItems;
  }

  public render(): React.ReactNode {
    const { themedStyle } = this.props;
    const items = this.getItemsFromProps();

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
        {!this.props.loading && (
          <ScrollView contentContainerStyle={themedStyle.container}>
            {items.map((item: any) => (
              <ItemsListItem
                key={`${item.item.id}-${item.title}`}
                title={item.title}
                icon={item.icon}
                url=''
                item={item.item}
                onItemsDetail={this.props.onItemsDetail}
              />
            ))}
          </ScrollView>
        )}
      </Layout>
    );
  }
}

export const ItemsList = withStyles(ItemsListComponent, (theme: ThemeType) => ({
  mainContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#BDBDBD',
  },
  spinContainer: {
    justifyContent: 'center',
    alignItems: 'center'
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

