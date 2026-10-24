import { Component, OnInit } from '@angular/core';
import { TecnicoService, Tecnico } from '../../services/tecnico.service'; 
import { CommonModule } from '@angular/common';
@Component({
  imports: [CommonModule],
  selector: 'app-recepcion-form',
  styleUrl: './recepcion-form.css',
  templateUrl: './recepcion-form.html',
})
export class RecepcionFormComponent   implements OnInit {
listaTecnicos: Tecnico[] = []; // Aquí se guardará la respuesta de la DB

  constructor(private tecnicoService: TecnicoService) { }

  ngOnInit(): void {
    this.cargarTecnicos();
  }

  cargarTecnicos(): void {
    this.tecnicoService.getTecnicos().subscribe({
      next: (data) => {
        this.listaTecnicos = data;
        console.log('Técnicos cargados con éxito:', data); // Añadimos esto para ver el registro en la consola
      },
      error: (err) => {
        console.error('Error al conectar con el backend de técnicos:', err);
      }
    });
}}
