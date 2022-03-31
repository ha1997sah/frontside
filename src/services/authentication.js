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

    isUniqueEmailClub(credentials){
        return Api().post('club/validate/email',credentials)
    },
    isUniqueEmailFed(credentials){
        return Api().post('fed/validate/email',credentials)
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
     //catgeories
     allCategories(){
        return Api().get('allCategories')
    },

    //competitions

    allCompetitions(){
        return Api().get('allCompetitions')
    },

    addCompetition(credentials){
        return Api().post('addEvent',credentials)
    },
    addCategory(credentials){
        return Api().post('addCategory',credentials)
    },
    findCometitionById(id){
        return Api().get(`competition/${id}`)

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
       clubUnderFeds(id){
         return Api().get(`clubUnderFeds/${id}`)
       },
       usersUnderClub(credentials){
        return Api().post('usersUnderClub',credentials)
      },
      usersUnderFed(credentials){
        return Api().post('usersUnderFed',credentials)
      },

      editCompetition(credentials,id){
        return Api().put(`editCompetition/${id}`,credentials)
    },

    deleteCompetition(id){
        return Api().delete(`deleteCompetition/${id}`)
       }, 

    // athlete
    allAthletes(){
        return Api().get('allAthletes')
    },
    athletesBySexe(credentials){
        return Api().post('athletesBySexe',credentials)
    },
    athletesByLevel(credentials){
        return Api().post('athletesByLevel',credentials)
    },
    getCategorie(){
        return Api().get('getCategorie')
    },
    findCategoryById(credentials){
        return Api().post('findCategoryById',credentials)
    },
    participantList(credentials){
        return Api().post('participantList',credentials)
    },
    latestCompetitions(){
        return Api().get('recentCompetition')
    },
    inscrit(credentials){
        return Api().post('inscri',credentials)
    },
    getRecords(credentials){
        return Api().post('userRecords',credentials)
    }
}
