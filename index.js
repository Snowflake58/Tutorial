/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function validateForm() {
    // validate
    var result = validate_empty('username', 'Username') &&
            validate_empty('password', 'Password');

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    if (result) {
        ajaxCall('POST', 'home.fin', 'username='+username+'&password='+password, 'ajax');
    
        // read hidden value
        var status = document.getElementById('ajax').value;
        
        if (status > 0) {
            window.location.href="dashboard.jsp";
        } else {
            alert("Username or Password is invalid!");
        }
    }
    
    return false;
    // ajax call
}
function dateForm(){
    var result = validate_empty('username', 'Username') && validate_empty('password', 'Password') && validate_empty('email', 'email') && validate_empty('cpassword', 'Confirm-Password');
     var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
     var email = document.getElementById('email').value;
    if(result){
     ajaxCall('POST', 'register.fin', 'username='+username+'&email='+email+'&password='+password, 'aj');
        var status = document.getElementById('aj').value;
    if (status > 0) {
    alert("submited successfully");
        } else {
            alert("Username or Password is invalid!");
        }
    }
    return false;

}
// validation functions
function validate_empty(elementId, elementName) {
    var value = document.getElementById(elementId).value;

    if (value === '') {
        alert(elementName + " is required and cannot be empty!");
        document.getElementById(elementId).focus();
        return false;
    }
    return true;
}

// ajax
function ajaxCall(method, url, data, destination,isHtml) {
    var xhttp = new XMLHttpRequest();


    // event
    xhttp.onload = function () {
        if(isHtml){
               document.getElementById(destination).innerHTML = this.responseText;

        }else{
              document.getElementById(destination).value = this.responseText;
        }
    };

    xhttp.open(method, url, false);
    xhttp.setRequestHeader('content-type', 'application/x-www-form-urlencoded');

    xhttp.send(data);
}
function logoutUser() {
    var res = confirm('Are you sure, you want to logout?');
    
    if (res) {
       ajaxCall('POST', 'logout.fin','', 'ajax');
        window.location.href="index.jsp";
    }
}

function studentLoder(){
      ajaxCall('POST', 'Mystudent.fin','process=load','ajax','html');
}

function viewstudentloder(parem){
          ajaxCall('POST', 'processStudent.fin', 'process='+parem, 'studentload', 'html');
}

function addstudent(){
              ajaxCall('POST', 'processStudent.fin', 'process=addstudent', 'studentload', 'html');
}

function ValidateStudentForm(parem) {
    var result = validate_empty('name', 'Name')
            && validate_empty('address', 'Address')
            && validate_empty('email', 'Email Address')
            && validate_empty('state', 'State')
            && validate_empty('city', 'City');

    // if the result is true, then go for insert into db.
    var name = document.getElementById('name').value;
    var address = document.getElementById('address').value;
    var email = document.getElementById('email').value;
    var state = document.getElementById('state').value;
    var city = document.getElementById('city').value;

    if (result) {
        var data = "name=" + name + "&address=" + address + "&email=" + email + "&state=" + state + "&city=" + city + "&process="+parem;
        ajaxCall('POST', 'processStudent.fin', data, 'processAjax', 'html');

        // read hidden value
        var status = document.getElementById('status').value;
        if (status > 0) {
            alert("process done successfully!");
            // ajaxCall('POST', 'processStudents.fin', 'process=addstudents', 'studentload', 'html');
            resetForm(document.getElementById('studentform'));
        } else {
            alert("Something is wrong!");
        }

        // else prevent the form from submitting.
        return false;
    }
}
function resetForm(formObj) {
    formObj.reset();
}

function deletestudent(){
   var email = prompt("enter the email for delete data");
   if(email){
       var al = confirm("are you sure to delete this "+email+" connected student data!");
       
   }
   if(al){
       
        ajaxCall('POST', 'processStudent.fin', 'email='+email+'&process=deletes', 'processAjax', 'html');
         
     }
      var status = document.getElementById('status');
        if(status === 0){
            alert("Something is wrong!");
        }else{
             alert("Student deleted successfully!");
       ajaxCall('POST', 'processStudent.fin', 'process=deletestudent', 'studentload', 'html');

            }
}

function editstudents(){
            ajaxCall('POST', 'processStudent.fin', 'process=edits', 'studentload', 'html');
}

function searchstudentloder(){
    var email = document.getElementById('search').value;
          ajaxCall('POST', 'processStudent.fin', 'email='+email+'&process=searchstudent', 'studentload', 'html');
}
function examtLoder(){
      ajaxCall('POST', 'Mystudent.fin','process=exam','ajax','html');
}