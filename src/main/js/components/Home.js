import React from "react";
import { useState, useEffect } from "react";

function Home() {
    const [employeeData, setEmployeeData] = useState(null);

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
        fetch("/api/employees/2")
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
        return <div></div>;
    }

    return (
        <div>
            <h1>Hi.</h1>
            <br/>
            <p>{employeeData.id}</p>
            <p>{employeeData.name}</p>
            <p>{employeeData.role}</p>
        </div>
    );
}

export default Home;