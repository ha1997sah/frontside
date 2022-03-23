<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />
          <h2 class="brand-text text-primary ml-1">
            Vuexy
          </h2>
        </b-link>

        <b-card-text class="mb-2">
                Créer un nouveau compte
        </b-card-text>

        <!-- form -->
        <validation-observer ref="registerForm" v-slot="{ invalid }">
          <b-form
            class="auth-register-form mt-2"
            @submit.prevent="validationForm" enctype="multipart/form-data"
          >
            <!-- name -->
                <b-tabs>

         <b-tab active>
          <template #title>
          <feather-icon
            icon="Share2Icon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Etape 1</span>
        </template>
            <b-form-group
              label="Prénom"
              label-for="name"
            >
              <validation-provider
                #default="{ errors }"
                name="name"
                rules="required|min:3"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  :state="errors.length > 0 ? false:null"
                  name="register-name"
                  placeholder="johndoe"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- Lastname -->
            <b-form-group
              label="Nom"
              label-for="lastname"
            >
              <validation-provider
                #default="{ errors }"
                name="lastname"
                rules="required|min:3"
              >
                <b-form-input
                  id="lastname"
                  v-model="lastname"
                  :state="errors.length > 0 ? false:null"
                  name="register-lastname"
                  placeholder="johndoe"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
            <!-- email -->
            <b-form-group
              label="Email"
              label-for="email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email|unique"
              >
                <b-form-input
                  id="email"
                  v-model="email"
                  :state="errors.length > 0 ? false:null"
                  name="register-email"
                  placeholder="john@example.com"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group
              label="Mot de passe"
              label-for="password"
            >
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    :state="errors.length > 0 ? false:null"
                    class="form-control-merge"
                    name="register-password"
                    placeholder="············"
                  />
                  <b-input-group-append is-text>
                    <feather-icon
                      :icon="passwordToggleIcon"
                      class="cursor-pointer"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
                            </b-tab>
                             <b-tab >
              <template #title>
          <feather-icon
            icon="Share2Icon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Etape 2</span>
        </template>
               <!-- phone -->
             <b-form-group
              label="Numéro de téléphone"
              label-for="phone"
            >
              <validation-provider
                #default="{ errors }"
                name="phone"
                rules="required|min:8"
              >
                <b-form-input
                  id="phone"
                  v-model="phone"
                  :state="errors.length > 0 ? false:null"
                  name="register-phone"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>


           <!-- club -->
                 <validation-provider
            name="Club"
          >
            <b-form-group
              label="Club"
              label-for="club"
            >
              <v-select
              v-model="selectedItem"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="roleOptions"
                :clearable="false"
                input-id="club-fed"
              />
            
            </b-form-group>
          </validation-provider>
           <!-- -->
               <b-form-group
              label="Date de naissance"
              label-for="Date de naissance"
            >
              <validation-provider
                #default="{ errors }"
                name="Date de naissance"
                rules="required"
              >
     <b-form-datepicker
      id="example-datepicker"
      v-model="birthDate"
      class="mb-1"
    />
     <small class="text-danger">{{ errors[0] }}</small>

          </validation-provider>
     </b-form-group>
           <!-- -->
           </b-tab>
   <b-tab >
          <template #title>
          <feather-icon
            icon="Share2Icon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Etape 3</span>
        </template>
             <b-form-group
              label="Poids"
              label-for="weight"
            >
              <validation-provider
                #default="{ errors }"
                name="weight"
                rules="required"
              >
                <b-form-input
                  id="weight"
                  v-model="weight"
                  :state="errors.length > 0 ? false:null"
                  name="register-weight"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
             <b-form-group
              label="Longeur"
              label-for="height"
            >
              <validation-provider
                #default="{ errors }"
                name="height"
                rules="required"
              >
                <b-form-input
                  id="height"
                  v-model="height"
                  :state="errors.length > 0 ? false:null"
                  name="register-height"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
             <b-form-group
              label="Ceinture"
              label-for="belt"
            >
              <validation-provider
                #default="{ errors }"
                name="belt"
                rules="required"
              >
                <b-form-input
                  id="belt"
                  v-model="belt"
                  :state="errors.length > 0 ? false:null"
                  name="register-belt"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
       
         
     
           <b-form-group
              label="Certificat medical"
              label-for="Certificat medical"
            >
              <validation-provider
                #default="{ errors }"
                name="Certificat medical"
                rules="required"
              >
                <b-form-file
                v-model="file"
               placeholder="Choose a file or drop it here..."
                 drop-placeholder="Drop file here..."
                 ref="file"
                 @change="selectFile"
                   />
                 <small class="text-danger">{{ errors[0] }}</small>

          </validation-provider>
     </b-form-group> 
     
                </b-tab>
                    </b-tabs>

            <!-- submit button -->
            <b-button
              variant="primary"
              block
              :disabled="invalid"
              type="button"
              @click="register"
            >
              Sign up
            </b-button>
          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Vous avez déja un compte?  </span>
          <b-link :to="{name:'auth-login'}">
            <span>Connexion</span>
          </b-link>
        </b-card-text>

        <div class="divider my-2">
          <div class="divider-text">
            ou
          </div>
        </div>

        <!-- social buttons -->
        <div class="auth-footer-btn d-flex justify-content-center">
          <b-button
            variant="facebook"
            href="javascript:void(0)"
          >
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button
            variant="twitter"
            href="javascript:void(0)"
          >
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button
            variant="google"
            href="javascript:void(0)"
          >
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button
            variant="github"
            href="javascript:void(0)"
          >
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div>
      </b-card>
    <!-- /Register v1 -->
    </div>
  </div>

