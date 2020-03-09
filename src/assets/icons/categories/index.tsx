import {
    ImageStyle,
    StyleProp,
} from 'react-native';
import {
    AssetIcon,
    AssetIconElement,
    IconSource,
} from '../icon.component';

/* Category ICONS */
export const CategoryMyHomeIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-myhome.png'),
    };

    return AssetIcon(source, style);
};

export const CategoryRangeIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-24-range.png'),
    };

    return AssetIcon(source, style);
};

export const CategoryFireIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-fire.png'),
    };

    return AssetIcon(source, style);
};

export const CategoryHomeSystemsIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-home-systems.png'),
    };

    return AssetIcon(source, style);
};

export const CategoryHvacIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-hvac.png'),
    };

    return AssetIcon(source, style);
};

export const CategoryOutsideIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-outside.png'),
    };

    return AssetIcon(source, style);
};

export const CategoryRoomsIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-rooms.png'),
    };

    return AssetIcon(source, style);
};

export const CategorySecurityIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-security.png'),
    };

    return AssetIcon(source, style);
};

export const CategorySolarIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-solar.png'),
    };

    return AssetIcon(source, style);
};

export const FloorPlanIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-floorplan.png'),
    };

    return AssetIcon(source, style);
};

export const LotPlanIcon = (style: StyleProp<ImageStyle>): AssetIconElement => {
    const source: IconSource = {
        imageSource: require('./icon-48-lotplan.png'),
    };

    return AssetIcon(source, style);
};
/* Category  ICONS */

export {
    AssetIcon,
    IconSource,
    RemoteIcon,
} from '../icon.component';
