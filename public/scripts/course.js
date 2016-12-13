document.addEventListener('DOMContentLoaded', function(event){
  // if(!localStorage.accessToken){
  //   window.location.href = "/";
  // }
});

function setPageInformation(courseId){
  var request = new XMLHttpRequest();
  request.open('GET', '/api/course/' + courseId + '/details', true);
  request.setRequestHeader('token', localStorage.accessToken);
  request.onload = function(){
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);

      console.log(data)

      if(data.stats.length === 0){
        var myNode = document.getElementById("stats-content");
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
        myNode.appendChild(document.createTextNode('Turma sem respostas!'));
      }
      else{
        var averagesArray = [];
        for(var i = 0; i < data.stats.length; i++){
          averagesArray.push(data.stats[i].mean);
        }

        setChart(averagesArray);
        setCard(data);
        setStatsTable(data);
        setStudentsInfo(data.students);
      }
    }
    else{
      window.location.href = "/professor/overview/";
    }
  };
  request.send();
}

function setStudentsInfo(students){

  var originalCard = document.querySelector('.student-info').cloneNode(true);
  document.querySelector('.student-info').remove();

  for (var i = 0; i < students.length; i++) {
    setCardInfo(i, students[i]);
  }

  function setCardInfo(i, student){
    var card = originalCard.cloneNode(true);
    console.log(card);
    card.querySelector('#name').href = "#collapse" + i;
    card.querySelector('#name').innerHTML = student.name;

    card.querySelector('.table-container').id = "collapse"+i;
    for(var i = 0; i< student.averages.length; i++){
      var td = document.createElement('td');
      td.innerHTML = student.averages[i].average.toFixed(2);
      card.querySelector('.mean-row').appendChild(td)
    }

    document.querySelector('#accordion').appendChild(card);
  }

}

function setStatsTable(data){
  var stats = data.stats;

  for(var i = 0; i< stats.length; i++){
    var td = document.createElement('td');
    td.innerHTML = stats[i].mean.toFixed(2);
    document.querySelector('#mean-row').appendChild(td);

    var td = document.createElement('td');
    td.innerHTML = stats[i].stdev.toFixed(2);
    document.querySelector('#stdev-row').appendChild(td);

    var td = document.createElement('td');
    td.innerHTML = stats[i].max.toFixed(2);
    document.querySelector('#max-row').appendChild(td);

    var td = document.createElement('td');
    td.innerHTML = stats[i].min.toFixed(2);
    document.querySelector('#min-row').appendChild(td);
  }
}

function setCard(data){
  document.querySelector('#nome-turma').innerHTML = data.course.name;
  document.querySelector('#prompt-turma').innerHTML = data.course.prompt;
  document.querySelector('#codigo-turma').innerHTML = data.course.code;
  document.querySelector('#numero-respostas').innerHTML = data.numberOfResponses;
}

function setChart(data){
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["Desmotivação", "Regulação Externa frequencia", "Regulação externa social", "Regulação Introjetada", "Regulação Identificada", "Regulação Integrada", "Intrínseca"],
          datasets: [{
              label: 'Pontuação média para cada tipo de motivação',
              data: data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(153, 240, 255, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)',
                  'rgba(153, 240, 255, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true,
                      min: 1,
                      max: 7
                  }
              }]
          },
          tooltips: {

          }
      }
  });
}
