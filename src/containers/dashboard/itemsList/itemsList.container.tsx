import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ItemsList } from './itemsList.component';
import APIService from '../../../utils/services/api';

interface ContainerProps {
  gotoScreen: (navigate: string, navigationOptions?: any) => void;
  options: any;
}

interface State {
  items: Array<Object> | undefined;
  loading: boolean;
}

export default class ItemsListContainer extends React.Component<ContainerProps, State> {

  private navigationKey: string = 'ItemsListContainer';
  private itemType: string = 'room';

  public state: State = {
    items: undefined,
    loading: true,
  }

  public componentDidMount() {
    const homeId = this.props.options.homeId ? this.props.options.homeId : '2';
    console.log(this.props)
    if (this.props.options.type === 'Rooms') {
      APIService.getRooms(homeId).then((result: any) => {
        if (result.error) {
          this.setState({ loading: false });
          Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
        } else {
          this.setState({ loading: false, items: result.rooms });
        }
      })
    } else if (this.props.options.type === 'Outdoors') {
      APIService.getOutdoors(homeId).then((result: any) => {
        if (result.error) {
          this.setState({ loading: false });
          Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
        } else {
          this.setState({ loading: false, items: result.outdoors });
        }
      })
    } else if (this.props.options.type === 'Home Systems') {
      APIService.getHomeSystems(homeId).then((result: any) => {
        if (result.error) {
          this.setState({ loading: false });
          Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
        } else {
          this.setState({ loading: false, items: result.homeSystems });
        }
      })
    }
  }

  private onItemsDetail = (item) => {
    // go to item details
    this.props.gotoScreen('item details', { type: this.props.options.type, item: item });
  };

  private onBackToDashboard = () => {
    // this.props.navigation.goBack();
    this.props.gotoScreen('');
  };

  public render(): React.ReactNode {
    return (
      <ItemsList
        onItemsDetail={this.onItemsDetail}
        onBackToDashboard={this.onBackToDashboard}
        itemType={this.props.options.type}
        items={this.state.items}
        loading={this.state.loading}
      />
    );
  }
}
