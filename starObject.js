var pickedStars = [];
var starsObj = [];

function starObject(x, y)
{
		this.speed = 25;
		this.dx = 0;
		this.dy = 80/5;
		this.speedX = 0;
		this.speedY = 80/5;
		this.counter = 0;
		this.posX = x;
		this.posY = y;
		this.width =  46;
		this.height = 43;
		this.intId = 0;
		this.left = 0;
		this.top = 0;
		this.div = undefined;
		this.cY = 0;
		this.canPicked = false;
		this.picked = false;
		this.starId = 0;
		this.weight = 0;
		this.picker = undefined;
}
		
		starObject.prototype.addStar = function()
		{
			var cX = this.posX - this.width/2;
			var cY = this.posY - this.height/2;
			this.cY = cY;
	        var weight = random(1,10);
	        this.weight = weight;
	        var star = addDiv('url(img/tf-star'+ weight +'.png)', cX, cY, this.width, this.height, 3, 0.1);
	        
	        this.left = parseInt(cX);
	        this.top = parseInt(cY);
			starsObj.push(this);
			this.div = star;		
		}
		
		starObject.prototype.move = function()
		{
			var pos = 0;
			var opac = 0.1;		
			if (this.div.style.opacity < 1)
			{
				opac += 0.1;
				this.div.style.opacity = opac;	
			}
			if (this.top >= (pos = random(600, 620)))
			{
				this.top = pos;
				this.posY = pos + this.height / 2;
				this.div.style.opacity = 1;
				this.canPicked = true;
				this.dy = 0;
			}
		};
		
		starObject.prototype.changePos = function()
		{
			this.left += this.dx;
			this.top += this.dy;
		}
		
		starObject.prototype.draw = function()
		{
			this.div.style.left = this.left + "px";
			this.div.style.top = this.top + "px";
		}
		
		starObject.prototype.update = function()
		{
			if (!this.canPicked)
			{
				this.move();
				this.changePos();
			}
			else
			{
				this.changePos();
			}

			
		}		