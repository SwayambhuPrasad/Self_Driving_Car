class Car{
    constructor(x,y,width,height)
    {
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;

        this.speed=0;
        this.acceleration=0.2;
        this.maxspeed=6;
        this.friction=0;
        this.inertia=0.05

        this.controls=new Controls();
    }
    update()
    {
        if(this.controls.forward)
        {
            this.speed += this.acceleration;
        }
        if(this.controls.reverse)
        {
            this.speed -= this.acceleration;
        }
        this.y-=this.speed;
        if(this.speed>0){
            this.speed-=this.inertia;
        }if(this.speed<0) {
            this.speed+=this.inertia;
        }if(this.speed>this.maxspeed){
            this.speed=this.maxspeed;
        }if(this.speed<-this.maxspeed){
        this.speed=-this.maxspeed;
        }
    }
    draw(ctx){
        ctx.beginPath();
        ctx.rect(
        this.x-this.width/2,
        this.y-this.height/2,
        this.width,
        this.height);
        ctx.fill();
    }    
    
}