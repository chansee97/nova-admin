interface Window {
  $loadingBar?: import('naive-ui').LoadingBarApiInjection;
  $dialog?: import('naive-ui').DialogApiInjection;
  $message?: import('naive-ui').MessageApiInjection;
  $notification?: import('naive-ui').NotificationApiInjection;
}

declare const AMap: any;
declare const BMap: any;

interface GolbalConfig {
	app: {
		proxyUrl: Record<ServiceEnvType, ServiceEnvConfig>;
	};
}
declare namespace NaiveUI {
	type ThemeColor = 'default' | 'error' | 'primary' | 'info' | 'success' | 'warning';
}
declare namespace UnionKey {
	/* http请求头content-type类型 */
	type ContentType = 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';
}
declare namespace Storage {
	interface Session {
		demoKey: string;
	}

	interface Local {
		userInfo: Auth.UserInfo;
		token: string;
		refreshToken: string;
		tabsRoutes: string;
		login_account: any;
	}
}