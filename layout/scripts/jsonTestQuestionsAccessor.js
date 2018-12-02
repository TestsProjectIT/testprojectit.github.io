function fillTestsContent()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
        {
            //document.getElementById("questions").innerHTML = xhttp.responseText;
            var response = JSON.parse(xhttp.responseText);
            var question = response.questions;
            var output = '';
            for(var i = 0; i < question.length; i++)
            {
                output += '<p><b> Вопрос номер '+ i +'</b></p>'; 
                var ansewers = question[i].ansewers;
                for(var j=0; j < ansewers.length; j++)
                    {
                        var curAnsewer = ansewers[j];
                        output += '<p><input type="radio" name="' + question[i].questionID +'" value="' + curAnsewer.score + '"> ' + curAnsewer.ansewerText +'</p>';              
                    }          
            }
    document.getElementById('questions').innerHTML = output;
                        }
    };

    xhttp.open("GET", "https://testsprojectit.github.io/data/test.json", true);
    xhttp.send(); 
}