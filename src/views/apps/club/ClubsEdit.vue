<template>
  <component :is="clubData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="clubData === undefined"
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
      v-if="clubData"
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
          <span class="d-none d-sm-inline">Modifier votre compte</span>
        </template>
          <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="clubData.avatar"
          :text="avatarText(clubData.name)"
          :variant="`light-${resolveUserRoleVariant(clubData.role)}`"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ clubData.name }}
      </h4>
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
            label="Club"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="clubData.name"
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
              v-model="clubData.adress"

            />
          </b-form-group>
        </b-col>
         <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Pays"
            label-for="full-name"
          >
            <b-form-input
              id="full-name"
              v-model="clubData.country"

            />
          </b-form-group>
        </b-col>
        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="E-mail"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="clubData.email"
              type="email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Contact"
            label-for="company"
          >
            <b-form-input
              id="company"
              v-model="clubData.phone"
            />
          </b-form-group>
        </b-col>
          <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Responsable"
            label-for="company"
          >
            <b-form-input
              id="company"
              v-model="clubData.managerfullName"
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
  BTab, BTabs, BCard, BAlert, BLink, BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BTable, BCardHeader, BCardTitle, BFormCheckbox,

} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import router from '@/router'
import store from '@/store'
import clubStoreModule from './clubStoreModule'
import useClubsList from './useClubsList'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useToast } from 'vue-toastification/composition'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'



export default {
  components: {
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

    const { resolveUserRoleVariant } = useClubsList()

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
      props.clubData.avatar = base64
    })
    const clubData = ref(null)
    const club = ref(null)


    const CLUB_APP_STORE_MODULE_NAME = 'app-club'
        const onSubmit = () => {
          store.dispatch('app-club/editClub', clubData.value )
        .then(() => {
          response => { clubData.value = response.data.club}
             toast({
            component: ToastificationContent,
            props: {
              title: 'user modified',
              icon: 'AlertTriangleIcon',
              variant: 'success',
            },
          }).catch({error:error.message})
        })
    }

    // Register module
    if (!store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.registerModule(CLUB_APP_STORE_MODULE_NAME, clubStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(CLUB_APP_STORE_MODULE_NAME)) store.unregisterModule(CLUB_APP_STORE_MODULE_NAME)
    })

   
     store.dispatch('app-club/fetchClubById')
      .then(response => { clubData.value = response.data.club })
      .catch(error => {
        if (error.response.status === 404) {
          clubData.value = undefined
        }
      })

      return {
      onSubmit,
      clubData,
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
