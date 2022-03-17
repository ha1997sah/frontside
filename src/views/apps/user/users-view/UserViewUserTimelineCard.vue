<template>
  <b-card title="Plus d'informations">
    <b-row>
<b-col
cols="12"
        xl="6">
      <app-timeline-item>
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Poids</h6>
        </div>
        <p>{{userData.weight}}</p>
      
      </app-timeline-item>
      <app-timeline-item variant="warning">

        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Taille</h6>
        </div>
        <p>{{userData.height}}</p>
     
      </app-timeline-item>
      </b-col>
      <b-col
      cols="12"
        xl="6">
       <app-timeline-item>
        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Poids</h6>
        </div>
        <p>{{userData.belt}}</p>
      
      </app-timeline-item>
      <app-timeline-item variant="warning">

        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Taille</h6>
        </div>
        <p>{{userData.level}}</p>
     
      </app-timeline-item>
      <app-timeline-item variant="warning">

        <div class="d-flex flex-sm-row flex-column flex-wrap justify-content-between mb-1 mb-sm-0">
          <h6>Certificat Medical</h6>
        </div>
 {{ userData.medicalCertification }}
               <b-button @click="openPdf"> Voir le certificat</b-button>     
      </app-timeline-item>
   </b-col>
       </b-row>

  </b-card>
</template>
<script>
import {
  BCard, BImg, BMedia, BAvatar,
} from 'bootstrap-vue'
import AppTimeline from '@core/components/app-timeline/AppTimeline.vue'
import AppTimelineItem from '@core/components/app-timeline/AppTimelineItem.vue'

export default {
  components: {
    BCard,
    BImg,
    BMedia,
    BAvatar,
    AppTimeline,
    AppTimelineItem,
  },
     props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  methods:{
         openPdf () {
   window.open("http://localhost:3001/2022-03-16T12-59-25.180Zcertificate.pdf");
}
  }
}
</script>

<style>

</style>
