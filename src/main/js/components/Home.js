import React from "react";
import { useState, useEffect } from "react";
import AddEmployeeForm from "./AddEmployeeForm";
import Employee from "./Employee";

function Home() {
    const [employeeData, setEmployeeData] = useState([]);

    const listEmployees = employeeData.map((employee) => (
      <Employee id={employee.id} name={employee.name} role={employee.role} key={employee.id} />
    ));
    console.log(employeeData);

    // function addEmployee(name, role) {
    //   // alert(name + ", " + role);
    //   // const newEmployee = { name, role };
    //   setEmployeeData([...employeeData, newEmployee]);
    // }

    // useEffect(() => {
    //     fetchData();

    //     async function fetchData() {
    //         const res = await fetch(
    //             `/api/employees/2`
    //         );

    //         const data = await res.json();
    //         setEmployeeData(data);
    //         console.log(data);
    //         console.log(employeeData);
    //         // console.log(employeeData.id);
    //     }
    // }, []);

    useEffect(() => {
        fetch("/api/employees")
          .then(res => res.json())
          .then(
            (result) => {
              setEmployeeData(result);
              console.log(result);
              console.log(employeeData);
            },
            // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            // чтобы не перехватывать исключения из ошибок в самих компонентах.
            (error) => {
              console.log(error);
            }
          )
      }, []);

    if (!employeeData) {
        return <div>Something is wrong with the data...</div>;
    }

    return (
        <div>
            <h1>Hi.</h1>
            <AddEmployeeForm /*addEmployee={addEmployee}*/ />
            <br/>
            <div>{listEmployees}</div>
        </div>
    );
}

export default Home;