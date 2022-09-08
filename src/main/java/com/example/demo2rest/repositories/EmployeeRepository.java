package com.example.demo2rest.repositories;

import com.example.demo2rest.entities.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
}
