function SliderIncreaseSizeHandler(next){
  this.next = next;
}

SliderIncreaseSizeHandler.prototype = {
    handleRequest: function(request, slider){
      if(request === 'Slider+'){
        slider.scale.setTo(1,1);
        setTimeout(function(){ slider.scale.setTo(0.5,0.5); }, 5000);
        speedUp = false;
        dualBallIsActive = false;
        console.log(request+" slider + + ");
      }
      else
      {
        if(this.next!=null)
        {
          this.next.handleRequest(request, slider);
        }
      }
    },

    setNext: function(next){
        this.next = next;
        return next;
    }
}

function SliderDecreaseSizeHandler(next){
  this.next = next;
}

SliderDecreaseSizeHandler.prototype = {
    handleRequest: function(request, slider){
      if(request === 'Slider-'){
        slider.scale.setTo(0.4,0.4);
        setTimeout(function(){ slider.scale.setTo(0.5,0.5); }, 5000);
        speedUp = false;
        dualBallIsActive = false;
        console.log(request+" slider - - ");
      }
      else
      {
        if(this.next!=null)
        {
          this.next.handleRequest(request, slider);
        }
      }
    },

    setNext(next){
        this.next = next;
        return next;
    }
}

function BallSpeedUpHandler(next){
  this.next = next;
}

BallSpeedUpHandler.prototype = {
    handleRequest: function(request, slider){
      if(request === 'Speed+'){
         speedUp = true;
         dualBallIsActive = false;
      }
      else
      {
        if(this.next!=null)
        {
          this.next.handleRequest(request, slider);
        }
      }
    },

    setNext: function(next){
        this.next = next;
        return next;
    }
}

function DoubleBallHandler(next){
  this.next = next;
}

DoubleBallHandler.prototype = {
    handleRequest: function(request, slider){
      if(request === 'DualBall'){
        console.log(request+" ball double");
        dualBallIsActive = true;
        speedUp = false;
      }
      else
      {
        if(this.next!=null)
        {
          this.next.handleRequest(request, slider);
        }
      }
    },

    setNext: function(next){
        this.next = next;
        return next;
    }
}

var dualBallIsActive=false;
var speedUp=false;

function Chain(){
}

Chain.prototype = {
  handleAllRequests: function(request, slider){    
    var c1 = new SliderIncreaseSizeHandler();
    var c2 = new SliderDecreaseSizeHandler();
    var c3 = new BallSpeedUpHandler();
    var c4 = new DoubleBallHandler();

    c1.setNext(c2).setNext(c3).setNext(c4);
    return c1.handleRequest(request, slider);
  },

  powerUpHitSlider: function(_objectPowerUp,_slider,_speedUp,_dualBallIsActive) {
    _objectPowerUp.body.velocity.y = 0;
    var objectType = _objectPowerUp.type;
    _objectPowerUp.kill();
    console.log(objectType);
    speedUp = _speedUp;
    dualBallIsActive = _dualBallIsActive;
    new Chain().handleAllRequests(objectType, _slider);

    var powerUpList = [speedUp, dualBallIsActive];
    return powerUpList;
  }
}

//new Chain().handleAllRequests("DualBall");
//new Chain().powerUpHitSlider("DualBall","");
