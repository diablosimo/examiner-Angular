import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {name: 'Dashboard', url: 'dashboard', icon: 'icon-speedometer',},
  {title: true, name: 'Fonctionnalités'},

  {name: 'Classes', url: 'classes', icon: 'icon-drop'},
  {name: 'Examens', url: 'examens', icon: 'icon-pencil'},
  {name: 'Corrections', url: 'corrections', icon: 'icon-pencil'},
  {name: 'Modifications', url: 'professeur', icon: 'icon-drop'},
  {name: 'Réclamation', url: 'ajoutReclamation', icon: 'icon-pencil'},

  {name: 'Déconnecter', url: '/', icon: 'icon-logout', variant: 'danger', attributes: { target: '_self', rel: 'noopener' }}
];
