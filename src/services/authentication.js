import Api from '../services/Api.js'


export default {

    register(credentials){
        return Api().post('register',credentials)
    },
    login(credentials){
        return Api().post('login',credentials)
    },
    resetPassword(credentials){
        return Api().post('reset',credentials)
    },
    confirmResetPassword(credentials){
        return Api().post('confirmReset',credentials)
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
    }

}