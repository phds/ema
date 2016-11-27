document.addEventListener('DOMContentLoaded', function(event) {
  if(localStorage.accessToken){
    delete localStorage.accessToken;
  }
});

function showWarning(el, message){

  el.parentElement.parentElement.classList.add('has-warning');

  var feedback = document.createElement('div');
  feedback.classList.add('form-control-feedback');
  feedback.innerHTML = message;

  el.parentElement.appendChild(feedback);
}

function removeAllWarnings(){
  var el = document.querySelectorAll('.has-warning');
  var el2 = document.querySelectorAll('.form-control-feedback');

  for(var i = 0; i < el.length; i++){
    el[i].classList.remove('has-warning');
    el2[i].remove();
  }
}

function submitNewUser(){

  removeAllWarnings();

  var requestBody = {};
  var canSubmit = true;

  var el = document.querySelector('#inputName');
  if(el.value.length === 0) {
    showWarning(el, "Por favor preencha o nome!");
    canSubmit = false;
  }
  else{
    requestBody['name'] = el.value;
  }

  el = document.querySelector('#inputEmail');
  if(!validateEmail(el.value)){
    showWarning(el, "Email Inválido!");
    canSubmit = false;
  }
  else{
    requestBody['email'] = el.value;
  }

  el = document.querySelector('#inputPassword');
  if(el.value.length === 0) {
    showWarning(el, "Por favor preencha a senha!");
    canSubmit = false;
  }
  else if(el.value.length <= 6) {
    showWarning(el, "A senha deve ter pelo menos 6 caracteres!");
    canSubmit = false;
  }
  else{
    requestBody['password'] = el.value;
  }

  el = document.querySelector('#inputBirthday');
  if(el.value.length === 0){
    showWarning(el, 'Por favor preencha a data de nascimento!');
    canSubmit = false;
  }
  else{
    requestBody['birthday'] = new Date(el.value);
  }

  el = document.querySelector('#inputGender');
  if(el.selectedIndex === 0){
    showWarning(el, 'Por favor selecione uma opção!');
    canSubmit = false;
  }
  else{
    requestBody['gender'] = el.options[el.selectedIndex].text;
  }

  el = document.querySelector('#inputCourse');
  if(el.selectedIndex === 0){
    showWarning(el, 'Por favor selecione uma opção!');
    canSubmit = false;
  }
  else{
    requestBody['undergrad'] = el.options[el.selectedIndex].text;
  }

  var el = document.querySelector('#inputCourseStartDate');
  if(el.value.length === 0) {
    showWarning(el, "Por favor preencha o início do curso!");
    canSubmit = false;
  }
  else{
    requestBody['undergradStartDate'] = el.value;
  }

  if(canSubmit){
    var request = new XMLHttpRequest();
    request.open('POST', '/api/student/', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        localStorage.accessToken = data.token;
        window.location.href = '/overview/';
      } else {
        // We reached our target server, but it returned an error
        var response = JSON.parse(request.response);
        showWarning(document.querySelector('#inputEmail'), 'Email já em uso!');
      }
    };
    request.send(JSON.stringify(requestBody));
  }
  return false;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
