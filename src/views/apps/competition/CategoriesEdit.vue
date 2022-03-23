<template>
  <component :is="competitionData === undefined ? 'div' : 'b-card'">

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

    <b-tabs
      v-if="competitionData"
      pills
    >

      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Modifier les informtions</span>
        </template>
          <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="competitionData.avatar"
          :text="avatarText(competitionData.name)"
          :variant="`light-${resolveUserRoleVariant(competitionData.role)}`"
          size="90px"
          rounded
        />
      </template>
       <div class="d-flex flex-wrap">
      <h4 class="mb-1">
        {{ competitionData.name }}
      </h4>
      </div>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
        >
          <input
            ref="refInputEl"
            type="file"
            class="d-none"
            @input="inputImageRenderer"
          >
          <span class="d-none d-sm-inline">Modifier</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Supprimer</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form
>
      <b-row>

        <!-- Field: Username -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Titre"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="competitionData.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Adresse"
            label-for="full-name"
          >
            <b-form-input
              id="full-name"
              v-model="competitionData.location"

            />
          </b-form-group>
        </b-col>
        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Date debut"
            label-for="debut"
          >
            <b-form-datepicker
      id="start-datepicker"
      v-model="competitionData.start"
      class="mb-1"
    />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
        <b-form-group
            label="Date fin"
            label-for="fin"
          >
            <b-form-datepicker
      id="end-datepicker"
      v-model="competitionData.end"
      class="mb-1"
    />
          </b-form-group>
        </b-col>
       
      </b-row>
    </b-form>

    <!-- PERMISSION TABLE -->
   
    <!-- Action Buttons -->
    <b-button
      variant="primary"
      type="button"
      @click="onSubmit"
   class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Valider
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Effacer
    </b-button>
  </div>
       
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,BFormDatepicker, BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCardHeader, BCardTitle, BFormCheckbox,

} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import competitionStoreModule from './competitionStoreModule'
import useCompetitionsList from './useCompetitionsList'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'



export default {
  components: {
    BFormDatepicker,
    BTab,
    BTabs,
    BAlert,
    BLink,
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
  
  },
  setup() {
    const toast = useToast()

    const { resolveUserRoleVariant } = useCompetitionsList()

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Maintainer', value: 'maintainer' },
      { label: 'Subscriber', value: 'subscriber' },
    ]

     const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

     const permissionsData = [
      {
        module: 'Admin',
        read: true,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'Staff',
        read: false,
        write: true,
        create: false,
        delete: false,
      },
      {
        module: 'Author',
        read: true,
        write: false,
        create: true,
        delete: false,
      },
      {
        module: 'Contributor',
        read: false,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'User',
        read: false,
        write: false,
        create: false,
        delete: true,
      },
    ]
      // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.competitionData.avatar = base64
    })
    const competitionData = ref(null)
    const club = ref(null)


    const COMPETITION_APP_STORE_MODULE_NAME = 'app-competition'
        const onSubmit = () => {
          store.dispatch('app-competition/editCompetition', competitionData.value )
        .then(() => {
          response => { competitionData.value = response.data.club}

             toast({
            component: ToastificationContent,
            props: {
              title: 'Operation réussi',
              text:"les informations ont été modifiées avec succès",
              icon: 'AlertTriangleIcon',
              variant: 'success',
            },
          }

          )

        }).catch({error:error.message})
    }

    // Register module
    if (!store.hasModule( COMPETITION_APP_STORE_MODULE_NAME)) store.registerModule( COMPETITION_APP_STORE_MODULE_NAME, competitionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule( COMPETITION_APP_STORE_MODULE_NAME)) store.unregisterModule( COMPETITION_APP_STORE_MODULE_NAME)
    })

   
     store.dispatch('app-competition/fetchCompetitionById')
      .then(response => { competitionData.value = response.data.competition })
      .catch(error => {
        if (error.response.status === 404) {
          competitionData.value = undefined
        }
      })

      return {
      onSubmit,
      competitionData,
      club,
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,
      permissionsData,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>

<style>

</style>
