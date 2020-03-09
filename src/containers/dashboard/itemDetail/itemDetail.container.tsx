import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { ItemDetails } from './itemDetail.component';
import APIService from '../../../utils/services/api';

interface ContainerProps {
	gotoScreen: (navigate: string, navigationOptions?: any) => void;
	options: any;
}

interface State {
	loading: boolean;
	item: any;
	subItems: Array<Object> | undefined;
	commonItem: any;
	itemType: any;
}

export default class ItemDetailsContainer extends React.Component<ContainerProps, State> {

	private navigationKey: string = 'ItemsListContainer';
	private itemType: string = 'room';

	public state: State = {
		item: undefined,
		subItems: undefined,
		commonItem: undefined,
		loading: true,
		itemType: undefined
	}

	public componentDidMount() {
		const itemId = this.props.options.item.id;
		console.log(this.props)
		if (this.props.options.type === 'Rooms') {
			APIService.getRoom(itemId).then((result: any) => {
				if (result.error) {
					this.setState({ loading: false });
					Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
				} else {
					console.log(result)
					this.setState({
						loading: false,
						item: result.room,
						subItems: result.roomItems,
						commonItem: result.roomItem
					});
				}
			})
		} else if (this.props.options.type === 'Outdoors') {
			APIService.getOutdoor(itemId).then((result: any) => {
				if (result.error) {
					this.setState({ loading: false });
					Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
				} else {
					this.setState({
						loading: false,
						item: result.outdoor,
						subItems: result.outdoorItems,
						commonItem: result.outdoorItem
					});
				}
			})
		} else if (this.props.options.type === 'Home Systems') {
			APIService.getHomeSystem(itemId).then((result: any) => {
				if (result.error) {
					this.setState({ loading: false });
					Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
				} else {
					this.setState({
						loading: false,
						item: result.homeSystem,
						subItems: result.systemItems,
						commonItem: result.systemItem
					});
				}
			})
		} else if (this.props.options.type === 'SubItem') {
			APIService.getItemDetail(itemId).then((result: any) => {
				console.log(result)
				if (result.error) {
					this.setState({ loading: false });
					Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
				} else {
					this.setState({
						loading: false,
						item: result.homeSystem,
						subItems: result.systemItems,
						commonItem: result.systemItem
					});
				}
			})
		}
	}

	private onItemsDetail = (item) => {
		//REQUEST COMMENTED BECAUSE THE RESULT OBJECT IS EXACTLY SAME THAN PROVIDED TO THIS FUNCTION
		/*
		this.setState({ loading: true });
		APIService.getItemDetail(item.id).then((result: any) => {
			console.log(result)
			if (result.error) {
				this.setState({ loading: false });
				Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
			} else {
				this.setState({
					loading: false,
					item: result.item,
					subItems: null,
					commonItem: null,
					itemType: 'SubItem'
				});
			}
		})
		*/
		this.setState({
			loading: false,
			item: item,
			subItems: null,
			commonItem: null,
			itemType: 'SubItem'
		});
		
	};

	private gotoScreen = () => {
		// this.props.navigation.goBack();
		this.props.gotoScreen('items', { type: this.props.options.type });
	};

	public render(): React.ReactNode {
		console.log('rendering')
		console.log(this.state)
		return (
			<ItemDetails
				onItemsDetail={this.onItemsDetail}
				gotoScreen={this.gotoScreen}
				itemType={this.state.itemType != undefined ? this.state.itemType : this.props.options.type}
				loading={this.state.loading}
				item={this.state.item}
				subItems={this.state.subItems}
				commonItem={this.state.commonItem}
			/>
		);
	}
}
