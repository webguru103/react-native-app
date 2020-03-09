import React from 'react';
import {
	View,
	ViewProps,
	ScrollView,
	Image,
	TouchableOpacity,
	Linking
} from 'react-native';
import {
	ThemedComponentProps,
	ThemeType,
	withStyles
} from 'react-native-ui-kitten/theme';
import { Text, Button, Icon, Spinner, Modal, Layout } from 'react-native-ui-kitten/ui';

import { hp, wp, emptySanitizeObj } from '../../../utils/utility';
import { Todos, SmartShopCarousel } from '../../../components/dashboard';
import { FooterShopTabIcon } from '../../../assets/icons/footer';
import {
  BedroomIcon,
  BathroomOneIcon,
  BathroomIcon,
  GarageIcon,
  OfficeIcon,
  DiningIcon,
  KitchenIcon,
  UtilityRoomIcon,
  LivingroomIcon
} from '../../../assets/icons/items';

interface ComponentProps {
	gotoScreen: () => void;
	onItemsDetail: (item: any) => void;
	itemType: string;
	itemId?: string;
	loading: boolean;
	item: any;
	subItems: Array<Object> | undefined;
	commonItem: any;
}

export type ItemDetailsProps = ThemedComponentProps & ViewProps & ComponentProps;

interface State {
	showModal: boolean;
	modalUrl: string;
}

const CloseIcon = (style) => (
	<Icon {...style} name='close' />
);

class ItemDetailsComponent extends React.Component<ItemDetailsProps, State> {
	//private HomeDetailsCard: ImageSource = HomeDetailsCard;
	public state: State = {
		showModal: false,
		modalUrl: 'https://www.google.com'
	};

	private todosList: Array<object> =
		[
			{ id: 2, date: 'JAN-10', title: 'Replace Water Filter', action: () => { console.log('navigate to somewhere') }, icon: <FooterShopTabIcon /> },
		];


	private getIcon(item_type_id: any) {
		const type = parseInt(item_type_id);
		if (type < 3) {
			return (<LivingroomIcon />);
		} else if (type === 3) {
			return (<DiningIcon />);
		} else if (type === 4) {
			return (<KitchenIcon />);
		} else if (type === 5) {
			return (<OfficeIcon />);
		} else if (type === 6) {
			return (<LivingroomIcon />);
		} else if (type >= 7 && type < 16) {
			return (<BedroomIcon />)
		} else if (type === 16) {
			return (<BathroomOneIcon />);
		} else if (type >= 17 && type < 23) {
			return (<BathroomIcon />);
		} else if (type === 23) {
			return (<UtilityRoomIcon />);
		} else if (type >= 24 && type < 27) {
			return (<GarageIcon />);
		} else {
			return (<UtilityRoomIcon />);
		}
	}
	private _renderCommon = (cat, themedStyle) => {
		let cards = cat[1];
		return (
			<View key={cat[0]} style={{ padding: hp(1) }}>
				<Text style={themedStyle.subItemsTitle}>{cat[0]}</Text>
				<View style={themedStyle.roomsContainer}>
					{cards.map(card => {
						return (<TouchableOpacity
							key={card.item.id}
							style={[themedStyle.cardStyle]}
							onPress={() => { this.props.onItemsDetail(card.item) }}
						>
							<View style={{ padding: hp(1)}}>
								{this.getIcon(card.item.id)}
							</View>
							<Text style={themedStyle.cardTitle}>{card.itemType.name}</Text>
						</TouchableOpacity>)
					})}
				</View>
			</View>
		);
	}

	private _onPressPDFButton(url) {
		//this.setState({ modalUrl: url, showModal: true })
		Linking.openURL(url).catch((err) => console.error('An error occurred', err));
	}

	private _handleModal() {
		this.setState({ showModal: !this.state.showModal })
	}

