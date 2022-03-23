import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'
import { title } from '@core/utils/filter'

// Notification
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import router from '@/router'

export default function useUsersList() {
  // Use toast
  const toast = useToast()

  const refUserListTable = ref(null)

  // Table Handlers
  const tableColumns = [
    { key: 'Nom', sortable: true },
    { key: 'Prénom', sortable: true },
    { key: 'email', sortable: true },
    { key: 'role', sortable: true },
    { key: 'actions' },
  ]
  const perPage = ref(10)
  const totalUsers = ref(0)
  const currentPage = ref(1)
  const perPageOptions = [10, 25, 50, 100]
  const searchQuery = ref('')
  const sortBy = ref('id')
  const isSortDirDesc = ref(true)
  const roleFilter = ref(null)
  const planFilter = ref(null)
  const statusFilter = ref(null)

  const dataMeta = computed(() => {
    const localItemsCount = refUserListTable.value ? refUserListTable.value.localItems.length : 0
    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: totalUsers.value,
    }
  })

  const refetchData = () => {
    refUserListTable.value.refresh()
  }
  
  const handleOk= () =>{
    store.dispatch('app-user/deleteUser',   router.currentRoute.params.id )
    .then(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'user deleted',
            icon: 'AlertTriangleIcon',
            variant: 'success',
          },
        })
        router.replace({path: '/apps/users/list'})    

    }
    
    )
    
     .catch(error=>{console.log(error),
       toast({
      component: ToastificationContent,
      props: {
        title: 'user deleted',
        icon: 'AlertTriangleIcon',
        variant: 'danger',
      },
    })})
}


  watch([currentPage, perPage, searchQuery, roleFilter, planFilter, statusFilter], () => {
    refetchData()
  })
  

  const fetchPendingRequests = (ctx, callback) => {
    store
      .dispatch('app-user/fetchPendingRequests', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value, 
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        role: roleFilter.value,
        plan: planFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { users, total } = response.data

        callback(users)
        totalUsers.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  const fetchAthletes= (ctx, callback) => {
    store
      .dispatch('app-user/fetchAthletes', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value, 
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        role: roleFilter.value,
        plan: planFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { users, total } = response.data
         console.log(users)
        callback(users)
        totalUsers.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })}
      const athletesBySexe= (ctx, callback) => {
        store
          .dispatch('app-user/fetchAthletes',athletesByLevel, {
            q: searchQuery.value,
            perPage: perPage.value,
            page: currentPage.value, 
            sortBy: sortBy.value,
            sortDesc: isSortDirDesc.value,
            role: roleFilter.value,
            plan: planFilter.value,
            status: statusFilter.value,
          })
          .then(response => {
            const { users, total } = response.data
             console.log(users)
            callback(users)
            totalUsers.value = total
          })
          .catch(() => {
            toast({
              component: ToastificationContent,
              props: {
                title: 'Error fetching users list',
                icon: 'AlertTriangleIcon',
                variant: 'danger',
              },
            })
          })}
  const fetchUsers = (ctx, callback) => {
    store
      .dispatch('app-user/fetchPendingRequests', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        role: roleFilter.value,
        plan: planFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { users, total } = response.data

        callback(users)
        totalUsers.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      })
  }
  const fetchUsersTest = (ctx, callback) => {
    store
      .dispatch('app-user/fetchUsersTest', {
        q: searchQuery.value,
        perPage: perPage.value,
        page: currentPage.value,
        sortBy: sortBy.value,
        sortDesc: isSortDirDesc.value,
        role: roleFilter.value,
        plan: planFilter.value,
        status: statusFilter.value,
      })
      .then(response => {
        const { users, total } = response.data

        callback(users)
        totalUsers.value = total
      })
      .catch(() => {
        toast({
          component: ToastificationContent,
          props: {
            title: 'Error fetching users list',
            icon: 'AlertTriangleIcon',
            variant: 'danger',
          },
        })
      }) }

  // *===============================================---*
  // *--------- UI ---------------------------------------*
  // *===============================================---*

  const resolveUserRoleVariant = role => {
    if (role === 'subscriber') return 'primary'
    if (role === 'author') return 'warning'
    if (role === 'maintainer') return 'success'
    if (role === 'editor') return 'info'
    if (role === 'admin') return 'danger'
    return 'primary'
  }

  const resolveUserRoleIcon = role => {
    if (role === 'subscriber') return 'UserIcon'
    if (role === 'author') return 'SettingsIcon'
    if (role === 'maintainer') return 'DatabaseIcon'
    if (role === 'editor') return 'Edit2Icon'
    if (role === 'admin') return 'ServerIcon'
    return 'UserIcon'
  }

  const resolveUserStatusVariant = status => {
    if (status === 'pending') return 'warning'
    if (status === 'active') return 'success'
    if (status === 'inactive') return 'secondary'
    return 'primary'
  }


  return {
    fetchUsersTest,
    fetchUsers,
    tableColumns,
    perPage,
    currentPage,
    totalUsers,
    dataMeta,
    perPageOptions,
    searchQuery,
    sortBy,
    isSortDirDesc,
    refUserListTable,

    resolveUserRoleVariant,
    resolveUserRoleIcon,
    resolveUserStatusVariant,
    refetchData,

    // Extra Filters
    roleFilter,
    planFilter,
    statusFilter,
    handleOk,
    fetchPendingRequests,
    fetchAthletes,
    athletesBySexe,
  }

}
