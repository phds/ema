document.addEventListener('DOMContentLoaded', function(event) {
  if(!localStorage.accessToken){
    window.location.href = "/";
  }
});

var gCourseId;

function loadQuestions(courseId){
  gCourseId = courseId;
  var request = new XMLHttpRequest();
  request.open('GET', '/api/course/' + courseId + '/list', true);
  request.setRequestHeader('token', localStorage.accessToken);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {

      var data = JSON.parse(request.responseText);
      data.questions.sort((a, b) => {
        return a.questionOrder - b.questionOrder;
      });
      document.querySelector('#loading').remove();
      var questionnarieDiv = document.getElementById('questionnarie');
      var questionDiv = document.getElementsByClassName('question')[0].cloneNode(true);
      document.getElementsByClassName('question')[0].remove();
      questionnarieDiv.getElementsByClassName('question-prompt')[0].innerHTML = data.prompt;

      var submitButton = document.getElementById('submit').cloneNode(true);
      document.getElementById('submit').remove();

      for(var i = 0; i < data.questions.length; i++){
        var newQuestion = questionDiv.cloneNode(true);
        newQuestion.setAttribute('questionId', data.questions[i].questionId);
        newQuestion.getElementsByClassName('question-number')[0].innerHTML = data.questions[i].questionOrder;
        newQuestion.getElementsByClassName('question-text')[0].innerHTML = data.questions[i].text
        questionnarieDiv.appendChild(newQuestion);
        questionnarieDiv.appendChild(document.createElement('hr'));
      }

      questionnarieDiv.appendChild(submitButton)

    }
    else{
      console.log(request.responseText);
      document.location.href = "";
    }
  }
  request.send();
}

function sendAnswers(){

  var requestBody = {
    answers: []
  };

  var questions = document.getElementsByClassName('question');
  var canSubmit = true;
  for(var i = 0; i < questions.length; i++){
    var rating = questions[i].getElementsByClassName('answer')[0].value;
    if(rating === "-"){
      alert("Responda todas as afirmações!");
      return;
    }
    requestBody.answers.push({
      questionId: parseInt(questions[i].getAttribute('questionId')),
      rating: parseInt(rating)
    });
  }

  var request = new XMLHttpRequest();
  request.open('POST', '/api/course/' + gCourseId + '/answer', true);
  request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  request.setRequestHeader('token', localStorage.accessToken);
  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      window.location.href = '/overview/';
    } else {
      // We reached our target server, but it returned an error
      alert('Deu ruim!');
    }
  };
  request.send(JSON.stringify(requestBody));
}
