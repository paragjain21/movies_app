import React, { Component } from 'react'
// import { movies } from './getmovies'
import axios from 'axios';

export default class Movies extends Component {
  constructor(){
    super();
    this.state={
      hower:'',
      parr:[1],
      currPage:1,
      movies:[],
      favourites:[]
    }
  }
  async componentDidMount(){
    //Side Effect
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=48b76ea8d2c52f5f9936e97e1aeccf3e&language=en-US&page=${this.state.currPage}`)
    let data = res.data
    // console.log(data);
    this.setState({
      movies:[...data.results]
    })
    console.log("mounting done")
  }
  changeMovies=async()=>{
    const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=48b76ea8d2c52f5f9936e97e1aeccf3e&language=en-US&page=${this.state.currPage}`)
    let data = res.data
    // console.log(data);
    this.setState({
      movies:[...data.results]
    })
  }
  handleClick=(value)=>{
    if(value!=this.state.currPage)
    {
      this.setState({
        currPage:value
      },this.changeMovies)
    }
  }
  handleLeft=()=>{
    if(this.state.currPage!=1)
    {
        this.setState({
          currPage:this.state.currPage-1
        },this.changeMovies)//Set state is asynchronous so we passed changemovies here so that it run fater setstate
    }
    
  }
  handleRight=()=>{
    
    if(this.state.currPage===this.state.parr.length)
    {
      let temparr=[];
      for(let i=1;i<=this.state.parr.length+1;i++)
      {
        temparr.push(i);
      }
      this.setState({
        parr:[...temparr]
      })
    }
    this.setState({
      currPage:this.state.currPage+1
    },this.changeMovies)//Set state is asynchronous so we passed changemovies here so that it run fater setstate
  }

  handleFavourite=(movie)=>{
    let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
    if(this.state.favourites.includes(movie.id)){
      oldData = oldData.filter((m)=>m.id!=movie.id)
    }else{
      oldData.push(movie)
    }
    localStorage.setItem('movies-app',JSON.stringify(oldData))
    console.log(oldData);
    this.handleFavouriteState()
  }

  handleFavouriteState=()=>{
    let oldData = JSON.parse(localStorage.getItem('movies-app') || "[]")
    let temp=oldData.map((m)=>m.id)
    this.setState({
      favourites:[...temp]
    })
  }
  render() {
    // let movie=movies.results
    console.log("render")
    return (
      <>
        {
            this.state.movies.length==0 ?
            <div className="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>:
            <div>
                <h3 className='text-center'><strong>Trending</strong></h3>
                <div className='movie-list'>
                    {
                        this.state.movies.map((movieobj)=>(
                            <div className="card movie-card" onMouseEnter={()=>this.setState({hover:movieobj.id})}  onMouseLeave={()=>this.setState({hover:''})}>
                                <img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.title} className="card-img-top movie-img"/>  
                                {/* <div className="card-body"> */}
                                <h5 className="card-title movie-title">{movieobj.original_title}</h5>
                                {/* <p className="card-text movie-text">{movieobj.overview}</p> */}
                                <div className='button-wrapper' style={{display:'flex',width:'100%',justifyContent:'center'}}>
                                  {
                                    this.state.hover == movieobj.id &&
                                    <a className="btn btn-primary movie-button" onClick={()=>this.handleFavourite(movieobj)}>{this.state.favourites.includes(movieobj.id)?"Remove":"Add"}</a>
                                  }

                                </div>
                                {/* </div> */}
                            </div>
                        ))
                    }
                </div> 
                  <div style={{display:'flex',justifyContent:'center'}}>
                    <nav aria-label="Page navigation example">
                    <ul class="pagination">
                      <li class="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                      {
                        this.state.parr.map((value)=>(
                          <li class="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                        ))
                      }
                      <li class="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                    </ul>
                    </nav>
                  </div>
            </div>
        }
      </>
    )
  }
}
