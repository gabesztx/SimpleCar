(function(window, undefined) {
    "use strict";
    var document = window.document,
        /* global path */
        CAR = window.CAR = window.CAR || {},
        /* check browsers */
        checker = {iphone: navigator.userAgent.match(/(iPhone|iPod|iPad)/),
            android: navigator.userAgent.match(/Android/),
            mozilla: navigator.userAgent.match(/Mozilla/)};
        var
        /* mouse-touch start event */
        mouseStartEvent = 'ontouchstart' in window ? 'touchstart' : 'mousedown',
        /* mouse-touch start end */
        mouseEndEvent = 'ontouchstart' in window ? 'touchend' : 'mouseup';
        /* canvas images content */
        CAR.canvasImages = {};
        CAR.canvasImagesTable = {};

    var wood1,wood2,cserje,bolya,table,sky1,sky2,carX,carY,anim,domb,mount;
    var wood1 = wood2 = cserje = bolya = table = sky1 = sky2 = carX = carY = anim = domb = mount = null;
    var carCurrentPositions = {x:20,y:170};
    var gameSpeed = 0; /* global game speed */

    /* constructor Main */
    CAR.carX = carX;
    CAR.carY = carY;
    CAR.setPosX = 0;
    CAR.setPosY = 0;
    CAR.carCurrentPositions = carCurrentPositions;
    CAR.hitRoad = true;
    CAR.init = false;
    /* init canvasElement */
    var canvasElement={
                canvasStage:null,
                canvasLayer:null,
                canvasGoupWay:null,
                canvasGoupCar:null,
                canvasCarWheel1:null,
                canvasCarWheel2:null,
                canvasGoupWood:null,
                canvasCserje:null,
                canvasDomb:null,
                canvasMount:null,
                bolya1Group:null,
                bolya2Group:null,
                bolya3Group:null,
        canvasinit:function(){
            CAR.init = true;
            /* stage */
            canvasElement.canvasStage = new Kinetic.Stage({
                container: "canvascont",
                width: 800,
                height:460
            });
            /* layer group */
            canvasElement.canvasLayer = new Kinetic.Layer();
            canvasElement.canvasGoupWay = new Kinetic.Group({y:171});
            canvasElement.canvasGoupCar = new Kinetic.Group({x:20,y:170});
            canvasElement.canvasGoupWood = new Kinetic.Group({x:0,y:0});
            canvasElement.canvasCserje = new Kinetic.Group({x:0,y:0});
            canvasElement.canvasDomb = new Kinetic.Group({x:0,y:0});
            canvasElement.canvasMount = new Kinetic.Group({x:0,y:0});
            canvasElement.canvasGoupSky = new Kinetic.Group({x:0,y:0});

            canvasElement.bolya1Group = new Kinetic.Group({x:0,y:0});
            canvasElement.bolya2Group = new Kinetic.Group({x:0,y:0});
            canvasElement.bolya3Group = new Kinetic.Group({x:0,y:0});

            CAR.carX = null;
            CAR.carY = null;
            CAR.hitRoad = true;
            putCanvasAsset();
            CAR.init = true;
        },
        /* reset canvas and varible */
        resetcanvas:function(){
            canvasElement.canvasStage.remove();
            canvasElement.canvasLayer = null;
            canvasElement.canvasGoupWay = null;
            canvasElement.canvasGoupCar = null;
            canvasElement.canvasGoupWood = null;
            canvasElement.canvasGoupSky = null;
            canvasElement.canvasCserje = null;
            canvasElement.canvasDomb = null;
            canvasElement.canvasMount = null;
            canvasElement.bolya1Group = null;
            canvasElement.bolya2Group = null;
            canvasElement.bolya3Group = null;

            var wood1 = wood2 = cserje = bolya = table = sky1 = sky2 = carX = carY = anim = domb = mount = null,
                carX = 20,
                carY = 170;

            CAR.breakCar = false;
            CAR.goCar = false;
            CAR.carCurrentPositions = {x:20,y:170};
            canvasElement.canvasinit();
        }
    };
    CAR.canvasElement  = canvasElement;
    CAR.gameSpeedAdd = function(){
        gameSpeed++;

         if(gameSpeed>12){
             gameSpeed = 12;
         }
    };
    CAR.gameSpeedRemove = function(){
        gameSpeed--;
        if(gameSpeed<4){
            gameSpeed = 4;
        }
    };
    var putCanvasAsset = function(){
                /* set and clone after param property */
                var cloneFu = CAR.canvasImages['fu'].clone({x:0,y:140});
                wood1 = CAR.canvasImages['fa1'];
                wood2 = CAR.canvasImages['fa2'];
                cserje = CAR.canvasImages['cserje'];
                sky1 = CAR.canvasImages['felho1'];
                sky2 = CAR.canvasImages['felho2'];
                bolya = CAR.canvasImages['buoy'];
                domb = CAR.canvasImages['domb'];
                mount = CAR.canvasImages['hegy'];
                canvasElement.canvasCarWheel1 = CAR.canvasImages['wheel'];
                canvasElement.canvasCarWheel2 = CAR.canvasImages['wheel'].clone({x:152,y:51});
                canvasElement.canvasCarWheel1.setOffset(14,14);
                canvasElement.canvasCarWheel2.setOffset(14,14);

            /* set positions */
            CAR.canvasImages['carzone'].setY(50);
            CAR.canvasImages['fu'].setY(-15);
            canvasElement.canvasCarWheel1.setPosition(38,51);
            CAR.canvasImages['fa1'].setY(22);
            canvasElement.canvasGoupWood.setY(48);
            canvasElement.canvasCserje.setY(135);
            canvasElement.canvasDomb.setY(102);
            canvasElement.canvasMount.setY(85);
            mount.setX(400);
            /* add canvas element */
            canvasElement.canvasLayer.add(CAR.canvasImages['sky']);
            canvasElement.canvasGoupWay
                .add(CAR.canvasImages['way'])          //  way to group
                .add(CAR.canvasImages['carzone'])      //  carzone to group
                .add(CAR.canvasImages['fu'])           //  fu to group
                .add(cloneFu);                         //  clone fu to group
            /* car */
            canvasElement.canvasGoupCar
                .add(CAR.canvasImages['car'])          //  car to group
                .add(CAR.canvasImages['wheel'])        //  car wheel fu to group
                .add(canvasElement.canvasCarWheel2);   //  car wheel fu to group
            /* mount */
            canvasElement.canvasMount
                .add(mount);
            /* domb */
            canvasElement.canvasDomb
                .add(domb);
            /* cserje */
            canvasElement.canvasCserje
                .add(cserje);
             /* wood */
            canvasElement.canvasGoupWood
                .add(wood1)                            //  car wheel1 fu to group
                .add(wood2);                           //  car wheel2 fu to group
            /* sky */
            canvasElement.canvasGoupSky
                .add(sky1)                             //  car wheel1 fu to group
                .add(sky2);                            //  car wheel2 fu to group
            /* layer */
            canvasElement.canvasLayer
                .add(canvasElement.canvasGoupSky)      //  sky to layer
                .add(canvasElement.canvasMount)
                .add(canvasElement.canvasDomb)        //  cserjegroup to layer
                .add(canvasElement.canvasGoupWood)     //  woodgroup to layer
                .add(canvasElement.canvasCserje)        //  cserjegroup to layer
                .add(canvasElement.canvasGoupWay)      //  waygroup to layer
                .add(canvasElement.bolya1Group)
                .add(canvasElement.canvasGoupCar)
                .add(canvasElement.bolya2Group)
                .add(canvasElement.bolya3Group);

            canvasElement.canvasStage.add(canvasElement.canvasLayer);
            CONTROLL.init();
            render(); // start render
            SCORE.init();
            woodshandler.init();
            skyhandler.init();
            cserjehandler.init();
            canvasElement.canvasLayer.draw();
        },
        /* sky handler scope  */
        skyhandler = {
            skyNum:0,
            skycont:{},
            init:function(){
                sky1.setX(500);
                sky2.setX(50);
                this.skycont[this.skyNum] =  sky1;
                this.skycont[this.skyNum].id = this.skyNum;
                this.skyNum++;
                this.skycont[this.skyNum] =  sky2;
                this.skycont[this.skyNum].id = this.skyNum;
            },
            add:function(){
                this.skyNum++;
                (function(id, scope){
                    var stepID = parseInt(Math.random()*2); // wich one
                    var addObj;
                    if(stepID === 1){
                        addObj = sky1.clone({x:800});
                    }else{
                        addObj = sky2.clone({x:800});
                    }
                    canvasElement.canvasGoupSky.add(addObj);
                    scope.skycont[scope.skyNum] =  addObj;
                    scope.skycont[scope.skyNum].id = id;
                })(this.skyNum,this);
            },
            remove:function(currObj){
                this.skycont[currObj.id].remove();
                delete this.skycont[currObj.id];
            },
            reset:function(){
                this.skycont = {};
                this.skyNum = 0;
            }
        },
        /* cserje handler scope  */
        cserjehandler = {
            cserjeNum:0,
            cserjecont:{},
            currID:null,
            prevID:null,
            init:function(){
                cserje.setX(700);
                this.cserjecont[this.cserjeNum] =  cserje;
                this.cserjecont[this.cserjeNum].id = this.cserjeNum;
                this.cserjeNum++;
            },
            add:function(){
                this.cserjeNum++;
                (function(id, scope){
                    var addObj = cserje.clone({x:800});
                    canvasElement.canvasCserje.add(addObj);
                    scope.cserjecont[scope.cserjeNum] =  addObj;
                    scope.cserjecont[scope.cserjeNum].id = id;
                })(this.cserjeNum,this);
            },
            remove:function(currObj){
                this.currID = currObj.id;
                this.cserjecont[currObj.id].remove();
                delete this.cserjecont[currObj.id];
                this.prevID = this.currID;
            },
            reset:function(){
                this.cserjecont = {};
                this.cserjeNum = 0;
            }
        },
        /* woods handler scope  */
        woodshandler = {
            woodNum:0,
            woodcont:{},
            currID:null,
            prevID:null,
            init:function(){
                wood1.setX(750);
                wood2.setX(700);
                this.woodcont[this.woodNum] =  wood1;
                this.woodcont[this.woodNum].id = this.woodNum;
                this.woodNum++;
                this.woodcont[this.woodNum] =  wood2;
                this.woodcont[this.woodNum].id = this.woodNum;
            },
            add:function(){
                this.woodNum++;
                (function(id, scope){
                    var stepID = parseInt(Math.random()*2); // wich one
                    var addObj;
                    if(stepID === 1){
                        addObj = wood1.clone({x:800});
                    }else{
                        addObj = wood2.clone({x:800});
                    }
                    canvasElement.canvasGoupWood.add(addObj);
                    scope.woodcont[scope.woodNum] =  addObj;
                    scope.woodcont[scope.woodNum].id = id;
                })(this.woodNum,this);
            },
            remove:function(currObj){
                this.currID = currObj.id;
                this.woodcont[currObj.id].remove();
                delete this.woodcont[currObj.id];
                this.prevID = this.currID
            },
            reset:function(){
                this.woodcont = {};
                this.woodNum = 0;
            }
        },
        /* table handler scope  */
        tablehandler = {
            tableCloneListener:0,
            tableNum:0,
            tableCont:{},
            init:function(){
                this.tableNum++;
                this.tableCont[this.tableNum] =  table;
                this.tableCont[this.tableNum].id = this.tableNum;
            },
            add:function(){
                this.tableNum++;
                (function(id, scope){
                    var tableindex = parseInt(Math.random()*30,10);
                    if (tableindex === 0){tableindex = 1}
                    /* első kettő random, a harmadik a current tábla */
                    if(scope.tableCloneListener === 2){
                        tableindex =  SCORE.currTable;
                        scope.resetListener();
                    }
                    scope.tableCloneListener++;
                    for (var key in tablehandler.tableCont){
                        if(tablehandler.tableCont[key].currID === tableindex){
                            console.log('BUG kikerülése');
                            return;
                        }
                    }
                    var randomIndex = parseInt(Math.random()*3, 10);
                    var addObj = CAR.canvasImages[tableindex];
                    addObj.setScale(0.8);

                    var yNum = null;
                    if(randomIndex === 0){
                        yNum = 172;
                        addObj.setPosition(800, yNum);
                        addObj.deep = 1;
                        canvasElement.bolya1Group.add(addObj);
                    }else if(randomIndex === 1){
                        yNum = 223;
                        addObj.setPosition(800, yNum);
                        addObj.deep = 2;
                        canvasElement.bolya2Group.add(addObj);
                    }else if(randomIndex === 2){
                        yNum = 270;
                        addObj.setPosition(800, yNum);
                        addObj.deep = 3;
                        canvasElement.bolya3Group.add(addObj);
                    }
                    scope.tableCont[scope.tableNum] =  addObj;
                    scope.tableCont[scope.tableNum].id = id;
                    scope.tableCont[scope.tableNum].currID = tableindex;

                })(this.tableNum,this);
            },
            remove:function(currObj){
                this.tableCont[currObj.id].remove();
                delete this.tableCont[currObj.id];
            },
            resetListener:function(){
                this.tableCloneListener = 0;
            },
            reset:function(){
                this.tableCloneListener = 0;
                this.tableNum = 0;
                this.tableCont = {};
            }
        };
        CAR.tablehandler = tablehandler;  // registration to global scope
        /* bolya handler scope  */

        var bolyahandler = {
            bolyaNum:0,
            bolyaCont:{},
            init:function(){
                this.bolyaNum++;
                this.bolyaCont[this.bolyaNum] =  bolya;
                this.bolyaCont[this.bolyaNum].id = this.bolyaNum;
            },
            add:function(){
                this.bolyaNum++;
                (function(id, scope){
                    var addObj = null;
                    var randomIndex = parseInt(Math.random()*3, 10);
                    var yNum = null;
                    if(randomIndex === 0){
                        yNum = 172;
                        addObj = bolya.clone({x:800,y:yNum});
                        addObj.deep = 1;
                        canvasElement.bolya1Group.add(addObj);
                    }else if(randomIndex === 1){
                        yNum = 223;
                        addObj = bolya.clone({x:800,y:yNum});
                        addObj.deep = 2;
                        canvasElement.bolya2Group.add(addObj);
                    }else if(randomIndex === 2){
                        yNum = 270;
                        addObj = bolya.clone({x:800,y:yNum});
                        addObj.deep = 3;
                        canvasElement.bolya3Group.add(addObj);
                    }
                    scope.bolyaCont[scope.bolyaNum] =  addObj;
                    scope.bolyaCont[scope.bolyaNum].id = id;

                })(this.bolyaNum,this);
            },
            remove:function(currObj){
                this.bolyaCont[currObj.id].remove();
                delete this.bolyaCont[currObj.id];
            },
            reset:function(){
                this.bolyaCont = {};
            }
        },
        /* set render*/
        render = function(){
            CAR.breakCar = false;
            CAR.goCar = false;
            CAR.gameOver = false;
            var woodListener = true;
            var cserjeListener = true;
            var bolyaListener = true;
            var tableListener = true;
            var zIndexListener = true;
            var skyListener = true;
            var timeListener = true;
            var carX = CAR.carCurrentPositions.x;
            var carY = CAR.carCurrentPositions.y;
            var mainRender = 0;
            var progSec = 0;
            var tableSec = 0;
            var bolyaSec = 0;
            var woodSec = 0;
            var cserjeSec = 0;
            var skySec = 0;
            var speedX = 0,
                way = canvasElement.canvasGoupWay,
                timeDOm = document.querySelector("#time");

                /* animation render */
            anim = new Kinetic.Animation(function(frame) {
                /* config paralax depth */
                mainRender = frame.time/1000;
                        var speed1 = gameSpeed,
                            speed2 = speed1/1.1,
                            speed3 = speed2 /1.3,
                            speed4 = speed3/4,
                            speed5 = speed4/3,
                            speed6 = speed5/4,
                            wheelspeed = gameSpeed/40; // wheels speed
                        /* timer progress */
                        if(parseInt(mainRender,10)%2 === 1 && timeListener){
                            //if(CAR.gameOver){return};
                            CAR.timeinterval();
                            timeListener = false;
                        }
                        if(parseInt(mainRender,10)%2 === 0 && !timeListener){
                            //if(CAR.gameOver){return};
                            CAR.timeinterval();
                            timeListener = true
                        }
                        /* controll proegross line */
                        progSec += gameSpeed/100; // 500 progress speed - game run speed
                        if(!CAR.gameOver){
                            SCORE.progressLine.progress(progSec);
                        }
                        /* set CAR positions */
                        if(CONTROLL.mouseListener){
                            /*
                             road rect hit (dinamikus értékek hozzá adása)
                            */
                            if(carY<200 && zIndexListener){
                                canvasElement.canvasGoupCar.setZIndex(8);
                                zIndexListener = false;

                            }else if(carY>200 && !zIndexListener){
                                //console.log('plusz');
                                canvasElement.canvasGoupCar.setZIndex(10);
                                zIndexListener = true;
                            }
                            carX+=CAR.setPosX;
                            carY+=CAR.setPosY;
                            if(carX>0 && carX<610 && carY<251 && carY>135){
                                /* do something */
                            }else{

                                if(carY>250){
                                    carY = 250;
                                }
                                if(carY<137){
                                    carY = 137;
                                }
                                if(carX<1){
                                    carX = 1;
                                }
                                if(carX>610){
                                    carX = 610;
                                }

                            }
                            canvasElement.canvasGoupCar.setX(carX);
                            canvasElement.canvasGoupCar.setY(carY);
                        }

                        /* table sec add */
                        tableSec += speed3/100;
                        //var tableSec = (frame.time/1000)*speed4;
                        var tableTime = parseInt(tableSec%5);
                        if(tableTime === 4 && tableListener && !CAR.gameOver){
                            tableListener = false;
                            var delayTime1 = parseInt(Math.random()*1000, 10)+1000;
                            setTimeout(function(){
                                tablehandler.add();
                            },delayTime1);
                        }
                        if(tableTime === 0){tableListener = true;}

                        /* table move and remove and HIT */
                        for (var key in tablehandler.tableCont){
                            var xmove = tablehandler.tableCont[key].getX()-speed1,
                                xpos = tablehandler.tableCont[key].getX()+tablehandler.tableCont[key].getWidth();

                            if(xpos<0){
                                tablehandler.remove(tablehandler.tableCont[key]);
                            }else{
                                tablehandler.tableCont[key].setX(xmove);

                                /*  tabla 1 group HIT */
                                if(tablehandler.tableCont[key] !== undefined){
                                    if(carX<xpos && carX+200>xpos && carY>0 && carY<180 && tablehandler.tableCont[key].deep === 1){
                                        SCORE.tableUpListener(tablehandler.tableCont[key].currID);
                                        tablehandler.remove(tablehandler.tableCont[key]);
                                    }
                                }
                                /*  tabla 2 group HIT */
                                if(tablehandler.tableCont[key] !== undefined){
                                    if(carX<xpos && carX+200>xpos && carY>180 && carY<230 && tablehandler.tableCont[key].deep === 2){
                                        SCORE.tableUpListener(tablehandler.tableCont[key].currID);
                                        tablehandler.remove(tablehandler.tableCont[key]);
                                    }
                                }
                                /*  tabla 3 group HIT */
                                if(tablehandler.tableCont[key] !== undefined){
                                    if(carX<xpos && carX+200>xpos && carY>235 && tablehandler.tableCont[key].deep === 3){
                                       SCORE.tableUpListener(tablehandler.tableCont[key].currID);
                                        tablehandler.remove(tablehandler.tableCont[key]);
                                    }
                                }
                            }
                        }

                        /* bolya clone time */
                        //var bolyaSec = (frame.time/1000)*speed2;
                        bolyaSec += speed1 / 150;
                        //console.log(bolyaSec)
                        var bolyaTime = parseInt(bolyaSec%6);
                        if(bolyaTime === 5 && bolyaListener && !CAR.gameOver){
                            bolyaListener = false;

                            var delayTime = parseInt(Math.random()*2000, 10)+2000;

                            setTimeout(function(){
                                if(!CAR.gameOver){
                                    bolyahandler.add();
                                }

                            },delayTime);
                        }

                        if(bolyaTime === 0){bolyaListener = true;}
                        /* bolya move and remove and HIT */
                        for (var key in bolyahandler.bolyaCont){
                            var xmove = bolyahandler.bolyaCont[key].getX()-speed1,
                                xpos = bolyahandler.bolyaCont[key].getX()+bolyahandler.bolyaCont[key].getWidth();

                            if(xpos<0){
                                bolyahandler.remove(bolyahandler.bolyaCont[key]);
                            }else{
                                bolyahandler.bolyaCont[key].setX(xmove);
                                /*  bolya 1 group HIT */
                                if(bolyahandler.bolyaCont[key] !== undefined){
                                    if(carX<xpos && carX+200>xpos && carY>0 && carY<180 && bolyahandler.bolyaCont[key].deep === 1){
                                        bolyahandler.remove(bolyahandler.bolyaCont[key]);
                                        CAR.breakCar = true;
                                    }
                                }
                                /*  bolya 2 group HIT */
                                if(bolyahandler.bolyaCont[key] !== undefined){
                                    if(carX<xpos && carX+200>xpos && carY>180 && carY<230 && bolyahandler.bolyaCont[key].deep === 2){
                                        bolyahandler.remove(bolyahandler.bolyaCont[key]);
                                        CAR.breakCar = true;
                                    }
                                }
                                /*  bolya 3 group HIT */
                                if(bolyahandler.bolyaCont[key] !== undefined){
                                    if(carX<xpos && carX+200>xpos && carY>235 && bolyahandler.bolyaCont[key].deep === 3){
                                        bolyahandler.remove(bolyahandler.bolyaCont[key]);
                                        CAR.breakCar = true;
                                    }
                                }
                            }
                        }

                /* CSERJE */
                /* cserje clone time */
                //var cserjeSec = (frame.time/1000)*speed2;
                cserjeSec +=speed1/100;
                var cserjeTime = parseInt(cserjeSec%8);
                if(cserjeTime === 7 && cserjeListener){
                    cserjeListener = false;
                    var delayTime = parseInt(Math.random()*3000);
                    setTimeout(function(){
                        cserjehandler.add();
                    },delayTime);
                }
                if(cserjeTime === 0){cserjeListener = true;}
                /* cserje move and remove */
                for (var key in cserjehandler.cserjecont){
                    var xmove = cserjehandler.cserjecont[key].getX()-speed2,
                        xpos = cserjehandler.cserjecont[key].getX()+cserjehandler.cserjecont[key].getWidth();

                    if(xpos<0){
                        cserjehandler.remove(cserjehandler.cserjecont[key]);
                    }else{
                        cserjehandler.cserjecont[key].setX(xmove);
                    }
                }

                /* WOOD */
                /*   wood clone time */
                //var woodSec = (frame.time/1000)*speed2;
                woodSec +=speed3/50;
                var woodTime = parseInt(woodSec%8);
                if(woodTime === 7 && woodListener){
                    woodListener = false;
                    var delayTime = parseInt(Math.random()*6000);
                    setTimeout(function(){
                        woodshandler.add();
                    },delayTime);
                }
                if(woodTime === 0){woodListener = true;}

                /* wood move and remove */
                for (var key in woodshandler.woodcont){
                    var xmove = woodshandler.woodcont[key].getX()-speed3,
                        xpos = woodshandler.woodcont[key].getX()+woodshandler.woodcont[key].getWidth();
                    if(xpos<0){
                        woodshandler.remove(woodshandler.woodcont[key]);
                    }else{
                        woodshandler.woodcont[key].setX(xmove);
                    }
                }

                /* HILL */
                var xmove = domb.getX()-speed4,
                    xpos = domb.getX()+domb.getWidth();
                if(xpos<100){domb.setX(800);}else{domb.setX(xmove);}
                /* MOUNT */
                var xmove = mount.getX()-speed5,
                    xpos = mount.getX()+mount.getWidth();
                if(xpos<30){mount.setX(800);}else{mount.setX(xmove);}

                /* SKY clone time*/
                skySec += speed5/50;
                var skyTime = parseInt(skySec%7);
                if(skyTime === 6 && skyListener){
                    skyListener = false;
                    var delay = parseInt(Math.random()*4000);
                    setTimeout(function(){
                        skyhandler.add();
                    },delay);
                }
                if(skyTime === 0){skyListener = true;}

                /* sky move and remove */
                for (var key in skyhandler.skycont){
                    var xmove = skyhandler.skycont[key].getX()-speed6,
                        xpos = skyhandler.skycont[key].getX()+skyhandler.skycont[key].getWidth();
                    if(xpos<0){
                        skyhandler.remove(skyhandler.skycont[key]);
                    }else{
                        skyhandler.skycont[key].setX(xmove);
                    }
                }

                /* CAR wheels rotate */
                canvasElement.canvasCarWheel1.rotate(wheelspeed); // rotate wheel1
                canvasElement.canvasCarWheel2.rotate(wheelspeed); // rotate wheel2
                way.setX(speedX); // way moving
                speedX += -speed1;

                /* break car */
                if(CAR.breakCar){
                    gameSpeed -=0.5;
                    if(gameSpeed < 4){
                        gameSpeed = 4;
                        CAR.breakCar = false;
                    }
                }
                /* game over car */
                if(CAR.gameOver){
                    gameSpeed -=0.03125;
                    if(gameSpeed < 0.5){
                        gameSpeed = 0;
                        anim.stop();
                        resetGame();
                    }
                }
                /* go car */
                if(CAR.goCar){
                    gameSpeed +=0.0625;
                    if(gameSpeed === 7){
                        gameSpeed = 7;
                        CAR.goCar = false;
                    }
                }
                /* restart way moving (loop)*/
                if(speedX<-160){ // 0.5px BUG render
                    speedX = speedX+160;
                }
                /* CONTROLL SCOPE render to joystick*/
                CONTROLL.render();
            }, canvasElement.canvasLayer);
                /*
                setTimeout(function(){
                    breakCar = true;
                },5000);
                setTimeout(function(){
                 CAR.goCar = true;
                },15000);
                setTimeout(function(){
                    breakCar = true;
                },25000);
                setTimeout(function(){
                 CAR.goCar = true;
                },35000);
                */
        };

    CAR.timeinterval = null;  // registration to global scope
    CAR.resetTime = null;     // registration to global scope
    CAR.timeSec = 0;
    CAR.timeMin = 0;
    CAR.timeDiffernet = true;
    var sec = parseInt(CAR.timeSec, 10);
    var min = parseInt(CAR.timeMin, 10);

    /* add timer interval */
    var addTimer = function(){
        var timer = document.getElementById("time1").children[0];
        var pad = function(s) {
            s += "";
            return (s.length === 1) ? "0" + s : s;
        };
        var update = function(){
            sec += 1;
            if (sec === 60) {
                sec = 0;//p
                min += 1;
            }
            timer.innerHTML = min+":"+pad(sec);
            CAR.timeSec = pad(sec);
            CAR.timeMin = min;
        };
        CAR.timeinterval = function(timeVarible){
            if(CAR.gameOver){return}
            update();
        };
        CAR.resetTime = function(){
            var timer = document.getElementById("time1").children[0];
            timer.innerHTML = "0:00";
            CAR.timeSec = 0;
            CAR.timeMin = 0;
            CAR.timeDiffernet = true;
            sec = parseInt(CAR.timeSec, 10);
            min = parseInt(CAR.timeMin, 10);
        }
    };
    /* play game */
    var playGame = function(){
            var bt = document.querySelector('#startBt'),
                snap = document.querySelector('#gameStart'),
                table = document.querySelector('#tableShow');
            bt.addEventListener(mouseStartEvent, function(){
                if(!CAR.init){return;}
                snap.style.display = 'none';
                table.style.display = 'block';
                CAR.goCar = true;
                anim.start();
            }, false);
        addTimer();

    };
    var resetBt = document.querySelector('#resetBt');
    /* reset game */
    var resetGame = function(){
        document.querySelector('#tableShow').style.display = 'none';
        skyhandler.reset();
        woodshandler.reset();
        bolyahandler.reset();
        tablehandler.reset();
        document.querySelector('#newGame').style.display = 'block';
        resetBt.addEventListener(mouseStartEvent, resetScope);
    };
    /* reset scope */
    var resetScope = function(){
        resetBt.removeEventListener(mouseStartEvent, resetScope);
        document.querySelector('#newGame').style.display = 'none';
        canvasElement.resetcanvas();
        setTimeout(function(){
            document.querySelector('#tableShow').style.display = 'block';
            anim.start();
            CAR.goCar = true;
            CAR.resetTime();
            SCORE.scoreAdd.reset();
        },1000)
    };
    /* load assets */
    var loadAsset = function(){
                var /* images content */
                    assetContent = {
                        way:'asset/ut.jpg',
                        carzone:'asset/csikok.png',
                        sky:'asset/egbolt.png',
                        fu:'asset/fu1.png',
                        car:'asset/auto.png',
                        wheel:'asset/kerek.png',
                        felho1:'asset/felhok_1.png',
                        felho2:'asset/felhok_2.png',
                        fa1:'asset/Fa1.png',
                        fa2:'asset/Fa2.png',
                        arrow:'asset/nyil.png',
                        buoy:'asset/bolya.png',
                        domb:'asset/domb_big.png',
                        cserje:'asset/cserje_nagy.png',
                        hegy:'asset/mount.png',
                        1:"asset/tablak/Tabla001.png",
                        2:"asset/tablak/Tabla002.png",
                        3:"asset/tablak/Tabla003.png",
                        4:"asset/tablak/Tabla004.png",
                        5:"asset/tablak/Tabla005.png",
                        6:"asset/tablak/Tabla006.png",
                        7:"asset/tablak/Tabla007.png",
                        8:"asset/tablak/Tabla008.png",
                        9:"asset/tablak/Tabla009.png",
                        10:"asset/tablak/Tabla010.png",
                        11:"asset/tablak/Tabla011.png",
                        12:"asset/tablak/Tabla012.png",
                        13:"asset/tablak/Tabla013.png",
                        14:"asset/tablak/Tabla014.png",
                        15:"asset/tablak/Tabla015.png",
                        16:"asset/tablak/Tabla016.png",
                        17:"asset/tablak/Tabla017.png",
                        18:"asset/tablak/Tabla018.png",
                        19:"asset/tablak/Tabla019.png",
                        20:"asset/tablak/Tabla020.png",
                        21:"asset/tablak/Tabla021.png",
                        22:"asset/tablak/Tabla022.png",
                        23:"asset/tablak/Tabla023.png",
                        24:"asset/tablak/Tabla024.png",
                        25:"asset/tablak/Tabla025.png",
                        26:"asset/tablak/Tabla026.png",
                        27:"asset/tablak/Tabla027.png",
                        28:"asset/tablak/Tabla028.png",
                        29:"asset/tablak/Tabla029.png",
                        30:"asset/tablak/Tabla030.png"
                    };

                    CAR.assetContent = assetContent; // registration to global scope

                    /* load images */
                    var loadImages = function(content,complete){
                        var loadedImages = 0,
                            numImages = 0,
                            images = {};
                        for(var key in content) {numImages++;}
                        for(var key in content) {
                            images[key] = new Image();
                            images[key].onload = function() {
                                if(++loadedImages >= numImages){
                                    complete(images);
                                }
                            };
                            images[key].src = content[key];
                        }
                    },

                    /* draw canvas images and save to content object */
                    loadcomplete = function(images){
                        (function(){
                            for(var key in images) {
                                var imageObj = images[key];
                                var imageCanvas = new Kinetic.Image({
                                    image: imageObj,
                                    x: 0,
                                    y: 0
                                });
                                CAR.canvasImages[key] = imageCanvas;
                            }
                        })();

                        canvasElement.canvasinit();
                    };
                loadImages(assetContent, loadcomplete);
        };
    window.onload = function (){
        document.querySelector('#content').style.display = 'block';
        loadAsset();
        playGame();
        render();
        /*
        var is_chrome = window.chrome;
        if(is_chrome != undefined){
        }else{
            //document.querySelector('#mobilcontroll').style.display = 'block';
            //MOBIL.init();
        }
        */
       // Channel.init();
    };
})(window);