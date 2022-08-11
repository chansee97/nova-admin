import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth-store', {
  state: () => {
    return {
      name: '张三',
    };
  },
});
