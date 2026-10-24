
package com.proyecto.backend.controller;

import com.proyecto.backend.model.Cliente;
import com.proyecto.backend.repository.ClienteRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteRepository clienteRepository;

    public ClienteController(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // ================= CREATE =================
    // POST /api/clientes
    @PostMapping
    public ResponseEntity<Cliente> crearCliente(
            @RequestBody Cliente cliente) {

        cliente.setIdCliente(null);

        Cliente nuevoCliente = clienteRepository.save(cliente);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(nuevoCliente);
    }

    // ================= READ: TODOS =================
    // GET /api/clientes
    @GetMapping
    public ResponseEntity<List<Cliente>> listarClientes() {

        List<Cliente> clientes = clienteRepository.findAll();

        return ResponseEntity.ok(clientes);
    }

    // ================= READ: POR ID =================
    // GET /api/clientes/5
    @GetMapping("/{id}")
    public ResponseEntity<Cliente> buscarCliente(
            @PathVariable Integer id) {

        return clienteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ================= UPDATE =================
    // PUT /api/clientes/5
    @PutMapping("/{id}")
    public ResponseEntity<Cliente> actualizarCliente(
            @PathVariable Integer id,
            @RequestBody Cliente datosActualizados) {

        return clienteRepository.findById(id)
                .map(clienteExistente -> {

                    // Datos personales
                    clienteExistente.setNomCliente(
                            datosActualizados.getNomCliente());

                    clienteExistente.setApeCliente(
                            datosActualizados.getApeCliente());

                    clienteExistente.setDni(
                            datosActualizados.getDni());

                    clienteExistente.setCorreo(
                            datosActualizados.getCorreo());

                    clienteExistente.setDirecc(
                            datosActualizados.getDirecc());

                    clienteExistente.setNumTel(
                            datosActualizados.getNumTel());

                    // Datos del dispositivo
                    clienteExistente.setMARCA(
                            datosActualizados.getMARCA());

                    clienteExistente.setMODELO(
                            datosActualizados.getMODELO());

                    clienteExistente.setNUMERO_SERIE(
                            datosActualizados.getNUMERO_SERIE());

                    clienteExistente.setDESCRIPCION(
                            datosActualizados.getDESCRIPCION());

                    Cliente actualizado =
                            clienteRepository.save(clienteExistente);

                    return ResponseEntity.ok(actualizado);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ================= DELETE =================
    // DELETE /api/clientes/5
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarCliente(
            @PathVariable Integer id) {

        if (!clienteRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        clienteRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
