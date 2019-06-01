import React from 'react'
import { Spin, Alert,Pagination} from 'antd';
//导入fetch-JSONP
import fetchJSONP from 'fetch-jsonp'

import MovieItem from './MovieItem.jsx'
import { white, bgWhite } from '_ansi-colors@3.2.4@ansi-colors';

export default class MovieList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movies:[], //列表
            nowPage:parseInt(props.match.params.pages)||1, //第几页
            pagSize:12,//每页条数
            total:0,//总共有多少条数据s
            isloading:true,//数据正在加载 
            movieType:props.match.params.type //保存获取电影类型
        }
    }

    
    componentWillMount(){
        
        //使用 fetch API时第一个.then中 获取不到数据
        //第一个拿到一个response对象 调用response.json()得到一个新的promise
       /* console.log('ok')
        fetch('http://vue.studyit.io/api/getlunbo') 
        .then(response=>{
            console.log(response)
            return response.json()
        })
        .then(data=>{
            console.log(data);
        })*/

        /*setTimeout(()=>{
            this.setState({
                isloading:false
            })
        },1000)*/
        this.loadMovieListTypeAndPage()
        
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
       
        this.setState({
          isloading: true, // 重新加载
          nowPage: parseInt(nextProps.match.params.page) || 1, // 获取第几页
          movieType: nextProps.match.params.type // 电影类型
        }, function () {
          this.loadMovieListTypeAndPage()
        })
      }

    render(){
        return<div>
            {this.renderList()}
            
        
        </div>
    }
    //根据电影类型和页码获取电影数据
    loadMovieListTypeAndPage=()=>{
        //默认的window.fetch 受到跨域限制 无法直接使用 使用第三方包fetch-jsonp来发送JSONP请求
        /*fetch('https://api.douban.com/v2/movie/in_theaters')
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
        })*/
        
        const start=this.state.pagSize * (this.state.nowPage-1)
       //const moveT=this.state.movieType
       // const pageS=this.state.pagSize
      // console.log(this.state.movieType)
      
       //const url='https://api.douban.com/v2/movie/'+moveT+'?start='+start+'&count='+pageS+''
       //使用`而不是'
        const url= `https://api.douban.com/v2/movie/${this.state.movieType}?start=${start}&count=${this.state.pagSize}`
        
        //console.log(url)
        fetchJSONP(url)
        .then(response=>response.json())
        .then(data=>{
            console.log(data)
            this.setState({
                isloading:false,
                movies:data.subjects,//为电影列表重新赋值
                total:data.total//把总条数 保存到state中
            })
        })
        
      /*  const data = require('@/conponents/datas/' + this.state.movieType+'.json')
        //const data = require('@/conponents/test_data/in_theaters')
        setTimeout(() => {
        this.setState({
            isloading: false, // 将 loading 效果隐藏
            movies: data.subjects, // 为电影列表重新赋值
            total: data.total // 把总条数，保存到 state 上
        })
        }, 1000)*/
    }

    //过场动画
    renderList=()=>{
        
        if(this.state.isloading){
           
       return <Spin tip="Loading...">
                <Alert
                message="正在请求中"
                description="请稍后。。。"
                type="info"
                />
        </Spin>
        }else{
            return <div>
        <div style={{ display: 'flex', flexWrap: 'wrap',background: '#fff'  }}>
          {this.state.movies.map(item => {
            return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
          })}
        </div>
        {/* 分页 */}

        <Pagination defaultCurrent={this.state.nowPage} pageSize={this.state.pagSize} total={this.state.total} onChange={this.pageChanged} />
      </div>
        }
        
    }

    // 当页码改变的时候，加载新一页的数据
    pageChanged = (page) => {
    // 由于我们手动使用 BOM 对象，实现了跳转，这样不好，最好使用 路由的方法，进行编程式导航
    //console.log(this.props);
    // window.location.href = '/#/movie/' + this.state.movieType + '/' + page
    // 使用 react-router-dom 实现编程式导航
    this.props.history.push('/movie/' + this.state.movieType + '/' + page)
  }
}

//onChange={this.pageChanged}
//React 使用fetch API 获取数据 fetch API是基于Promise封装的