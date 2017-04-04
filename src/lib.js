/**坐标接口*/
class Position{
    constructor(x,y){
        this.x=x;
        this.y=y;
    };
};
/**
 * 算出元素左上角相对于整张网页的坐标
 * @see http://javascript.ruanyifeng.com/dom/element.html#toc12
 * */
function getElementPosition(e) {
    var x = 0;
    var y = 0;
    while (e !== null)  {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return new Position(x,y);
};
/**
 * 计算三角形的高
 * @param {number} x - 要高计算的边
 * @param {number} a - 另外一条边
 * @param {number} b - 另外一条边
 * */
function countTriangleHign(x,a,b){
    var p,S,h;
    // 海伦－秦九韶公式 求面积
    p=(x+a+b)/2;
    S=Math.sqrt(p*(p-x)*(p-a)*(p-b));
    h=2*S/x;
    return h;
};
/**
 * 计算2个坐标的距离
 * @param {Position} a
 * @param {Position} b
 * */
function count2PointDistance(a,b){
    return Math.sqrt(
        Math.pow(a.x-b.x,2)
        +Math.pow(a.y-b.y,2)
    )
};
