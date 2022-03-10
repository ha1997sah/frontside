export default [
  {
    path: '/access-control',
    name: 'access-control',
    component: () => import('@/views/apps/acl/CompetitionList.vue'),
    meta: {
      resource: 'ACL',
      action: 'read',
    },
  },

  {
    path: '/apps/competition/:id',
    name: 'apps-competition-detail',
    component: () => import('@/views/apps/acl/CompetitionDetail.vue'),
    meta: {
      resource: 'ACL',
      action: 'read',
      pageTitle: 'Blog Detail',
      breadcrumb: [
        {
          text: 'Pages',
        },
        {
          text: 'Blog',
        },
        {
          text: 'Detail',
          active: true,
        },
      ],
    },
  },
]
