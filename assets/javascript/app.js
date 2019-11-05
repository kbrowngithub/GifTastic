var items = ["skiing",
    "mountain biking",
    "hiking",
    "weight lifting",
    "kayaking",
    "rock climbing",
    "back packing",
    "snow boarding"
];

var test;

var gifTastic = {
    items: items,
    title: "Gif-tastic",
    newImage: "",

    // Create a button for each item in an array
    createButtons: function () {
        for (i = 0; i < this.items.length; i++) {
            var newButton = $("<button data-subject=\"" + this.items[i] + "\" class=\"btn\">");
            console.log(newButton);
            newButton.text(this.items[i]);
            $("#btn-group").append(newButton);
        }
        var gifArea = $("<div id=\"gif-area\">gifArea</div>");
    }
};

// Create initial page
gifTastic.createButtons();

// *************************
// Listen for these click events
// *************************

// Subject Buttons
$(document).on("click", ".btn", function () {
    // Display the gifs
    var subject = $(this).attr("data-subject");
    var limit = 10;
    var rating = "G";

    console.log("Subject = " + subject);
    // gifTastic.getGiphys(subject, "1", "G");

    // Create our query string
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PU1WmxlDY9rk5q1lVFBzJf1OqqXpXdGr&q=" + subject + "&limit=" + limit + "&offset=0&rating=" + rating + "&lang=en";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=PU1WmxlDY9rk5q1lVFBzJf1OqqXpXdGr&q=" + subject + "&limit=" + limit + "&offset=0&lang=en";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (var i = 0; i < response.data.length; i++) {
            var srcImg = response.data[i];

            var newFigure = $("<figure id='figure'>");
            var figCaption = $("<figcaption>");
            var imgHtml = "<img src=\"" + srcImg.images.fixed_height_still.url + "\" data-still=\"" + srcImg.images.fixed_height_still.url + "\" data-animate=\"" + srcImg.images.fixed_height.url + "\" data-state=\"still\" class=\"gif\"></img>";
            console.log("imgHtml: " + imgHtml);
            newImage = $(imgHtml);
            newFigure.append(newImage);
            figCaption.text("Rated: " + response.data[0].rating);
            newFigure.append(figCaption);

            $("#gif-area").prepend(newFigure);
        }
    });

});

$(document).on("click", "#newSubIn", function () {
    $(this).val("");
});

$(document).on("click", "#clear", function () {
    $("#gif-area").empty();
});

$(document).on("click", "#submit", function () {
    event.preventDefault();
    $("#btn-group").empty();

    items.push($("#newSubIn").val().trim());
    $("#newSubIn").val("Type New Subject Here");
    console.log("Items now = " + items);

    gifTastic.createButtons();
});

// gif clicks
$(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {

        $(this).attr("src", $(this).attr("data-animate"));
        console.log("Setting data-animate to " + $(this).attr("data-animate"));

        $(this).attr("data-state", "animate");
        console.log("Setting data-state to " + $(this).attr("data-state"));
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        console.log("Set animate to " + $(this).attr("data-still"));

        $(this).attr("data-state", "still");
        console.log("Setting data-state to " + $(this).attr("data-state"));
    }
});
