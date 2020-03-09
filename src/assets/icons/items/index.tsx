import {
  ImageStyle,
  StyleProp,
} from 'react-native';
import {
  AssetIcon,
  AssetIconElement,
  IconSource,
} from '../icon.component';

/* ITEMS LIST ICONS */
export const BathroomIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {

  const source: IconSource = {
    imageSource: require('./bathroom.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const BathroomOneIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./bathroom-1.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const BedroomIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./bedroom.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const DiningIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./dining.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const KitchenIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./kitchen.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const LivingroomIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./livingroom.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const OfficeIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./office.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const UtilityRoomIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./utility-room.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};

export const GarageIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
  const source: IconSource = {
    imageSource: require('./garage.png'),
  };

  return AssetIcon(source, {width: 30, height: 30});
};
/* ITEMS LIST ICONS */

export {
  AssetIcon,
  IconSource,
  RemoteIcon,
} from '../icon.component';
