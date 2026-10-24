
import { Component, inject } from '@angular/core';
import {
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Cliente, ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './cliente-form.html',
  styleUrl: './cliente-form.css'
})
export class ClienteFormComponent {
  private fb = inject(FormBuilder);
  private clienteService = inject(ClienteService);

  mensaje = '';
  guardando = false;
  exito = false;
  vista: 'crear' | 'leer' | 'editar' | 'eliminar' = 'crear';
  clientes: Cliente[] = [];
  buscarCodigo: number | null = null;
  codigoEliminar: number | null = null;
    clienteEdicion: Cliente | null = null;
  clienteEliminar: Cliente | null = null;

  formulario = this.fb.nonNullable.group({
    nomCliente: ['', Validators.required],
    apeCliente: ['', Validators.required],
    dni: [''],
    correo: [''],
    direcc: [''],
    numTel: [''],
    MARCA: [''],
    MODELO: [''],
    NUMERO_SERIE: [''],
    DESCRIPCION: ['']
  });
   formularioEdicion = this.fb.nonNullable.group({
    nomCliente: ['', Validators.required],
    apeCliente: ['', Validators.required],
    dni: [''],
    correo: [''],
    direcc: [''],
    numTel: [''],
    MARCA: [''],
    MODELO: [''],
    NUMERO_SERIE: [''],
    DESCRIPCION: ['']
  });


  registrar(): void {
    this.mensaje = '';
    this.exito = false;

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      this.mensaje =
        'Revisa los campos: nombre y apellido son obligatorios.';
      return;
    }

    this.guardando = true;

    this.clienteService.crearCliente(this.formulario.getRawValue())
      .subscribe({
        next: () => {
          this.exito = true;
          this.mensaje = '¡Cliente registrado correctamente!';
          this.formulario.reset();
          this.guardando = false;
        },
        error: (error) => {
          console.error('Error al registrar cliente:', error);

          this.mensaje = error.status === 0
            ? 'No se pudo conectar con el backend. Verifica que esté ejecutándose y que CORS esté configurado.'
            : `No se pudo registrar el cliente. Código: ${error.status}.`;

          this.guardando = false;
        }
      });
  }
  verTabla(): void {
    this.mensaje = '';
this.vista = 'leer';
    this.clienteService.listarClientes().subscribe({
      next: (datos) => {
        this.clientes = datos;
        if (datos.length === 0) {
          this.mensaje = 'No hay clientes registrados.';
        }
      },
      error: (error) => {
        console.error(error);
        this.mensaje = `Error al cargar los clientes (${error.status}).`;
      }
    });
  }

  seleccionarParaEditar(cliente: Cliente): void {
    this.clienteEdicion = cliente;

    this.formularioEdicion.patchValue({
      nomCliente: cliente.nomCliente ?? '',
      apeCliente: cliente.apeCliente ?? '',
      dni: cliente.dni ?? '',
      correo: cliente.correo ?? '',
      direcc: cliente.direcc ?? '',
      numTel: cliente.numTel ?? '',
      MARCA: cliente.MARCA ?? '',
      MODELO: cliente.MODELO ?? '',
      NUMERO_SERIE: cliente.NUMERO_SERIE ?? '',
      DESCRIPCION: cliente.DESCRIPCION ?? ''
    });
  }

  buscarParaEditar(): void {
    if (this.buscarCodigo == null || this.buscarCodigo <= 0) {
      this.mensaje = 'Ingresa un código válido.';
      return;
    }

    this.clienteService.buscarCliente(this.buscarCodigo).subscribe({
      next: (cliente) => this.seleccionarParaEditar(cliente),
      error: (error) => {
        console.error(error);
        this.clienteEdicion = null;
        this.mensaje = error.status === 404
          ? 'No se encontró el cliente.'
          : `Error al buscar el cliente (${error.status}).`;
      }
    });
  }

  actualizar(): void {
    const cliente = this.clienteEdicion;

    if (!cliente?.idCliente) {
      this.mensaje = 'Primero busca un cliente para editar.';
      return;
    }

    if (this.formularioEdicion.invalid) {
      this.formularioEdicion.markAllAsTouched();
      this.mensaje = 'El nombre y el apellido son obligatorios.';
      return;
    }

    this.clienteService.actualizarCliente(
      cliente.idCliente,
      this.formularioEdicion.getRawValue()
    ).subscribe({
      next: () => {
        this.mensaje = 'Cliente actualizado correctamente.';
        this.exito = true;
        this.cancelarEdicion();
        this.verTabla();
      },
      error: (error) => {
        console.error(error);
        this.mensaje = `Error al actualizar el cliente (${error.status}).`;
        this.exito = false;
      }
    });
  }

  cancelarEdicion(): void {
    this.clienteEdicion = null;
    this.formularioEdicion.reset();
  }

  prepararEliminacion(id: number | undefined): void {
    if (id == null) {
      this.mensaje = 'El cliente no tiene un código válido.';
      return;
    }

    this.codigoEliminar = id;
    this.buscarParaEliminar();
  }

  buscarParaEliminar(): void {
    if (this.codigoEliminar == null || this.codigoEliminar <= 0) {
      this.mensaje = 'Ingresa un código válido para eliminar.';
      return;
    }

    this.clienteService.buscarCliente(this.codigoEliminar).subscribe({
      next: (cliente) => {
        this.clienteEliminar = cliente;
        this.mensaje = '';
      },
      error: (error) => {
        console.error(error);
        this.clienteEliminar = null;
        this.mensaje = error.status === 404
          ? 'No se encontró el cliente.'
          : `Error al buscar el cliente (${error.status}).`;
      }
    });
  }

  eliminar(): void {
    const cliente = this.clienteEliminar;

    if (!cliente?.idCliente) {
      this.mensaje = 'Primero busca el cliente que deseas eliminar.';
      return;
    }

    this.clienteService.eliminarCliente(cliente.idCliente).subscribe({
      next: () => {
        this.mensaje = 'Cliente eliminado correctamente.';
        this.exito = true;
        this.cancelarEliminacion();
        this.verTabla();
      },
      error: (error) => {
        console.error(error);
        this.mensaje = `Error al eliminar el cliente (${error.status}).`;
        this.exito = false;
      }
    });
  }

  cancelarEliminacion(): void {
    this.clienteEliminar = null;
    this.codigoEliminar = null;
  }
}
