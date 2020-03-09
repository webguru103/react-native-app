import React from 'react';
import { ImageRequireSource } from 'react-native';
import { LoadingAnimationComponent } from './loadingAnimation.component';

export interface Assets {
  images: ImageRequireSource[];
  fonts: { [key: string]: number };
}

interface Props {
  assets: Assets;
  children: React.ReactNode;
}

interface State {
  loaded: boolean;
}

type LoadingElement = React.ReactElement<{}>;

/**
 * Loads child component after asynchronous tasks are done
 */
export class ApplicationLoader extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  public state: State = {
    loaded: false,
  };

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        {this.state.loaded && this.props.children}
        <LoadingAnimationComponent isLoaded={this.state.loaded}/>
      </React.Fragment>
    );
  }
}
