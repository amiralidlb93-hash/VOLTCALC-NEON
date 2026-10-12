# VOLTCALC-NEON
POWERED CALCULATOR
<!DOCTYPE html>
<html lang="fa">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>VOLTCALC</title>
<style>
:root{
  box-sizing:border-box;
  padding-top:env(safe-area-inset-top,0px);
  padding-bottom:env(safe-area-inset-bottom,0px);
  --bg:#070514; --body:#14102e; --key:#231d4a; --key-edge:#0d0a22; --text:#e9e6ff;
  --cyan:#22e6ff; --pink:#ff2bd6; --violet:#8b5cff;
}
:root:not([data-theme="light"]){color-scheme:dark}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){--bg:#070514}}
:root[data-theme="dark"]{--bg:#070514}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
html{height:100%;scroll-padding-top:env(safe-area-inset-top,0px)}
body{
  margin:0;height:100%;min-height:100%;display:grid;overflow-x:hidden;overflow-y:auto;padding:16px 0;
  background:radial-gradient(ellipse at 50% 20%,#1b1442 0%,var(--bg) 60%);
  font-family:"Orbitron","Segoe UI",system-ui,sans-serif;color:var(--text);
  perspective:1200px;
}
body::before{ /* neon grid floor */
  content:"";position:fixed;left:-50%;right:-50%;bottom:0;height:45%;
  background:
    linear-gradient(var(--violet) 1px,transparent 1px) 0 0/60px 60px,
    linear-gradient(90deg,var(--violet) 1px,transparent 1px) 0 0/60px 60px;
  opacity:.22;pointer-events:none;transform:rotateX(70deg);transform-origin:bottom;
  mask-image:linear-gradient(to top,#000,transparent);-webkit-mask-image:linear-gradient(to top,#000,transparent);
}
.brand{margin:0 0 4px;text-align:center;font-size:clamp(30px,9vw,44px);font-weight:900;letter-spacing:6px;
  color:#fff;direction:ltr;text-shadow:0 0 6px #fff,0 0 18px var(--cyan),0 0 36px var(--cyan),0 0 70px var(--pink);animation:flick 5s infinite}
.tag{margin:0 0 22px;text-align:center;direction:ltr;font-size:12px;letter-spacing:3px;color:#9d96d8;text-shadow:0 0 8px var(--violet)}
@keyframes flick{0%,92%,100%{opacity:1}93%{opacity:.55}94%{opacity:1}96%{opacity:.7}97%{opacity:1}}
.stage{margin:auto;width:min(360px,92vw)}
.calc{
  position:relative;padding:18px;border-radius:30px;background:linear-gradient(145deg,#1c1640,var(--body));
  transition:transform .15s ease-out;
  box-shadow:0 0 0 2px #2d2563,0 0 40px rgba(139,92,255,.55),0 0 120px rgba(255,43,214,.25),
    0 30px 60px rgba(0,0,0,.7),inset 0 2px 0 rgba(255,255,255,.12);
}
.halo{ /* neon rim, kept behind the panel in 3D space */
  position:absolute;inset:-4px;border-radius:34px;pointer-events:none;
  background:conic-gradient(from var(--a,0deg),var(--cyan),var(--pink),var(--violet),var(--cyan));
  filter:blur(12px);opacity:.85;animation:spin 6s linear infinite;z-index:-1;
}
@property --a{syntax:"<angle>";inherits:false;initial-value:0deg}
@keyframes spin{to{--a:360deg}}
.screen{
  direction:ltr;text-align:right;padding:14px 16px;border-radius:18px;margin-bottom:16px;min-height:104px;
  background:#05030f;box-shadow:inset 0 4px 14px #000,0 0 0 1px rgba(34,230,255,.35),0 0 18px rgba(34,230,255,.25);
  display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;
}
.expr{font-size:13px;color:#7f78b8;min-height:18px;letter-spacing:1px;white-space:nowrap;overflow:hidden}
.val{font-size:42px;font-weight:700;color:var(--cyan);text-shadow:0 0 8px var(--cyan),0 0 24px var(--cyan);white-space:nowrap;line-height:1.15}
.keys{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;direction:ltr}
button{
  font:600 20px "Orbitron","Segoe UI",system-ui,sans-serif;color:var(--text);cursor:pointer;
  height:62px;border:0;border-radius:16px;background:linear-gradient(160deg,#322a66,var(--key));
  transition:transform .08s,box-shadow .08s,filter .2s;
  box-shadow:0 7px 0 var(--key-edge),0 12px 18px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.18);
  text-shadow:0 0 8px rgba(233,230,255,.6);
}
button:hover{filter:brightness(1.25)}
button:active,button.hit{transform:translateY(6px);box-shadow:0 1px 0 var(--key-edge),0 3px 8px rgba(0,0,0,.6),0 0 22px currentColor}
button:focus-visible{outline:2px solid var(--cyan);outline-offset:3px}
.op{color:var(--pink);text-shadow:0 0 10px var(--pink),0 0 22px var(--pink)}
.fn{color:var(--violet);text-shadow:0 0 10px var(--violet)}
.eq{grid-row:span 2;height:auto;color:#fff;background:linear-gradient(160deg,var(--pink),#7a2bff);
  text-shadow:0 0 12px #fff;box-shadow:0 7px 0 #4a136b,0 0 28px rgba(255,43,214,.7),inset 0 1px 0 rgba(255,255,255,.4)}
.eq:active,.eq.hit{box-shadow:0 1px 0 #4a136b,0 0 40px rgba(255,43,214,1)}
@media (prefers-reduced-motion:reduce){.halo,.brand{animation:none}.calc{transition:none}}
</style>
</head>
<body>
<div class="stage" id="stage">
 <h1 class="brand">VOLTCALC</h1>
 <p class="tag">NEON POWERED CALCULATOR</p>
 <div class="calc" id="calc">
  <div class="halo"></div>
  <div class="screen"><div class="expr" id="expr"></div><div class="val" id="val">0</div></div>
  <div class="keys" id="keys">
   <button class="fn" data-k="AC">AC</button>
   <button class="fn" data-k="±">±</button>
   <button class="fn" data-k="%">%</button>
   <button class="op" data-k="/">÷</button>
   <button data-k="7">7</button><button data-k="8">8</button><button data-k="9">9</button>
   <button class="op" data-k="*">×</button>
   <button data-k="4">4</button><button data-k="5">5</button><button data-k="6">6</button>
   <button class="op" data-k="-">−</button>
   <button data-k="1">1</button><button data-k="2">2</button><button data-k="3">3</button>
   <button class="op" data-k="+">+</button>
   <button data-k="0">0</button><button data-k=".">.</button>
   <button class="fn" data-k="⌫">⌫</button>
   <button class="eq" data-k="=">=</button>
  </div>
 </div>
</div>
<script>
(function(){
  var cur="0",prev=null,op=null,fresh=false,err=false;
  var sym={"+":"+","-":"−","*":"×","/":"÷"};
  var valEl=document.getElementById("val"),exprEl=document.getElementById("expr");
  function clean(n){return parseFloat(n.toPrecision(12))}
  function show(){
    var t=err?"خطا":cur;
    valEl.textContent=t;
    var len=t.length;valEl.style.fontSize=(len>12?22:len>9?30:42)+"px";
  }
  function calc(a,b,o){
    if(o==="+")return a+b; if(o==="-")return a-b; if(o==="*")return a*b;
    if(o==="/")return b===0?NaN:a/b;
  }
  function str(n){
    if(!isFinite(n))return null;
    n=clean(n);var s=String(n);
    if(s.indexOf("e")>-1)s=n.toExponential(6);
    return s;
  }
  function fmt(s){return s}
  function press(k){
    if(err&&k!=="AC"){ if(k!=="⌫"){reset()} else {reset();show();return} }
    if(/^[0-9]$/.test(k)){
      if(fresh){cur=k;fresh=false}
      else if(cur.replace(/[-.]/g,"").length<12) cur=(cur==="0")?k:cur+k;
    }else if(k==="."){
      if(fresh){cur="0.";fresh=false}
      else if(cur.indexOf(".")<0)cur+=".";
    }else if(k==="AC"){reset()}
    else if(k==="⌫"){
      if(fresh)return;
      cur=cur.length>1&&!(cur.length===2&&cur[0]==="-")?cur.slice(0,-1):"0";
    }else if(k==="±"){
      if(cur!=="0")cur=cur[0]==="-"?cur.slice(1):"-"+cur;
    }else if(k==="%"){
      var p=str(parseFloat(cur)/100);cur=p;fresh=true;
    }else if(k==="="){
      if(op!==null){
        var b=parseFloat(cur),r=str(calc(prev,b,op));
        if(r===null){err=true;exprEl.textContent="تقسیم بر صفر ممکن نیست"}
        else{exprEl.textContent=fmt(str(prev))+" "+sym[op]+" "+fmt(cur)+" =";cur=r}
        op=null;prev=null;fresh=true;
      }
    }else{ // operator
      if(op!==null&&!fresh){
        var r2=str(calc(prev,parseFloat(cur),op));
        if(r2===null){err=true;exprEl.textContent="تقسیم بر صفر ممکن نیست";op=null;show();return}
        cur=r2;
      }
      prev=parseFloat(cur);op=k;fresh=true;
      exprEl.textContent=fmt(str(prev))+" "+sym[k];
    }
    show();
  }
  function reset(){cur="0";prev=null;op=null;fresh=false;err=false;exprEl.textContent=""}
  var keys=document.getElementById("keys");
  keys.addEventListener("click",function(e){var b=e.target.closest("button");if(b)press(b.dataset.k)});
  var map={Enter:"=","=":"=",Backspace:"⌫",Escape:"AC",Delete:"AC",",":"."};
  window.addEventListener("keydown",function(e){
    var k=map[e.key]||e.key;
    var btn=keys.querySelector('[data-k="'+k+'"]');
    if(!btn)return;
    e.preventDefault();press(k);
    btn.classList.add("hit");setTimeout(function(){btn.classList.remove("hit")},110);
  });
  // 3D tilt following pointer
  var calcEl=document.getElementById("calc");
  window.addEventListener("pointermove",function(e){
    var x=(e.clientX/innerWidth-.5),y=(e.clientY/innerHeight-.5);
    calcEl.style.transform="rotateY("+(x*14)+"deg) rotateX("+(-y*12)+"deg)";
  });
  window.addEventListener("pointerleave",function(){calcEl.style.transform=""});
  calcEl.style.transform="rotateX(8deg) rotateY(-10deg)";
  show();
})();
</script>
</body>
</html>