</template>
<script>
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import {mapState} from 'vuex'
import axios from 'axios'

import {
  BCard, BLink,BFormFile, BFormDatepicker, BCardTitle, BCardText, BForm,BFormInvalidFeedback,
  BButton, BFormInput, BFormGroup, BInputGroup, BInputGroupAppend, BFormCheckbox, BAlert,BTab, BTabs
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import authentication from '@/services/authentication.js'
import { password } from '@/@core/utils/validations/validations'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'


export default {
  components: {
    VuexyLogo,
    BTab, BTabs,
    BAlert,
    BFormInvalidFeedback,
    BFormDatepicker,
    vSelect,
    flatPickr,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
    BFormFile,
    BButton,
    BFormInput,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    // validations
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
       name: '',
	    lastname: '',
      position: 'admin',
	    phone: '',
      email: '',
      password: '',
      weight:'',
      height:'',
      belt:'',
      birthDate:'',
      certification:'',
      medicalCertificate:'',
      error: null,
      success:false,
      selectedItem:'',
      file:"",
     roleOptions :[],

      // validation rules
      required,
      email,
      clubs:[
        {label:"club1", value:"2"},
        {label:"club2", value:"3"},
      ]
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
      ...mapState([
      'isUserLoggedIn',
      'user',
    ])
  },
    mounted() {
    extend("unique", {
      validate: this.isUsernameUnique,
      message: "Username already taken"
    });
  },
  created() {
 axios.get("http://localhost:3001/allClubs").then(
   response=>{
const data = response.data.clubs
data.forEach(element => { this.roleOptions.push({label:element.name, value:element.id})
  console.log(this.roleOptions)
});


   }

 )
  },
  methods: {
    selectFile() {
      this.medicalCertificate=this.$refs.file.files[0]
    },
	async register () {
      try {
        const formData = new FormData();
        formData.append('medicalCertificate',this.file)
        formData.append('email',this.email)
        formData.append('password',this.password)
        formData.append('name',this.name)
        formData.append('lastname',this.lastname)

        formData.append('phone',this.phone)
        formData.append('ClubId',this.selectedItem.value)
        formData.append('birthDate',this.birthDate)
       const response = await authentication.register(formData)
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: 'Merci d\'avoir inscrit dans notre site',
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: 'Votre demande d\'inscription a été bien enregistrer nous traitons votre demande dans le bref délais',
                    },
                  })
                })
      } catch (error) {
        this.error = error.response.data.error
            this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: this.error,
                      icon: 'CoffeeIcon',
                      variant: 'danger',
                      text: this.error,
                    },
                  })
      
      }
    },

     async isUsernameUnique() {
      try {
        const response = await authentication.isUniqueEmail ({
      email: this.email,
     
        })
        return false;
      } catch (err) {
        if (err.response.status === 404) {
          return true;
        }
      }
    }

  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
