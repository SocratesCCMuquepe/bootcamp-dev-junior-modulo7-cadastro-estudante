package ao.osti.student_backend.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import ao.osti.student_backend.models.Course;

@RestController
@CrossOrigin
public class CourseController {
    private List<Course> courses = Arrays.asList(new Course(1, "Java"),
            new Course(2, "C++"),
            new Course(3, "Phyton"),
            new Course(4, "Outras"));

    @GetMapping("courses/{id}")
    public ResponseEntity<Course> getCourse(@PathVariable int id) {
        Course course = courses.stream()
                .filter(categori -> categori.getId() == id)
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found..!"));

        return ResponseEntity.ok(course);
    }

    @GetMapping("courses")
    public List<Course> getCourses() {
        return courses;
    }
}
