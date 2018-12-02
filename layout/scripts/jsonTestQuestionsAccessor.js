$.ajax({
    url: 'https://testsprojectit.github.io/data/test.json',
    dataType: 'json',
    type: 'get',
    cache: false,
    success: function(data){
        $(data.testID).each(function(index, value)
                           {
            console.log(value);
        });
    }
});