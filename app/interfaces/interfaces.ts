import { handler } from "@material-tailwind/react/types/components/dialog";
import { ReactNode } from "react";

export interface IChildren {
  children: ReactNode;
}

export interface IDepositAndWithdrowCard {
  title: string;
  component_type: "add" | "withdraw";
}
export interface ICreateAuctions {
  title: string;
  isEdit?: boolean;
  edited_id?: string | number;
  page_data?: any;
}

export interface ILogsTable {
  title: string;
  table_data: any;
  defaultSearchInput?: string;
  handleSearchField?: (value: any) => void;
}

export interface IAuctions {
  table_data: any;
  title: string;
  defaultSearchInput?: string;
  handleSearchField?: (value: any) => void;
}

export interface IBiddingList {
  tableHead: string[];
  tableData: any;
}

export interface IDashBTable {
  tableHead: string[];
  tableData: any;
  bid_for: "bid" | "win";
}

export interface IWishlistsTable {
  tableHead: string[];
  tableData: any;
}

export interface ITicketsTable {
  table_data: any;
}

export interface ITransactions {
  limit?: number;
  transections_data: any;
  main_transection?: boolean;
}

export interface IButton {
  text: string;
  styles: string;
  clickHandler?: any;
  isLink?: boolean;
  isPlainLink?: boolean;
  href?: string;
  isdisabled?: boolean;
  isLoading?: boolean;
  symbol?: string;
  btnType?: "button" | "submit" | "reset";
}

export interface IIconButton {
  styles: string;
  clickHandler?: any;
  isLink?: boolean;
  href?: string;
  svg?: ReactNode;
  isdisable?:boolean;
}

export interface IAucCatCard {
  img: string;
  title: string;
  auctionId: string;
  awardCount: string;
  slug?: string;
  des?: any;
}

export interface IAuctionCard {
  item_id: string | number;
  img: string;
  title: string;
  ratings?: string;
  bid?: string;
  time: string;
  wrapperCls?: string;
  smCard?: boolean;
  currency?: string;
  slug: string;
  isWish: boolean;
  is_own: boolean;
  price: string | number;
}
export interface IChatCard {
  isAttached: boolean;
  userImg: string;
  card_data: any;
}

export interface IDashboardCard {
  img: string;
  value: number;
  title: string;
  currencySymbol?: boolean;
}

export interface IProductDetailsCard {
  openModal: boolean;
  handleOpenModal: any;
  bidding_id?: number | string | null;
  modal_data?: any;
  product_name: string;
  product_img: string;
  product_owner: string;
  product_price: string;
  product_slug: string;
}

export interface IDocument {
  frontSide?: string;
  backSide?: string;
}

// export interface INiceSelect {
//   options: string[];
//   values: string[];
//   defaultValue: string;
//   onChange: (e: any) => void;
//   wrapperClass: string;
// }
export interface INiceSelect {
  options: string[];
  values: string[];
  defaultValue?: string;
  onChange: (value: string) => void;
  wrapperClass?: string;
  selectedOption?: string;
  selectedValue?: string;
  selectedIndex?: number;
}

export interface IButtonLink {
  cls?: string;
  title?: string;
  outline?: any;
}
export interface IRemoveModalCard {
  title: string;
  confirmationText: string;
  remove_btn_text: string;
  openRemoveModal: boolean;
  handleOpenRemoveModal: handler;
  handleRemove: handler;
}
