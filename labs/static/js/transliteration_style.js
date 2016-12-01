document.getElementById("search").value = localStorage.getItem("comment");

function saveComment() {

    var comment = document.getElementById("search").value;
    if (comment == "") {
        alert("Please enter a comment in first!");
        return false;
    }

    localStorage.setItem("comment", comment);
    alert("Your comment has been saved!");

    location.reload();
    return false;
    //return true;
}





$(document).on('click', '.copy', function(e){
    e.preventDefault(); //for <a>
    $('.paste').val($(this).text());
});


