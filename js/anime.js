// Api urls

const ProxyApi = "";
const animeapi = "/post/";
const recommendationsapi = "/recommendations/";

// Api Server Manager

const AvailableServers = ['https://tanoshi.digital/api/v2', 'https://animes.vision/api/v2']

function getApiServer() {
  return AvailableServers[Math.floor(Math.random() * AvailableServers.length)]
}

// Usefull functions

async function getJson(path, errCount = 0) {
  const ApiServer = getApiServer();
  let url = ApiServer + path;

  if (errCount > 2) {
    return;
  }

  if (errCount == 1) {
    // Retry fetch using proxy
    console.log("Retrying fetch using proxy");
    url = ProxyApi + url;
  }

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (errors) {
    console.error(errors);
    return getJson(url, errCount + 1);
  }
}


function shuffle(array) {
    

    return array;
}


// Function to get anime info from gogo id
async function getloadAnimeFromGogo(data) {

    let dat = data[0];
    
replaceAll("TITLE", dat["title"])  
.replaceAll("IMG", dat["thumbnail"])
.replaceAll("LANG", dat["language"])
.replaceAll("TYPE", dat["type"])
.replaceAll("URL", dat["title"])
.replaceAll("SYNOPSIS", dat["description"])
.replaceAll("OTHER", dat["title_alternative"])
.replaceAll("TOTAL", dat["episodes"])
.replaceAll("YEAR", dat["year"])
.replaceAll("STATUS", dat["studio"])
.replaceAll("GENERES", dat["genre"])

  console.log("Anime Info loaded");

  return true;

}

// Function to get anime info from anilist search

// Function to get episode list

// Function to get anime recommendations

//Running functions

getJson(animeapi).then((data) => {
  
  const loadAnimeFromGogo = shuffle(data["data"]);
 
 getloadAnimeFromGogo(loadAnimeFromGogo).thens((data) => {
   
   RefreshLazyLoader();
   
    console.log("Anime Info loaded");
   
 });
                                               });