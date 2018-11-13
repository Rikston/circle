var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.lineWidth = 10;


function kolo(settings){
    
    Object.defineProperties(this, {
        position:{
            get(){
                return {
                    x: this.x,
                    y: this.y
                };
            }
        }
    });
    this.x = settings.x;
    this.y = settings.y;
    this.radius = settings.radius;
    this.speedX = settings.speedX;
    this.speedY = settings.speedY;
    this.directionX = settings.directionX;
    this.directionY = settings.directionY;
    this.fillStyle = settings.fillStyle;
    this.strokeStyle = settings.strokeStyle;
    this.lineWidth = settings.lineWidth;
    this.idUpdate = null;
    this.draw = function(){
		//console.log("speedX: " + settings.speedX);
		//console.log("speedY: " + settings.speedY);
		//console.log("x: " + settings.x);
		//console.log("y: " + settings.y);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.fillStyle = this.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0, -6.4, true);
        ctx.stroke();
        ctx.fill();                                         
        
    };
    this.update = function(){
        this.idUpdate = requestAnimationFrame(this.update);
        this.draw();
        this.x+=this.speedX*this.directionX;
        this.y+=this.speedY*this.directionY;
        if(canvas.width == this.x+this.radius + this.lineWidth|| 0 == this.x -this.radius - this.lineWidth){
            this.directionX *= -1;
        } else{
			if(0 > this.x - this.radius - this.lineWidth){
                this.x = this.radius + this.lineWidth;
                this.directionX *= -1;
            } else{
                if(innerWidth < this.x + this.radius + this.lineWidth){
                   this.x = innerWidth - this.radius - this.lineWidth;
                    this.directionX *= -1;
                }
            }
		}
		
        if(canvas.height == this.y + this.radius + this.lineWidth || 0 == this.y - this.radius - this.lineWidth){
            this.directionY *= -1;
        } else{
            if(0 > this.y - this.radius - this.lineWidth){
                this.y = this.radius + this.lineWidth;
                this.directionY *= -1;
            }
            else{
                if(innerHeight < this.y + this.radius + this.lineWidth){
                    this.y = innerHeight - this.radius - this.lineWidth;
                    this.directionY *= -1;
                }
            }
        }
    }.bind(this);
    this.start = function(){
        this.update();
        return this;
    }
    this.stop = function(){
        cancelAnimationFrame(this.idUpdate);
    };
    this.changeDirection = function(delay){
        var tim = setInterval(function(){
            this.settings.directionX *= -1;
            this.settings.directionY *= -1;
            clearInterval(tim);
        }.bind(this),delay);
    };
    this.increase = function(val){
        val = val || 5;
        this.radius += val;
    };
    this.decrease = function(val){
        val = val || 5;
        if(this.radius - val > 0)
           this.radius -= val;
        else
            this.radius = 1;
    };
    this.inCircle = function(position){
        var diferenceX = Math.abs(position.x - this.x);
        var diferenceY = Math.abs(position.y - this.y);
        if(diferenceX <= this.radius && diferenceY <= this.radius){
            return true;
        }
        return false;
    }
}

function initializationMas(numberOfItems){
    for(var i = 0; i < numberOfItems; ++i){
        var radius = Math.round(Math.random()*(50-10)+1);
        var lineWidth = Math.round(Math.random()*(10-1)+1);
        var x = Ran(innerWidth - radius - lineWidth, radius + lineWidth, 0);
        var y = Ran(innerHeight - radius - lineWidth, radius + lineWidth, 0);
        //console.log(Ran(innerWidth - radius - lineWidth, radius + lineWidth, 0));
        //console.log(Ran(innerHeight - radius - lineWidth, radius + lineWidth, 0));
        circleMas[i] = new kolo({
            strokeStyle: "#000",
            fillStyle: "#000",
            lineWidth: lineWidth,
            radius: radius,
            x: parseInt(x),
            y: parseInt(y),
            directionX: 1,
            directionY: 1,
            speedX:Ran(2, 0.2, 1),
            speedY:Ran(2, 0.2, 1)
        })
    }
}

function animateFon(){
    id1 = requestAnimationFrame(animateFon);
    ctx.fillStyle = "rgba(0, 0, 255, 0.05)";
    ctx.fillRect(0, 0, innerWidth, innerHeight);
}
function animate(){
    id = requestAnimationFrame(animate);
    for(var i = 0; i < circleMas.length; ++i){
        circleMas[i].update();
    }
}

function Ran(max, min, fix){
    return (Math.random()*(max-min)+min).toFixed(fix);
}
function randomColor(alpha){
    alpha = alpha || 1;
    return "rgba("+Ran(255, 0,0)+", " + Ran(255, 0,0) +", "+ Ran(255, 0,0) +", "+ alpha +")";
}
