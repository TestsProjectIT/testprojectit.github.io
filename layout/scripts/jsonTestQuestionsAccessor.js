function fillTestsContent()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            //document.getElementById("questions").innerHTML = xhttp.responseText;
            var response = JSON.parse(xhttp.responseText);
            var questions = response.questions;
            var output = '<form id="MainForm">';
            for(var i = 0; i < questions.length; i++)
            {
                output += '<p><b> Вопрос номер '+ (i + 1) +'</b></p>'; 
                var ansewers = questions[i].ansewers;
                for(var j=0; j < ansewers.length; j++)
                    {
                        var curAnsewer = ansewers[j];
                        output += '<p><input type="radio" name="' + questions[i].questionID +'" value=' + curAnsewer.score + '> ' + curAnsewer.ansewerText +'</p>';              
                    }          
            }
            output += '</form>';
            output += '<br> <input onclick="checkAnswers()" type="submit" name="checkAnswers" value="Узнать ответ"> <br>';
            document.getElementById('questions').innerHTML = output;
        }
    };

    xhttp.open("GET", "https://testsprojectit.github.io/data/test.json", true);
    xhttp.send(); 
}

function checkAnswers()
{
    var myForm = document.getElementById('MainForm');
    var allRadioButtons = myForm.getElementsByTagName('input');
    var result = [0,0,0,0,0];
    var answeredQuestions = 0;
    for(var i = 0; i < allRadioButtons.length; i++)
        {
            var curRadioButton = allRadioButtons[i];
            if(curRadioButton.checked)
                {
                    answeredQuestions++;
                    var curValue = curRadioButton.value.split(",");
                    for(var j = 0; j<curValue.length; j++)
                        {
                            curValue[j] = parseInt(curValue[j], 10);
                            result[j] += curValue[j];
                        }
                }
        }
    
    console.log(result);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var response = JSON.parse(xhttp.responseText);
            var questions = response.questions;
            if(answeredQuestions != questions.length)
                return;
            
            var output = '<p><b> Поздравляю! Ваш результат: </b></p>';
            var indexOfMaxNumber = 0;
            var maxNumber = result[0];
            for(var h = 1; h < result.length; h++)
                {
                    if(result[h] > maxNumber)
                        {
                            maxNumber = result[h];
                            indexOfMaxNumber = h;
                        }
                }
            
            console.log(indexOfMaxNumber);
            
            var results = response.results;
            console.log(results);
            
            var res = results[indexOfMaxNumber];
            console.log(res);
            
            output += '<p id="resultName"><b>'+ res.resultName + '</b></p>';
            output += '<p id="resultText">'+ res.resultText + '</p>';
            output += '<form id="SecondForm">';
            output += '<p><b>Введите Ваше имя для сохранения результата </b></p>';
            output += '<input type="text" id="name" name="name" required minlength="4" maxlength="16">';
            output += '</form>';
            output += '<br> <input onclick="sendInfo()" type="submit" name="sendInfo" value="Отправить"> <br>';
            document.getElementById('questions').innerHTML = output;
        }
    };

    xhttp.open("GET", "https://testsprojectit.github.io/data/test.json", true);
    xhttp.send(); 
}

function getResults()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            var results = JSON.parse(xhttp.responseText);
            var users = results.Users;
            
            var output = '<p><b>Результаты</b></p>';
            if(users.length == 0)
                return;
            
            for(var i = 0; i < users.length; i++)
            {
                output += '<p><b>Имя пользователя:'+ users[i].name +'</b></p>'; 
                output += '<p><b>Результат:'+ users[i].result +'</b></p>'; 
                output += '<br>'
            }
            document.getElementById('questions').innerHTML = output;
        }
    };

    xhttp.open("GET", "https://testsprojectit.github.io/data/results.json", true);
    xhttp.send();
}

function sendInfo()
{
    var myForm = document.getElementById('SecondForm');
    var resultName = document.getElementById('resultName');    
    var textBoxes = myForm.getElementsByTagName('input');
    var textBox = textBoxes[0];
    if(textBox.value == "")
        return;
    
    var newObj = 
        {
            name: textBox.value,
            result: resultName
        };
    
    var newObject = JSON.stringify(newObj);
    console.log(newObject);
    var fs = require('fs');
    fs.readFile('https://testsprojectit.github.io/data/results.json', 'utf8', function readFileCallback(err, content){
        if(err){
            console.log(err);
        }
        else
        {
            var parseJson = JSON.parse(content);
            parseJson.Users.push(newObj);
            var json = JSON.stringify(parseJson);
            fs.writeFile('https://testsprojectit.github.io/data/results.json', json, 'utf-8', callback);
        }
    });
    
    alert("done");
    
    getResults();
    
}