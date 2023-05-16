import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestFetchComponent } from './test-fetch/test-fetch.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [  
  {  path: 'fetch', component: TestFetchComponent },
  { path: '', component: AuthenticationComponent },
  {path: 'about', component: AboutComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
