//console.log("n2")

//1.这两个包必须这么写
import React from 'react' //创建组件 虚拟DOM元素 生命周期
import ReactDOM from 'react-dom'//创建好的组件和虚拟DOM 放在页面上

//2.创建虚拟DOM元素
//参数1 创建元素的类型 字符串 表示元素名称 
//参数2 是一个对象或NULL 表示 当前这个DOM元素的属性
//参数3 子节点（包括 其他 虚拟DOM 获取 文本子节点）
//参数n 其他子节点
//<h1 id="myh1" title="this is a h1">这是一个H1</h1>
const myh1=React.createElement('h1',{id:'myh1',title:'this is a h1'},'这是一个H1')

const mydiv=React.createElement('div',null,'这是一个div',myh1)

//const mytext=<div>aaa</div>
//3.使用ReactDOM 把虚拟DOM渲染到页面上
//参数1 渲染的虚拟DOM
//参数2 指定页面一个容器 接收一个DOM元素 不是选择器
ReactDOM.render(mydiv,document.getElementById('app'))