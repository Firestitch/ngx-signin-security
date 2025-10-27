import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { FsSigninSecurityModule } from '@firestitch/signin-security';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { FsDialogModule } from '@firestitch/dialog';
import { FsMessageModule } from '@firestitch/message';
import { FsPasswordModule } from '@firestitch/password';
import { ToastrModule } from 'ngx-toastr';
import { FsExampleModule } from '@firestitch/example';
import { provideRouter, Routes } from '@angular/router';
import { ExamplesComponent } from './app/components';
import { AppComponent } from './app/app.component';

const routes: Routes = [
  { path: '', component: ExamplesComponent },
];



if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, FsSigninSecurityModule.forRoot({
            case: 'snake',
        }), FormsModule, FsDialogModule.forRoot(), FsMessageModule.forRoot(), FsPasswordModule.forRoot(), ToastrModule.forRoot({ preventDuplicates: true }), FsExampleModule.forRoot()),
        provideAnimations(),
        provideRouter(routes)
    ]
})
  .catch(err => console.error(err));

