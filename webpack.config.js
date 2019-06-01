/*const path = require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin') //导入在内存中自动生成index页面 插件

//创建插件实例
const htmlPlugin=new HtmlWebPackPlugin({
  template:path.join(__dirname,'./src/index.html'),//y源文件
  filename:'index.html' //生成内存中首页名称
})*/
const path=require('path')
const HtmlWebPackPlugin=require('html-webpack-plugin')

const htmlPlugin=new HtmlWebPackPlugin({
  template:path.join(__dirname,'./src/index.html'),
  filename:'index.html'
})

//webpack只打包.js 其他的需要第三方loader
module.exports={
    mode:'production',
    plugins:[
      htmlPlugin
    ],
    module:{  //所有第三方模块的配置规则
      rules:[ //第三方匹配规则
        {
          test:/\.js|jsx$/, 
          exclude:/node_modules/ ,
          
          loader: 'babel-loader'
          

          
        },
        {
          test:/\.css$/,
          //在css-loader中 使用？追加参数 固定的参数 叫做modules 提供模块化
          use:['style-loader','css-loader']
        },
        {
          test:/\.ttf|woff|woff2|eot|svg$/,
          use:'url-loader' //打包处理字体文件
        },
        {
          test:/\.scss$/,
          use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]','sass-loader'] //sass文件
        }
      ]
    
   },
   resolve:{
     extensions:['.js','.jsx','.json'],//这几个文件后缀名可以不写
     alias:{
       '@':path.join(__dirname,'./src')
     }
    },
    
performance: {
 
  hints:false   
   
  
  }
}
