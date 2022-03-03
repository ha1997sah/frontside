import axios from '@axios'
import authentication from '@/services/authentication.js'

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
    fetchUserById(ctx, { id }) {
      return new Promise((resolve, reject) => {
        authentication
          .findUserById(id)
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
          .editUser( userData)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
    deleteUser(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .deleteUser()
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    },
  },
}
