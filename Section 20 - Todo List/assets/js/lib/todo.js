// check off todos by clicking element.

//ONE WAY TO DO IT IS THIS WAY

// $("li").click(function(){
//     $(this).css("color", "grey");
//     $(this).css("text-decoration", "line-through");
// });

//OR WE CAN BUILD AN OBJECT, USE IF STATEMENT TO CHECK

// $("li").click(function(){
//     // if li is gray, we'll turn it black
//     if($(this).css("color") === "rgb(128, 128, 128)") {
//         $(this).css({
//         color: "black",
//         textDecoration: "none"
//         })} else {
//     // else, turn it gray
//     $(this).css({
//     color: "gray", 
//     textDecoration: "line-through"
//     });
// };
// })

// OR BUILD A CLASS IN CSS

$("ul").on("click", "#check", function(){
    $(this).parent().toggleClass("completed");
});

// Click on X to delete Todo.
$("ul").on("click", "#trash", function(event){
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    event.stopPropagation();
});

// ADDING A NEW TASK

$("input[type='text']").keypress(function(){
    if(event.which === 13){ // only when the user hits enter
        var todoText = $(this).val(); //Selecting the text was inputted into the form
        $(this).val("");
        $("ul").append("<li><span id='trash'><i class='fa fa-trash'></i></span><span id='item completed'>"+ todoText + "</span><span id='check'><i class='fa fa-check'></i></span></li>");   // create a new li and add this text content, add to UL
    }
})

// MAKE TO DO APPEAR OR NOT USING THE PLUS SIGN

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});

// MAKE CONTENT EDITABLE

$("#item").click(function(){
    $("#item").attr('contenteditable','true');
    $("#item").attr("maxlength", "20");
});

// RANDOM BACKGROUND COLOR

var colorArray = [
    "linear-gradient(to right, #F27121, #E94057, #8A2387)",
    "linear-gradient(to right, #355c7d, #6c5b7b, #c06c84)",
    "linear-gradient(to right, #ef8e38, #108dc7)",
    "linear-gradient(to right, #ff8008, #ffc837)",
    "linear-gradient(to right, #1d976c, #93f9b9)",
    "linear-gradient(to right, #1d2b64, #f8cdda)",
    "linear-gradient(to right, #aa076b, #61045f)",
    "linear-gradient(to right, #003973, #e5e5be)",
    "linear-gradient(to right, #cc95c0, #dbd4b4, #7aa1d2)",
    "linear-gradient(to right, #ff6e7f, #bfe9ff)",
    "linear-gradient(to right, #bbd2c5, #536976)",
]

$("document").ready(function () {
    var rand = colorArray[Math.floor(Math.random() * colorArray.length)];
    $("#random").css('background',rand);
  });