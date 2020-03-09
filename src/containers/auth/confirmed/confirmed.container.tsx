import React from 'react';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { Confirmed } from './confirmed.component';

export class ConfirmedContainer extends React.Component<NavigationStackScreenProps> {

  private navigationKey: string = 'ConfirmedContainer';

  private onStart = () => {
    this.props.navigation.navigate({
      key: this.navigationKey,
      routeName: 'Home',
    });
  };

  public render(): React.ReactNode {
    return (
      <Confirmed
        onStart={this.onStart}
      />
    );
  }
}
