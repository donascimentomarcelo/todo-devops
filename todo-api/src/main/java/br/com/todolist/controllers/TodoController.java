package br.com.todolist.controllers;

import br.com.todolist.documents.Task;
import br.com.todolist.repositories.TaskRepository;
import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TaskRepository taskRepository;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Task taskRequest) {
        Task task = taskRepository.save(taskRequest);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/todo/{id}")
                .buildAndExpand(task.getId())
                .toUri();

        return ResponseEntity
                .created(uri)
                .body(task);
    }

    @GetMapping
    public ResponseEntity<List<Task>> getAll() {
        List<Task> task = taskRepository.findAll();
        return ResponseEntity.ok().body(task);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Task> findById(@PathVariable String id) {
        Task task = taskRepository.findById(id)
                .orElse( null);
        return ResponseEntity.ok().body(task);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Task> delete(@PathVariable String id) {
        taskRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
