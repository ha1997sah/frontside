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
    }
}