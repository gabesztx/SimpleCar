(function(window, undefined) {
    "use strict";
    var document = window.document,
        CONTROLL = window.CONTROLL = window.CONTROLL || {};
    var isTouchSupported = 'ontouchstart' in window,
        mouseStartEvent = isTouchSupported ? 'touchstart' : 'mousedown',
        mouseMoveEvent = isTouchSupported ? 'touchmove' : 'mousemove',
        mouseEndEvent = isTouchSupported ? 'touchend' : 'mouseup',
        mouseCont = {x:null,y:null},
        joyPosition = {x:100,y:400},
        deltaCenter = {x:null,y:null},
        joyRadius = 20,
        joyRad = 30,
        mouseClick = false,
        firstClick = null;

    var joy  = null,
        joygroup  = null,
        /* init joystick */
        initJoystick = function(){
            joygroup = new Kinetic.Group();

            // create Circle
            joy = new Kinetic.Circle({
                radius: joyRad,
                fill: '#DBE0E6',
                offset:{x:0,y:0},
                x:joyPosition.x,
                y:joyPosition.y
            });

            var arrow1 = CAR.canvasImages['arrow'],
                arrow2 = arrow1.clone(),
                arrow3 = arrow1.clone(),
                arrow4 = arrow1.clone();

            joygroup.add(arrow1);
            joygroup.add(arrow2);
            joygroup.add(arrow3);
            joygroup.add(arrow4);
            joygroup.add(joy);

            arrow1.setPosition(joyPosition.x - arrow1.getWidth()/2,joyPosition.y-arrow1.getHeight()/2 - 40);
            arrow2.setPosition(joyPosition.x - arrow1.getWidth()/2-40,joyPosition.y-arrow1.getHeight()/2+18);
            arrow3.setPosition(joyPosition.x - arrow1.getWidth()/2+18,joyPosition.y-arrow1.getHeight()/2+54);
            arrow4.setPosition(joyPosition.x - arrow1.getWidth()/2+58,joyPosition.y-arrow1.getHeight()/2);

            arrow1.rotateDeg(0);
            arrow2.rotateDeg(-90);
            arrow3.rotateDeg(180);
            arrow4.rotateDeg(90);

            CAR.canvasElement.canvasLayer.add(joygroup);
        },

        /* add mouseEvent */
        mouseEvent = function(){
            var canbasBt = document.querySelector("#canvascont"),
                doc =  document.querySelector("body");
            joy.on(mouseStartEvent, down);
            joy.on('mouseover',over);
            joy.on('mouseout',out);
            canbasBt.addEventListener(mouseMoveEvent, move, false);
            document.addEventListener(mouseEndEvent, up, false);
        },

        /* mouse over */
        over = function(){
            document.body.style.cursor = 'pointer';
        },

        /* mouse out */
        out = function(){
            document.body.style.cursor = 'default';
        },

        /* mouse-touch down */
        down = function(e){
            document.body.style.cursor = 'pointer';

            mouseCont.x = e.layerX;
            mouseCont.y = e.layerY;

            firstClick = {x:mouseCont.x,y:mouseCont.y};

            CAR.carCurrentPositions = {
                x:CAR.canvasElement.canvasGoupCar.getX(),
                y:CAR.canvasElement.canvasGoupCar.getY()
            };

            deltaCenter.x =  mouseCont.x-joy.getX();
            deltaCenter.y  = mouseCont.y-joy.getY();

            CONTROLL.mouseListener = true;
            mouseClick = true;
        },

        /* mouse-touch move */
        move = function(e){

            if(mouseClick === true){
                e.preventDefault();
                mouseCont.x = e.layerX;
                mouseCont.y = e.layerY;
            }
        },

        /* mouse-touch up */
        up = function(){
            CONTROLL.mouseListener = false;
            mouseClick = false;
            CAR.carCurrentPositions.x = CAR.canvasElement.canvasGoupCar.getX();
            CAR.carCurrentPositions.y = CAR.canvasElement.canvasGoupCar.getY();
            //CAR.setPosX = 0;
            //CAR.setPosY = 0;
        },

        /* joystick render draw */
        draw = function (){

            var xPos, yPos;
            var speed = 0.0625;

            if(CONTROLL.mouseListener){

                var scale = joyRadius / Math.sqrt(Math.pow(mouseCont.x - joyPosition.x, 2) + Math.pow(mouseCont.y - joyPosition.y, 2));

                xPos =  mouseCont.x-deltaCenter.x;
                yPos =  mouseCont.y-deltaCenter.y;

                //console.log(mouseCont.x+" "+mouseCont.y);
                var carRad = {x:mouseCont.x-firstClick.x,y:mouseCont.y-firstClick.y};

                if(scale>1){
                    var xp = joyPosition.x;
                    var xy = joyPosition.y;
                }
                else{

                    /* OUT radius */

                    var  posX =  mouseCont.x-deltaCenter.x;
                    var  posY =  mouseCont.y-deltaCenter.y;

                    xPos = Math.round((posX - joyPosition.x) * scale + joyPosition.x);
                    yPos = Math.round((posY - joyPosition.y) * scale + joyPosition.y);

                }

                /* set card positions */
                var carRad = {x:mouseCont.x-firstClick.x,y:mouseCont.y-firstClick.y};

                var xpos = carRad.x*speed;
                var ypos = carRad.y*speed;

                /* speed limit */
                if(xpos>6){
                    xpos = 6;
                }
                if(xpos<-6){
                    xpos = -6;
                }
                if(ypos>6){
                    ypos = 6;
                }
                if(ypos<-6){
                    ypos = -6;
                }
                if(!CAR.gameOver){

                    if(CAR.gameOver){return}
                    CAR.setPosX = xpos;
                    CAR.setPosY = ypos;
                }else{

                    xPos = joyPosition.x;
                    yPos = joyPosition.y;
                }
            }else{
                xPos = joyPosition.x;
                yPos = joyPosition.y;
            }
            joy.setPosition(xPos, yPos);
        };
    CONTROLL.mouseListener = false;
    CONTROLL.render = function(){
        draw();
    };
    CONTROLL.init = function(){
        initJoystick();
        mouseEvent();
    };
})(window);