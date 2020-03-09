import React from 'react';
import {
	View,
	ViewProps,
	ScrollView,
	Image,
	TouchableOpacity,
	ImageBackground
} from 'react-native';
import {
	ThemedComponentProps,
	ThemeType,
	withStyles
} from 'react-native-ui-kitten/theme';
import { Text, Button, Icon } from 'react-native-ui-kitten/ui';
import { hp, wp } from '../../../utils/utility';
import { SmartShopSingle } from '../../../components/dashboard';
import { FooterShopTabIcon } from '../../../assets/icons/footer';

interface ComponentProps {
	gotoScreen: () => void;
	itemType: string;
	itemId?: string;
	item: any;
}

export type PaintDetailsProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {

}

const CloseIcon = (style) => (
	<Icon {...style} name='close' />
);

class PaintDetailsComponent extends React.Component<PaintDetailsProps, State> {
	//private HomeDetailsCard: ImageSource = HomeDetailsCard;
	public state: State = {

	};

	private navigationKey: string = 'PaintDetails';
	public render(): React.ReactNode {
		const { style, themedStyle, item, ...restProps } = this.props;
		return (
			<View style={{ flex: 1, position: 'relative' }}>
				<ScrollView
					style={[themedStyle.container, style]}
					{...restProps}>
					<Image
						source={{ uri: item.imageUrl || 'https://homekey-staging.s3.amazonaws.com/home-item-image/1569343500-cocina.jpeg' }}
						resizeMode='cover'
						style={themedStyle.headerImage}
					/>
					<ImageBackground
						source={{ uri: item.colorSwatchUrl || 'https://homekey-staging.s3.amazonaws.com/images/paint-sample.png' }}
						style={themedStyle.imgBackground}
						resizeMode='repeat'
					>
						<View style={themedStyle.info}>
							<View style={themedStyle.specs}>
								<Text style={themedStyle.specText}>{`${item.name}`}</Text>
								<Text category='s2' >{`${item.colorCode}`}</Text>
							</View>
							<Button status='basic' style={themedStyle.button} size='tiny'>{item.sheenTypeId || 'SATIN'}</Button>
						</View>
					</ImageBackground>
					<View style={themedStyle.subSection}>
						<Text category='s1' style={{}}>{`${item.collection} by ${item.brand} ${item.name}`}</Text>
					</View>
					<View style={[themedStyle.subSection, themedStyle.descSection]}>
						<View style={themedStyle.subdescSection}>
							<Text category='label' style={themedStyle.labelDesc}>BRAND</Text>
							<Text category='h6' style={themedStyle.subDesc}>{item.brand}</Text>
						</View>
						<View style={themedStyle.subdescSection}>
							<Text category='label' style={themedStyle.labelDesc}>COLLECTION</Text>
							<Text category='h6' style={themedStyle.subDesc}>{item.collection}</Text>
						</View>
						<View style={themedStyle.subdescSection}>
							<Text category='label' style={themedStyle.labelDesc}>COLOR</Text>
							<Text category='h6' style={themedStyle.subDesc}>{item.name}</Text>
						</View>
						<View style={themedStyle.subdescSection}>
							<Text category='label' style={themedStyle.labelDesc}>SHEEN</Text>
							<Text category='h6' style={themedStyle.subDesc}>{item.sheenTypeId}</Text>
						</View>
						<View style={themedStyle.subdescSection}>
							<Text category='label' style={themedStyle.labelDesc}>COLOR CODE / MODEL</Text>
							<Text category='h6' style={themedStyle.subDesc}>{item.colorCode}</Text>
						</View>
						<View style={themedStyle.subdescSection}>
							<Text category='label' style={themedStyle.labelDesc}>ITEM</Text>
							<Text category='h6' style={themedStyle.subDesc}>{item.model}</Text>
						</View>
					</View>
					<View style={[themedStyle.subSection, { borderBottomWidth: 0 }]}>
						<Text category='label' style={themedStyle.labelDesc}>ROOMS</Text>
						<View style={themedStyle.roomsContainer}>
							{item.rooms.map(r => <Button key={`room-${r.id}`} status='basic' style={themedStyle.roomButton} size='small'>{r.name}</Button>)}
						</View>
					</View>
					<SmartShopSingle />

				</ScrollView>

				<Button
					onPress={this.props.gotoScreen}
					style={themedStyle.closeButton}
					appearance='outline'
					status='info'
					icon={CloseIcon} />
			</View>
		);
	}
}

export const PaintDetails = withStyles(PaintDetailsComponent, (theme: ThemeType) => ({
	todosTitle: {
		color: theme['color-primary-700']
	},
	subPaints: {
		backgroundColor: theme['color-basic-400'],
	},
	subPaintsTitle: {
		color: theme['color-primary-600'],
		fontSize: hp(2),
		fontWeight: 'bold'
	},
	container: {
		//backgroundColor: theme['color-basic-300']
	},
	headerImage: {
		height: hp(40),
		width: '100%'
	},
	imgBackground: {
		width: '100%',

	},
	info: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	subSection: {
		paddingHorizontal: 20,
		paddingTop: hp(2),
		borderBottomWidth: 1,
		borderBottomColor: theme['color-basic-300'],
		justifyContent: 'space-between',
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'flex-start',
	},
	subdescSection: {
		width: wp(42),
		marginBottom: hp(2)
	},
	subDesc: {
		fontWeight: '400'
	},
	labelDesc: {
		fontSize: hp(1.2),
		color: theme['color-basic-600']
	},
	specs: {
		justifyContent: 'flex-start',
	},
	specText: {
		fontSize: hp(2),
		color: theme['color-primary-800'],
		fontWeight: 'bold'
	},
	button: {
		height: hp(1),
		borderRadius: 20
	},
	//HOME ROOMS
	roomsContainer: {
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		//alignItems: 'flex-start',
		flexWrap: 'wrap',
	},
	roomButton: {
		marginHorizontal: 5,
		marginVertical: 10
	},
	//FIXED CLOSE BUTTON
	closeButton: {
		flex: 1,
		backgroundColor: 'white',
		width: 10,
		borderRadius: 50,
		position: 'absolute',
		top: 40,
		right: 30,
		borderColor: 'transparent',
	},
}));
