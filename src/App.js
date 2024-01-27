import React,{useState} from 'react'
import Card from 'react-bootstrap/Card';
const App = () => {
  const [search,setSearch] = useState('');
  const [data,setData] = useState([]);
  const submitHandler = e =>{
    e.preventDefault();
    fetch(`http://www.omdbapi.com/?s=${search}&apikey=263d22d8`).then(
      response => response.json()
    ).then(value => {
      setData(value.Search);
    })
  }
  const download = url => {
    fetch(url).then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "image.png");
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
        <center>
          <h1>Search Your Favorite Movie</h1>
          <form onSubmit={submitHandler}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/><br /><br />
            <input type="submit" value="Search" />
          </form>
          <div className='row'>
          {data.map(movie=>{
            return(
              <div className='col-md-4' key={movie.imdbID}>
                <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={movie.Poster} alt='Movie Not Found' />
      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <a className='btn btn-primary' href="movie" onClick={()=>download(movie.Poster)}>Download Poster</a>
      </Card.Body>
    </Card>
              </div>
            )
          })}
          </div>
        </center>
    </div>
  )
}

export default App