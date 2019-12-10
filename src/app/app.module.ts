import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
import { HttpClientModule, HttpHeaders} from '@angular/common/http';
import {AuthGuard} from './_helpers/AuthGuard.helper';
import { GenerarReportesComponent } from './home/generar-reportes/generar-reportes.component';
import { SolicitudesComponent } from './home/solicitudes/solicitudes.component';
import { MedicosComponent } from './home/medicos/medicos.component';
import { PacientesComponent } from './home/pacientes/pacientes.component';
import { PersonalComponent } from './home/personal/personal.component';
import { MedicamentosComponent } from './home/medicamentos/medicamentos.component';
import {EstadisticasService} from './_services/estadisticas.service';
import { HttpClient } from 'selenium-webdriver/http';
import { SolicitudesService } from './_services/solicitudes.service';
import { MedicosService } from './_services/medicos.service';
import { MedicamentosService } from './_services/medicamentos.service';
import { PersonalService } from './_services/personal.service';
import { PacientesService } from './_services/pacientes.service';
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
    HttpClientModule,
  //  HttpHeaders
    /*
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features */
  ],
  providers: [AuthService,AuthGuard,EstadisticasService,SolicitudesService,MedicosService,MedicamentosService,
    PersonalService,PacientesService,NgbModal],//AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
