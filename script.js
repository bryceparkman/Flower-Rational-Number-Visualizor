alert("Check the auto-increment box and hit animate");
var turnPercent = document.getElementById("turnInput");
				var delay = document.getElementById("delayInput");
				var autoIncrement = document.getElementById("auto-inc");
				var delayBox = document.getElementById("delayBox");
				var inc = document.getElementById("incInput");
				var target = document.getElementById("targetInput");
				var size = document.getElementById("size");
				var spacing = document.getElementById("space");
				var rainbox = document.getElementById("rainbow");
				var strobeBox = document.getElementById("strobe");
				var c=document.getElementById("myCanvas");
				var ctx=c.getContext("2d");
				var tP;
				var dS;
				var aInc;
				var siz = 10;
				var spc = 5;
				var targ = 1;
				var drawn = false;
				var colorCheck = false;
				var color = "black";
				var strobeChecker = false;
				
				function assignTurn() {
					drawn = false;
					
					var tInit = turnPercent.value;
					
					if(tInit.match(/\d+\/[1-9]\d*/)){
						var slashLoc = tInit.indexOf("/");
						turnPercent.value = parseInt(tInit.substring(0,slashLoc)) / parseInt(tInit.substring(slashLoc+1,tInit.length));
						if (tInit != "0") {turnPercent.value -= (Math.ceil(--turnPercent.value));}
						tP = parseFloat(turnPercent.value);
						if (tInit == "0") {turnPercent.value = 0;}
					} else if (tInit.match(/\d+\.?\d*/)){
						
						tP = parseFloat(turnPercent.value);
						if (tInit == "0") {turnPercent.value = 0;}
					} else {
						turnPercent.value = "Input not supported";
					}
					
					draw();
				}
				function assignDelay() {
					if (!delay.value.match(/\d+/)){
						delay.value = "Input not supported";
					}
					dS = parseFloat(delay.value);
					animate();
				}
				
				function assignTarget(){
				   if (!target.value.match(/\d+\.?\d*/)){
						target.value = "Input not supported";
					}
					targ = parseFloat(target.value);
				}
				
				function assignSize(){
				    siz = parseFloat(size.value);
				    assignTurn();
				}
				
				function assignSpace(){
				    spc = parseFloat(spacing.value);
				    assignTurn();
				}
				
				function increment(){
					if (inc.value.match(/\d+\.?\d*/)){
						inc.value = parseFloat(inc.value);
						if (inc.value != 0){
							inc.value -= (Math.ceil(inc.value-1));
							turnPercent.value = parseFloat(turnPercent.value) + parseFloat((inc.value));
							assignTurn();
							
					  }
					} else {
					   inc.value = "Input not supported";
					}
				}
				
				function getRandomColor() {
                var letters = '0123456789ABCDEF';
                 var color = '#';
                for (var i = 0; i < 6; i++) {
                    color += letters[Math.floor(Math.random() * 16)];
                }
                    return color;
                }
				
				function question(){
				    
                alert("Turn percentage is how much of a full rotation it does for every circle, for example 1/2 or 0.5 would be 180 degrees\n Increment amount is a manual increase, and the auto-increment function does it for you with a set delay and stop point.\n The circle size and spacing is also variable.\n If you put a fraction into the turn percentage, the denominator is represented by the spokes of the flower, which is why it is a rational number visualizer.\n A very cool visual is shown by starting at 0 turn percentage, setting the increment amount to 0.001, and an auto-increment delay of 50ms. \n Make sure to hit the choose buttons, sorry it's not pretty.");
				}
				
				function autoIncrementCheck(){
					aInc = autoIncrement.checked;
					if (aInc) {
						delayBox.setAttribute("style", "display:initial");
					} else{
						delayBox.setAttribute("style", "display:none");
					}
				}
				
				function rainbowCheck(){
				    colorCheck = rainbox.checked;
				    if(!colorCheck){
				        color = "black";
				    }
				    assignTurn();
				}
				
				function strobeCheck(){
				    strobeChecker = strobeBox.checked;
				    if(!strobeChecker){
				        color = "black";
				    }
				    assignTurn();
				}
				
				function fillCircle(x,y,r,color){
				    if(colorCheck){
					   color = getRandomColor();
					} 
					ctx.beginPath();
					ctx.arc(x,y,r,0,2*Math.PI);
					ctx.closePath();
					ctx.fillStyle = color;
					ctx.fill();
				}
				
				function polarRadToX(r, theta){
					return r * Math.cos(theta);
				}
				
				function polarRadToY(r, theta){
					return r * Math.sin(theta);
				}
				
				function draw(){
					if(!drawn){
					    if(strobeChecker){
					        color = getRandomColor();
					    }
						ctx.clearRect(0, 0, c.width, c.height);
						fillCircle(200,200,siz,color);
						var r = 10;
						var theta = 0;
						
						for(i=0;i<60;i++){
							theta += (Math.PI * 2 * tP);
							r += parseFloat(spc);
							fillCircle(parseInt(Math.round(polarRadToX(r,theta)))+200,parseInt(Math.round(polarRadToY(r,theta)))+200,siz,color);
						}
						
						drawn = true;
					}
				}
				function interval(func, wait, times){
                     var interv = function(w, t){
                          return function(){
                            if(typeof t === "undefined" || t-- > 0){
                                setTimeout(interv, w);
                                try{
                                    func.call(null);
                                }
                                 catch(e){
                                    t = 0;
                                    throw e.toString();
                                }
                            }
                        };
                    }(wait, times);

                    setTimeout(interv, wait);
                };
                
				function animate(){
					if(aInc){
						interval(function(){increment();},dS,Math.floor((targ-parseFloat(turnPercent.value))/parseFloat(inc.value)));
					}
				}