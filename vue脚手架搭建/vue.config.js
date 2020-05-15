module.exports  = {
    // 配置项目根目录
    publicPath: '/',

    // 构建文件的目录
    outputDir: 'dist',

    // 生成静态资源的目录(相对于outputDir)
    assetsDir: './assets',

    // 生成index.html的路径(相对于outputDir)
    indexPath: 'index.html',

    // 在生成的静态资源的名称中加入hash
    filenameHashing: true,

    // 多页面应用下，每个页面的入口
    pages: {
        index: {
            // page入口(必选)
            entry: 'src/index/main.js',
            // 模板的来源
            template: 'public/index.html',
            // 在dist/index.html的输出
            filename: 'index.html',
            // 当使用title选项时，
            // template中的title标签需要是<title><%= htmlWebpackPlugin.title></title>
            title: 'Index Page',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用的chunk和vendor chunk
            chunks: ['chunk-vendors', 'chunk-common', 'index']
        }
    },

    // 是否在每次保存后lint代码(boolean|'warning'|'default'|'error')
    lintOnSave: 'true',

    // 是否使用包含运行时编译的Vue构建版本
    runtimeCompiler: false, 

    // 显示转译一个依赖
    transpileDependencies: [],

    // 生产环境是否需要source map
    productionSourceMap: true,

    //  HTML 中 <link rel="stylesheet"> 和 <script> 跨
    // 域设置(针对html-webpack-plugin构建时注入的标签有效)
    crossorigin: 'undefined',

    // 常用于验证CDN请求的文件是否是原版文件，防止请求
    // 文件被劫持篡改(针对html-webpack-plugin构建时注入的标签有效)
    integrity: false,

    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
    // 如果这个值是一个函数，则会接收被解析的配置作为参数。
    // 该函数及可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
    /**
     * 可以用函数做一个基于环境的配置
     * configureWebpack: config => {
     *      if (process.env.NODE_ENV === 'production') {
     *          ...生产环境的配置
     *      } else {
     *          ...开发环境修改配置
     *      }
     * }
     */
    configureWebpack: {
        plugins: []
    },

    // 可以定义具名的loader规则和具名插件，
    // 并有机会在这些规则并对它们的选项进行修改
    /**
     * 添加一个新的loader
     * module.exports = {
     *   // GraphQL Loader
     *  config.module
     *      .rule('graphql')
     *      .test('/\.graphql$/')
     *      .use('graphl-tag/loader')
     *          .loader('graphql-tag/loader')
     *          .end()
     * }
     * 
     * 替换一个规则里的Loader
     * chainWebpack: config => {
     *      const svgRule = config.module.rule('svg')
     *      
     *      // 清楚已有的所有loader
     *      // 如果你不这样做，接下来的loader会附加在现有的loader之后
     *      svgRule.uses.clear()
     *      
     *      // 添加要替换的loader
     *      svgRule
     *          .use('vue-svg-loader')
     *          .loader('vue-svg-loader')
     * }
     * 
     * 修改插件选项
     * chainWebpack: config => {
     *  config
     *      .plugin('html')
     *      .tap(args => {
     *          return [/ 传递给html-webpack-plugins构造函数的新参数 /]
     *      })
     * }
     */
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                // 修改它的选项
                return options
            })
    },

    css: {
        // 样式文件模块化(将*.module.[ext]结尾的文件视为一个模块)
        requireModuleExtension: true,

        // 是否将组件中的css提取到一个独立的CSS文件中
        extract: false,

        // 是否为CSS开启source map。设置为true之后影响构建性能
        sourceMap: false,

        // 向css相关的loader传递选项
        loaderOptions: {
            css: {
                // 这里将选项传递给css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            },
        }
    },

    devServer: {
        // 提供服务内容地址
        contentBase: Path.join(__dirname, 'public'),
        // 是否压缩内容
        compress: true,
        // 端口号
        port: 8888,
        // 代理
        proxy: {
            '/api': 'http://193.168.10.10:3000'
        }

    },

    // 为Babel和thread-loader开启多线程
    parallel : require('os').cpus().length > 1,

    // pwa 插件
    pwa: {},

    // 可以传递第三方插件
    pluginOptions: {},

}