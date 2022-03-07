import axios from '@axios'
import authentication from '@/services/authentication.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchUsersTest(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .allUsers()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUsers(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/apps/user/users', { params: queryParams })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUserById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findUserById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchPendingRequests(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .allPendingRequests()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    fetchUser(ctx, { id }) {
      return new Promise((resolve, reject) => {
        axios
          .get(`/apps/user/users/${id}`)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    addUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        axios
          .post('/apps/user/users', { user: userData })
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
    editUser(ctx, userData) {
      return new Promise((resolve, reject) => {
        authentication
          .editUser( userData,router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
    deleteUser(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .deleteUser(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
    acceptRegister(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .acceptRegister(router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },

    refuseRegister(ctx, userData) {
      return new Promise((resolve, reject) => {
        authentication
          .refuseRegister(router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
  },
}
