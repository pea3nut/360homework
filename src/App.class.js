/**主应用*/
class App{
    /**
     * @param {string|Element} el - 挂载App的HTML节点
     * */
    constructor({el}){
        this.el= typeof el==='string'
            ?document.querySelector(el)
            :el
        ;
        this.el.innerHTML =`
            <nav id="nav">
                <a href="#!/set">设置密码</a>
                <a href="#!/verify">验证密码</a>
                <a href="#!/option">管理</a>
            </nav>
            <main id="router-view"></main>
        `;

        // 激活路由
        var routerView =this.el.querySelector('#router-view');
        window.addEventListener("hashchange" ,()=>App.router(App.routes ,routerView));
        App.router(App.routes ,routerView);
    };
};
/**
 * 路由器
 * @param {Object} routes - 路由表
 * @param {Element} el - 挂载路由的HTML节点
 * */
App.router =function(routes,el){
    // 路由
    if(location.hash && routes[location.hash.substr(2)]){
        routes[location.hash.substr(2)](el);
    }else{
        routes._default(el);
    };
    // 点亮匹配的a标签
    Array.from(document.getElementsByTagName('a')).forEach(elt=>{
        if(elt.href===document.URL){
            elt.classList.add('router-active');
        }else{
            elt.classList.remove('router-active');
        }
    });
};
/**
 * 路由表，或者说是Controller
 * 由于没有MVVM的自动绑定，所有写的很厚
 * */
App.routes ={
    /**
     * 当所有路由不匹配执行的控制器
     * @param {Element} el - 挂载路由的HTML节点
     * */
    _default(el){
        if(localStorage.getItem(App.PASSWD_KEY)){
            location.hash='!/verify';
        }else{
            location.hash='!/set';
        };
    },
    '/set'(el){

        var state ='ready';
        var passwd =null;
        var app =new LsApp({
            number:localStorage.getItem(App.POINT_NUMBER_KEY),
            el,
            width:320,
        });

        app.setTitle('密码录入');
        app.setMsg('请录入你的手势密码');
        app.callback =function(indexArray){
            if(indexArray.length<5){
                app.showError('绘制点数不能少于5个');
                app.retry();
                return;
            };
            switch(state){
                case 'ready':
                    state ='ensure';
                    passwd =indexArray.join('-');
                    app.setTitle('确认输入');
                    app.setMsg('请再次输入');
                    app.clear();
                    app.retry();
                    break;
                case 'ensure':
                    state ='ready';
                    if(passwd===indexArray.join('-')){
                        localStorage.setItem(App.PASSWD_KEY ,passwd);
                        localStorage.setItem(App.PASSWD_POINT_NUMBER_KEY ,app.number);
                        app.setTitle('设置成功');
                        app.showSuccess('你可以点击上方的“验证密码”来测试');
                        app.clear();
                        app.retry();
                    }else{
                        app.setTitle('密码录入');
                        app.showError('两次输入不一致，请重新录入');
                        app.retry();
                    }
                    break;
            };
        };
    },
    '/verify'(el){
        var app =new LsApp({
            number:localStorage.getItem(App.PASSWD_POINT_NUMBER_KEY),
            el,
            width:320,
        });
        if(!localStorage.getItem(App.PASSWD_KEY)){
            app.setTitle('无法验证');
            app.showError('请先设置手势密码');
            app.callback=function(){
                app.showError('请先设置手势密码');
                app.retry();
            };
            return;
        };
        app.setTitle('验证密码');
        app.setMsg('验证你曾经保存过的密码');


        const passwd =localStorage.getItem(App.PASSWD_KEY);
        app.lsView.callback =function(indexArray){
            if(passwd!==indexArray.join('-')){
                app.setTitle('验证密码');
                app.showError('密码不正确');
                app.retry();
            }else{
                app.setTitle('通过');
                app.showSuccess('你通过了密码验证');
                app.clear();
                app.retry();
            }
        }
    },
    '/option'(el){
        // 为了模板输出方便，定义一些常量
        const passwd =localStorage.getItem(App.PASSWD_KEY);
        const pointNumber =localStorage.getItem(App.POINT_NUMBER_KEY) ||LsApp.POINT_NUMBER;
        // 渲染模板
        el.innerHTML =`
            <table class="app-option">
                <tr>
                    <td>点数：</td>
                    <td class="ao-number">
                        <input value="${pointNumber}" class="aon-input" type="number" />
                    </td>
                </tr><tr>
                    <td>存储的密码：</td>
                    <td class="ao-passwd">
                        ${passwd||'未设置'} 
                        ${passwd?`<button class="aop-clear">清除</button>`:''}
                    </td>
                </tr>
            </table>
        `;
        // 绑定事件
        el.querySelector('.aon-input').addEventListener('input',function(){
            if(!Number.isNaN(this.value)){
                localStorage.setItem(App.POINT_NUMBER_KEY ,this.value)
            }
        });
        var clearBtn =el.querySelector('.aop-clear');
        if(clearBtn) clearBtn.addEventListener('click',function(){
            localStorage.removeItem(App.PASSWD_KEY);
            localStorage.removeItem(App.PASSWD_POINT_NUMBER_KEY);
            el.querySelector('.ao-passwd').innerHTML ='已清除';
        });
    },
};

// 存取localStorage的KEY
App.PASSWD_KEY ='ls_passwd';
App.PASSWD_POINT_NUMBER_KEY ='ls_passwd_point_number';
App.POINT_NUMBER_KEY ='ls_point_number';

