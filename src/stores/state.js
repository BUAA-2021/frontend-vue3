import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
export const useStateStore = defineStore('userState',{
  state: () => ({
    userName:'',
    isLoggedIn:false,
    userToken:'',
    userId:'',
    userEmail:'',
    userAvatar:'',
  }),
  getters: {
    getUserName: (state) => state.userName,
  },
  actions: {
    loginAction(payload){
      const{userName,userToken,userId,userEmail,userAvatar}=payload;
      useStorage('token',userToken);
      this.userName = userName;
      // 下面也诸如此类
    },
    logoutAction(){
      const token = useStorage('token');
      token.value = null;
    }
}})