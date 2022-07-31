import { defineStore } from 'pinia'

export const useStateStore = defineStore('userState',{
  state: () => ({
    userName:'',
    isAdmin:false,
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
    setState(){

    },
  }
})
