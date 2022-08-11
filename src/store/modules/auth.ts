import { defineStore } from 'pinia';

export const useAuth = defineStore('auth-store', {
  state: () => {
    return {
      name: '张三',
    };
  },
});
