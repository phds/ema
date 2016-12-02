/*
criar cursos
ver meus cursos
detalhe do curso
  quantos responderam
  grafico de resultados
*/

document.addEventListener('DOMContentLoaded', function(event){
  if(!localStorage.accessToken){
    window.location.href = "/";
  }

  refreshCoursesList();
});

function createNewCourse(){
  var courseName = document.querySelector('#inputName').value;
  var courseCode = document.querySelector('#inputCode').value;
  var coursePrompt = document.querySelector('#inputPrompt').value;

  var requestBody = {
    name: courseName,
    code: courseCode,
    prompt: coursePrompt
  }
  var request = new XMLHttpRequest();
  request.open('POST', '/api/course/', true);
  request.setRequestHeader('token', localStorage.accessToken);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      console.log(request.responseText);
      refreshCoursesList();
    }
    else{
      console.log(request.responseText);
      //showWarning(document.querySelector('#code'), 'Código inválido!');
    }
  }
  request.send(JSON.stringify(requestBody));
}

function refreshCoursesList(){
  var request = new XMLHttpRequest();
  request.open('GET', '/api/professor-overview', true);
  request.setRequestHeader('token', localStorage.accessToken);
  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);

      var coursesDiv = document.querySelector('.courses');
      while (coursesDiv.firstChild) {
        coursesDiv.removeChild(coursesDiv.firstChild);
      }

      if(data.length === 0){
        var message = document.createTextNode('Você não tem questionários para responder!');
        coursesDiv.appendChild(message);
      }
      else{
        for(var i = 0; i < data.length; i++){
          var aElement = document.createElement('a');
          aElement.classList = 'list-group-item list-group-item-action';
          aElement.innerHTML = data[i].courseName;
          aElement.href = '/course/' + data[i].courseId + '/details';

          coursesDiv.appendChild(aElement);
        }
      }
    }
    else{
      window.location.href = "/";
    }
  }
  request.send();
}
