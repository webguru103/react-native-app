import {
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  AssetIcon,
  AssetIconElement,
  IconSource,
} from '../icon.component';

/* FOOTER TAB ICONS */
export const FooterHomeTabIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  
  const source: IconSource = {
    imageSource: require('./icon-24-home.png'),
  };

  return AssetIcon(source, null);
};

export const FooterTodosTabIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./icon-24-todos.png'),
  };

  return AssetIcon(source, null);
};

export const FooterShopTabIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./icon-24-shop.png'),
  };

  return AssetIcon(source, null);
};

export const FooterMessagesTabIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./icon-24-messages.png'),
  };

  return AssetIcon(source, null);
};

export const FooterAccountTabIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./icon-24-userprofile.png'),
  };

  return AssetIcon(source, null);
};
/* FOOTER TAB ICONS */

export {
  AssetIcon,
  IconSource,
  RemoteIcon,
} from '../icon.component';
