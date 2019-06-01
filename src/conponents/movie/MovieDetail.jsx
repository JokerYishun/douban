import React from 'react'
import { Button, Icon } from 'antd';
import { Spin, Alert} from 'antd';
import fetchJSONP from 'fetch-jsonp'

export default class MovieDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            movieInfo:{},
            isloading:true
        }
    }

    componentWillMount(){
        console.log(this.props.match.params.id)
        const url= `https://api.douban.com/v2/movie/subject/${this.props.match.params.id}`

        fetchJSONP(url)
      .then(response => response.json())
      .then(data => {
          console.log(data)
        this.setState({
          movieInfo: data,
          isloading:false
        })
      })
    }

    render(){
        return<div>
            <Button type="primary" onClick={this.goBack}>
            <Icon type="left" />Backward
          </Button>
        
        {this.renderInfo()}
    
        </div>
    }
    goBack=()=>{
        this.props.history.go(-1) ///返回上一页
    }
    renderInfo = () => {
        if (this.state.isloading) {
          return <Spin tip="Loading...">
          <Alert
          message="正在请求中"
          description="请稍后。。。"
          type="info"
          />
             </Spin>
        }else{
        return <div>
            <div style={{textAlign:'center'}}>
            <h1>{this.state.movieInfo.title}</h1>
            <img src={this.state.movieInfo.large} alt="/"/>
            </div>
            <p style={{textIndent:'2em',lineHeight:'30px'}}>{this.state.movieInfo.summary}</p>
            </div>
       
          
      }}
}