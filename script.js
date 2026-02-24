const startScreen=document.getElementById("startScreen");
const gameArea=document.getElementById("gameArea");
const lettersContainer=document.getElementById("lettersContainer");
const finale=document.getElementById("finale");
const question=document.getElementById("question");
const music=document.getElementById("music");

// Mini-lojëra dashurie
let heartsCaught=0;
let totalHearts=5;

startScreen.onclick=()=>{
 startScreen.classList.add("hidden");
 gameArea.classList.remove("hidden");
 music.play();
 startMiniGame();
};

// EFFECTS: zemra, flutura, lule
const canvas=document.getElementById("effects");
const ctx=canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
let items=[];
class Effect{
 constructor(type){
  this.x=Math.random()*canvas.width;
  this.y=-10;
  this.size=Math.random()*10+5;
  this.speed=Math.random()*2+1;
  this.type=type;
 }
 draw(){
  if(this.type==='heart') ctx.fillStyle="#ff3366";
  else if(this.type==='flower') ctx.fillStyle="#ff99cc";
  else ctx.fillStyle="#ffd700";
  ctx.beginPath();
  ctx.arc(this.x,this.y,this.size,0,2*Math.PI);
  ctx.fill();
  this.y+=this.speed;
 }
}
function startEffects(){
 setInterval(()=>{
   const types=['heart','flower','butterfly'];
   items.push(new Effect(types[Math.floor(Math.random()*types.length)]));
 },200);
 animate();
}
function animate(){
 ctx.clearRect(0,0,canvas.width,canvas.height);
 items.forEach(item=>item.draw());
 requestAnimationFrame(animate);
}

// MINI-LOJA: kap zemrat/fluturat
function startMiniGame(){
 startEffects();
 const heartInterval=setInterval(()=>{
   heartsCaught++;
   if(heartsCaught>=totalHearts){
     clearInterval(heartInterval);
     setTimeout(showLetters,500);
   }
 },800); // Simulimi i “kapjes” së zemrave/fluturave
}

// SHKRONJAT I LOVE YOU
const word="I LOVE YOU";
let letters=[];
function showLetters(){
 gameArea.classList.add("hidden");
 lettersContainer.classList.remove("hidden");
 for(let i=0;i<word.length;i++){
   const span=document.createElement("span");
   span.className="letter";
   span.innerText=word[i];
   // shpërndarje random fillestare
   span.style.top=Math.random()*80+"%";
   span.style.left=Math.random()*90+"%";
   lettersContainer.appendChild(span);
   letters.push(span);
 }
 // Animacion gradual i bashkimit në formë zemre
 setTimeout(animateLetters,500);
}

function animateLetters(){
 const centerX=window.innerWidth/2-150;
 const centerY=200;
 letters.forEach((el,i)=>{
   const angle=(i/(letters.length-1))*Math.PI; // llogarit pozicion për zemër
   const x=centerX+100*Math.cos(angle);
   const y=centerY+50*Math.sin(angle);
   setTimeout(()=>{el.style.top=y+"px"; el.style.left=x+"px";},i*300);
 });
 setTimeout(showFinale,3000);
}

// FINALE: foto + pyetje romantike
function showFinale(){
 lettersContainer.classList.add("hidden");
 finale.classList.remove("hidden");
 question.classList.remove("hidden");
}

// BUTTONAT YES
document.addEventListener("click",(e)=>{
 if(e.target.id==="yes1"||e.target.id==="yes2"){
   alert("Të dua pafund ❤️\nMë fal për çdo gjë që të kam merzit 💌");
 }
});
