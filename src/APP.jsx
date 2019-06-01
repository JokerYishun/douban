import React from 'react'


import {HashRouter,Route,Link} from 'react-router-dom'
//导入 Ant design
import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

//导入scss
import style from '@/css/app.scss'

import Home from '@/conponents/home/Home'
import Movie from '@/conponents/movie/Movie'
import About from '@/conponents/about/About'




export default class APP extends React.Component{
    constructor(props){
        super(props)
        this.state={
           
        }

    }
    /*componentWillMount(){
        console.log(window.location.hash.split('/')[1]);
    }*/
    render(){
        return <HashRouter >
           
        <Layout  className="layout" style={{ height: '100%' }} >

            <Header>
            <div className={style.logo} />
            <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={[window.location.hash.split('/')[1]]}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key="home">
                <Link to="/home">首页</Link>
                </Menu.Item>
                <Menu.Item key="movie">
                <Link to="/movie//in_theaters/1">电影</Link>
                </Menu.Item>
                <Menu.Item key="about">
                <Link to="/about">关于</Link>
                </Menu.Item>
            </Menu>
            </Header>

            <Content style={{ padding: '0 50px'  ,flex:1 }}>
            <div style={{ height:'100%' ,background: '#fff', padding: 24, minHeight: 280 }}>
            <Route path="/home" component={Home}></Route>
            <Route path="/movie" component={Movie}></Route>
            <Route path="/about" component={About}></Route>
            </div>
            </Content>

            <Footer style={{ textAlign: 'center' }}>
             ©2019 MR.Wang
            </Footer>

        </Layout>
      
        </HashRouter>
    }
   
}