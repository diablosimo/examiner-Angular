import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './view/login/login.component';
import { RegisterComponent } from './view/register/register.component';
import {VerificationcodeComponent} from "./view/verificationcode/verificationcode.component";
import {FirstVisitComponent} from "./view/first-visit/first-visit.component";
import {PasswordResetComponent} from "./view/password-reset/password-reset.component";

import { navItems } from './_nav';
import { navItems2 } from './_nav2';
import {ExamenComponent} from "./viewEtudiant/examen/examen.component";
import {ReponseComponent} from "./viewEtudiant/reponse/reponse.component";
import {ReclamationsComponent} from "./view/reclamation/reclamation.component";

export const routes: Routes = [
  //User
  {path: '', component: FirstVisitComponent, data: {title: 'Examiner'}},
  {path: 'login', component: LoginComponent, data: {title: 'Connexion'}},
  {path: 'register', component: RegisterComponent, data: {title: 'inscription'}},
  {path: 'PasswordReset', component: PasswordResetComponent, data: {title: 'Page 404'}},
  {path: 'verificationcode/:token', component: VerificationcodeComponent, data: {title: 'vérification code Page'}},


  //Error
  {path: '404', component: P404Component, data: {title: 'Page 404'}},
  {path: 'p', component: DefaultLayoutComponent, data: {navItem: navItems},
    children: [
      {path: '',
        loadChildren: () => import('./viewProfesseur/pdashboard/pdashboard.module').then(m => m.PdashboardModule)
      },
      {path: 'professeur',
        loadChildren: () => import('./viewProfesseur/professeurs/professeurs.module').then(m => m.ProfesseursModule)
      },
      {path: 'dashboard',
        loadChildren: () => import('./viewProfesseur/pdashboard/pdashboard.module').then(m => m.PdashboardModule)
      },
      {path: 'classes',
        loadChildren: () => import('./viewProfesseur/classes/classes.module').then(m => m.ClassesModule)
      },
      {path: 'examens',
        loadChildren: () => import('./viewProfesseur/examen-prof/examen-prof.module').then(m => m.ExamenProfModule)
      },
      {path: 'corrections',
        loadChildren: () => import('./viewProfesseur/correction/correction.module').then(m => m.CorrectionModule)
      },

      {path: 'ajoutReclamation',
        loadChildren: () => import('./view/ajout-reclamation/ajout-reclamation.module').then(m => m.AjoutReclamationModule)
      },
    ]
  },
  {path: 'e/examen', component: ExamenComponent, },
  {path: 'e/reponse', component: ReponseComponent, },
  {path: 'reclamations', component: ReclamationsComponent, },


  {path: 'e', component: DefaultLayoutComponent, data: {navItem: navItems2},
    children: [
      {path: '',
        loadChildren: () => import('./viewEtudiant/edashboard/edashboard.module').then(m => m.EdashboardModule)
      },
      {path: 'dashboard',
        loadChildren: () => import('./viewEtudiant/edashboard/edashboard.module').then(m => m.EdashboardModule)
      },
      {path: 'etudiants', loadChildren: () => import('./viewEtudiant/etudiants/etudiants.module').then(m => m.EtudiantsModule)
      },
      {path: 'examens',
        loadChildren: () => import('./viewEtudiant/examens/examens.module').then(m => m.ExamensModule)
      },
      {path: 'reponses',
        loadChildren: () => import('./viewEtudiant/reponses/reponses.module').then(m => m.ReponsesModule)
      },
      {path: 'notes',
        loadChildren: () => import('./viewEtudiant/notes/notes.module').then(m => m.NotesModule)
      },
      {path: 'ajoutReclamation',
        loadChildren: () => import('./view/ajout-reclamation/ajout-reclamation.module').then(m => m.AjoutReclamationModule)
      },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
