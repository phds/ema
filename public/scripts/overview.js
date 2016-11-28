document.addEventListener('DOMContentLoaded', function(event) {
  if(!localStorage.accessToken){
    window.location.href = "/";
  }

  refreshQuestionnarieList();


});

function refreshQuestionnarieList(){
  var request = new XMLHttpRequest();
  request.open('GET', '/api/overview', true);
  request.setRequestHeader('token', localStorage.accessToken);
  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);

      var questionnarieDiv = document.querySelector('.questionnaries');
      while (questionnarieDiv.firstChild) {
        questionnarieDiv.removeChild(questionnarieDiv.firstChild);
      }

      if(data.length === 0){
        var message = document.createTextNode('Você não tem questionários para responder!');
        questionnarieDiv.appendChild(message);
      }
      else{
        for(var i = 0; i < data.length; i++){
          var aElement = document.createElement('a');
          aElement.classList = 'list-group-item list-group-item-action';
          aElement.innerHTML = data[i].courseName;

          var tag = document.createElement('span');
          tag.classList = 'tag tag-pill pull-xs-right';
          if(data[i].answered){
            tag.innerHTML = "RESPONDIDO";
            tag.classList.add('tag-default');
            aElement.classList.add('disabled');
            aElement.href = '#';
          }
          else{
            tag.innerHTML = "PENDENTE";
            tag.classList.add('tag-success');
            aElement.href = '/questions/' + data[i].courseId;
          }
          aElement.appendChild(tag);
          questionnarieDiv.appendChild(aElement);
        }
      }
    }
    else{
      window.location.href = "/";
    }
  }
  request.send();
}

function addNewQuestionnarie(){

  var code = document.querySelector('#code').value;

  var request = new XMLHttpRequest();
  request.open('POST', '/api/course/add', true);
  request.setRequestHeader('token', localStorage.accessToken);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      refreshQuestionnarieList();
    }
    else{
      console.log(request.responseText);
      showWarning(document.querySelector('#code'), 'Código inválido!');
    }
  }
  request.send(JSON.stringify({code: code}));
}

function showWarning(el, message){

  el.parentElement.parentElement.classList.add('has-warning');

  var feedback = document.createElement('div');
  feedback.classList.add('form-control-feedback');
  feedback.innerHTML = message;

  el.parentElement.appendChild(feedback);
}
