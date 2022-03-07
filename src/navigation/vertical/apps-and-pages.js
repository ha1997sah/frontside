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
    title: 'Calendar',
    route: 'apps-calendar',
    icon: 'CalendarIcon',
  },

  {
    title: 'User',
    icon: 'UserIcon',
    children: [
      {
        title: 'Tous les utilisateurs',
        route: 'apps-users-list',
      },
      {
        title: 'Demandes d\'inscription',
        route: 'apps-users-requests',
      },
    
    ],
  },


]
