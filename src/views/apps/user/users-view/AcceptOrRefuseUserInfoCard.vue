<template>
  <b-card>

    <b-row>

      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :text="avatarText(userData.fullName)"
            :variant="`light-${resolveUserRoleVariant(userData.fullName)}`"
            size="104px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ userData.name }}
              </h4>
              <span class="card-text">{{ userData.name }} {{ userData.lastname }} </span>
            </div>
            <div class="d-flex flex-wrap">
               <b-button
        v-ripple.400="'rgba(40, 199, 111, 0.15)'"
        variant="outline-success"
        @click="acceptRegister"
      >
        Success
      </b-button>
                     <b-button
        v-ripple.400="'rgba(255, 159, 67, 0.15)'"
        variant="outline-warning"
        @click="refuseRegister"
      >
        Refuser
      </b-button>
            </div>
          </div>
        </div>

        <!-- User Stats -->
        <div class="d-flex align-items-center mt-2">
          <div class="d-flex align-items-center mr-2">
            <b-avatar
              variant="light-primary"
              rounded
            >
              <feather-icon
                icon="DollarSignIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                23.3k
              </h5>
              <small>Monthly Sales</small>
            </div>
          </div>

          <div class="d-flex align-items-center">
            <b-avatar
              variant="light-success"
              rounded
            >
              <feather-icon
                icon="TrendingUpIcon"
                size="18"
              />
            </b-avatar>
            <div class="ml-1">
              <h5 class="mb-0">
                $99.87k
              </h5>
              <small>Annual Profit</small>
            </div>
          </div>
        </div>
      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="6"
      >
        <table class="mt-2 mt-xl-0 w-100">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Nom</span>
            </th>
            <td class="pb-50">
              {{ userData.lastname }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Prénom</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.name }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="StarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Position</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{ userData.position }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="FlagIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Email</span>
            </th>
            <td class="pb-50">
              {{ userData.email }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
               <span class="font-weight-bold">Contact</span>
            </th>
            <td>
              {{ userData.phone }}
              
            </td>
          </tr>
        </table>
      </b-col>
    </b-row>

       
  </b-card>
</template>
 
<script>
import {
  BCard, BAvatar, BRow, BCol,BCardText, BButton 
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import useUsersList from '../users-list/useUsersList'
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'


export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,BCardCode, BCardText,
  },
   directives: {
    Ripple,
  },
  methods: {
        refuseRegister() {
      this.$swal({
        title: 'Warning!',
        text: ' You clicked the button!',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
         showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!',
}).then((result) => {
  if (result.isConfirmed) {
       store.dispatch('app-user/refuseRegister')
        .then(() => {
          response => { console.log("okkk")}
         this.$swal({
        title: 'Warning!',
        text: ' You clicked the button!',
        icon: 'warning',}
    )
          

        }).catch(error=>console.log(error))
 
  }
      })
    },
       acceptRegister() {
      this.$swal({
        title: 'Warning!',
        text: ' You clicked the button!',
        icon: 'warning',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
         showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!',
}).then((result) => {
  if (result.isConfirmed) {
       store.dispatch('app-user/acceptRegister')
        .then(() => {
          response => { console.log("okkk")}
         this.$swal({
        title: 'Warning!',
        text: ' You clicked the button!',
        icon: 'warning',}
    )
          

        }).catch(error=>console.log(error))
 
  }
      })
    },
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const { resolveUserRoleVariant,handleOk } = useUsersList()
  
    return {
      avatarText,
      resolveUserRoleVariant,
      handleOk,
    }
  },
}
</script>

<style>

</style>
