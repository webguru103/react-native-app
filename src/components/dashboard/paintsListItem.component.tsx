import React, { ReactElement } from 'react';
import {
	Image,
	TouchableWithoutFeedback
} from 'react-native';
import {
	ThemedComponentProps,
	ThemeType,
	withStyles,
} from 'react-native-ui-kitten/theme';
import { hp, wp } from '../../utils/utility';
import { Text, Layout, LayoutProps } from 'react-native-ui-kitten/ui';

interface ComponentProps {
	url: string | undefined;
	item: Object;
	title: string;
	onItemsDetail?: (item: any) => void;
}

export type PaintsListItemProps = ThemedComponentProps & LayoutProps & ComponentProps;

interface State {
	cards: Array<Object> | undefined;
	currentIndex: Number | undefined;
}

class PaintsListItemComponent extends React.Component<PaintsListItemProps, State> {
	public state: State = {
		cards: [],
		currentIndex: 0
	};

	public render(): React.ReactNode {
		const {
			style,
			themedStyle,
			url,
			item,
			title,
			...restProps
		} = this.props;

		return (
			<TouchableWithoutFeedback onPress={() => this.props.onItemsDetail(item)}>
				<Layout
					style={[themedStyle.container, style]}
					{...restProps}>
					<Image resizeMode='contain' style={themedStyle.icon} source={{ uri: url ? url : 'https://homekey-staging.s3.amazonaws.com/images/paint-sample.png' }} />
					<Text
						style={themedStyle.title}
						category='h6'
					>
						{title}
					</Text>
				</Layout>
			</TouchableWithoutFeedback>
		);
	}
}

export const PaintsListItem = withStyles(PaintsListItemComponent, (theme: ThemeType) => ({
	container: {
		width: wp(42.2),
		height: hp(25),
		padding: wp(2),
		marginBottom: wp(3.6),
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		borderBottomEndRadius: wp(2.1),
		borderBottomStartRadius: wp(2.1),
		backgroundColor: '#ffffff',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.30,
		shadowRadius: 6,
		elevation: 8,
	},
	icon: {
		flex: 1,
		width: '100%',
	},
	title: {
		fontSize: 15,
		fontWeight: 'bold',
		lineHeight: 20,
		color: '#424242',
	},
}));
