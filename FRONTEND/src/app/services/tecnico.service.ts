import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Definimos la estructura basada en tu modelo de Java
export interface Tecnico {
  idTecnico: number; // Asegúrate de que coincida con las propiedades JSON de tu Backend
  nomtec: string;
}

@Injectable({
  providedIn: 'root'
})
export class TecnicoService {
  // Ajusta el puerto si tu Spring Boot corre en uno distinto al 8080
  private apiUrl = 'http://localhost:8080/api/tecnicos'; 

  constructor(private http: HttpClient) { }

  // Método para obtener todos los técnicos de la base de datos
  getTecnicos(): Observable<Tecnico[]> {
    return this.http.get<Tecnico[]>(this.apiUrl);
  }
}
