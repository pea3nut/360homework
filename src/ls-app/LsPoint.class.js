/**
 * 一个可以画在Canvas上的点
 * @param {number} radius - 点的半径
 * @param {number} x - 点的X轴坐标
 * @param {number} y - 点的Y轴坐标
 * @param {number} index - 点的索引
 * */
class LsPoint extends Position{
    constructor({radius,x,y,index}){
        super(x,y);
        /**点的绘制半径*/
        this.radius =radius;
        /**
         * 点的触发半径
         * @type {number}
         * @default LsPoint#radius*0.7
         * */
        this.triggerRadius =radius*0.7;
        this.index =index;

        /**
         * 节点状态是否被选中
         * @type {boolean}
         * */
        this.isActivated =false;

    };
    /**
     * 把点画在Canvas上
     * @param {CanvasRenderingContext2D} context - canvas 2D上下文
     * @param {string} coreColor - 点的核心颜色，格式符合CSS3颜色值标准
     * */
    draw(context ,coreColor){
        // 颜色值
        coreColor =coreColor ||(this.isActivated?LsPoint.activatedColor:'#464a4c');
        var bgColor ='rgba(36,36,36,0.3)',
            borderColor =coreColor,
            shadowColor =bgColor
        ;
        // 其他外观选项
        var coreRadius =this.radius/4+2,
            lineWidth  =this.radius/15+1,
            radius     =this.radius,
            shadowBlur =3
        ;


        // 开始画
        context.beginPath();//画整体背景
        context.fillStyle=bgColor;
        context.arc(this.x,this.y,radius,0,7);
        context.fill();
        context.shadowBlur =shadowBlur;//阴影
        context.shadowColor =shadowColor;
        context.beginPath();//画边框线
        context.lineWidth =lineWidth;
        context.strokeStyle=borderColor;
        context.arc(this.x,this.y,radius,0,7);
        context.stroke();
        context.beginPath();//画中间的小原点
        context.fillStyle=coreColor;
        context.arc(this.x,this.y,coreRadius,0,7);
        context.fill();
    };
    /**
     * @return {boolean} 状态是否改变
     * */
    dispatch(lpA,lbB){
        if(this.isActivated)return false;


        //点a 线的起点，上一个链接的节点
        //点b 鼠标所在
        //点x 当前点的坐标
        //计算的是点x到ab的距离
        var a2b =count2PointDistance(lpA,lbB);
        var x2a =count2PointDistance(this,lpA);
        var x2b =count2PointDistance(this,lbB);//鼠标到目标点的距离

        //此处有魔法，不要乱动
        var distance =null;
        if(Math.max(a2b,x2a,x2b)===a2b){
            distance =countTriangleHign(a2b,x2a,x2b);
        }else{
            distance =x2b;
        };


        if(distance <this.triggerRadius){
            this.isActivated =true;
            return true;
        };
        return false;
    };
}
/**
 * 当点被激活时绘制的颜色
 * @type {string} 格式符合CSS3颜色值标准
 * */
LsPoint.activatedColor ='#00b6f7';