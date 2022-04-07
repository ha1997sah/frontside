<template>
  <content-with-sidebar
    v-if="Object.keys(blogDetail).length"
    class="cws-container cws-sidebar-right blog-wrapper"
  >

    <!-- content -->
    <div class="blog-detail-wrapper">
      <b-row>
        <!-- blogs -->
        <b-col cols="12">
          <b-card
            :img-src="blogDetail.image"
            img-top
            img-alt="Blog Detail Pic"
            :title="blogDetail.name"
            img-height="200"
          >
            <b-media no-body>
              <b-media-aside
                vertical-align="center"
                class="mr-50"
              > 
              
              </b-media-aside>
              <b-media-body> 
                <small class="text-muted mr-50">Date</small>
                  <b-link class="text-body">{{ blogDetail.start }}</b-link>
                <span class="text-muted ml-75 mr-50">|</span>
                  <b-link class="text-body">{{ blogDetail.end }}</b-link>
              </b-media-body>
            </b-media>
            <b-row >
              <b-col
              md="12"
              v-for="(cat) in blogDetail.Categories" :key="cat.id" >
            <!-- user commnets -->
        <table class="mt-2 mt-xl-0 w-100" >
            <tr>
            <th class="pb-50">
              <feather-icon
                icon="Edit3Icon"
                class="mr-75"
              />
              <span class="font-weight-bold">Titre</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{cat.nameCat}}
            </td>
          </tr>
           <tr>
            <th class="pb-50">
              <feather-icon
                icon="CalendarIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Dates</span>
            </th>
            <td class="pb-50 text-capitalize">
                <b-media no-body>
             
              <b-media-body>
                <small>
                  <b-link class="text-body">           
                       {{ new Date(cat.start).getDate()+'-'+new Date(cat.start).getMonth()+'-'+new Date(cat.start).getFullYear()}}
                       </b-link>
                </small>
                <span class="text-muted ml-75 mr-50">|</span>
                <small class="text-muted">
                   <b-link class="text-body">           
                       {{ new Date(cat.end).getDate()+'-'+new Date(cat.end).getMonth()+'-'+new Date(cat.end).getFullYear()}}
                </b-link>
                </small>
              </b-media-body>
            </b-media>
            </td>
          </tr>
            <tr>
            <th class="pb-50">
              <feather-icon
                icon="CheckIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Type</span>
            </th>
            <td class="pb-50 text-capitalize">
              {{cat.type}}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UsersIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Sexe</span>
            </th>
            <td class="pb-50">
              {{ cat.sexe }}
            </td>
          </tr>
          <tr>
            <th>
              <feather-icon
                icon="UsersIcon"
                class="mr-75"
              />

              <span class="font-weight-bold">Poids</span>
            </th>
             <td class="pb-50 text-capitalize">
              <b-link
               v-for="(w,index) in cat.weight.split('/')" :key="index"
              >
                <b-badge
                  pill
                  class="mr-75"
                  :variant="light-info"
                >
                  {{ w }}
                </b-badge>
              </b-link>
            </td> 
          
          </tr>
             <tr>
            <th>
              <feather-icon
                icon="UsersIcon"
                class="mr-75"
              />

              <span class="font-weight-bold">Age</span>
            </th>
             <td class="pb-50 text-capitalize">
              <b-link
               v-for="(w,index) in cat.age.split('/')" :key="index"
              >
                <b-badge
                  pill
                  class="mr-75"
                  :variant="light-info"
                >
                  {{ w }}
                </b-badge>
              </b-link>
            </td> 
          </tr>
        </table>

       
                    <hr class="my-2">

                  </b-col>

           </b-row>
                     <h3>Description</h3>

          <div
              class="blog-content"
              v-html="blogDetail.description"
            />
     
            <!-- eslint-enable -->
            <hr class="my-2">

            <div class="d-flex align-items-center justify-content-between">
             
            
            </div>
          </b-card>
        </b-col>
        <!--/ Leave a Blog Comment -->
      </b-row>
      <!--/ blogs -->
    </div>
    <!--/ content -->

    <!-- sidebar -->
    <div
      slot="sidebar"
      class="blog-sidebar py-2 py-lg-0"
    >
      <!-- input search -->
      <b-form-group class="blog-search">
        <b-input-group class="input-group-merge">
          <b-form-input
            id="search-input"
            v-model="search_query"
            placeholder="Search here"
          />
          <b-input-group-append
            class="cursor-pointer"
            is-text
          >
            <feather-icon
              icon="SearchIcon"
            />
          </b-input-group-append>
        </b-input-group>
      </b-form-group>
      <!--/ input search -->

      <!-- recent posts -->
      <div class="blog-recent-posts mt-3">
        <h6 class="section-label mb-75">
          Recent Posts
        </h6>
        <b-media
          v-for="(recentpost,index) in latestComp"
          :key="`http://localhost:3001/${recentpost.image}`"
          no-body
          :class="index? 'mt-2':''"
        >
          <b-media-aside class="mr-2">
            <b-link>
              <b-img
                :src="`http://localhost:3001/${recentpost.image}`"
                :alt="`http://localhost:3001/${recentpost.image}`.slice(6)"
                width="100"
                rounded
                height="70"
              />
            </b-link>
          </b-media-aside>
          <b-media-body>
            <h6 class="blog-recent-post-title">
              <b-link class="text-body-heading">
                {{ recentpost.name }}
              </b-link>
            </h6>
            <span class="text-muted mb-0">
              {{ new Date(recentpost.start).getDate()+'-'+new Date(recentpost.start).getMonth()+'-'+new Date(recentpost.start).getFullYear()}}
            </span>
          </b-media-body>
        </b-media>
      </div>
      <!--/ recent posts -->

    </div>
