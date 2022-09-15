import React from "react";
import { useState, useEffect } from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import Employee from "./Employee";

function Home() {
    const [employeeData, setEmployeeData] = useState([]);

    const listEmployees = employeeData.map((employee) => (
      <Employee
        id={employee.id}
        name={employee.name}
        role={employee.role}
        editEmployee={editEmployee}
        deleteEmployee={deleteEmployee}
        key={employee.id}
      />
    ));

    async function editEmployee(id, name, role) {
      const updatedEmployee = { name, role };
      console.log(updatedEmployee);

      await fetch('/api/employees/' + id, {
        method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedEmployee),
    });

      const updatedEmployeeList = employeeData.map((employee) => {
        if (id === employee.id) {
          return {...employee, name: name, role: role};
        }
        return employee;
      });
      setEmployeeData(updatedEmployeeList);
    }

    async function deleteEmployee(id) {
      await fetch('/api/employees/' + id, {
          method: "DELETE",
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          }
      });

      fetchData();
  }

    // function addEmployee(name, role) {
    //   // alert(name + ", " + role);
    //   // const newEmployee = { name, role };
    //   setEmployeeData([...employeeData, newEmployee]);
    // }

    async function fetchData() {
      const res = await fetch(
          `/api/employees`
      );

      const data = await res.json();
      setEmployeeData(data);
  }

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     fetch("/api/employees")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //           setEmployeeData(result);
    //           console.log(result);
    //           console.log(employeeData);
    //         },
    //         // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
    //         // чтобы не перехватывать исключения из ошибок в самих компонентах.
    //         (error) => {
    //           console.log(error);
    //         }
    //       )
    //   }, []);

    if (!employeeData) {
        return <div>Something is wrong with the data...</div>;
    }

    return (
        <div>
            <h1>Hi.</h1>
            <AddEmployeeForm fetchData={fetchData} />
            <br/>
            <ol>{listEmployees}</ol>
        </div>
    );
}

export default Home;