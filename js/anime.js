// Api urls
const ProxyApi = "";
const animeapi = "/post/";
const recommendationsapi = "/recommendations/";

var pathname = window.location.search;
console.log(pathname);
// Api Server Manager

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

// Usefull functions

  const ApiServer = getApiServer();
  let url = ApiServer;

      
  var urll = url + animeapi + pathname.replace("?anime=","");//Sua URL

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urll, false);
xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

// console.log(xhttp.responseText);
    // const response = await fetch(url);
    // return await response.json();

                var json = xhttp.responseText;

var data = JSON.parse(json);

dat = data["data"];

console.log(dat);

document.documentElement.innerHTML = document.documentElement.innerHTML .replaceAll("TITLE", dat["title"])  
.replaceAll("IMG", dat["thumbnail"])
.replaceAll("LANG", dat["language"])
.replaceAll("TYPE", dat["type"])
.replaceAll("URL", dat["title"])
.replaceAll("SYNOPSIS", dat["description"])
.replaceAll("OTHER", dat["title_alternative"])
.replaceAll("TOTAL", dat["episodes"].length)
.replaceAll("YEAR", dat["year"])
.replaceAll("STATUS", dat["studio"])
.replaceAll("GENERES", data["genres"]);

    document.getElementById("main-content").style.display = "block";
    document.getElementById("load").style.display = "none";
    document.getElementById("watch-btn").href =
        "./episode.html?anime=" +
        data["episodes"][0][1].split("-episode-")[0] +
        "&episode=" +
        data["episodes"][0][0];

    const anime_title = data["title"];

    console.log("Anime Info loaded");

RefreshLazyLoader();//Running

  // await getEpList(data["episodes"]);

async function getEpList(total) {
    let ephtml = "";

    for (let i = 0; i < total.length; i++) {
        x = total[i][1].split("-episode-");
        ephtml += `<a class="ep-btn" href="./episode.html?anime=${x[0]}&episode=${x[1]}">${x[1]}</a>`;
    }
    document.getElementById("ephtmldiv").innerHTML = ephtml;
    console.log("Episode list loaded");
}

    RefreshLazyLoader();//Running functions