<participant-list :user-data="participantList"/> 
   </content-with-sidebar>

</template>

<script>
import {
  BFormInput, BMedia, BAvatar, BMediaAside, BMediaBody, BImg, BLink, BFormGroup, BInputGroup, BInputGroupAppend,
  BCard, BRow, BCol, BBadge, BCardText, BDropdown, BDropdownItem, BForm, BFormTextarea, BFormCheckbox, BButton,
} from 'bootstrap-vue'
import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import competitionStoreModule from './competitionStoreModule'

import Ripple from 'vue-ripple-directive'
import { kFormatter } from '@core/utils/filter'
import ContentWithSidebar from '@core/layouts/components/content-with-sidebar/ContentWithSidebar.vue'
import ParticipantList from '../user/users-list/ParticipantList.vue'
import authentication from '@/services/authentication.js'

export default {
  components: {
    ParticipantList,
    competitionStoreModule,
    BFormInput,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
    BLink,
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BBadge,
    BCardText,
    BDropdown,
    BForm,
    BDropdownItem,
    BFormTextarea,
    BFormCheckbox,
    BButton,
    ContentWithSidebar,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      search_query: '',
      commentCheckmark: '',
      blogSidebar: {},
      socialShareIcons: [
        'GithubIcon',
        'GitlabIcon',
        'FacebookIcon',
        'TwitterIcon',
        'LinkedinIcon',
      ],
    }
  },
  created() {
    this.$http.get('/blog/list/data/detail').then(res => { this.blogDetail = res.data })
    this.$http.get('/blog/list/data/sidebar').then(res => { this.blogSidebar = res.data })
  },
    methods: {
    kFormatter,
    tagsColor(tag) {
      if (tag === 'Quote') return 'light-info'
      if (tag === 'Gaming') return 'light-danger'
      if (tag === 'Fashion') return 'light-primary'
      if (tag === 'Video') return 'light-warning'
      if (tag === 'Food') return 'light-success'
      return 'light-primary'
    },
  },

    setup() {
    const blogDetail= ref(null)
    const image=ref(null)
    const latestComp=ref(null)

    const participantList=ref(null)
    const COMPETITION_APP_STORE_MODULE_NAME = 'app-competition'
    const date=ref(null)
    const end=ref(null)
    const categories=ref([])
    // Register module
    if (!store.hasModule(COMPETITION_APP_STORE_MODULE_NAME)) store.registerModule(COMPETITION_APP_STORE_MODULE_NAME, competitionStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(COMPETITION_APP_STORE_MODULE_NAME)) store.unregisterModule(COMPETITION_APP_STORE_MODULE_NAME)
    })
 
    store.dispatch('app-competition/fetchCompetitionById', { id: router.currentRoute.params.id })
      .then(response => { blogDetail.value = response.data.competition ,
           blogDetail.value.image=`http://localhost:3001/${response.data.competition.image}`,
            date.value = new Date(response.data.competition.start),
            end.value = new Date(response.data.competition.end),


           blogDetail.value.start= date.value.getDate()+'-'+date.value.getMonth()+'-'+date.value.getFullYear(),
           blogDetail.value.end= end.value.getDate()+'-'+end.value.getMonth()+'-'+end.value.getFullYear()})
      .catch(error => {
        if (error.response.status === 404) {
          blogDetail.value = undefined
        }
      }),

         authentication.participantList({ id: "1"}).then(response => {
      participantList.value= response.data.users,
      console.log(participantList.value)
    }),
    authentication.latestCompetitions().then(response =>{
      latestComp.value= response.data.competitions

    })

    return {
      blogDetail,
      image,
      participantList,
      latestComp,
      categories
    }}
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-blog.scss';
</style>
