<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">
            Vuexy
          </h2>
        </b-link>
        <b-card-title class="mb-1">
          Welcome to Vuexy! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
          >

            <!-- email -->
            <b-form-group
              label-for="email"
              label="Email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="email"
                  name="login-email"
                  :state="errors.length > 0 ? false:null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Mot de passe</label>
                <b-link :to="{name:'auth-forgot-password-v1'}">
                  <small>Forgot Password?</small>
                </b-link>
              </div>
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
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- checkbox -->

            <!-- submit button -->
            <b-button
              variant="primary"
              type="button"
              block
              @click="login"


            >
              Connexion
            </b-button>

          </b-form>
        </validation-observer>

        <b-card-text class="text-center mt-2">
          <span>Nouveau member? </span>
          <b-link :to="{name:'auth-register-v1'}">
            <span>Créer un compte</span>
          </b-link>
        </b-card-text>

        <div class="divider my-2">
          <div class="divider-text">
            or
          </div>
        </div>

        <!-- social button -->
        <div class="auth-footer-btn d-flex justify-content-center">
          <b-button
            href="javascript:void(0)"
            variant="facebook"
          >
            <feather-icon icon="FacebookIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="twitter"
          >
            <feather-icon icon="TwitterIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="google"
          >
            <feather-icon icon="MailIcon" />
          </b-button>
          <b-button
            href="javascript:void(0)"
            variant="github"
          >
            <feather-icon icon="GithubIcon" />
          </b-button>
        </div>

      </b-card>
      <!-- /Login v1 -->
    </div>

  </div>

</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormCheckbox,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { VueRecaptcha } from 'vue-recaptcha';
import {mapState} from 'vuex'
import authentication from '@/services/authentication.js'


export default {
  components: {
    VuexyLogo,
    // BSV
    BCard,
    BLink,
    BCardTitle,
    BCardText,
    BForm,
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

      email: '',
      password: '',
      error: null,

      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
      ...mapState([
      'isUserLoggedIn',
      'user',
    ]),
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
	async login () {
      try {
       const response = await authentication.login ({
      email: this.email,
      password: this.password,
		  name: this.name,
		  lastname: this.lastname,
		  position: this.position,
		  phone: this.phone,
        })
		this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    },


      validateCaptcha() {
      this.$ref.recaptcha.execute()
    },
    async onCaptchaVerified(recaptchaToken) {
       try {
      const response = await authenticaion.login ({
      email: this.email,
      password: this.password,
		  name: this.name,
		  lastname: this.lastname,
		  position: this.position,
		  phone: this.phone,
      token: recaptchaToken
        })
      this.$store.dispatch('setToken', response.data.token)
      this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
  },
    onCaptchaExpired() {
      this.$ref.recaptcha.reset()
    },
      async navigateToProfile () {
      this.$router.push({
          name: 'App'
        })
    } ,
   }, }
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
