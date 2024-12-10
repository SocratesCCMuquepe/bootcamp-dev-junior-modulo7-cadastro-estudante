$('#inputPrice').mask('000.000.000.000.000,00', { reverse: true });

function convertToNumber(priceFormat) {
    return priceFormat.replace(/\./g, '').replace(',', '.');
}

var products = [];

var categories = [];

//Onload
loadCategories()
loadProducts()


function loadCategories() {
    var url = `http://localhost:8080/courses`;
    var method = 'GET';


    $.ajax({
        url: url,
        type: method,
        async: false,
        success: (response) => {

            courses = response;
            for(var course of courses ){
                document.getElementById("selectCurso").innerHTML += `<option value="${course.id}">${course.name}</option>`;
            }

        }
    })
}

function loadStudents() {


    var url = `http://localhost:8080/students`;
    var method = 'GET';


    $.getJSON(url, method, (response) => {

        for (let student of response) {
            addNewRow(student);
        }

    }).fail(() => {

    });


}

//Salvar produtos
function save() {

    var studentNew = {
        name: document.getElementById("inputName").value,
        email: document.getElementById("inputEmail").value,
        telefone: convertToNumber(document.getElementById("inputTelefone").value),
        idCurso: document.getElementById("selectCurso").value,
        turno: document.getElementById("checkboxTurno").checked
    };

    console.log(studentNew);

    addNewRow(studentNew);
    products.push(studentNew);

    document.getElementById("formStudent").reset();

}

//Add new Row
function addNewRow(student) {
    var table = document.getElementById("studentsTable");
    var newRow = table.insertRow()

    // Insert id student
    var idNode = document.createTextNode(student.id);
    newRow.insertCell().appendChild(idNode);

    // Insert student name
    var nameNode = document.createTextNode(student.name);
    newRow.insertCell().appendChild(nameNode);

    // Insert student description
    var descriptionNode = document.createTextNode(student.description);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(descriptionNode);

    // Insert 
    var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    var priceNode = document.createTextNode(formatter.format(prod.price));
    newRow.insertCell().appendChild(priceNode);

    // Insert 
    var categoryNode = document.createTextNode(categories[prod.idCategory - 1].name);
    newRow.insertCell().appendChild(categoryNode);

    //Insert product options
    var options = '';

    if (prod.promotion) {
        options = '<span class="badge bg-success me-1">P</span>';
    }
    if (prod.newProduct) {
        options += '<span class="badge bg-primary">L</span>';

    }

    cell = newRow.insertCell()
    cell.className = "d-none d-md-table-cell";
    cell.innerHTML = options;

    // newRow.insertCell().innerHTML = options;
}