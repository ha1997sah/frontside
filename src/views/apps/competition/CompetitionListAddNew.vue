<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Ajouter une competition
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- Full Name -->
          <validation-provider
            #default="validationContext"
            name="titre"
          >
            <b-form-group
              label="Titre"
              label-for="titre"
            >
              <b-form-input
                id="titre"
                v-model="clubData.name"
                autofocus
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Country -->
          <validation-provider
            #default="validationContext"
            name="Adresse"
          >
            <b-form-group
              label="Adresse"
              label-for="adresse"
            >
              <b-form-input
                id="adresse"
                v-model="clubData.location"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

             <validation-provider
            #default="validationContext"
            name="Description"
          >
            <b-form-group
              label="Description"
              label-for="description"
            >
              <b-form-input
                id="description"
                v-model="clubData.description"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
    
          <!-- User Role -->
          <validation-provider
            #default="validationContext"
            name="Categorie"
          >
            <b-form-group
              label="Categorie des poids"
              label-for="categorie"
              :state="getValidationState(validationContext)"
            >
              <v-select
              v-model="clubData.selectedItem"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                :clearable="false"
                input-id="club-categorie"
              />
              <b-form-invalid-feedback :state="getValidationState(validationContext)">
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>
          <b-form-group>
                <b-form-file
               placeholder="Choisir une photo..."
                 drop-placeholder="Photo..."
                 @change="selectFile"
                   />
             </b-form-group>
 <b-form-datepicker
      id="start-datepicker"
      v-model="clubData.start"
      class="mb-1"
    />
<b-form-datepicker
      id="end-datepicker"
      v-model="clubData.end"
      class="mb-1"
    />
          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Ajouter
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Effacer
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm,BFormFile,BFormDatepicker, BFormGroup, BFormInput, BFormInvalidFeedback, BButton,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import { useToast } from 'vue-toastification/composition'

import authentication from '@/services/authentication.js'

export default {

  components: {
    BSidebar,
    BFormFile,
    BFormDatepicker,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    vSelect,

    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
    planOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      location,
      countries,
      error:null,
      file:""


    }
  },
  setup(props, { emit }) {
        const toast = useToast()

    const blankclubData = {
      name: '',
	    lastname: '',
	    phone: '',
      email: '',
      password: '',
      role:null,
      error:null,
    }
           const file = ref(null)

    const clubData = ref(JSON.parse(JSON.stringify(blankclubData)))
    const resetclubData = () => {
      clubData.value = JSON.parse(JSON.stringify(blankclubData))
    }
      const selectFile=(e) => {
   file.value=e.target.files[0]
  console.log(file.value)

      }
    const onSubmit = () => {
      const formData = new FormData()
      formData.append('name',clubData.value.name)
      formData.append('id',clubData.value.selectedItem.value)
      formData.append('start',clubData.value.start)
      formData.append('end',clubData.value.end)
      formData.append('location',clubData.value.location)
      formData.append('description',clubData.value.description)



      formData.append('competitionImage',file.value)
    

      store.dispatch('app-competition/addCompetition',formData)
        .then(() => {
            toast({
          component: ToastificationContent,
          props: {
            title: 'Opération réussi',
            icon: 'AlertTriangleIcon',
            
            variant: 'success',
          },
        })

          emit('refetch-data')
          emit('update:is-add-new-user-sidebar-active', false)
        }).catch({error:error.message})
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetclubData)

    return {
      clubData,
      onSubmit,
      refFormObserver,
      getValidationState,
      resetForm,
      selectFile,
      file,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
