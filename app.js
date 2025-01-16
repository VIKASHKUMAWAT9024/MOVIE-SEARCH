const searchForm = document.querySelector('form');
const inputBox = document.querySelector('.inputBox');
const movieContainer = document.getElementById('movie-container'); // Assuming movie-container exists in the HTML

// Function to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    try{

  
    const myAPIKEY = "a23ff408";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKEY}&t=${movie}`;

    const response = await fetch(url);
    if( !response.ok){
        throw new Error("Unable to fetch movie data.");

    }


    const data = await response.json();

    console.log(data);
    showMovieData(data);
    }
    catch(error){
        showErrorMessage("No Movie found !!!");

    }
}

// Function to show movie data
const showMovieData = (data) => {
    movieContainer.innerHTML="";
    movieContainer.classList.remove('noBackground');
    // Destructuring to extract data from the API response
    const { Title, imdbRating, Genre, Released, runtime, Actors, Plot, Poster } = data;

    // Create a new movie element
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    // Set the inner HTML for the movie element
    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong> ${imdbRating}</p>`;

    // Create genre element
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    
    // Split genre string and create individual paragraphs for each genre
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element.trim(); // Ensure no leading/trailing spaces
        movieGenreElement.appendChild(p);
    });

    // Append the genre element to the main movie element
    movieElement.appendChild(movieGenreElement);

    // Adding additional movie information
    movieElement.innerHTML += `
        <p><strong>Released Date:</strong> ${Released}</p>
        <p><strong>Duration:</strong> ${runtime}</p>
        <p><strong>Cast:</strong> ${Actors}</p>
        <p><strong>Plot:</strong> ${Plot}</p>
    `;

    // Creating the div for the movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}" alt="${Title} Poster"/>`;

    // Clear the movie container before appending the new movie
    movieContainer.innerHTML = '';

    // Append movie poster and movie data to the container
    movieContainer.appendChild(moviePosterElement);
    movieContainer.appendChild(movieElement);
};

//Function to display error message
const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`;
    movieContainer.classList.add('noBackground');

}
// Function to handle from submission
const handleFormSubmission=(e)=>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage("Fetching Movie Information...")
        getMovieInfo(movieName);
    }else{
        showErrorMessage("Enter movie to get movie information.");
    }
}
// Adding event listener to search form
searchForm.addEventListener('submit', handleFormSubmission) ;
    

