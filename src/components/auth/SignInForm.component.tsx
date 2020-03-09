import React from 'react';
import {
  View,
  ViewProps,
} from 'react-native';
import {
  ThemedComponentProps,
  ThemeType,
  withStyles,
} from 'react-native-ui-kitten/theme';
import {
  Button,
  Text,
} from 'react-native-ui-kitten/ui';
import {
  textStyle,
  ValidationInput,
} from '../common';
import {
  EmailIconFill,
  EyeOffIconFill,
} from '../../assets/icons';
import {
  EmailValidator,
  PasswordValidator,
} from '../../utils/validators';
import { SignInFormData } from './types';
import { hp } from '../../utils/utility';

interface ComponentProps {
  /**
   * Will emit changes depending on validation:
   * Will be called with form value if it is valid, otherwise will be called with undefined
   */
  onDataChange: (value: SignInFormData | undefined) => void;
  onForgotPasswordPress: () => void;
}

export type SignInFormProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
  email: string | undefined;
  password: string | undefined;
}

class SignInFormComponent extends React.Component<SignInFormProps, State> {

  public state: State = {
    email: undefined,
    password: undefined,
  };

  public componentDidUpdate(prevProps: SignInFormProps, prevState: State) {
    const oldFormValid: boolean = this.isValid(prevState);
    const newFormValid: boolean = this.isValid(this.state);

    const isStateChanged: boolean = this.state !== prevState;
    const becomeValid: boolean = !oldFormValid && newFormValid;
    const becomeInvalid: boolean = oldFormValid && !newFormValid;
    const remainValid: boolean = oldFormValid && newFormValid;

    if (becomeValid) {
      this.props.onDataChange(this.state);
    } else if (becomeInvalid) {
      this.props.onDataChange(undefined);
    } else if (isStateChanged && remainValid) {
      this.props.onDataChange(this.state);
    }
  }

  private onForgotPasswordButtonPress = () => {
    this.props.onForgotPasswordPress();
  };

  private onEmailInputTextChange = (email: string | undefined) => {
    this.setState({ email });
  };

  private onPasswordInputTextChange = (password: string | undefined) => {
    this.setState({ password });
  };

  private isValid = (value: SignInFormData): boolean => {
    const { email, password } = value;

    return email !== undefined
      && password !== undefined;
  };

  public render(): React.ReactNode {
    const { style, themedStyle, theme, ...restProps } = this.props;

    return (
      <View
        {...restProps}
        style={[themedStyle.container, style]}>
        <Text
          style={themedStyle.inputLabel}
          category='label'
        >
          EMAIL
        </Text>
        <ValidationInput
          style={themedStyle.emailInput}
          textStyle={textStyle.paragraph}
          placeholder='Email'
          icon={EmailIconFill}
          validator={EmailValidator}
          onChangeText={this.onEmailInputTextChange}
        />
        <View style={themedStyle.forgotPasswordContainer}>
            <Text
              style={themedStyle.inputLabel}
              category='label'
            >
              PASSWORD
            </Text>
            <Button
              style={themedStyle.buttonWrapper}
              textStyle={themedStyle.forgotPasswordButton}
              onPress={this.onForgotPasswordButtonPress}>
              Forgot password?
            </Button>
          </View>
        <ValidationInput
          style={themedStyle.passwordInput}
          textStyle={textStyle.paragraph}
          placeholder='Password'
          secureTextEntry={true}
          icon={EyeOffIconFill}
          validator={PasswordValidator}
          onChangeText={this.onPasswordInputTextChange}
        />
      </View>
    );
  }
}

export const SignInForm = withStyles(SignInFormComponent, (theme: ThemeType) => ({
  container: {},
  inputLabel: {
    color: 'white',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: hp(0.75),
  },
  emailInput: {
    marginHorizontal: 0,
    width: '100%',
    height: hp(6),
  },
  passwordInput: {
    marginHorizontal: 0,
    width: '100%',
    height: hp(6),
  },
  forgotPasswordContainer: {
    marginTop: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  buttonWrapper: {
    padding: 0,
    marginBottom: 0,
    paddingBottom: 6,
    width: 'auto',
    height: hp(2),
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  forgotPasswordButton: {
    padding: 0,
    margin: 0,
    fontSize: 12,
    height: hp(2),
    backgroundColor: 'transparent',
    lineHeight: 16,
    color: '#0E446D',
    ...textStyle.subtitle,
  },
}));
