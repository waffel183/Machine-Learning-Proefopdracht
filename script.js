let r, g, b;
let NN;
let Arrow = document.getElementById("Arrow");

let which = "black";

function NumToHex(col){
  let hex = Number(col).toString(16);
  if(hex.length < 2){
    hex = "0" + hex;
  }
  return hex;
}

function ColorToHex(r,g,b){
  let red = NumToHex(r);
  let green = NumToHex(g);
  let blue = NumToHex(b);
  return "#"+red+green+blue;
}

function SetRandomColorBackground(){
  r = Math.floor(Math.random()*255);
  g = Math.floor(Math.random()*255);
  b = Math.floor(Math.random()*255);
  document.body.style.backgroundColor = ColorToHex(r,g,b);
  which = ColorPredictor(r,g,b);
}

function ColorPredictor(r,g,b){
  let inputs = [r/255,g/255,b/255];
  let outputs = NN.predict(inputs);
  console.log(outputs);
  if(outputs[0]>outputs[1]){
    return "black";
  }else{
    return "white";
  }
}

function TrainColor(r,g,b){
  if (r+g+b > 300){
    return [1,0]; //Black
  }else{
    return [0,1]; //White
  }
}

addEventListener('mousedown',()=>{
  let targets;
  if(event.screenX<483){
    targets = [1,0];  //Black
  }else{
    targets = [0,1];  //White
  }


  let inputs = [r/255,g/255,b/255];
  //uncomment the next line if you want to train the model yourself
  //NN.train(inputs,targets);

  SetRandomColorBackground();
  if (which == "black"){
    Arrow.style.position = "absolute";
    Arrow.style.top = "40%";
    Arrow.style.left = "22%";
  }else{
    Arrow.style.position = "absolute";
    Arrow.style.top = "40%";
    Arrow.style.left = "72%";
  }
})

function setup(){
  NN = new NeuralNetwork(3,3,2);

  //this for loop trains the model with 10000 examples made by the TrainColor function
  //comment the loop if you want to train the data yourself, also uncomment line 60
  for (let i = 0; i < 10000; i++){
    let r2 = Math.floor(Math.random()*255);
    let g2 = Math.floor(Math.random()*255);
    let b2 = Math.floor(Math.random()*255);
    let targets2 = TrainColor(r2,g2,b2);
    let inputs2 = [r2/255,g2/255,b2/255];
    NN.train(inputs2,targets2);
  }

  SetRandomColorBackground();

  if(which == "black"){
    Arrow.style.position = "absolute";
    Arrow.style.top = "40%";
    Arrow.style.left = "22%";
  }else{
    Arrow.style.position = "absolute";
    Arrow.style.top = "40%";
    Arrow.style.left = "72%";
  }
}
setup();
