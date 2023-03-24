/** 用户相关模块 */
declare namespace Auth {
	/**
	 * 用户角色类型(前端静态路由用角色类型进行路由权限的控制)
	 * - super: 超级管理员(该权限具有所有路由数据)
	 * - admin: 管理员
	 * - user: 用户
	 * - custom: 自定义角色
	 */

	/** 用户信息 */
	interface loginToken {
		token: string;
		refreshToken: string;
	}
	type RoleType = 'super' | 'admin' | 'manage' | 'user';
	interface UserInfo {
		/** 用户id */
		userId: number;
		/** 用户名 */
		userName: string;
		/* 用户称呼 */
		realName: string;
		/* 用户头像 */
		avatar: string;
		/** 用户角色类型 */
		role: RoleType;

	}
}
/* 系统消息 */
declare namespace Message {
	interface Tab {
		key: number;
		name: string;
		badgeProps?: import('naive-ui').BadgeProps;
		list: List[];
	}
	interface List {
		id: number;
		title: string;
		icon: string;
		tagTitle?: string;
		tagType?: 'error' | 'info' | 'success' | 'warning';
		description?: string;
		isRead?: boolean;
		date: string;
	}
}

declare namespace CommonList {
	interface UserList {
		id: number;
		name: string;
		age: number;
		gender: '0' | '1' | null;
		email: string;
		address: string;
		role: RoleType;
		disabled: boolean;
	}
}
