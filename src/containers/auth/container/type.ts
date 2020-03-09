import { LayoutMenuItemData } from '../../../components/common';

export type AuthData = LayoutMenuItemData;

export interface AuthContainerData extends AuthData {
  route: string;
}
