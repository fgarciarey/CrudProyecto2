//validateForm cuando se sube la información
function validateForm() {
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;
    let email = document.getElementById("email").value;
    
    if (name == "") {
        alert("Nombre requerido");
        return false;
    }

    if (age == "") {
        alert("Edad requerida");
        return false;
    } else if (age < 16) {
        alert("La edad requerida para ingresar debe ser de 16 años en adelante");
        return false;
    }

    if (city == "") {
        alert("Ciudad requerida");
        return false;
    }

    if (email == "") {
        alert("Correo requerido");
        return false;
    } else if (!email.includes("@")) {
        alert("La dirección de correo es invalida");
        return false;
    }

    return true;
}

// función showData
function showData() {
    let peopleList;
    if (window.localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(window.localStorage.getItem("peopleList"));
    }

    let html = "";
    peopleList.forEach(function (element, index) {
        html += "<tr>";
        html += "<td>" + element.name + "</td>";
        html += "<td>" + element.age + "</td>";
        html += "<td>" + element.city + "</td>";
        html += "<td>" + element.email + "</td>";
        html += 
            '<td><button onclick="deleteData(' + 
            index + 
            ')" class="btn btn-danger">Eliminar</button><button onclick="updateData(' + 
            index + 
            ')" class="btn btn-warning m-2">Editar</button></td>';
        html += "</tr>";
    });

    document.querySelector("#crudTable tbody").innerHTML = html;
}

//Cargar toda la información recopilada
window.onload = showData;

//funcion para cargar datos
function AddData() {
    if (validateForm() == true) {
        let name = document.getElementById("name").value;
        let age = document.getElementById("age").value;
        let city = document.getElementById("city").value;
        let email = document.getElementById("email").value;
        
        let peopleList;
        if (window.localStorage.getItem("peopleList") == null) {
            peopleList = [];
        } else {
            peopleList = JSON.parse(window.localStorage.getItem("peopleList"));
        }

        peopleList.push({
            name: name,
            age: age,
            city: city,
            email: email,
        });

        window.localStorage.setItem("peopleList", JSON.stringify(peopleList));
        showData();

        document.getElementById("name").value = "";
        document.getElementById("age").value = "";
        document.getElementById("city").value = "";
        document.getElementById("email").value = "";
    }
}

//función para eliminar datos del localStorage
function deleteData(index) {
    let peopleList;
    if (window.localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(window.localStorage.getItem("peopleList"));
    }

    peopleList.splice(index, 1);
    window.localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
}

//función para actualizar y modificar los datos
function updateData(index) {
    document.getElementById("Submit").style.display = "none";
    document.getElementById("Update").style.display = "block";

    let peopleList;
    if (window.localStorage.getItem("peopleList") == null) {
        peopleList = [];
    } else {
        peopleList = JSON.parse(window.localStorage.getItem("peopleList"));
    }

    document.getElementById("name").value = peopleList[index].name;
    document.getElementById("age").value = peopleList[index].age;
    document.getElementById("city").value = peopleList[index].city;
    document.getElementById("email").value = peopleList[index].email;

    document.querySelector("#Update").onclick = function() {
        if (validateForm() == true) {
            peopleList[index].name = document.getElementById("name").value;
            peopleList[index].age = document.getElementById("age").value;
            peopleList[index].city = document.getElementById("city").value;
            peopleList[index].email = document.getElementById("email").value;
        
            window.localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("city").value = "";
            document.getElementById("email").value = "";

            document.getElementById("Submit").style.display = "block";
            document.getElementById("Update").style.display = "none";
        }
    }
}