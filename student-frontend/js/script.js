$('#inputPhone').mask('(00) 0000-0000', { reverse: false });

function convertToNumber(priceFormat) {
    return priceFormat.replace(/\./g, '').replace(',', '.');
}

var students = [];

var courses = [];

var periods = ["Manhã", "Tarde", "Noite"];

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
        period: document.querySelector('input[name="checkboxPeriod"]:checked').value
    };

    var url = `http://localhost:8080/student`;
    var method = 'POST';

    $.ajax({
        url: url,
        type: method,
        contentType: "application/json",
        data: JSON.stringify(studentNew),
        async: false,
        success: (student) => {
            addNewRow(student);
            students.push(student);
            document.getElementById("formStudent").reset();
        }
    })
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

    // Insert student email
    var descriptionNode = document.createTextNode(student.email);
    var cell = newRow.insertCell();
    cell.className = "d-none d-md-table-cell";
    cell.appendChild(descriptionNode);

    var phoneNode = document.createTextNode(student.phone);
    newRow.insertCell().appendChild(phoneNode);

    // Insert student course
    var idCourseNode = document.createTextNode(courses[student.idCourse - 1].name);
    newRow.insertCell().appendChild(idCourseNode);

    // Insert student period
    var periodNode = document.createTextNode(periods[student.period - 1]);
    newRow.insertCell().appendChild(periodNode);
}