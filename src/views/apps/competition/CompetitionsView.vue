<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="competitionData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-clubs-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="competitionData">
      <!-- First Row -->
      <b-row>
        <b-col
          cols="12"
          xl="12"
          lg="12"
          md="12"
        >
          <competition-view-info-card :competition-data="competitionData" />
        </b-col>
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
import competitionStoreModule from './competitionStoreModule'
import CompetitionViewInfoCard from './CompetitionViewInfoCard.vue'
import CompetitionViewPlanCard from './CompetitionViewPlanCard.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
 
    // Local Componentss
    CompetitionViewInfoCard,
    CompetitionViewPlanCard,

  },
  setup() {
    const competitionData = ref(null)

    const COMPETITION_APP_STORE_MODULE_NAME = 'app-competition'

    // Register module
    if (!store.hasModule(COMPETITION_APP_STORE_MODULE_NAME)) store.registerModule(COMPETITION_APP_STORE_MODULE_NAME, competitionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(COMPETITION_APP_STORE_MODULE_NAME)) store.unregisterModule(COMPETITION_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-competition/fetchCompetitionById', { id: router.currentRoute.params.id })
      .then(response => { competitionData.value = response.data.competition ,
      competitionData.value.start= (response.data.competition.start).getFullYear()
      console.log(competitionData)})
      .catch(error => {
        if (error.response.status === 404) {
          competitionData.value = undefined
        }
      })

    return {
      competitionData,
    }
  },
}
</script>

<style>

</style>
