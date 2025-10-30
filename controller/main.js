// Controlador principal
// funciones.
// Crud (Create, Read, Update, Delete).
// funcion crearEmpleado. (C - Crear).
function crearEmpleado() {
    // código para crear un empleado.
    document.getElementById("divAgregarEmpleado").style.display = 
        document.getElementById("divAgregarEmpleado").style.display === 'none' ? 'block' : 'none';
}
 // Mostrar empleados al cargar la página
    document.addEventListener("DOMContentLoaded", mostrarEmpleados());
    // Evitar el envío del formulario al hacer clic en el botón
    document.getElementById("formEmpleado").addEventListener("submit", function(e) {
        e.preventDefault(); // Evitar el envío del formulario
    });
function AgregarEmpleado() {
    // código para agregar un empleado.
    
   
    const empleado = new Empleado(
        document.getElementById("cc").value,
        document.getElementById("nombreCompleto").value,
        document.getElementById("direccion").value,
        document.getElementById("email").value,
        document.getElementById("telefono").value,
        document.getElementById("sueldoBase").value,
        document.getElementById("tipoEmpleado").value,
        document.getElementById("tipoBonificacion").value
    );

    // Crear un nuevo Json de empleados en el localStorage si no existe.
    let empleados = JSON.parse(localStorage.getItem("empleados")) || [];
    // Agregar el nuevo empleado al array.
    empleados.push(empleado);
    // Guardar el array actualizado en el localStorage.
    localStorage.setItem("empleados", JSON.stringify(empleados));
    // Llamar a la funcion para mostrar los empleados actualizados.
    mostrarEmpleados();
    hallarTotalNomina();
}
function hallarTotalNomina(){

     const empleados = JSON.parse(localStorage.getItem('empleados')) || [];
     let nom = 0;
     for (const empleado of empleados) {
    const resultado = calcularSueldoTotal(empleado);
    nom += resultado.sueldoTotal;
    };
    const emp = document.getElementById('nomina');
    if (emp) emp.innerText = ' $ ${nom}';

}

// Mostrar empleados en tabla
function mostrarEmpleados() {
    const tbody = document.querySelector('#tablaEmpleados tbody');
    tbody.innerHTML = '';

    const empleados = JSON.parse(localStorage.getItem('empleados')) || [];

   empleados.forEach((emp, index) => {
    // Aseguramos que el sueldo base sea un número
    const sueldoBase = Number(emp.sueldoBase) || 0;
    let adicion = 0;

    if (emp.tipoBonificacion === 'A') {
        adicion = 200000;
    } else if (emp.tipoBonificacion === 'B') {
        adicion = 150000;
    } else if (emp.tipoBonificacion === 'C') {
        adicion = 100000;
    } else if (emp.tipoBonificacion === 'D') {
        adicion = 50000;
    } else {
        adicion = 0;
    }

    // Sumar numéricamente
    const sueldoTotal = sueldoBase + adicion;

    const fila = `<tr>
        <td>${index + 1}</td>
        <td>${emp.cc}</td>
        <td>${emp.nombreCompleto}</td>
        <td>${emp.direccion}</td>
        <td>${emp.email}</td>
        <td>${emp.telefono}</td>
        <td>${sueldoBase}</td>
        <td>${emp.tipoEmpleado}</td>
        <td>${emp.tipoBonificacion}</td>
        <td>${sueldoTotal}</td>
    </tr>`;

    tbody.innerHTML += fila;
});

}