	private navigationKey: string = 'ItemDetails';
	public render(): React.ReactNode {
		const { style, themedStyle, loading, item, subItems, commonItem, ...restProps } = this.props;
		const that = this;
		if (commonItem != undefined) {
			var categories = new Map();
			commonItem.items.forEach(obj => {
				if (obj.category != null) {
					if (obj.category.name != 'Uncategorized') {
						obj.item = emptySanitizeObj(obj.item);
						if (categories.has(obj.category.name)) {
							let aux = categories.get(obj.category.name);
							aux.push({ item: obj.item, itemType: obj.itemType })
							categories.set(obj.category.name, aux)
						}
						else {
							categories.set(obj.category.name, [{ item: obj.item, itemType: obj.itemType }])
						}
					}
				}
			})
			var auxCat = [...categories.entries()]
		}
		return (
			<View style={{ flex: 1, position: 'relative' }}>
				{loading ?
					<View style={themedStyle.spinnerContainer}>
						<Spinner />
					</View>
					:
					<ScrollView
						style={[themedStyle.container, style]}
						{...restProps}>
						<Image
							source={{ uri: item.imageUrl || 'https://homekey-staging.s3.amazonaws.com/home-item-image/1570038002-sample.jpg' }}
							resizeMode='cover'
							style={themedStyle.headerImage}
						/>
						<View style={themedStyle.info}>
							<Text style={themedStyle.specTextTitle}>{`${item.name}`}</Text>
							{this.props.itemType == 'SubItem' ?
								<View style={themedStyle.specs}>
									<Text style={themedStyle.title}>{`${item.brand} ${item.model}`}</Text>
								</View>
								:
								<View style={themedStyle.specs}>
									<Text style={themedStyle.title}>{item.width && item.height ? `${item.width} x ${item.height}` : item.width ? item.width : item.height ? item.height : ''}</Text>
									<Text style={themedStyle.title}>{item.squareFeet ? item.squareFeet : ''}</Text>
								</View>
							}
							{this.props.itemType == 'SubItem' ?
								<View style={themedStyle.subTitleSection}>
									<Text category="s1" >{item.name} {item.brand} {item.collection} {item.model} {item.modelNumber} {item.capacity} {item.size} {item.colorMfg}</Text>
								</View>
								: null}
						</View>

						{this.props.itemType == 'SubItem' ?
							<View style={themedStyle.pdfSection}>
								<TouchableOpacity
									style={[themedStyle.pdfButton, item.ownesManualUrl == '' || item.ownesManualUrl == null ? themedStyle.pdfButtonDisabled : null]}
									disabled={item.ownesManualUrl == '' || item.ownesManualUrl == null}
									onPress={() => { this._onPressPDFButton(item.ownesManualUrl) }}
								>
									<Image
										source={{ uri: 'https://homekey-staging.s3.amazonaws.com/icons/icon-24-manual.png' }}
										style={themedStyle.pdfImage}
									/>
									<Text style={[themedStyle.pdfButtonText, item.ownesManualUrl == '' || item.ownesManualUrl == null ? themedStyle.pdfButtonTextDisabled : null]}>User Manual</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[themedStyle.pdfButton, item.energyGuideUrl == '' || item.energyGuideUrl == null ? themedStyle.pdfButtonDisabled : null]}
									disabled={item.energyGuideUrl == '' || item.energyGuideUrl == null}
									onPress={() => { this._onPressPDFButton(item.energyGuideUrl) }}
								>
									<Image
										source={{ uri: 'https://homekey-staging.s3.amazonaws.com/icons/icon-24-energyguide.png' }}
										style={themedStyle.pdfImage}
									/>
									<Text style={[themedStyle.pdfButtonText, item.energyGuideUrl == '' || item.energyGuideUrl == null ? themedStyle.pdfButtonTextDisabled : null]}>Energy Guide</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[themedStyle.pdfButton, item.warrantyUrl == '' || item.warrantyUrl == null ? themedStyle.pdfButtonDisabled : null]}
									disabled={item.warrantyUrl == '' || item.warrantyUrl == null}
									onPress={() => { this._onPressPDFButton(item.warrantyUrl) }}
								>
									<Image
										source={{ uri: 'https://homekey-staging.s3.amazonaws.com/icons/icon-48-security.png' }}
										style={themedStyle.pdfImage}
									/>
									<Text style={[themedStyle.pdfButtonText, item.warrantyUrl == '' || item.warrantyUrl == null ? themedStyle.pdfButtonTextDisabled : null]}>Warranty</Text>
								</TouchableOpacity>
								<Modal
									visible={this.state.showModal}
									allowBackdrop={true}
									backdropStyle={themedStyle.backdrop}
									onBackdropPress={() => { this._handleModal() }}
								>
									<Layout
										style={{ width: wp(90), height: hp(80) }}
									>

										<Button
											onPress={() => { this._handleModal() }}
											style={themedStyle.closeButtonModal}
											appearance='outline'
											status='info'
											icon={CloseIcon} />
									</Layout>

								</Modal>
							</View>
							: null}

						<Todos title={"Upcoming To-Do's"} titleStyle={themedStyle.todosTitle} todosList={this.todosList} button={false} />
						<SmartShopCarousel />

						{auxCat != undefined ?
							<View style={themedStyle.subItems}>
								{auxCat.map(cat => that._renderCommon(cat, themedStyle))}
							</View>
							:
							null}
						{this.props.itemType == 'SubItem' ?
							<View style={themedStyle.additionalDetails}>
								<Text style={themedStyle.additionalDetailsTitle}>Additional Details</Text>
								<View style={[themedStyle.specs, {}]}>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>BRAND</Text>
										<Text style={themedStyle.specText}>{item.brand}</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>COLLECTION</Text>
										<Text style={themedStyle.specText}>{item.collection}</Text>
									</View>
								</View>
								<View style={[themedStyle.specs, {}]}>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>COLOR/FINISH</Text>
										<Text style={themedStyle.specText}>{item.colorFinishId}</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>SIZE</Text>
										<Text style={themedStyle.specText}>{item.size}</Text>
									</View>
								</View>
								<View style={[themedStyle.specs, {}]}>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>MODEL</Text>
										<Text style={themedStyle.specText}>{item.model}</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>MODEL NUMBER</Text>
										<Text style={themedStyle.specText}>{item.modelNumber}</Text>
									</View>
								</View>
								<View style={[themedStyle.specs, {}]}>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>COLOR MFG</Text>
										<Text style={themedStyle.specText}>{item.colorMfg}</Text>
									</View>
									<View style={{ flex: 1 }}>
										<Text style={themedStyle.title}>SERIAL</Text>
										<Text style={themedStyle.specText}>{item.serialNumber}</Text>
									</View>
								</View>
							</View>
							: null}
					</ScrollView>
				}
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

export const ItemDetails = withStyles(ItemDetailsComponent, (theme: ThemeType) => ({
	todosTitle: {
		color: theme['color-primary-700']
	},
	subItems: {
		backgroundColor: theme['color-basic-400'],
		padding: 10
	},
	subItemsTitle: {
		color: theme['color-primary-700'],
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
	info: {
		padding: 20
	},
	title: {
		fontSize: hp(1.2),
		color: theme['color-basic-700'],
		borderRightColor: theme['color-basic-700'],
		borderRightWidth: 10,
	},
	address: {
		fontSize: hp(1.5),
		color: theme['color-basic-700'],
	},
	specs: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	specText: {
		fontSize: hp(2),
		borderRightColor: 'black',
		borderRightWidth: 1,
		paddingRight: 20,
		color: theme['color-basic-600'],
		fontWeight: 'bold'
	},
	specTextTitle: {
		fontSize: hp(2.5),
		color: theme['color-primary-600'],
		fontWeight: 'bold'
	},
	//Builder section
	builderBox: {
		padding: 20,
		backgroundColor: theme['color-basic-400'],
		borderRadius: 10,
	},
	boxHeader: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	boxSubheader: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 10
	},
	builderLogo: {
		height: hp(7),
		width: hp(7),
	},
	builderName: {
		fontSize: hp(4),
		lineHeight: hp(7),
		paddingLeft: 10,
		fontWeight: '300',
		color: theme['color-primary-900']
	},
	titleBuilder: {
		fontSize: hp(2),
		color: theme['color-basic-600'],
		fontWeight: 'bold',
	},
	button: {
		marginTop: 20,
		backgroundColor: 'white'
	},
	//HOME ROOMS
	roomsContainer: {
		alignContent: 'stretch',
		paddingVertical: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	cardStyle: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: hp(7),
		borderColor: 'white',
		borderWidth: 1,
		borderRadius: 10,
		backgroundColor: 'white',
		padding: hp(2),
		marginBottom: 5,
		width: wp(47)
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
	closeButtonModal: {
		flex: 1,
		backgroundColor: 'white',
		width: 5,
		top: 5,
		left: 5,
		borderRadius: 50,
		position: 'absolute',
	},
	spinnerContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	//PDFs SECTION
	pdfSection: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'center',
		marginBottom: 10
	},
	pdfButton: {
		borderColor: theme['color-primary-400'],
		borderWidth: 1,
		padding: 10,
		height: wp(25),
		width: wp(25),
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'space-around'
	},
	pdfButtonDisabled: {
		borderColor: theme['color-basic-400'],

	},
	pdfButtonText: {
		color: theme['color-primary-700'],
		fontWeight: 'bold',
		fontSize: wp(2.5)
	},
	pdfButtonTextDisabled: {
		color: theme['color-basic-400'],
		fontWeight: '400'
	},
	pdfImage: {
		width: wp(10),
		height: wp(10)
	},
	backdrop: {
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	//SubItem Details
	additionalDetails: {
		padding: 20,
		backgroundColor: theme['color-basic-300']
	},
	additionalDetailsTitle: {
		color: theme['color-primary-700'],
		fontWeight: 'bold'
	},

	subTitleSection: {
		paddingTop: 10,
		borderTopColor: theme['color-basic-400'],
		borderTopWidth: 1
	}
}));
