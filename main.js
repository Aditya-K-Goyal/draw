array_1 = ['aircraft carrier','airplane','alarm clock','car','angel'];
random_no = Math.floor((Math.random()*array_1.length)+1);
Element_of_array = array_1[random_no];

timer_counter = 0;
timer_check = "";
drawn_sketch="";
answer_holder="";
sketch= Element_of_array;
score=0;
function updateCanvas() 
{
    background="white";
    sketch=Element_of_array;
    array_1 = ['aircraft carrier','airplane','alarm clock','car','angel'];
    random_no = Math.floor((Math.random()*array_1.length)+1);
    Element_of_array = array_1[random_no];
    document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch to be Drawn : "+sketch;
}
function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}
function draw()
{
    checksketch();
    strokeWeight(13);
    stroke(0);
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
    if(drawn_sketch == "sketch"){
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML= "Score: "+score;
    }
}
function checksketch()
{
    timer_counter++;
    document.getElementById("timer").innerHTML = "Timer: " +timer_counter;
    console.log("timer_counter",timer_counter);
    if(timer_counter>400){
        timer_counter=0;
        timer_check="completed";
        document.getElementById("your_Sketch").innerHTML="Your Sketch :";
        document.getElementById("confidence").innerHTML="confidence :";
    }
    if(timer_check=="completed" || answer_holder=="set")
    {
        timer_check="";
        answer_holder="";
        updateCanvas();
    }
}
function setup()
{
    canvas = createCanvas(280,280);
    canvas.center();
    background="white";
    canvas.mouseReleased(classifyCanvas);
}
function classifyCanvas()
{
    classifier.classify(canvas,gotResults);
}
function gotResults(error,results)
{
if(error){
    console.log("error",error);
}
console.log("results",results);
drawn_sketch = results[0].label;
document.getElementById("your_Sketch").innerHTML="Your Sketch :" + results[0].label;
document.getElementById("confidence").innerHTML="confidence :" + Math.round(results[0].confidence * 100)+ "%";
}
    