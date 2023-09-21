//  api key
const apiKey = "157cff9a";
// css  selectores

const favoriteCard = document.querySelector("#favorite .slider");
const batman = document.querySelector("#batman");
const topGun = document.querySelector("#topGun");
const dr = document.querySelector("#drStrange");

// async Api calls
async function loadMoviesApi(searchTerm, displayFunction, type) {
  const URL = `https://www.omdbapi.com/?${type}=${searchTerm}&y=&plot=short&r=json&apikey=${apiKey}`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") displayFunction(data);
}

// html contents of favorites
function displayFavorites(data) {
  favoriteCard.innerHTML += `<div class=" card" >
                        <div class="face face1"  onclick="viewContent('${data.imdbID}')">
                            <div class="content">
                                <div class="icon">
                                <img src=${data.Poster} alt="">
                                
                                </div>
                            </div>
                        </div>
                        <div class="face face2">
                            <div class="content">
                                <h4 class="rating-like-button"><strong>⭐${data.imdbRating}</strong>

                                    <label class="like" >
                                        <input class="fav" type="checkbox" onclick="removeFavorite('${data.imdbID}')"checked/>
                                        <div class="hearth" />
                                    </label>
                                </h4>
                                <h3 class="card-title">${data.Title}
                                </h3>
                                <div><span class="card-trailer" onclick="playTrailer(${data.imdbID})"><i class="fa-solid fa-play"></i> Trailer</span>
                                    
                                </div>

                            </div>
                        </div>
            </div>`;
}
// details of full movie
function viewContent(id) {
  if (id.id != undefined) {
    id = id.id;
  }

  console.log("this is id" + id);
  sessionStorage.setItem("detailed_content_id", id);
  window.open("./display_details.html", "_self");
}
//heart button
function likeButton(id) {
  // saving in local storage using localstorage functions
  if (id.id != undefined) {
    id = id.id;
  }
  console.log("is running", id);

  let localFavorites = localStorage.getItem("favorites");
  if (localFavorites == null) {
    favoriteList = [];
  } else {
    favoriteList = JSON.parse(localFavorites);
    favoriteList = [...new Set(favoriteList)];
  }
  
  // adding in favorites list
  if (id != undefined) {
    let isLikeChecked = document.querySelector(`#${id} .fav`).checked;
    if (isLikeChecked) {
      favoriteList.push(id);
     
      localStorage.setItem("favorites", JSON.stringify(favoriteList));
      loadFavorite();
    } else {
      // removing
      if (favoriteList.length != 0) {
        let idIndex = favoriteList.indexOf(id);
     
        if (idIndex != undefined) {
          favoriteList.splice(idIndex, 1);
          localStorage.setItem("favorites", JSON.stringify(favoriteList));
       
          loadFavorite();
        }
      }
    }
  }
}
//reload
function loadFavorite() {
  favoriteCard.innerHTML = "";
  let localFavorites = localStorage.getItem("favorites");
  if (localFavorites != null) {
    favoriteList = JSON.parse(localFavorites);
    favoriteList = [...new Set(favoriteList)];
    for (let card of favoriteList) {
      loadMoviesApi(card, displayFavorites, "i");
      if (document.querySelector(`#${card} .fav`) != null) {
        document.querySelector(`#${card} .fav`).checked = true;
      }
    }
  }
}
// remove 
function removeFavorite(id) {
  if (id.id != undefined) {
    id = id.id;
  }

  let idIndex = favoriteList.indexOf(id);
  if (idIndex != undefined) {
    favoriteList.splice(idIndex, 1);
    localStorage.setItem("favorites", JSON.stringify(favoriteList));
   
    loadFavorite();
  }
}


// loadfavorite 
setTimeout(loadFavorite, 1000);
