$(document).ready(function() {
  console.log("ready!");


//$('#clearbutton').hide();

$(function() {
    $('#upload-file-btn').click(function() {

        var form_data = new FormData();
        var number = document.getElementById('multiFiles').files.length;
        console.log(number)
        //path = document.getElementById('multiFiles').value
        for(var index=0; index<number; index++){
            form_data.append("files[]", document.getElementById('multiFiles').files[index])
        }
        $.ajax({
            type: 'POST',
            url: '/',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function(data) {
                $('#msg').html(number + " document(s) uploaded!")
                console.log('Success!');
                path = null;
            },

            error: function(data) {
                $('#msg').html("Upload only PDF or text files")
                console.log(data);
            },
        });
    });
});

$('#createform').on('submit', function() {

    console.log("the form has been submitted");

    // grab values
    paragraphs = $("textarea#text").val();
    console.log(paragraphs)


    $.ajax({
      type: "POST",
      url: "/",
      data : { 'text': paragraphs},
      success: function(results){
        console.log(results);
        $("#results").html("Index created!")
      },
      error: function(error) {
        console.log(error);
        $("#results").html(error)
      }

      });

});

$('#searchform').on('submit', function() {

    console.log("Searching");

    // grab values
    word = $("input[name='text_search']").val();
    console.log(word)


    $.ajax({
      type: "GET",
      url: "/result",
      data : { 'word': word},
      success: function(results){
        $("#result").html(" ")
        console.log(results);
        var count = 0;
        $.each(results.para, function(index, value){
            if(count<10){
                count++;
                $("#result").append('<hr>' + '<center>' + count + '</center>' + '<br>' +  value + '<br>' + '<hr>');
            }
        });
      },
      error: function(error) {
        console.log(error);
        $("#result").html("Not found")
      }

      });

});

$('#clearbutton').on('click', (function() {

    console.log("clicked");
    document.getElementById("multiFiles").value = ""
    $('#msg').html("")

    $.ajax({
      type: "DELETE",
      url: "/clear",
      success: function(results){
        console.log(results);
        $("#clear_index").html("Index cleared!")
        $("#result").html('');
      },
      error: function(error) {
        console.log(error);
        $("#clear_index").html("Index can not be cleared!")
      }

      });

}));
});
