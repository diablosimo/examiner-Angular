import { INavData } from '@coreui/angular';

export const navItems2: INavData[] = [
  {name: 'Dashboard', url: 'dashboard', icon: 'icon-speedometer',},
  {name: 'Examens', url: 'examens', icon: 'icon-pencil'},
  {name: 'Réponses', url: 'reponses', icon: 'icon-pencil'},
  {name: 'Notes', url: 'notes', icon: 'icon-pencil'},
  {name: 'Modifications', url: 'etudiants', icon: 'icon-pencil'},
  {name: 'Réclamation', url: 'ajoutReclamation', icon: 'icon-pencil'},

  {name: 'Déconnecter', url: '/', icon: 'icon-logout', variant: 'danger', attributes: { target: '_self', rel: 'noopener' }}
];
