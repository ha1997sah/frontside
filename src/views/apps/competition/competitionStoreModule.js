import axios from '@axios'
import authentication from '@/services/authentication.js'
import router from '@/router'

export default {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    fetchCompetitions(ctx, queryParams) {
      return new Promise((resolve, reject) => {
        authentication
          .allCompetitions()
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
 
 
    fetchCompetitionById(ctx) {
      return new Promise((resolve, reject) => {
        authentication
          .findCometitionById(router.currentRoute.params.id )
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    },
 
   addCompetition(ctx, clubData) {
      return new Promise((resolve, reject) => {
        authentication.addCompetition(clubData)
          .then(response => resolve(response))
          .catch(error => reject(error))
      })
    }, 
    editCompetition(ctx, clubData) {
      return new Promise((resolve, reject) => {
        authentication
          .editCompetition( clubData,router.currentRoute.params.id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    }, 
    deleteCompetition(ctx,id) {
      return new Promise((resolve, reject) => {
        authentication
          .deleteCompetition(id)
          .then(response => resolve(response))
          .catch(error => {reject(error), console.log(error.message)})
      })
    }, 

  },
}
