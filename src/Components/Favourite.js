import React, { Component } from 'react'

export default class Favourite extends Component {
    constructor(){
        super()
        this.state={
            genres:[],
            currGenre : "All Genres",
            movies:[],
            currText:"",
            limit:5,
            currPage:1,
        }
    }
    componentDidMount(){
        let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
        let data = JSON.parse(localStorage.getItem("movies-app") || "[]")
        let temp = []
        data.forEach((movieobj)=>{
            if(!temp.includes(genreids[movieobj.genre_ids[0]])){
                temp.push(genreids[movieobj.genre_ids[0]])
            }
        })
        temp.unshift('All Genres');
        this.setState({
            genres:[...temp],
            movies:[...data]
        })
    }
    handleGenreChange=(genre)=>{
        this.setState({
            currGenre:genre
        })
    }
    sortPopularityDec=()=>{
        let temp=this.state.movies
        temp.sort(function(objA,objB){
            return objB.popularity-objA.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortPopularityAec=()=>{
        let temp=this.state.movies
        temp.sort(function(objA,objB){
            return objA.popularity-objB.popularity
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingDec=()=>{
        let temp=this.state.movies
        temp.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    sortRatingAec=()=>{
        let temp=this.state.movies
        temp.sort(function(objA,objB){
            return objA.vote_average-objB.vote_average
        })
        this.setState({
            movies:[...temp]
        })
    }
    handleDelete=(movieId)=>{
        let temp=[]
        temp=this.state.movies.filter((movieObj)=>movieObj.id!=movieId)
        this.setState({
            movies:[...temp]
        })
        localStorage.setItem("movies-app",JSON.stringify(temp))
    }
  render() {
    let genreids = {28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy',36:'History',
                        27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'};
    let filterArray=[]
    if(this.state.currText == '')
    {
        filterArray=this.state.movies
    }else{
        filterArray=this.state.movies.filter((movieObj)=>{
            let title = movieObj.original_title.toLowerCase()
            return title.includes(this.state.currText.toLowerCase())
        })
    }
    if(this.state.currGenre != "All Genres")
    {
        filterArray=this.state.movies.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currGenre)
    }
    let pages=Math.ceil(filterArray.length/this.state.limit)
    let pagesarr=[]
    for(let i=1;i<=pages;i++)
    {
        pagesarr.push(i);
    }
    let si=(this.state.currPage-1)*this.state.limit;
    let ei=si+this.state.limit;
    filterArray=filterArray.slice(si,ei);
    return (
      <div>
        <>
            <div className='main'>
                <div className='row'>
                    <div className='col-lg-3 col-sm-12'>
                    <ul class="list-group favourites-genres">
                        {
                            this.state.genres.map((genre)=>(
                                this.state.currGenre==genre?
                                <li class="list-group-item" style={{background:'#3f51b5',color:'white',fontWeight:'bold'}}>{genre}</li>:
                                <li class="list-group-item" style={{background:'white',color:'#3f51b5'}} onClick={()=>this.handleGenreChange(genre)}>{genre}</li>
                            ))
                            
                        }
                    </ul>
                    </div>
                    <div className='col-lg-9 favourites-table col-sm-12'>
                        <div className='row'>
                            <input type='text' className='input-group-text col' placeholder='Search' value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}></input>
                            <input type='number' className='input-group-text col' placeholder='Rows Count' value={this.state.limit} onChange={(e)=>this.setState({limit:e.target.value})}></input>
                        </div>
                        <div className='row'>
                        <table class="table">
                            <thead>
                                <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Genre</th>
                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDec}></i>Popuparity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAec}></i></th>
                                <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingDec}></i>Rating<i class="fa-solid fa-sort-down" onClick={this.sortRatingAec}></i></th>
                                <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterArray.map((movieobj)=>(
                                        <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/original${movieobj.backdrop_path}`} alt={movieobj.title} style={{width:'5rem'}}></img>{movieobj.original_title}</td>
                                            <td>{genreids[movieobj.genre_ids[0]]}</td>
                                            <td>{movieobj.popularity}</td>
                                            <td>{movieobj.vote_average}</td>
                                            <td><button type="button" class="btn btn-outline-danger" onClick={()=>this.handleDelete(movieobj.id)}>Delete</button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            </table>
                            </div>
                            <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                {
                                    pagesarr.map((page)=>(
                                        <li class="page-item"><a class="page-link" onClick={()=>this.setState({currPage:page})}>{page}</a></li>
                                    ))
                                }
                            </ul>
                            </nav>
                    </div>
                </div>
            </div>
        </>
      </div>
    )
  }
}
