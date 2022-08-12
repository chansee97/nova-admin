import { defineStore } from 'pinia';
import { fetchLogin } from '@/service';
import { setUserInfo, getUserInfo, getToken, setToken } from '@/utils/auth';
import { router } from '@/router';

export const useAuthStore = defineStore('auth-store', {
  state: () => {
    return {
      userInfo: getUserInfo(),
      token: getToken(),
      loginLoading: false,
    };
  },
  getters: {
    /** 是否登录 */
    isLogin(state) {
      return Boolean(state.token);
    },
  },
  actions: {
    /* 用户登录 */
    async login(userName: string, password: string) {
      this.loginLoading = true;
      const data = await fetchLogin({ userName, password });

      // 处理登录信息
      this.handleAfterLogin(data as any);

      this.loginLoading = false;
    },
    handleAfterLogin(data: Auth.UserInfo) {
      // 存储用户信息
      setUserInfo(data);
      setToken(data.token);
      this.userInfo = data;
      this.token = data.token;

      // 触发用户提示
      window.$notification?.success({
        title: '登录成功!',
        content: `欢迎回来，${this.userInfo.realName}!`,
        duration: 3000,
      });

      // 进行跳转
      const route = router.currentRoute;
      const { query } = route.value;
      if (query?.redirect) {
        router.push(query.redirect as string);
      } else {
        router.push('/');
      }
    },
  },
});
