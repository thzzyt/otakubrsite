// Api urls

const ProxyApi = ""
const searchapi = "/search?busca=";

// Api Server Manager
// var pathname = window.location.search;
// console.log(pathname);

const AvailableServers = ['https://tanoshi.digital/api/v2', 'https://animes.vision/api/v2']

function getApiServer() {
  return AvailableServers[Math.floor(Math.random() * AvailableServers.length)]
}

// Usefull functions

const ApiServer = getApiServer();
let url = ApiServer + searchapi;

var urll = url + window.location.search.replace("?query=", "").replace("=", "");//Sua URL

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urll, false);
xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

// console.log(xhttp.responseText);
// const response = await fetch(url);
// return await response.json();

var json = xhttp.responseText;

async function RefreshLazyLoader() {
  const imageObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
      }
    });
  });
  const arr = document.querySelectorAll("img.lzy_img");
  arr.forEach((v) => {
    imageObserver.observe(v);
  });
}

function sentenceCase(str) {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var data = JSON.parse(json);

//const animes = data;
//const contentdiv = document.getElementById("latest2");
//const loader = document.getElementById("load");

let html = "";

if (data.length == 0) {
  throw "No results found";
}

//let hasNextPage = true;

for (let pos = 0; pos < data.length; pos++) {

  let x = data;
  
  let dubbed = "";
  
 if (x[pos]["title"].toLowerCase().includes("dub")) {
  dubbed = "DUB";
 } else {
 dubbed = "SUB";
 }

 // let id = anime["id"];
 // let title = anime["title"];
 // let assistidos = anime["views"];
 // let thumbnail = anime["thumbnail"];
 // let category = anime["category"];
 // let ano = anime["year"];

  html += `<a href="./anime.html?anime=${x[pos]["id"]}"><div class="poster la-anime"> <div id="shadow1" class="shadow"> <div class="dubb">${dubbed}</div></div><div id="shadow2" class="shadow"> <img class="lzy_img" src="./static/loading1.gif" data-src="${x[pos]["thumbnail"]}"> </div><div class="la-details"> <h3>${x[pos]["title"]}</h3> <div id="extra"> <span>${x[pos]["category"]}</span> </div></div></div></a>`;
  }

document.querySelector(".search").innerHTML = html;
RefreshLazyLoader();
  //RefreshLazyLoader();
     //return data["hasNextPage"];
//document.querySelector(".popularg").innerHTML += html;

//loader.innerHTML += html;
//contentdiv.innerHTML += html;

//loader.style.display = "none";
//contentdiv.style.display = "block";

const params = new URLSearchParams(window.location.search.replace("?query=", "").replace("=", ""));

const query = params;

if (query == null) {
  window.location.replace("./index.html");
}

document.getElementById("latest").innerHTML = `Search Results: ${query}`;


RefreshLazyLoader();
console.log("Search animes loaded");