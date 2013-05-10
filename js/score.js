(function(window, undefined) {
    "use strict";
    var document = window.document,
        SCORE = window.SCORE = window.SCORE || {};

    var tables = null;
    SCORE.currTable = null;
    var tableNum = 30;
    var tableCont = {};
    var lineDOM = null;
    var lineStyle = null;

    /* add tables to content */
    var addTablevarible = function(){

            tables = document.querySelector('#tableShow');
            /* lengt érték statikus 30 */
            for(var i = 1; i<=tableNum; i++){
                tableCont[i] = CAR.assetContent[i]
            }
            tableHandler();
            SCORE.progressLine.init();
    },

    /* add new table - remove old table*/
    tableHandler = function(){
        var randomNum = parseInt(Math.random()*tableNum);
        if(randomNum === 0 || randomNum === tableNum+1){
            tableHandler();
            return;
        }
        tables.children[0].src = tableCont[randomNum];
        SCORE.currTable = randomNum;
    };
    SCORE.progressLine = {

        linewidth:null,
        num:0,
        init: function(){

            lineDOM =  document.querySelector('#lineFrame').children[2];
            lineStyle = "translate3d("+12+"px, 0px, 0px)";
            lineDOM.style.webkitTransform = lineDOM.style.MozTransform = lineDOM.style.OTransform = lineDOM.style.transform = lineStyle;
            this.linewidth = document.querySelector('#lineFrame').offsetWidth;
        },
        progress:function(xpos){
            var xposNum = ((xpos /this.linewidth)*this.linewidth)+12;
            if(xposNum<this.linewidth-15){
                lineStyle = "translate3d("+xposNum+"px, 0px, 0px)";
                lineDOM.style.webkitTransform = lineDOM.style.MozTransform = lineDOM.style.OTransform = lineDOM.style.transform = lineStyle ;
            }else{
                CAR.gameOver = true;
            }
        },
        reset:function(){

        }
    };

    SCORE.scoreAdd = {
        num:0,
        timeTitl:document.querySelector('#score').children[0],
        add:function(){
            this.num++;
            this.timeTitl.innerHTML = this.num;
        },
        remove:function(){
            this.num--;
            if(this.num<0){
                this.num = 0;
            }
            this.timeTitl.innerHTML = this.num;
        },
        reset:function(){
            this.num = 0;
            this.timeTitl.innerHTML = this.num;
        }
    };
    SCORE.tableUpListener = function(pickID){
        if(SCORE.currTable === pickID){
            tableHandler();
            CAR.tablehandler.resetListener();
            if(!CAR.gameOver){
                CAR.gameSpeedAdd();
            }
            SCORE.scoreAdd.add();
        }else{
            if(!CAR.gameOver){
                CAR.gameSpeedRemove();
            }
            SCORE.scoreAdd.remove();
        }
    };
    SCORE.init = function(){
        addTablevarible();
    };
})(window);