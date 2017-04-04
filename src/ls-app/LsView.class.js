/**
 * Ls展示板，包括一个点Canvas 一个线Canvas
 * @param {Element} el - 要将展板挂载的节点
 * @param {number} width - 生成展板的宽
 * @param {number} height - 生成展板的高
 * @param {number} number - 绘制点的数量
 * @param {Function} callback - {@link LsView#callback}
 * */
class LsView{
    constructor({el,width,height,number},callback){
        /**
         * 展板
         * @type {Element}
         * */
        this.viewWindow  =null;
        /**
         * 点展板
         * @type {Element}
         * */
        this.pointCanvas =null;
        /**
         * 线展板
         * @type {Element}
         * */
        this.lineCanvas  =null;

        /**
         * 当点的状态被改变时的回调函数
         * 回调时，会传入一个数组，数组中包含捕获到的用户输入的点index
         * */
        this.callback =callback;
        this.width =width;
        this.height =height;
        this.el =el;
        this.number =number;

        /**@type {LsPointManager}*/
        this.lpm =null;

        // 其他初始化工作
        this.init();

    };
    init(){
        // Element初始化
        this.viewWindow  =document.createElement('div');
        this.pointCanvas =document.createElement('canvas');
        this.lineCanvas  =document.createElement('canvas');
        this.viewWindow.className    ='ls-view';
        this.viewWindow.style.width  =this.width;
        this.viewWindow.style.height =this.height;
        this.lineCanvas.width  =this.width;
        this.lineCanvas.height =this.height;
        this.pointCanvas.width =this.width;
        this.pointCanvas.height=this.height;

        // 插入DOM
        this.viewWindow.appendChild(this.lineCanvas);
        this.viewWindow.appendChild(this.pointCanvas);
        this.el.innerHTML ='';
        this.el.appendChild(this.viewWindow);

        // 实例化
        this.lpm =new LsPointManager(this.pointCanvas,this.number);
        this.lpm.draw();


        // 绑定事件
        this.bindEvent();

    };
    bindEvent(){
        var that =this;

        // 处理事件监听逻辑
        var bindElt =document.body;
        this.viewWindow.addEventListener('touchstart',function _self(){
            bindElt.addEventListener('touchmove',trackPosition ,{passive: false});
            bindElt.addEventListener('touchend',cancelTrackPosition);
            bindElt.addEventListener('touchend',function(){
                bindElt.removeEventListener('touchmove',trackPosition);
                bindElt.removeEventListener('touchend',cancelTrackPosition);
                bindElt.removeEventListener('touchstart',_self);
            });
        });
        this.viewWindow.addEventListener('mousedown',function _self(){
            bindElt.addEventListener('mousemove',trackPosition);
            bindElt.addEventListener('mouseup',cancelTrackPosition);
            bindElt.addEventListener('mouseup',function(){
                bindElt.removeEventListener('mousemove',trackPosition);
                bindElt.removeEventListener('mouseup',cancelTrackPosition);
                bindElt.removeEventListener('mousedown',_self);
            });
        });


        function trackPosition(event){
            event.preventDefault();
            var windowPos =getElementPosition(that.viewWindow);
            var lp =null;
            if(event.touches){
                lp =new Position(
                    event.touches[0].pageX -windowPos.x,
                    event.touches[0].pageY -windowPos.y
                );
            }else{
                lp =new Position(
                    event.clientX -windowPos.x +window.pageXOffset,
                    event.clientY -windowPos.y +window.pageYOffset
                );
            }
            that.lpm.dispatch(lp);
            LsView.drawLine(that.lineCanvas,[...that.lpm.activateNode,lp]);
        };
        function cancelTrackPosition(event){
            //如果没有任何选中的点，就当事情没有发生过好了
            if(that.lpm.activateNode.length===0){
                that.retry();
                return;
            }
            LsView.drawLine(that.lineCanvas ,that.lpm.activateNode);
            that.callback(that.lpm.activateNode.map(item=>item.index));
        };
    };

    /**将展板呈现错误状态*/
    showError(){
        this.lpm.draw(LsView.ERROR_COLOR);
        LsView.drawLine(this.lineCanvas);
    };
    /**清除展板恢复到初始状态*/
    clearView(){
        this.lpm.clear();
        this.lpm.draw();
        LsView.drawLine(this.lineCanvas);
    };
    /**再次监听展板事件，捕获用户输入的点*/
    retry(){
        this.lpm.clear();
        this.bindEvent();
    };
};
/**将展板呈现错误状态时将点绘制的颜色*/
LsView.ERROR_COLOR ='#dd3b33';
/**
 * 在Canvas上划线
 * @param {HTMLCanvasElement} canvas - canvas节点
 * @param {Position[]} posArray - 要画的线的路径
 * @return {boolean} 是否有线画上
 * */
LsView.drawLine =function(canvas ,posArray){

    var ctx =canvas.getContext('2d');

    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);

    if(!posArray ||posArray.length<2) return false;

    ctx.beginPath();
    ctx.strokeStyle=LsPoint.activatedColor;
    ctx.lineWidth =3;
    ctx.moveTo(posArray[0].x,posArray[0].y);
    for(let pos of posArray.slice(1)){
        ctx.lineTo(pos.x,pos.y);
    }
    ctx.stroke();

    return true;
};

