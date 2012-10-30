var Divers = [];

var bps = 50;
var maxBreath = 20000;
var timer = 0;

function playerObject(x, y)
{		
	
		this.thoughtDiv = undefined;
		this.movingLeft = false;
		this.movingDown = false;
		this.movingRight = false;
		this.movingUp = false;
		this.first = true;
		this.counter = 0;
		this.dx = 0;
		this.dy = 0;
		this.speedX = 20;
		this.speedY = 20;
		this.intervalId = 0;
		this.width = 46;
		this.height = 73;
		this.left = x;
		this.top = y;
		this.handsT = 0;
		this.handsL = 0;
		this.handStar = [];
		this.div = undefined;
		this.breath = maxBreath;
		this.needBreath = 0;
		this.currBps = bps;
		this.stops = 0;
		this.timer = 0;
		this.canPick = true;
		this.reloading = false;		
}		

		playerObject.prototype.addObject = function()
		{
			var diver = addDiv(imageDiverTos, 600, 100, this.width, this.height, 2, 0);
			Divers.push(this);
			var a = this;
			this.div = diver;		
		}	
		
		playerObject.prototype.moving = function()
		{
			if ((!this.movingDown) && (!this.movingUp) && (!this.movingLeft) && (!this.movingRight))
			{
					this.dx = 0;
					this.dy = 0;
					this.movingDown = true;
			}
			else if (this.movingDown)
			{
				this.dx = 0;
				this.dy = this.speedY/60;
				this.breath -= this.currBps/60;
				this.moveDown();
			}
			else if (this.movingLeft)
			{
				this.alive();
				this.dy = 0;
				this.dx = -this.speedX/60;
				this.breath -= this.currBps/60;
				this.moveLeft();
			}
			else if (this.movingRight)
			{
				this.alive();
				this.dy = 0;
				this.dx = this.speedX/60;
				this.breath -= this.currBps/60;
				this.moveRight();
			}
			else if (this.movingUp)
			{
				this.dx = 0;
				this.dy =-this.speedY/60;
				this.breath -= this.currBps/60;
				this.moveUp();
			}
			
		}
		
		
		playerObject.prototype.moveDown = function()
		{	if (this.first)
			{
				this.changeSize(imageDiverTos, 46, 73);
			}
			this.handsT = this.top;
			this.handsL = this.left + this.width - 15;
			this.enterShip("down");
			if (this.top > 150)
			{
				this.div.style.opacity = 1;
			}
							
			if ((this.top >= 560) && (this.handStar[0].canPicked))
			{
				this.top = 560;
				if (this.handStar[0].left > this.left)
				{
						this.movingRight = true;
						this.movingDown = false;
				}
				else
				{
					this.movingLeft = true;
					this.movingDown = false;
				}
				this.first = true;
			}		
		}
		
		playerObject.prototype.moveLeft = function()
		{	if (this.first)	
			{
				this.changeSize(imageDiverLeft, 66, 63);
			}
			this.handsT = this.top + 30;
			this.handsL = this.left - 25;
			if ((this.handStar.length <= 2) && (this.canPick))
			{
				var side = "left";						
				crash(side, this);						
			}
			if ((!this.canPick) || (((this.handStar.length == 2) && (this.handStar[1].picked)) || ((this.handStar.length == 1) && (this.handStar[0].picked)) || (this.handStar.length == 0)))
			{
					if (this.left-this.width <= 600)
					{				
						this.movingUp = true;
						this.movingLeft = false;
						this.first = true;
						return;
					}	
			}	
			if (this.left <= 40)
			{
				this.left = 40;						
				this.movingRight = true;
				this.movingLeft = false;
				this.first = true;
			}				
		}
		
		playerObject.prototype.moveRight =  function()
		{	if (this.first)		
			{
				this.changeSize(imageDiverRight, 66, 63);
			}			
			this.handsT = this.top + 30;
			this.handsL = this.left + this.width - 25;
			if ((this.handStar.length <= 2) && (this.canPick))
			{
				var side = "right";
				crash(side, this);
			}
			if ((this.canPick) && (((this.handStar.length == 2) && (!this.handStar[1].picked)) || ((this.handStar.length == 1) && (!this.handStar[0].picked))))
			{
					return;
			}
			if (this.left >= 600)
			{
				this.left = 600;
				this.movingUp = true;
				this.movingRight = false;
				this.first = true;
			}
		}
		
		playerObject.prototype.moveUp = function()
		{	if (this.first)		
			{
				this.changeSize(imageDiverTos, 46, 73);
			}        	
		
				if ((this.top <= gameScene.height - gameScene.height / 3) && (this.stops == 0))
				{
					this.timer = new Date().getTime();
					this.stops++;
					this.thoughtDiv = addDiv(imageDiverThought, this.left - 110, this.top - 50, 120, 64, 3, 1);
				}
				else if ((this.top <= gameScene.height - gameScene.height / 3 * 2) && (this.stops == 1))
				{
					this.timer = new Date().getTime();
					this.stops++;
					this.thoughtDiv = addDiv(imageDiverThought, this.left - 110, this.top - 50, 120, 64, 3, 1);
				}
				else if ((this.top <=gameScene.height - gameScene.height / 5 * 4) && (this.stops == 2))
				{
					this.timer = new Date().getTime();
					this.stops++;
					this.thoughtDiv = addDiv(imageDiverThought, this.left - 110, this.top - 50, 120, 64, 3, 1);
				}
				this.handsT = this.top;
				this.handsL = this.left + this.width - 15;
				this.enterShip("top");
		}
		
		playerObject.prototype.enterShip = function(side)
		{
			var opac = 0.3;
					switch (side)
					{
					case "top":
						{
							if (this.top <= 110)
								{
									this.div.style.opacity = 0;
									this.top = 100;
									this.movingUp = false;
									this.stops = 0;
									this.canPick = true;
									this.first = true;

									for (var s in this.handStar)
									{				
										if (this.handStar[s].picked)
											this.handStar[s].div.style.opacity = 0;
									}
									break;
								}

						}
					case "down":
						{
							if (this.top < 150)
								{
									this.div.style.opacity += opac;
									break;
								}
						}
					}
		}
		
		playerObject.prototype.changePos = function()
		{
			this.left = this.left + this.dx;
			this.top = this.top + this.dy;
		}
		
		playerObject.prototype.update = function()
		{
			if ((this.breath < maxBreath) && (this.div.style.opacity == 0))
			{
				var reload = false;
				for (var s in Divers)
				{
					reload = reload || Divers[s].reloading;
				}
				if (!reload)
				{
					this.reloading = true;
				}
				if (this.reloading)
				{
					this.breath += this.currBps/60;
					this.breath += 3000/60;
					this.breath = this.breath > maxBreath ? maxBreath : this.breath;
					this.reloading = this.breath == maxBreath ? false : true;
				}
			}
			else
			{
				this.breath -= this.currBps/60;
				if (this.timer == 0)
				{
					if ((((this.movingRight || this.movingUp)) && (this.handStar.length == 2)))
					{
						starIn(this);
						this.moving();
						this.changePos();
					}
					else if ( ((seeStar(this)) || (this.handStar.length != 0) || (this.top > 100)))
					{
						starIn(this);
						this.moving();
						this.changePos();
					}
				}
				else
				{
					var now = new Date().getTime();
					now = (now - this.timer) / 1000;
					if (this.stops == 1)
					{
						this.timer = now >= 5 ? 0 : this.timer;
						if (this.timer == 0)
							{
							delDiv(this.thoughtDiv);
							}
					}
					else if (this.stops == 2)
					{
						this.timer = now >= 10 ? 0 : this.timer;
						if (this.timer == 0)
						{
							delDiv(this.thoughtDiv);
						}
						
					}
					else if (this.stops == 3)
					{
						this.timer = now >= 15 ? 0 : this.timer;
						if (this.timer == 0)
						{
						delDiv(this.thoughtDiv);
						}
					}
				}
			}
		}
		
		playerObject.prototype.alive = function()
		{
			var needBreath = 0;
			var breath1 = 0;
			var breath0 = 0;
			var x = this.left;
			var y = this.top;
			var size = y - 100 + 600 - x;
			var bal = 0;
			for (var s in this.handStar)
				{
					bal += this.handStar[s].weight * 50;
				}
			var counter = 0;
			var star = 0;
			for (var s in this.handStar)
				{
					if (this.handStar[s].picked)
					{
						counter++;
						star = s;
					}
				}
			needBreath = counter == 2 ? ( size/this.speedX
							* this.currBps
							+ (this.handStar[0].weight + this.handStar[1].weight) * 50 + 50
							+ this.currBps*30 )
						: counter == 1 ? ( size/this.speedX
							* this.currBps
							+ this.handStar[star].weight * 50 + 50
							+ this.currBps*30 )
						: ( size/this.speedX * this.currBps + 50	+ this.currBps*30 );
			
			breath0 = counter == 2 ? ( size/this.speedX
					* this.currBps
					+ (this.handStar[0].weight) * 50 + 50
					+ this.currBps*30 )
					: ( size/this.speedX * this.currBps + 50	+ this.currBps*30 );
			
			breath1 = counter == 2 ? ( size/this.speedX
					* this.currBps
					+ (this.handStar[1].weight) * 50 + 50
					+ this.currBps*30 )
					: ( size/this.speedX * this.currBps + 50	+ this.currBps*30 );
			
			var breath3 = size/this.speedX * this.currBps + 50	+ this.currBps*30;
			var newBreath = breath0 > breath1 ? breath0 : breath1;
			
			if ((breath3 <= this.breath-50) && (breath3 >= this.breath - 500) && (this.canPick))
			{
			if (this.movingLeft)
				{
					this.movingLeft = false;
					this.movingRight = true;
				}
			for (var s in this.handStar)
				{
					starLost(this, s);
				}
			this.canPick = false;					
			}	
			else if ((needBreath >= this.breath) && ((newBreath <= this.breath-100) && (newBreath >= this.breath - 300) || (breath3 <= this.breath-100) && (breath3 >= this.breath - 300)))
				{
					if (newBreath == breath0)
						{
							starLost(this, 0);
						}
					else if (newBreath == breath1)
						{
							starLost(this, 1);
						}
				}		
			else if ((breath1 > this.breath) && (breath0 > this.breath) && (breath3 > this.breath))
				{
					var deadf = true;
				}
			
		}
		playerObject.prototype.changeSize = function(backgorund, w, h)	
		{
			this.div.style.backgroundImage = backgorund;
			this.width = w;
			this.height = h;
	        this.div.style.width = w + "px";
	        this.div.style.height = h + "px";
			this.first = false;
		}
		playerObject.prototype.draw = function()
		{
			this.div.style.left = this.left + "px";
			this.div.style.top = this.top + "px";
			for (var s in this.handStar)
			{
				this.handStar[s].update();
				this.handStar[s].draw();
			}
		}