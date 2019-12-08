import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import {AuthGuard} from './_helpers/AuthGuard.helper';
import { GenerarReportesComponent } from './home/generar-reportes/generar-reportes.component';
import { SolicitudesComponent } from './home/solicitudes/solicitudes.component';
import { MedicosComponent } from './home/medicos/medicos.component';
import { PacientesComponent } from './home/pacientes/pacientes.component';
import { PersonalComponent } from './home/personal/personal.component';
import { MedicamentosComponent } from './home/medicamentos/medicamentos.component';
//import {AuthService} from './auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    GenerarReportesComponent,
    SolicitudesComponent,
    MedicosComponent,
    PacientesComponent,
    PersonalComponent,
    MedicamentosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule
    /*
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features */
  ],
  providers: [AuthService,AuthGuard],//AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
