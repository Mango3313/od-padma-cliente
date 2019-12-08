import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {AuthGuard} from './_helpers/AuthGuard.helper';
import {GenerarReportesComponent} from './home/generar-reportes/generar-reportes.component';
import {MedicosComponent} from './home/medicos/medicos.component';
import {MedicamentosComponent} from './home/medicamentos/medicamentos.component';
import {PacientesComponent} from './home/pacientes/pacientes.component';
import {PersonalComponent} from './home/personal/personal.component';
import {SolicitudesComponent} from './home/solicitudes/solicitudes.component';
//import { AuthService } from './auth.service';


const routes: Routes = [{path:'',component:LoginComponent},
{path:'home',component:HomeComponent,canActivate: [AuthGuard],children:[
  {path:'',component: GenerarReportesComponent},
  {path:'solicitudes',component: SolicitudesComponent},
  {path:'medicos',component: MedicosComponent},
  {path:'pacientes',component: PacientesComponent},
  {path:'personal',component: PersonalComponent},
  {path:'medicamentos',component: MedicamentosComponent},
]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes,{enableTracing:true})],
  exports: [RouterModule],
})
export class AppRoutingModule { }
