var imageBackground = "url(img/back.jpg)";
var imageAddDiver = "url(img/add-diver.png)";
var imageAddDiverHover = "url(img/add-diver-hover.png)";
var imageDelDiver = "url(img/delete-diver.png)";
var imageDelDiverHover = "url(img/delete-diver-hover.png)";
var imageDiverTos = "url(img/Diver-tros.png)";
var imageDiverThought = "url(img/thought.png)";
var imageFishes = "url(img/fishes.png)";
var imageShipLoad = "url(img/ship-load.png)";
var imageDiverLeft = "url(img/Diver-go-harvest.png)";
var imageDiverRight = "url(img/Diver-go-home.png)";
var fish = undefined;

var gameScene = function()
{
	this.width = 762;
	this.height = 685;
	this.shipLoad = false;
		
	this.init = function()
	{
       	var background = addDiv(imageBackground, 8, 8, this.width, this.height, 0);
		var addDiver = addDiv(imageAddDiver, 579, 20, 163, 32, 1);
		var delDiver = addDiv(imageDelDiver, 396, 20, 163, 32, 1);
				
		this.backgroundClick(background);
		this.addDiverClick(addDiver);
		this.delDiverClick(delDiver);
		
		this.mouseHoverAdd(addDiver);
		this.mouseHoverDel(delDiver);
		
	}
	
	this.backgroundClick = function(elem)
	{
		elem.onclick = function(m)
		{
			addStar(m);
		}
	}
	
	this.addDiverClick = function(elem)
	{
		elem.onclick = function()
		{
			addDiver();
		}
	}
	
	this.delDiverClick = function(elem)
	{
		elem.onclick = function()
		{
			delDiver();
		}
	}
	
	this.mouseHoverAdd = function(elem)
	{
		elem.onmouseover = function()
		{
			elem.style.background = imageAddDiverHover;
		}
		elem.onmouseout = function()
		{
			elem.style.background = imageAddDiver;
		}
	}
	
	this.mouseHoverDel = function(elem)
	{
		elem.onmouseover = function()
		{
			elem.style.background = imageDelDiverHover;
		}
		elem.onmouseout = function()
		{
			elem.style.background = imageDelDiver;
		}
	}
}

function addStar(m)
{
	if ((m.pageX >= 50) && (m.pageX <= gameScene.width - 40))
	{
		st = new starObject(m.pageX, m.pageY);
		st.addStar();
	}
	
}

function addDiver()
{
	akv = new playerObject(600, 100);
	akv.addObject();
}

function delDiver()
{
	if (Divers.length > 1)
	for (var a in Divers)
		{
			if ((Divers[a].div.style.opacity == 0) && (Divers[a].handStar.length==0))
			{
				delDiv(Divers[a].div);
				for (var i in Divers[a])
					{
						delete Divers[a][i];				
					}			
				Divers.splice(a,1);				
				break;
			}
				
		}
}