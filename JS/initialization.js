var id;
var id1;
var circleMas = [];
circleMas.remove_ = function(num){
    for(var i = 0; num > 0; ++i){
        var l = this[i];
        l.stop();        
        this.shift();
        l = null;
        --num;
    }
}
var Sign = false;
var Increase_ = false;
var Deincrease_ = false;
var createCircle_ = false;
var cir = new kolo({lineWidth: 20, radius: 5, x:98, y:102, directionX: 1, directionY: 1, speedX: 2.1, speedY:1});
function MouseMove(e){
       // console.log(e.pageX);
        if(Sign){
            for(var i = 0; i < circleMas.length; ++i){
                circleMas[i].speedX = (e.pageX - circleMas[i].x)/(circleMas[i].directionX * 10);
                circleMas[i].speedY = (e.pageY - circleMas[i].y)/(circleMas[i].directionY * 10);
                
            }
       }
};
function MouseMove1(e){
    circleMas.forEach(function(elem){
        
        if(elem.inCircle({x: e.pageX, y: e.pageY})){
            console.log("in circle");
            if(Increase_)
                elem.increase();
            if(Deincrease_)
                elem.decrease();
        }
    });
}
function MouseDown(){
    Sign = true;
   
}
function MouseUp(e){
    Sign = false;
    if(circleMas.length > 0){
        var dirX = -(e.pageX - circleMas[0].x > 0? 1: -1);
        var dirY = -(e.pageY - circleMas[0].y > 0? 1: -1);
    }
    
    for(var i = 0; i < circleMas.length; ++i){
        //console.log(circleMas[i].settings.directionX + " | " + circleMas[i].settings.directionY)
        circleMas[i].directionX = (e.pageX - circleMas[i].x > 0? 1: -1);
        circleMas[i].directionY = (e.pageY - circleMas[i].y > 0? 1: -1);
        circleMas[i].speedX = (Math.random()*(20-1)+1).toFixed(2);
        circleMas[i].speedY = (Math.random()*(20-1)+1).toFixed(2);
        
    }
}
function CreateCircle(e){
    if(createCircle_){
        circleMas.push(new kolo({
            x: e.pageX,
            y: e.pageY,
            radius: 20,
            lineWidth: 3,
            speedX: Ran(2, 1, 1),
            speedY: Ran(2, 1, 1),
            directionX: Math.random() > 0.5 ? 1: -1,
            directionY: Math.random() > 0.5 ? 1: -1,
            fillStyle: randomColor()
        }).start());
    }
        
}
function RemoveCircle(){
    requestAnimationFrame(RemoveCircle);
    circleMas.remove_(circleMas.length - 40);
}
window.onload = function(){
    document.body.appendChild(canvas);
   initializationMas(15);
    animateFon();
    circleMas.forEach(function(elem){
       elem.start(); 
    });
     
    //animate();
    //cir.start();
   RemoveCircle();
    this.addEventListener("mousedown", MouseDown);
    this.addEventListener("mousemove", MouseMove);
    this.addEventListener("mousemove", MouseMove1);
    //this.addEventListener("mousedown", MouseMove, true);
    //this.addEventListener("mousedown", CreateCircle, true);
    this.addEventListener("mousemove", CreateCircle, true);
    this.addEventListener("mouseup", MouseUp);
    this.addEventListener("keydown", function(e){
        if(e.keyCode == 32){
            for(var i = 0; i < circleMas.length; ++i){
                circleMas[i].changeDirection(1);
            }
        }
        if(e.keyCode == 83){
            circleMas.forEach(function(elem){
                elem.stop();
            });
            
        }
        if(e.keyCode == 67){
            var colorForBigger = randomColor(1);
			var colorForSmall = randomColor(1);
			var fillColor = randomColor(0.6);
			//console.log(colorForBigger);
			//console.log(colorForSmall);
            for(var i = 0; i < circleMas.length; ++i){
			//	console.log(circleMas[i].settings.radius);
				if(circleMas[i].radius > 20) circleMas[i].strokeStyle = colorForBigger;
				else circleMas[i].strokeStyle = colorForSmall;
				circleMas[i].fillStyle = fillColor;
				
			}
        }   
		if(e.keyCode == 81){
			cancelAnimationFrame(id1);
		}
        if(e.keyCode == 68){
            if(Deincrease_)
                Deincrease_ = false;
            else
                Deincrease_ = true;
        }
        if(e.keyCode == 73){
            if(Increase_)
                Increase_ = false;
            else
                Increase_ = true;
        }
        if(e.keyCode == 75){
            if(createCircle_)
                createCircle_ = false;
            else
                createCircle_ = true;
        }
    });
    this.addEventListener("keyup", function(e){
        if(e.keyCode == 83){
            circleMas.forEach(function(elem){
                elem.start();
            })
        }
		if(e.keyCode == 81)
			id1 = requestAnimationFrame(animateFon)
        //if(e.keyCode == 75)
          //  createCircle_ = false;
    }.bind(this));
    this.addEventListener("resize", function(e){
        canvas.width = innerWidth;
        canvas.height = innerHeight;
        
    
    }, true);
}