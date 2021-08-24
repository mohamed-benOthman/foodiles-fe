import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',

  },
  {
    title: true,
    name: 'Les Restaurants',

  },
  {
    name: 'Liste des Restaurants',
    url: '/restaurants/list',
    icon: 'cil-pizza'
  },
  {
    name: 'Gestion des Images',
    url: '/restaurants/images',
    icon: 'cil-camera'
  },
  {
    name: 'Les commentaires',
    url: '/restaurants/commentaires',
    icon: 'cil-chat-bubble'
  },
  {
    name: 'Les Exigences ',
    url: '/restaurants/exigences-alimentaires',
    icon: 'cil-apple'
  },
  {
    name: 'Moyens de paiement ',
    url: '/restaurants/paiement',
    icon: 'cil-bank'
  },
  {
    name: 'Guides Michelin ',
    url: '/restaurants/michelin',
    icon: 'cil-badge'
  },
  {
    name: 'Evenements',
    url: '/restaurants/evenement-list',
    icon: 'cil-running'
  },
  {
    name: 'Types de cuisine',
    url: '/restaurants/types-cuisines-list',
    icon: 'cil-fire'
  },
  {
    name: 'Cadres Ambiances',
    url: '/restaurants/cadre-ambiances-list',
    icon: 'cil-coffee'
  },
  {
    name: 'Bon Plan',
    url: '/restaurants/bonplans-list',
    icon: 'cil-wallet'
  },
  {
    name: 'Les menus ',
    url: '/restaurants/menu',
    icon: 'cil-burger'
  },

  {
    title: true,
    name: 'Les Notifications'
  },
  {
    name: 'Envoyer notification',
    url: '/notification/envoyer-notification',
    icon: 'cil-bell'
  },
  {
    title: true,
    name: 'Les Utilisateurs'
  },
  {
    name: 'Gestion Utilisateurs',
    url: '/users/users-list',
    icon: 'cil-group'
  },

];
