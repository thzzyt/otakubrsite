const ProxyApi = "";
const animeapi = "/post/";
const recommendationsapi = "/recommendations/";

var pathname = window.location.search;
console.log(pathname);

const AvailableServers = ['https://tanoshi.digital/api/v2', 'https://animes.vision/api/v2']

function getApiServer() {
  return AvailableServers[Math.floor(Math.random() * AvailableServers.length)]
}

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


const ApiServer = getApiServer();
let url = ApiServer;


var urll = url + animeapi + pathname.replace("?anime=", "");

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urll, false);
xhttp.send();

var json = xhttp.responseText;

var data = JSON.parse(json);

dat = data["data"];

document.documentElement.innerHTML = document.documentElement.innerHTML.replaceAll("TITLE", dat["title"])
  .replaceAll("IMG", dat["thumbnail"])
  .replaceAll("LANG", dat["language"].toUpperCase())
  .replaceAll("TYPE", dat["category"])
  .replaceAll("URL", dat["title"])
  .replaceAll("SYNOPSIS", dat["description"])
  .replaceAll("OTHER", dat["title_alternative"])
  .replaceAll("OTHERJAPAN", dat["title_japonese"])
  .replaceAll("TOTAL", dat["episodes"].length)
  .replaceAll("YEAR", dat["year"])
  .replaceAll("CLASSIFICATION", dat["classification"])
  .replaceAll("DUR", dat["duration"])
  .replaceAll("YEAR", dat["year"])
  .replaceAll("CATEGORY", dat["type"])
  .replaceAll("STATUS", dat["studio"])
  .replaceAll("GENERES", dat["genres"]);

document.getElementById("main-content").style.display = "block";
document.getElementById("load").style.display = "none";
document.getElementById("watch-btn").href = "./episode.html?anime=" + dat["episodes"][0]["id"];

const anime_title = data["title"];

console.log("Anime Info loaded");

RefreshLazyLoader();

let total = dat["episodes"];
let ephtml = "";

for (let i = 0; i < total.length; i++) {
  x = total;
  ep_num = total[i][0];
  ephtml += `<a class="ep-btn" href="./episode.html?anime=${x[i]["id"]}">${x[i]["title"].replace("Episódio ", "").replace("Episodio ", "")}</a>`;
}
document.getElementById("ephtmldiv").innerHTML = ephtml;
console.log("Episode list loaded");


// Function to scroll episode slider
function plusSlides(n) {
  if (n === 1) {
      document.getElementById("slider-carousel").scrollLeft += 600;
  }
  else if (n === -1) {
      document.getElementById("slider-carousel").scrollLeft -= 600;
  }
}
RefreshLazyLoader();