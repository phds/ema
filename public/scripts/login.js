document.addEventListener('DOMContentLoaded', function(event) {
  if(localStorage.accessToken){
    delete localStorage.accessToken;
  }
});

function closeAlert(){
  document.getElementById('alert').classList.add('hide');
}

function showAlert(message){
  var el = document.querySelector('#alert>span');
  el.innerHTML = message;
  el.parentElement.classList.remove('hide');
}

function sendLoginData(){
  var inputElements = document.querySelectorAll('.form-control');

  if(inputElements[0].value.length !== 0
    && inputElements[1].value.length !== 0){

    var requestBody = {
      email: inputElements[0].value,
      password: inputElements[1].value
    }

    var request = new XMLHttpRequest();
    request.open('POST', '/api/login/', true);
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        console.log(JSON.stringify(data, null, 2));
        localStorage.accessToken = data.token;
      } else {
        // We reached our target server, but it returned an error
        var response = JSON.parse(request.response);
        console.log(response)
        showAlert(response.error);
      }
    };
    request.send(JSON.stringify(requestBody));
    return false;
  }
}
