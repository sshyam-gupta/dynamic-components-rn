export enum ActionType {
  NAVIGATION = 'NAVIGATION',
  WEBVIEW = 'WEBVIEW',
  WEBLINK = 'WEB_LINK',
  ADD_TO_CART = 'ADD_TO_CART',
  SHOW_CONTENT_MODAL = 'SHOW_CONTENT_MODAL',
}

export interface Action {
  url?: string;
  actionType: ActionType;
  title?: string;
  enabled?: boolean;
  payload?: any;
}
