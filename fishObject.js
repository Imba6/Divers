var fishObject = function()
{
	this.width = 99;
	this.height = 72;
	this.dx = -random(20, 80)/60;
	this.dy = 0;
	this.div = undefined;
	this.left = 171 + random(250, this.height - 100);
}

fishObject.prototype.addObject = function()
{	
	this.div = addDiv(imageFishes, 40 + random (40, 762-this.width), random(250, 685 - 100), this.width, this.height, 4, 1);
}

fishObject.prototype.draw = function()
{
	this.left += this.dx;
	this.div.style.left = this.left + "px";
	if (this.left <= 40)
		{
			this.div.style.opacity -= 0.1;
			if (this.div.style.opacity <= 0.2)
				{
					this.left = 762 - 171;
					this.div.style.top = random(250, 685 - 100) + "px";
				}
		}
	else if (this.div.style.opacity <= 0.2 )
		{
			this.div.style.opacity = 1;
		}
	else if (this.left >= 740)
		{
			this.div.style.width = (parseInt(this.div.style.width) - 20) + "px";
		}
}