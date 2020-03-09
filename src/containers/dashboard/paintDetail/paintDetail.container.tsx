import React from 'react';
import { PaintDetails } from './paintDetail.component';

interface ContainerProps {
    gotoScreen: (navigate: string, navigationOptions?: any) => void;
    options: any;
}

interface State {

}

export default class PaintDetailsContainer extends React.Component<ContainerProps, State> {

    private navigationKey: string = 'PaintsListContainer';
    
    public state: State = {
        
    }

    private onPaintsDetail = (item) => {
        // go to item details
    };

    private gotoScreen = () => {
        // this.props.navigation.goBack();
        this.props.gotoScreen('paints', { type: this.props.options.type });
    };

    public render(): React.ReactNode {
        console.log(this.props)
        return (
            <PaintDetails
                gotoScreen={this.gotoScreen}
                itemType={this.props.options.type}
                item={this.props.options.item}
            />
        );
    }
}
