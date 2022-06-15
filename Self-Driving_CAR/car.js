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
     this.sensor.update(roadBorder);
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
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(-this.angle);
        ctx.beginPath();
        ctx.rect(
        -this.width/2,
        -this.height/2,
        this.width,
        this.height);
        ctx.fillStyle= "#7E1925";
        ctx.fill();
        ctx.strokeStyle = "#500810";
        ctx.stroke();
        ctx.restore();

        this.sensor.draw(ctx);
    }    
    
}