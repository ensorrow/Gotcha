## 该项目使用react开发，使用dva-cli框架作为架构支持，整体使用redux架构，引入Materail-UI组件库

[dva 架构工具](https://github.com/dvajs/dva)
[materai-ui](http://www.material-ui.com/)

如何启动：`npm start`
如何发布：`npm run build`，生成文件在/dist下

项目架构：
- dist 打包好的文件，npm run build之后才会保存在磁盘中，平时存在内存中
- mock
- public 静态页面模板
- src
    + assets 静态资源，发布后在dist/static下
    + components 组件目录
        * about 我的 页面相关组件
        * common 公共组件
        * index 推荐（home）页面相关组件
        * liked 关注页面相关组件
        * `*.js`，`*.less` root组件，如公共header,footer,svg图标
    + models 参考dva model
    + routes 容器（page container）目录
        * home 推荐tab页面下的二级页面
        * App.js 最外层容器，对应indexRoute
        * `*.js`，`*.less` 根页面
    + service 存放api相关信息
    + utils 存放公共工具函数，如request.js等
    + index.js dva项目入口文件
    + router.js 路由配置
- roadhogrc.mock.js 配置对应api的mock data