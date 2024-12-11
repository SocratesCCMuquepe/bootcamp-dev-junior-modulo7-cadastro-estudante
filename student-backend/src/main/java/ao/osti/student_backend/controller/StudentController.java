package ao.osti.student_backend.controller;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import ao.osti.student_backend.models.Student;

@RestController
@CrossOrigin
public class StudentController {

    private List<Student> students = new ArrayList<>();

    public StudentController() {
        // Dados de 3 estudantes conforme o exercicio
        students.add(new Student(1, "João Primeiro", "joao.primeiro@gmail.com", "(92) 9260-1177", 2, 2));
        students.add(new Student(2, "Antonio Segundo", "antonio.segundo@gmail.com", "(94) 7740-8310", 1, 1));
        students.add(new Student(3, "Paulo Terceiro", "paulo.terceiro@gmail.com", "(92) 1457-9812", 3, 3));
    }

    @PostMapping("student")
    public ResponseEntity<Student> save(@RequestBody Student student) {

        student.setId(students.size() + 1);
        students.add(student);

        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(student.getId())
                .toUri();

        return ResponseEntity.created(location).body(student);
    }

    @GetMapping("students/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable int id) {
        Student student = students.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Student not found..!"));

        return ResponseEntity.ok(student);
    }

    @GetMapping("students")
    public List<Student> getStudents() {
        return students;
    }

}