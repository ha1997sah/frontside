<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="federationData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-federations-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="federationData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <federation-view-info-card :federation-data="federationData" />
        </b-col>
     
      </b-row>  
    

       <b-row>
        <club-list/>
      </b-row>
    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'
import InvoiceList from '@/views/apps/invoice/invoice-list/InvoiceList.vue'
import federationStoreModule from './federationStoreModule'
import FederationViewInfoCard from './FederationViewInfoCard.vue'
import FederationViewPlanCard from './FederationViewPlanCard.vue'
import FederationsEdit from './FederationsEdit.vue'
import ClubList from './ClubList.vue'
export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
 
    // Local Componentss
    FederationViewInfoCard,
    FederationViewPlanCard,
    ClubList,
 

    InvoiceList,
    FederationsEdit,
  },
  setup() {
    const federationData = ref(null)
    const clubs = ref(null)

    const FEDERATION_APP_STORE_MODULE_NAME = 'app-federation'

    // Register module
    if (!store.hasModule(FEDERATION_APP_STORE_MODULE_NAME)) store.registerModule(FEDERATION_APP_STORE_MODULE_NAME, federationStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(FEDERATION_APP_STORE_MODULE_NAME)) store.unregisterModule(FEDERATION_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-federation/fetchFederationById', { id: router.currentRoute.params.id })
      .then(response => { federationData.value = response.data.fed ,clubs.value=response.data.fed.Clubs,console.log(clubs)})
      .catch(error => {
        if (error.response.status === 404) {
          federationData.value = undefined
        }
      })
      


    return {
      federationData,
    }
  },
}
</script>

<style>

</style>
