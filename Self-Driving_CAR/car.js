class Car{
    constructor(x,y,width,height)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.speed=0;
        this.acceleration=0.2;
        this.maxspeed=3;
        this.friction=0;
        this.inertia=0.05
        this.angle=0;

         this.sensor = new Sensor(this);

        this.controls=new Controls();
    }
    update(roadBorder)
    {
     this.#move();
     this.polygon=this.#createPolygon();
     this.sensor.update(roadBorder);
    }
    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan(this.width,this.height);
        points.push({
            x:this.x+Math.sin(this.angle-alpha)*rad,
            y:this.y+Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y+Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x+Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        return points;
    }
    #move(){
        if(this.controls.forward)
        {
            this.speed += this.acceleration;
        }
        if(this.controls.reverse)
        {
            this.speed -= this.acceleration;
        }
        

        //this.y-=this.speed;
        if(this.speed>0){
            this.speed-=this.inertia;
        }if(this.speed<0) {
            this.speed+=this.inertia;
        if(Math.abs(this.speed)<this.inertia)
        {
            this.speed=0;
        }
        
       
        }if(this.speed>this.maxspeed){
            this.speed=this.maxspeed;
        }if(this.speed<-this.maxspeed){
        this.speed=-this.maxspeed;
        }
        if(this.speed!=0)
        {
            const flip=this.speed>0? 1:-1;
            if(this.controls.left)
            this.angle+=.03*flip;
            if(this.controls.right)
            this.angle-=.03*flip;
        }
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }
    draw(ctx){
       ctx.beginPath();
       ctx.moveTo(this.polygon[0].x,this.polygon[0].y)
       for(let i=0;i<this.polygon.length;i++){
           ctx.lineTo(this.polygon[i].x,this.polygon[i].y)
       }
        ctx.fillStyle= "#7E1925";
        ctx.fill();
        ctx.strokeStyle = "#500810";
        ctx.stroke();

        this.sensor.draw(ctx);
    }    
    
}