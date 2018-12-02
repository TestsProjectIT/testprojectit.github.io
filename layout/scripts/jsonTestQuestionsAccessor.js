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
            var results = response.results;
            var res = results[indexOfMaxNumber];
            output += '<p><b>'+result.resultName + '</b></p>';
            output += '<p>'+result.resultText + '</p>';
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

function sendInfo()
{
    var myForm = document.getElementById('SecondForm');
    var textBoxes = myForm.getElementsByTagName('input');
    var textBox = textBoxes[0];
    if(textBox.value == "")
        return;
    alert("done");
    
}