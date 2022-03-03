export default [
  {
    header: 'Apps & Pages',
  },
 
  {
    title: 'Chat',
    route: 'apps-chat',
    icon: 'MessageSquareIcon',
  },
 
  {
    title: 'Calendrier',
    route: 'apps-calendar',
    icon: 'CalendarIcon',
  },

  {
    title: 'Utilisateur',
    icon: 'UserIcon',
    children: [
      {
        title: 'Tous les utilisateurs',
        route: 'apps-users-list',
      },
    
    ],
  },

]
