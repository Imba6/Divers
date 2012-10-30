
function include(url) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', url);
  document.getElementsByTagName('head').item(0).appendChild(script);
}

include('gameScene.js');
include('playerObject.js');
include('starObject.js');
include('fishObject.js');


function init()
{
		startGame();
}

function startGame()
{
	gameScene = new gameScene();
	gameScene.init();
	inter2 = setInterval(function(){tick();},1000/60);	
	addDiver();
	fish = new fishObject();
	fish.addObject();
	
}

function random(min, max)
{
	var res = (Math.random() * (max - min) + min);
	res = Math.round(res);
	return res;
}

function crash(side, a)
{
	var id = 0;
	var count = starsObj.length;
	var counter = 0;
	var left = parseInt(a.div.style.left);
		for (var o in a.handStar)
		{
			if ((a.handStar[o].canPicked) && (!a.handStar[o].picked))
			{
				switch (side)
				{
					case "left":
					if ((a.left <= a.handStar[o].left + a.handStar[o].width) && (a.left + a.width >= a.handStar[o].left))
						{
									if ((o == 0) || (a.handStar[0].picked))
										{						
											a.handStar[o].picked = true;
											a.handStar[o].canPicked = false;
											a.currBps += a.handStar[o].weight;
											a.movingRight = true;
											a.movingLeft = false;
											a.first = true;																						
										}								
						}
					break;
					
					case "right":
						if ((a.left + a.width >= a.handStar[o].left) && (a.left <= a.handStar[o].left + a.handStar[o].width))
						{
							if (o == 0)
							{
								a.handStar[o].picked = true;
								a.handStar[o].canPicked = false;
								a.currBps += a.handStar[o].weight;
								a.movingRight = false;
								a.movingLeft = true;
								a.first = true;
							}
							else
							{
								a.handStar[o].picked = true;
								a.handStar[o].canPicked = false;
								a.currBps += a.handStar[o].weight;
							}
				
						}
						break;
				}
			}
		}
}

function seeStar(a, b)
{
		var c = b;
		var returnFlag = false;
				for (var s in starsObj)
					{
						var cord = starsObj[s].left;
						for (var i in Divers)
							{
							if (starsObj.length != 0)
								{
									if (((a.movingLeft) || (a.movingDown)) || (!(a.movingLeft & a.movingUp & a.movingDown & a.movingRight)))
										{
											if ((cord + starsObj[s].width) >= a.left - parseInt(gameScene.width)/3)
												{
													returnFlag = starPick(a, s);
													
												}
											else if (((cord + starsObj[s].width) >= Divers[i].left - parseInt(gameScene.width)/3) && (a!=Divers[i]))
												{	
													returnFlag = starPick(a, s);
												}
										}
									else
										{
											if ((cord + starsObj[s].width) >= a.left + a.width)
												{
													returnFlag = starPick(a, s);
												}						
											else if (((cord + starsObj[s].width) >= Divers[i].left + Divers[i].width) && (a!=Divers[i]))
												{
													returnFlag = starPick(a, s);
												}
										}
									if (returnFlag)
										if (s>0)
										s--;
									continue;
								}
							else
								{
									return false;
								}
							}
						continue;
					}
				return returnFlag;
}

function starPick(a, s)
{
	if (a.handStar.length < 2)
	{
		starsObj[s].picker = a;
		a.handStar.push(starsObj[s]);
		starsObj.splice(s,1);
		if (a.handStar.length == 2)
			{
				if (Math.abs(600 - a.handStar[0].left) < Math.abs(600 -  a.handStar[1].left))
					{
						var buf = a.handStar[0];
						a.handStar[0] = a.handStar[1];
						a.handStar[1] = buf;
					}
			}
		return true;
	}
	else
		{
			if ((!a.movingUp) && (Math.abs(600 - starsObj[s].left) > Math.abs(600 - a.handStar[0].left)))
				{
					var buf = a.handStar[0];
					starsObj[s].picker = a;
					a.handStar[0] = starsObj[s];
					starsObj.splice(s,1);
					a.handStar[1].picker = undefined;
					starsObj.push(a.handStar[1]);
					a.handStar[1] = buf;
					return true;
				}
		}
	return false;
}

var starLost = function(a, s)
{
	var star = a.handStar[s];
	a.handStar.splice(s, 1);
	a.currBps -= star.weight;
	star.picker = undefined;
	star.picked = false;
	star.canPicked = false;
	star.dy = 80/5;
	star.dx = 0;
	star.move();
	starsObj.push(star);
}

function starIn(a)
{
		for (var s in a.handStar)
		{
			if (a.handStar[s].picked)
			{
				if (s !=1)
				{
					a.handStar[s].left = a.handsL;
					a.handStar[s].top = a.handsT;
				}
				else
				{
					a.handStar[s].left = a.handsL - 10;
					a.handStar[s].top = a.handsT;
				}
					
					if ((a.handStar[s].left >= 500) && (a.handStar[s].top <=120))
					{
						if (!gameScene.shipLoad)
						{
							 gameScene.shipLoad = true;
							 shipLoad = addDiv(imageShipLoad, 640, 95, 70, 38, 5, 1);
						}
						delDiv(a.handStar[s].div);
						a.currBps -= a.handStar[s].weight;
						a.handStar.splice(s,1);			
					}
			}
		}
}

function addDiv(backgroundImage, left, top, width, height, zIndex, opacity)
{
	var mainp = document.getElementById("ogs");
	var a = document.createElement("div");
	a.style.overflow = "auto";
	a.style.backgroundImage = backgroundImage;
	a.style.left = left + "px";
	a.style.top = top + "px";
	a.style.width = width + "px";
	a.style.height = height + "px";
	a.style.position = "absolute";
	a.style.zIndex = zIndex.toString();
	a.style.opacity = opacity < 1 ? opacity : 1;
	mainp.appendChild(a);
	return a;
}

function delDiv(div)
{
	var mainp = document.getElementById("ogs");
	mainp.removeChild(div);
}

function tick()
{
	for (var a in Divers)
		{		
			Divers[a].update();
			Divers[a].draw();
		}
	for (var a in starsObj)
		{
			starsObj[a].update();
			starsObj[a].draw();
		}
	fish.draw();
	
}

function max(a, b)
{
}