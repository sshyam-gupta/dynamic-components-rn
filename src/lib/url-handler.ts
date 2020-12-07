const urlParse = require('url-parse');

export class UrlHandler {
  static openPageViaUrl(pathName: string, routeParams: any) {
    const paths: string[] = pathName.split('/');
    let params: any = routeParams;

    // always expect the 2nd element to be route name to be present
    if (paths.length < 2) {
      /* think of pushing the home / route */
      return;
    }

    const options: {
      params: any;
      routePath: string;
    } | null = UrlHandler.getJsonFromUrl(pathName);
    if (options) {
      params = {...params, ...options.params};
    }

    /* always expect route name to be at first index */
    this.navigate(paths[1] as string, params);
  }

  private static navigate(_routeName: string, _params: any) {
    // return Navigation.getInstance().push(routeName, params);
  }

  static getJsonFromUrl(
    actionUrl: string,
  ): {params: any; routePath: string} | null {
    if (!actionUrl) {
      return null;
    }

    const parsedUrl = urlParse(actionUrl, true);
    const pageName = parsedUrl.hostname;
    const result = parsedUrl.query;
    return {params: result, routePath: pageName};
  }

  static getPathNameFromUrl(url: string) {
    const uri = urlParse(url);

    const uriPathname = uri.pathname ? uri.pathname : '';
    const pathName =
      uri.protocol === 'demoapp:' ? `/${uri.host}${uriPathname}` : uriPathname;
    return pathName;
  }
}
