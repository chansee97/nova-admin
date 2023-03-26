import { useAuthStore } from '@/store';
import { isArray, isString } from '@/utils';


interface AppInfo {
	/** 项目名称 */
	name: string;
	/** 项目标题 */
	title: string;
	/** 项目描述 */
	desc: string;
}

/** 项目信息 */
export function useAppInfo(): AppInfo {
	const {
		VITE_APP_NAME: name,
		VITE_APP_TITLE: title,
		VITE_APP_DESC: desc,
	} = import.meta.env;

	return {
		name,
		title,
		desc,
	};
}

/** 权限判断 */
export function usePermission() {
	const authStore = useAuthStore()

	function hasPermission(permission: Auth.RoleType | Auth.RoleType[] | undefined) {

		if (!permission) return true

		if (!authStore.userInfo) return false
		const { role } = authStore.userInfo

		let has = role === 'super';
		if (!has) {
			if (isArray(permission)) {
				has = (permission as Auth.RoleType[]).includes(role);
			}
			if (isString(permission)) {
				has = (permission as Auth.RoleType) === role;
			}
		}
		return has;
	}

	return {
		hasPermission
	};
}

