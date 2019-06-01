import React from 'react'

import {Route,Link,Switch} from 'react-router-dom'
//导入 antd组件
import { Layout, Menu, Icon} from 'antd';
  const { SubMenu } = Menu;
  const { Header, Content, Sider } = Layout;
//导入MovieList
import MovieList from '@/conponents/movie/MovieList'
import MovieDetail from '@/conponents/movie/MovieDetail'

export default class Movie extends React.Component{
    constructor(props){
        super(props)
        this.state={}
    }
    render(){
        return    <Layout style={{ height: '100%' }}>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['window.location.hash.split('/')[2]']}
           
            style={{ height: '100%', borderRight: 0 }}
          >
            
              <Menu.Item key="in_theaters">
              <Link to="/movie/in_theaters/1">正在热映</Link>
              </Menu.Item>
              <Menu.Item key="coming_soon">
              <Link to="/movie/coming_soon/1">即将上映</Link>
              </Menu.Item>
              <Menu.Item key="top250">
              <Link to="/movie/top250/1">TOP250</Link>
              </Menu.Item>
              
           
          </Menu>
        </Sider>
        <Layout style={{ paddingLeft:'1px' }}>
         
          <Content style={{
            background: '#fff', padding: 10, margin: 0, minHeight: 280,
          }}>
          {/*有两个参数 this.props.match.params*/}
          {/*esact 也会从上到下 所有都匹配一次  Switch匹配一个*/}
          <Switch>
          <Route esact path="/movie/detail/:id/" component={MovieDetail}></Route>
             <Route esact path="/movie/:type/:page" component={MovieList}></Route>
          </Switch>
          
            
            
          </Content>
        </Layout>
      </Layout>
    }
}