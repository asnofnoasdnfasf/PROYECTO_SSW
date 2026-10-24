import { Routes } from '@angular/router';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form';
import { RecepcionFormComponent } from './recepcion/recepcion-form/recepcion-form';
export const routes: Routes = [
   // Redirecciona la página inicial directamente a recepción
  { path: '', redirectTo: 'recepcion', pathMatch: 'full' }, 
  
  // Ruta para el formulario de recepción
  { path: 'recepcion', component: RecepcionFormComponent },
  
  // Ruta para el formulario de clientes (por si quieres navegar a él después)
  { path: 'clientes', component: ClienteFormComponent } 
];
