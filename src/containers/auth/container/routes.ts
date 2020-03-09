import {
  imageAuthLayout,
} from '../../../assets/images';
import { AuthContainerData } from './type';

export const routes: AuthContainerData[] = [
  {
    title: 'Sign In',
    description: 'Sign In',
    image: imageAuthLayout.imageSource,
    route: 'Sign In',
  },
  {
    title: 'Sign Up',
    description: 'Sign Up',
    image: imageAuthLayout.imageSource,
    route: 'Sign Up',
  },
  {
    title: 'Forgot Password',
    description: 'Forgot Password',
    image: imageAuthLayout.imageSource,
    route: 'Forgot Password',
  },
  {
    title: 'Scan Code',
    description: 'Scan the HomekeyCode',
    image: imageAuthLayout.imageSource,
    route: 'Scan Code',
  },
  {
    title: 'Phone Code',
    description: 'Verify Phone Code',
    image: imageAuthLayout.imageSource,
    route: 'Phone Code',
  },
  {
    title: 'New Password',
    description: 'Set New Password',
    image: imageAuthLayout.imageSource,
    route: 'New Password',
  },
  {
    title: 'Confirmed',
    description: 'Let\'s Get Started',
    image: imageAuthLayout.imageSource,
    route: 'Confirmed',
  }
];
