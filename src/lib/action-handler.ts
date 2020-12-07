import {UrlHandler} from './url-handler';
import {Action, ActionType} from './../types/action';

const openWebView = (action: Action) => {
  if (!action.url) {
    return;
  }

  // return Navigation.getInstance().push(PageTypes.WebView, {url: action.url});
};

const widgetActionHandlerMap: {[id: string]: any} = {
  [ActionType.NAVIGATION]: (action: Action, params: any) => {
    if (!action.url) {
      return;
    }

    return UrlHandler.openPageViaUrl(action.url, params);
  },

  [ActionType.WEBVIEW]: (action: Action) => openWebView(action),
  [ActionType.WEBLINK]: (action: Action) => openWebView(action),
};

export const triggerWidgetAction = (action: Action, params?: any) => {
  const widgetActionHandler = widgetActionHandlerMap[action.actionType];
  if (widgetActionHandler !== undefined) {
    return widgetActionHandler(action, params);
  }
  return {type: 'NO_ACTION'};
};
