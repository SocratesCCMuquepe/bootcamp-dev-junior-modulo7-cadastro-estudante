$('#inputPhone').mask('000-000-000', { reverse: true });

function convertToNumber(priceFormat) {
    return priceFormat.replace(/\./g, '').replace(',', '.');
}

var products = [];

var categories = [];

//Onload
loadCourses()
loadStudents()


function loadCourses() {
    var url = `http://localhost:8080/courses`;
    var method = 'GET';


    $.ajax({
        url: url,
        type: method,
        async: false,
        success: (response) => {

            courses = response;
            for (var course of courses) {
                document.getElementById("selectCourse").innerHTML += `<option value="${course.id}">${course.name}</option>`;
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
        phone: convertToNumber(document.getElementById("inputPhone").value),
        idCourse: document.getElementById("selectCourse").value,
        period: document.getElementById("checkboxPeriod").checked
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
    var descriptionNode = document.createTextNode(student.email);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(descriptionNode);

    // Insert 
    var formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    var phoneNode = document.createTextNode(student.phone);
    newRow.insertCell().appendChild(phoneNode);

    // Insert 
    var idCourseNode = document.createTextNode(courses[student.idCourse - 1].name);
    newRow.insertCell().appendChild(idCourseNode);
    
    var periodNode = document.createTextNode(student.period)

    switch (periodNode) {
        case "1": periodNode = "Manhã"; break;
        case "2": periodNode = "Tarde"; break;
        case "3": periodNode = "Noite"; break;
    }
    console.log(periodNode);
    var periodNode = document.createTextNode(student.period);
    console.log(periodNode);
    newRow.insertCell().appendChild(periodNode);

   // cell.innerHTML = options;

}