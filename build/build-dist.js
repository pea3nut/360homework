const Path =require('path');
const Join =Path.resolve;
const Fs =require('fs');
const Fse = require('fs-extra');
const Babel = require('babel-core');
const UglifyJS = require("uglify-js");
const CleanCSS =require('clean-css');
const NodeSass = require('node-sass');

// 拷贝public文件夹
Fse.removeSync(Join(__dirname,'../dist/public'));
Fse.copySync(
    Join(__dirname,'../src/public'),
    Join(__dirname,'../dist/public')
);
console.log('copy public/');

// 生成app.css
Fs.writeFileSync(
    Join(__dirname,'../dist/app.css'),
    new CleanCSS().minify(//压缩
        NodeSass.renderSync({//编译scss
            file:Join(__dirname,'../src/app.scss'),
        }).css
    ).styles
);


// 编译src/app.scss
Fs.writeFileSync(
    Join(__dirname,'../src/app.css'),
    NodeSass.renderSync({
        file:Join(__dirname,'../src/app.scss'),
    }).css
);
console.log('build src/app.css');

// 压缩、拷贝app.css
Fs.writeFileSync(
    Join(__dirname,'../dist/app.css'),
    new CleanCSS().minify(
        Fs.readFileSync(Join(__dirname,'../src/app.css'))
    ).styles
);
console.log('build dist/app.css');

// 打包app.js
Fs.writeFileSync(
    Join(__dirname,'../dist/app.js'),
    UglifyJS.minify(//压缩
        Babel.transform(//转码
            Buffer.concat([//合并
                Fs.readFileSync(Join(__dirname,'../src/lib.js')),
                Fs.readFileSync(Join(__dirname,'../src/ls-app/LsPoint.class.js')),
                Fs.readFileSync(Join(__dirname,'../src/ls-app/LsPointManager.class.js')),
                Fs.readFileSync(Join(__dirname,'../src/ls-app/LsView.class.js')),
                Fs.readFileSync(Join(__dirname,'../src/ls-app/LsApp.class.js')),
                Fs.readFileSync(Join(__dirname,'../src/App.class.js'))
            ]).toString(),
            {presets: ['es2015','stage-2']}
        ).code,
        {fromString: true}
    ).code
);
console.log('build app.js');




