import Api from '../services/Api.js'
import router from '@/router'

export default {

    register(credentials){
        return Api().post('register',credentials)
    },
    addAdmin(credentials){
        return Api().post('addAdmin',credentials)
    },
    login(credentials){
        return Api().post('login',credentials)
    },
    resetPassword(credentials){
        return Api().post('reset',credentials)
    },
    confirmResetPassword(credentials,id=router.currentRoute.params.id){
        return Api().post(`confirmReset/${id}`,credentials)
    },

    isUniqueEmail(credentials){
        return Api().post('validate/email',credentials)
    },

    allUsers(){
        return Api().get('users')
    },
    allPendingRequests(){
        return Api().get('allPendingRequests')
    },
    findUserById(id){
        return Api().get(`user/${id}`)
    },

    acceptRegister(id){
        return Api().post(`acceptRegister/${id}`)
    },

    refuseRegister(id){
        return Api().delete(`refuseRegister/${id}`)
    },

    editUser(credentials,id){
        return Api().put(`edit/${id}`,credentials)
    },

    deleteUser(id){
     return Api().delete(`delete/${id}`)
    },   

    // Notifications

    allNotifications() {
        return Api().get('notifications')
    },

    //competitions

    allCompetitions(){
        return Api().get('allCompetitions')
    },

    addEvent(credentials){
        return Api().post('addEvent',credentials)
    },
    allClubs(){
        return Api().get('allClubs')
    },
    addClub(credentials){
        return Api().post('createClub',credentials)
    },

    findClubById(id){
        return Api().get(`club/${id}`)
    },
     
    editClub(credentials,id){
        return Api().put(`editClub/${id}`,credentials)
    },

    deleteClub(id){
        return Api().delete(`deleteClub/${id}`)
       }, 

    // Federtions

    allFederations(){
        return Api().get('allFederations')
    },

    addFederation(credentials){
        return Api().post('createFederation',credentials)
    },

    findFederationById(id){
        return Api().get(`Federation/${id}`)
    },
     
    editFederation(credentials,id){
        return Api().put(`editFederation/${id}`,credentials)
    },

    deleteFederation(id){
        return Api().delete(`deleteFederation/${id}`)
       }, 
       clubUnderFed(id){
         return Api().get(`clubUnderFed/${id}`)
       },
       usersUnderClub(id){
        return Api().get(`usersUnderClub/${id}`)
      }
}