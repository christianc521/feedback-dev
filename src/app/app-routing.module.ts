import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestFetchComponent } from './test-fetch/test-fetch.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { SettingsComponent } from './settings/settings.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: AuthenticationComponent},
  { path: 'fetch', component: TestFetchComponent},
  { path: 'about', component: AboutComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'settings', component: SettingsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
