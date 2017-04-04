/**
 * LsPoint点管理器
 * @param {HTMLCanvasElement} - 要画点的canvas节点
 * @number {number} [number] - 横竖要画的点的数量
 * */
class LsPointManager{
    constructor(canvas,number){
        this.number        =number;
        this.canvas        =canvas;
        this.canvasWidth   =parseInt(canvas.clientWidth);
        this.canvasHeight  =parseInt(canvas.clientHeight);
        this.canvasContext =canvas.getContext('2d');

        /**
         * 被选中的点
         * @type {LsPoint[]}
         * */
        this.activateNode  =[];


        /**
         * 圆的半径，每个点左右边距为0.618/2
         * 也就是说相邻的2个点的距离为 0.618*半径
         * 而距离视窗边缘的点距离视窗为 0.618*半径/2
         * 方程为：视口宽度=2r*number+0.618*2r*number
         * @type {number}
         * @module LsPointManager~r
         * */
        var r =this.canvasWidth/(this.number*1.618)/2;

        /**
         * 被管理的点
         * @type {LsPoint[]}
         * */
        this.points =Array(this.number*this.number).fill().map((item,index)=>{
            return new LsPoint({
                radius:r,
                x :(0.618*r+r)+ 2*(r+0.618*r) *(index%this.number),
                y :(0.618*r+r)+ 2*(r+0.618*r) *~~(index/this.number),
                index,
            });
        });


    };

    /**
     * 以某个坐标触发其管理的所有点
     * @param {Position} pos - 触发的坐标
     * @return {boolean} 是否有点改变状态
     * */
    dispatch(pos){
        var lastNode =this.activateNode[this.activateNode.length-1]||pos;
        for(let point of this.points){
            if(point.dispatch(lastNode ,pos)){
                this.activateNode.push(point);
                this.draw();
                return true;
            }
        };
        return false;
    };

    /**
     * 某种颜色绘制点，默认只将该颜色应用到选中状态的点
     * @param {string} [color] - 点绘制的颜色，格式符合CSS3颜色值标准
     * @param {boolean} [all] - 是否将该颜色应用于所有点
     * */
    draw(color ,all=false){
        this.canvasContext.clearRect(0,0,this.canvasWidth,this.canvasHeight);
        for(let point of this.points){
            if(all ||point.isActivated){
                point.draw(this.canvasContext ,color);
            }else{
                point.draw(this.canvasContext);
            };
        };
    };

    /**把所有点恢复成初始状态，此函数不会重新绘制点*/
    clear(){
        this.activateNode=[];
        this.points.forEach(point=>point.isActivated =false);
    };


};
