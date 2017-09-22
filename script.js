var quoteButton = document.getElementById("quotebutton");
var quote = document.getElementById("quote");
var author = document.getElementById("quoteAuthor");
var tweetbutton = document.getElementById("tweet");
var xRequest = new XMLHttpRequest();
var jsonResponse;
var colorArray = ["orange", "green", "red", "pink", "#ff45ed", "#56343e", "black", "brown", "#fe3462", "#12ea34", "#3edc32", "#edcaef"];

$(document).ready(function(){
    ajaxCall();
    quoteButton.addEventListener("click", ajaxCall);
});

/*
function readyStateChange() {
    if (xRequest.readyState === 4 && xRequest.status === 200) {
        console.log("DONE");
        jsonResponse = JSON.parse(xRequest.responseText);
        alert(jsonResponse);
        changeBodyBackground();
    }
    else {
        changeBodyBackground();
        console.log("NOT DONE");
    }
}

function newQuote() {
    xRequest.onreadystatechange = readyStateChange;
    xRequest.open("POST", "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en", true);
    xRequest.setRequestHeader("Content-Type", "application/json");
    xRequest.send();
}
*/
function changeBodyBackground(){
    var colorIndex = Math.floor(colorArray.length*Math.random());
    document.body.style.background = colorArray[colorIndex];
    document.body.style.color = colorArray[colorIndex];
}

function ajaxCall(){
    $.ajax({
        url: "https://api.forismatic.com/api/1.0/",
        jsonp: "jsonp",
        dataType: "jsonp",
        data: {
            method: "getQuote",
            lang: "en",
            format: "jsonp"
        }
    })
    //request is done
    .done(update)
    //request failed
    .fail(errorHandler);
}

function update(response){
    quote.innerHTML = response.quoteText;
    author.innerHTML = "- " + response.quoteAuthor;
    tweetbutton.href = "https://twitter.com/intent/tweet?hashtags=quotes" + "&text=" + quote.innerHTML + ". by ~ " + quoteAuthor.innerHTML;
    changeBodyBackground();
}

function errorHandler(jqxhr, textStatus, err) {
  console.log("Request Failed: " + textStatus + ", " + err);
}
