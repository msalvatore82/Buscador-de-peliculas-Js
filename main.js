const buscarPeli = document.getElementById('buscar')
const peliculasDiv = document.getElementById("peliculasDiv");
const form = document.getElementById("form");
const IdActores = []
const ApiUrlImg = [] 


const buscarPelicula = async (e) => {
  e.preventDefault();
  try {
    const busqueda = e.target.buscar.value
    const resultado = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=764cf5d2372d199f7556957e1a47b1cb&query=${buscarPeli.value}`);
    const peliculas = resultado.data.results;
    // console.log(peliculas);
    const resultadoId = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=764cf5d2372d199f7556957e1a47b1cb&language=en-US`);
    const idGenerosApi = resultadoId.data.genres; // aca tengo los generos
    // console.log(idGenerosApi);
    mostrarPeliculas(peliculas, idGenerosApi );

   
 
      // console.log(urlActor);
  } catch (error) {
    console.error(error);
  }
};

const mostrarPeliculas = (peliculas, idGenerosApi) => {
  peliculasDiv.innerHTML = "";
  peliculas.forEach((pelicula) => {
    const idGeneroPeli = pelicula.genre_ids // aca tengo los generos de las peliculas una por una 
    const generosApi = idGenerosApi 

    let resultado = generosApi.filter( item => idGeneroPeli.includes(item.id));

    const genero = []
      for(let item of resultado){
        genero.push(item.name);
}

    // console.log(generosApi);
    // console.log(idGeneroPeli);
    // console.log(genero);
    
      peliculasDiv.innerHTML += 
    ` 
    <div class="peliculasDiv">
    <div class="card mb-3" bis_skin_checked="1">
    <h2 class="card-header">${pelicula.title}</h2>
    <div class="card-body" bis_skin_checked="1">
         <h3 class="card-title">${genero}</h3>
          </div>
        <img src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
        
        </img>
    <div class="card-body" bis_skin_checked="1">
        <p class="card-text">DESCIPCION DE LA PELICULA: ${pelicula.overview}</p>
    </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">ACTORES PRINCIPALES</li>
            <li class="list-group-item">DIRECTOR</li>
            <li class="list-group-item">REPARTO</li>
        </ul>
  </div>
  </div>
        `;
        
       
    
      });

};

form.addEventListener("submit", buscarPelicula);
