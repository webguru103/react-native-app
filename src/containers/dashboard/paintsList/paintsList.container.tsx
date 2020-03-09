import React from 'react';
import { Alert } from 'react-native';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { PaintsList } from './paintsList.component';
import APIService from '../../../utils/services/api';

interface ContainerProps {
	gotoScreen: (navigate: string, navigationOptions?: any) => void;
	options: any;
}

interface State {
	paints: Array<Object> | undefined;
	loading: boolean;
}

export default class PaintsListContainer extends React.Component<ContainerProps, State> {

	private navigationKey: string = 'PaintsListContainer';
	//private itemType: string = 'room';

	public state: State = {
		paints: undefined,
		loading: true,
	}

	componentDidMount() {
		const homeId = this.props.options.homeId ? this.props.options.homeId : '2';
		APIService.getPaints(homeId).then((result: any) => {
			if (result.error) {
				this.setState({ loading: false });
				Alert.alert('ERROR!', result.error, [{ text: 'Ok', style: 'cancel' }]);
			} else {
				this.setState({ loading: false, paints: result.paintItems != undefined ? result.paintItems : [] });
			}
		})

	}

	private onPaintsDetail = (item) => {
		// go to item details
		this.props.gotoScreen('paint details', { type: this.props.options.type, item: item });
	};

	private onBackToDashboard = () => {
		// this.props.navigation.goBack();
		this.props.gotoScreen('');
	};

	public render(): React.ReactNode {
		return (
			<PaintsList
				onPaintsDetail={this.onPaintsDetail}
				onBackToDashboard={this.onBackToDashboard}
				itemType={this.props.options.type}
				items={this.state.paints}
				loading={this.state.loading}
			/>
		);
	}
}
