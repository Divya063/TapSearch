$(document).ready(function() {
  console.log("ready!");

$(function() {
    $('#upload-file-btn').click(function() {

        var form_data = new FormData();
        var number = document.getElementById('multiFiles').files.length;
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
            success: function(response) {
                $('#msg').html(number + " document(s) uploaded!")
                console.log('Success!');
            },

            error: function(response) {
                $('#msg').html("Upload only PDF or text files")
                console.log(response);
            },
        });
    });
});

$('#createindex').on('submit', function() {

    console.log("The text has been submitted");

    // grab values
    paragraphs = $("textarea#text").val();

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

    $.ajax({
      type: "GET",
      url: "/result",
      data : { 'word': word},
      success: function(results){
        $("#result").html(" ")
        console.log(results);
        var count = 0;
        $.each(results.paragraph, function(index, value){
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
