import React, { ReactElement } from 'react';
import {
  Image,
  TouchableWithoutFeedback
} from 'react-native';
import {
    ThemedComponentProps,
    ThemeType,
    withStyles,
} from 'react-native-ui-kitten/theme';
import { hp, wp } from '../../utils/utility';
import { Text, Layout, LayoutProps } from 'react-native-ui-kitten/ui';

interface ComponentProps {
  icon: ReactElement | undefined;
  url: string | undefined;
  item: Object;
  title: string;
  onItemsDetail?: (item: any) => void;
}

export type ItemsListItemProps = ThemedComponentProps & LayoutProps & ComponentProps;

interface State {
  cards: Array<Object> | undefined;
  currentIndex: Number | undefined;
}

class ItemsListItemComponent extends React.Component<ItemsListItemProps, State> {
  public state: State = {
    cards: [],
    currentIndex: 0
  };

  public render(): React.ReactNode {
    const {
      style,
      themedStyle,
      icon,
      url,
      item,
      title,
      ...restProps
    } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => this.props.onItemsDetail(item)}>
        <Layout
          style={[themedStyle.container, style]}
          {...restProps}>
          {icon && icon}
          {!icon && url && <Image style={themedStyle.icon} source={{ uri: url }} />}
          <Text
            style={themedStyle.title}
            category='h6'
          >
            {title}
          </Text>
        </Layout>
      </TouchableWithoutFeedback>
    );
  }
}

export const ItemsListItem = withStyles(ItemsListItemComponent, (theme: ThemeType) => ({
  container: {
    width: wp(42.2),
    height: wp(42.2),
    padding: wp(5),
    marginBottom: wp(3.6),
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderRadius: wp(2.1),
    backgroundColor: '#ffffff',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.30,
    shadowRadius: 6,
    elevation: 8,
  },
  icon: {},
  title: {
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
    color: '#424242',
  },
}));
