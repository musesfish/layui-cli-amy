const { series, parallel, task, src, dest, watch } = require('gulp'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    replace = require('gulp-replace'),
    fileInclude = require('gulp-file-include'),
    Less = require('gulp-less'),
    babel = require('gulp-babel'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    minimist = require("minimist"),
    browserSync = require("browser-sync"),
    del = require('del');

const {createProxyMiddleware} = require('http-proxy-middleware')
const revHash = require('rev-hash');
const through = require('through2')
const modifyFilename = require("modify-filename")
const pathMap = {}
const projectConfig = require('./config')
const proxySetting = require('./proxy')
const ftp = require('gulp-sftp-up4');
const SERVER_TEMP_PAHT = ".dist";

let proxy = [];
if (typeof proxySetting === 'object') {
    for(let i in proxySetting) {
        proxy.push(createProxyMiddleware( i , {target: proxySetting[i], changeOrigin: true, pathRewrite: { [`^${i}`]: `${proxySetting[i]}`} }))
    }
}

const keys = minimist(process.argv.slice(2));
let mode = keys.mode || 'dev';

// 仅复制文件路径
const filePath = [
    'web_code/**/*',
    '!web_code/**/*.less',
    '!web_code/app/**/*.html',
    '!web_code/doc/**/*'
];

const options = {
    serve: {
        out: SERVER_TEMP_PAHT,    // 输出目录
        serveType: 'devServe',  // 运行模式
    },
    dev: {
        out: 'build',
        serveType: 'devServe',
    },
    test: {
        out: 'build',
        serveType: 'testServe',
    },
    build: {
        out: 'build',
        serveType: 'prodServe',
    }
}

function relPath(base, filePath) {
	if (filePath.indexOf(base) !== 0) {
		return filePath.replace(/\\/g, '/');
	}

	var newPath = filePath.substr(base.length).replace(/\\/g, '/');

	if (newPath[0] === '/') {
		return newPath.substr(1);
	}

	return newPath;
}

function getHash(opt){
    return through.obj(function(file,enc,cb){
        const base = opt.base||"";
        const path = base + relPath(file.base, file.path);
        // 获取文件hash
        const hash = revHash(file.contents)
        modifyFilename(file.path, function(filename, extension){
            const filePath = filename+extension;
            pathMap[path] = hash
            return filePath
        })
        cb(null, file);
    }, function (cb) {
        cb()
    })
}

function replaceVersion(){
    return through.obj(function(file,enc,cb){
        const reg = /(\s[href|src]+=".+)(\.css|js)(\?[^&"]+(?:&[^&"]+)*)?(")/ig;
    
        let contents = file.contents.toString() 
        
        contents = contents.replace(reg, function (match, $1, $2, $3, $4) {
            const key = ($1.replace(/(href="|src=")/, '')+$2).replace(/(\.\.\/)+/,'/')
            let hash = '';
            for(let k in pathMap){
                if( k.trim().indexOf(key.trim())>-1 ){
                    hash = pathMap[k];
                    break;
                }
            }
            let query = !$3?
                `${!hash?'' :'?v='+hash}`:
                `${$3}${!hash?'': '&v'+hash}`;
            let str = $1+$2+query+$4;
            return str
        })

        file.contents = new Buffer.from(contents);
        this.push(file);
        
        cb();
    })
}

function cleanDist() {
    return src([options[mode].out], { read: false, allowEmpty: true })
        .pipe(clean());
}

// 移动资源
function mvDevNotDealAsset() {
    return src(filePath, { allowEmpty: true  })
        .pipe(dest(options[mode].out))
}

// 删除多余文件路径
function delFilePath() {
    return src([
        `build/static/less`,
    ], { read: false, allowEmpty: true })
        .pipe(clean());
}

// 编译less 输出压缩css
function less() {
    return src(['web_code/static/**/*.less', '!web_code/static/less/**/*.less'], { allowEmpty: true })
        .pipe(Less())
        .pipe(autoprefixer({ Browserslist: ['last 7 versions'] }))
        .pipe(cleanCSS({
            compatibility: 'ie9',
            keepSpecialComments: '*' // 保留前缀 
        }))
        .pipe(dest(`${options[mode].out}/static`))
}

// 压缩css
function cssmin() {
    return src([`${options[mode].out}/static/**/*.css`], { allowEmpty: true })
        .pipe(autoprefixer({ Browserslist: ['last 7 versions'] }))
        .pipe(cleanCSS({
            compatibility: 'ie8',
            keepSpecialComments: '*' // 保留前缀 
        }))
        .pipe(getHash({ base: `/static/` }))
        .pipe(dest(`${options[mode].out}/static`))
}

// 编译es6 压缩js
function js_main(cb) {
    return src(["web_code/app/**/*.js", '!web_code/app/lib/**/*.js'], { allowEmpty: true })
        .pipe(replace(/,([\s]*?)runServeType([\s\S]*?),/, `,runServeType: '${options[mode].serveType}',`))
        .pipe(babel({
            presets: ["@babel/env"],
            plugins: []
        }))
        .on('error', function (err) {
            console.log(err)
        })
        .pipe(gulpif(mode!=="serve", uglify()))
        .pipe(getHash({ base: `/app/`}))
        .pipe(dest(`${options[mode].out}/app`))
}

// 压缩编译ayui框架模块文件
function js_main_lay() {
    return src(["web_code/layui/**/*.js", '!web_code/layui/**/*.min.js', '!web_code/app/lib/**/*.js', '!web_code/layui/layui_exts/**/*.js'], { allowEmpty: true })
        .pipe(babel({
            presets: ["@babel/env"],
            plugins: []
        }))
        .on('error', function (err) {
            console.log(err)
        })
        .pipe(gulpif(mode!=="serve", uglify()))
        .pipe(getHash({ base: `/layui/`}))
        .pipe(dest(`${options[mode].out}/layui`))
}

// 添加版本号 压缩html文件
function html() {
    return src(['web_code/**/*.html'], {allowEmpty: true})
        .pipe(replace(/\<\s*?body.*?\>/i, function(match) {
            return `${match} <script src="/static/js/polyfill.min.js"></script>`
        }))
        .pipe(replace(/\<\/head\>/i, function(match){
            return `
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
    ${match}
    `
        }))
        .pipe(gulpif(mode==="build", fileInclude()))
        .pipe(replaceVersion())
        .pipe(htmlmin({
            removeComments: true, // 清除注释
            collapseWhitespace: true, // 压缩HTML
            minifyJS: true, // 压缩页面JS
            minifyCSS: true, // 压缩页面CSS
        }))
        .pipe(dest(`${options[mode].out}`))
}

function upload(){
    return src('./build/**')
        .pipe(gulpif( Boolean(keys.deploy) ,ftp(Object.assign(projectConfig.ftp))))
}

function browerWatch(){

    browserSync.init({
        server: {
            baseDir: SERVER_TEMP_PAHT,   // http服务的目录，这是根目录
            middleware: [...proxy],    // 使用中间件配置代理
            index: "index.html",
        },
        ghostMode: false
    })

    const out = SERVER_TEMP_PAHT

    function updateCssFile(path,statc){
        src(path, {base: 'web_code'})
            .pipe(dest(out))
        browserSync.reload()
    }

    function updateLessFile(path, statc){
        src(path, {base: 'web_code'})
            .pipe(Less())
            .pipe(autoprefixer({ Browserslist: ['last 7 versions'] }))
            .pipe(cleanCSS({
                compatibility: 'ie8',
                keepSpecialComments: '*' 
            }))
            .pipe(dest(out))
        browserSync.reload()
    }

    function updateHtmlFile(path, stats){
        src(path, {base: 'web_code'})
            .pipe(replace(/\<\s*?body.*?\>/i, function(match) {
                return `${match} <script src="/static/js/polyfill.min.js"></script>`
            }))
            .pipe(gulpif(mode==="build", fileInclude()))
            .pipe(htmlmin({
                removeComments: true, // 清除注释
                collapseWhitespace: false, // 压缩HTML
                minifyJS: false, // 压缩页面JS
                minifyCSS: false, // 压缩页面CSS
            }))
            .pipe(dest(out))
        browserSync.reload()
    }

    function updateLayuiJs(path, stats){
        src(path, {base: 'web_code'})
            .pipe(dest(out))
        browserSync.reload()
    }

    function updateJSFile(path, stats){
        src(path, {base: 'web_code'})
            .pipe(babel({
                presets: ["@babel/env"],
                plugins: []
            }))
            .on('error', function (err) {
                console.log(err)
            })
            .pipe(dest(out))
        browserSync.reload()
    }
    
    function updateStaticFile(path, stats){
        src(path, {base: 'web_code'})
            .pipe(dest(out))
    }

    const watcher_less = watch('web_code/static/css/**/*.less');
    const watcher_css = watch('web_code/static/css/**/*.css');
    const watcher_html =  watch('web_code/**/*.html');
    const watcher_LayuiJS = watch('web_code/layui/**/*.js');
    const watcher_JS = watch(['web_code/app/**/*.js', '!web_code/app/lib/**/*.js']);
    const watcher_StaticFile = watch(['web_code/static/**/*.*', 'web_code/app/lib/**/*.js', '!web_code/static/**/*.less', "web_code/json/**/*.*"])
    const watcher_jsonFile = watch(["web_code/json/**/*.*"])

    watcher_css.on('change', updateCssFile)
    watcher_css.on('add', updateCssFile)

    watcher_less.on('change', updateLessFile)
    watcher_less.on('add', updateLessFile)

    watcher_html.on('change', updateHtmlFile)
    watcher_html.on('add', updateHtmlFile)

    watcher_LayuiJS.on('change', updateLayuiJs)
    watcher_LayuiJS.on('add', updateLayuiJs)

    watcher_JS.on('change', updateJSFile)
    watcher_JS.on('add', updateJSFile)

    watcher_jsonFile.on('change', updateStaticFile)
    watcher_StaticFile.on('add', updateStaticFile)

    watch('web_code/**/*.*').on('unlink', function(path, stats){
        const buildPath = path.replace(/^web_code/, SERVER_TEMP_PAHT).replace(/(\.less)$/, '.css')
        del(buildPath)
    } )
}

function setModeDev(cb){
    mode = 'dev'
    cb()
}
function setModeTest(cb){
    mode = 'test'
    cb()
}
function setModeBuild(cb){
    mode = 'build'
    cb()
}
function setModeServe(cb){
    mode = 'serve'
    cb()
}

const run = series(
    cleanDist, 
    mvDevNotDealAsset, 
    delFilePath,
    less, 
    cssmin, 
    js_main, 
    js_main_lay, 
    html,
);

const run_deploy = series(
    cleanDist, 
    mvDevNotDealAsset, 
    delFilePath,
    less, 
    cssmin, 
    js_main, 
    js_main_lay, 
    html,
    upload
);

const run_start = series(
    cleanDist, 
    mvDevNotDealAsset, 
    delFilePath,
    less, 
    cssmin, 
    js_main, 
    js_main_lay, 
    html,
    browerWatch
)

exports.dev = parallel(setModeDev,run)
exports.test = parallel(setModeTest,run_deploy)
exports.build = parallel(setModeBuild,run)
exports.start = parallel(setModeServe,run_start)
exports.watch = browerWatch
exports.default = parallel(setModeDev,run)