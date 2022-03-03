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

    findUserById(id){
        return Api().get(`user/${id}`)
    },

    editUser(credentials){
        return Api().put("edit/8",credentials)
    },

    deleteUser(){
        return Api().delete("delete/8")
    }
}