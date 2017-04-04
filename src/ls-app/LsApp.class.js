/**
 * Ls应用，包括一个标题，一段提示文本，一个手势捕获区
 * @param {Element} el - 应用挂载的节点
 * @param {number} [number] - 捕获区的点的数量
 * @param {number} width - 捕获区的宽高
 * */
class LsApp{
    constructor({el,number,width}){
        this.el =el;
        this.width =width;
        this.number =number||LsApp.POINT_NUMBER;

        this.titleElt =null;
        this.textElt  =null;

        /**@type {LsView}*/
        this.lsView =null;

        this.init();
    };
    init(){
        this.el.innerHTML =`
            <div class="sign-text">
                <h2 class="st-title">设置手势密码</h2>
                <p class="st-text">请绘制至少5个点来作为密码</p>
            </div>
            <main class="ls-app"></main>
        `;
        this.titleElt =this.el.querySelector('.sign-text .st-title');
        this.textElt  =this.el.querySelector('.sign-text .st-text');
        this.lsView =new LsView({
            el    :this.el.querySelector('.ls-app'),
            number:this.number,
            width :this.width,
            height:this.width,
        });
    };
    /**
     * 当捕获结束的回调函数
     * {@link LsView#callback}
     * */
    set callback(fn){
        this.lsView.callback=fn;
    };
    get callback(){
        return this.lsView.callback;
    };
    /**再次捕获用户输入的点*/
    retry(){
        this.lsView.retry();
    };
    /**清除捕获区的状态*/
    clear(){
        this.lsView.clearView();
    };
    /**设置标题文本*/
    setTitle(text){
        this.titleElt.innerHTML =text;
    };
    /**设置提示文本*/
    setMsg(text){
        this.textElt.className ='st-text-normal';
        this.textElt.innerHTML =text;
    }
    /**设置提示文本，并将展示状态变为“出现错误”状态*/
    showError(text){
        this.textElt.className ='st-text-error';
        this.textElt.innerHTML =text;
        this.lsView.showError();
    };
    /**设置提示文本，并将展示状态变为“成功”状态*/
    showSuccess(text){
        this.textElt.className ='st-text-success';
        this.textElt.innerHTML =text;
    };
};
/**点的默认绘制数量*/
LsApp.POINT_NUMBER =3;