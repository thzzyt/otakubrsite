// Api urls

const ProxyApi = "";
const animeapi = "/post/";
const episodeapi = "/episode/";
const dlapi = "/download/";

var pathname = window.location.search;
console.log(pathname);

// Api Server Manager

const AvailableServers = ['https://tanoshi.digital/api/v2', 'https://animes.vision/api/v2']

function getApiServer() {
  return AvailableServers[Math.floor(Math.random() * AvailableServers.length)]
}

// Usefull functions

const ApiServer = getApiServer();
let url = ApiServer;

var urll = url + episodeapi + pathname.replace("?anime=", "");//Sua URL

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urll, false);
xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

var json = xhttp.responseText;

var epdata = JSON.parse(json);
let epobject = epdata.data;
let entries = epobject;
//Object.entries(epdata);
console.log(entries);

let titlep = entries["title"];
let title = entries["title"];
let animename = entries["title_post"];
let ids = entries["id"];
let post_id = entries["post_id"];
let image = entries["thumbnail"];

document.documentElement.innerHTML =
  document.documentElement.innerHTML.replaceAll("{{ title }}", animename);

// Function to get m3u8 url of episode
try {
  document.getElementById("ep-name").innerHTML = title;
  const serversbtn = document.getElementById("serversbtn");

  let url = epobject["source"][0]["url"];
  serversbtn.innerHTML += `<div class="sitem"> <a class="sobtn sactive" onclick="selectServer(this)" data-value="./embed2.html?url=${url}">SD (360p)</a> </div>`;

  document.getElementsByClassName("sactive")[0].click();

  url = epobject["source"][1]["url"];
  serversbtn.innerHTML += `<div class="sitem"> <a class="sobtn" onclick="selectServer(this)" data-value="./embed2.html?url=${url}">HD (720p)</a> </div>`;

} catch (err) {

}

// Function to available servers
async function loadServers(servers, success = true) {
  const serversbtn = document.getElementById("serversbtn");

  html = "";

  for (let [key, value] of Object.entries(servers)) {
    key = capitalizeFirstLetter(key);
    html += `<div class="sitem"> <a class="sobtn" onclick="selectServer(this)" data-value="${value}">${key}</a> </div>`;
  }
  serversbtn.innerHTML += html;

  if (success == false) {
    document.getElementsByClassName("sobtn")[0].click();
  }
}

// Function to select server
function selectServer(btn) {
  const buttons = document.getElementsByClassName("sobtn");
  const iframe = document.getElementById("AnimeDexFrame");
  iframe.src = btn.getAttribute("data-value");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "sobtn";
  }
  btn.className = "sobtn sactive";
}

// Function to show download links
function showDownload() {
  document.getElementById("showdl").style.display = "none";
  document.getElementById("dldiv").classList.toggle("show");

  getDownloadLinks(urlParams.get("anime"), urlParams.get("episode")).then(
    () => {
      console.log("Download links loaded");
    }
  );
}

// Function to get episode list
var urla = url + animeapi + post_id;

var xhttdp = new XMLHttpRequest();
xhttdp.open("GET", urla, false);
xhttdp.send();//A execução do script pára aqui até a requisição retornar do servidor
var jsonn = xhttdp.responseText;

var data = JSON.parse(jsonn);
let eplistdata = data.data["episodes"];
let eplist = eplistdata;
let ephtml = "";

for (let i = 0; i < eplist.length; i++) {
  anime_id = eplist[i]["id"];
  ep_num = eplist[i]["title"];
  ephtml += `<a class="ep-btn" href="./episode.html?anime=${anime_id}">${ep_num}</a>`;
}

document.getElementById("ephtmldiv").innerHTML = ephtml;

document.documentElement.innerHTML = document.documentElement.innerHTML.replaceAll("IMG", data.data["thumbnail"])


// Function to get selector btn
async function getSelectorBtn(url, current, totalep) {
  current = Number(current);
  totalep = Number(totalep);
  let html = "";

  if (totalep < 2) {
    html = "";
  } else {
    if (current == 1) {
      html = `<a class="btns" href="${url + (current + 1)
        }"><button class="sbtn inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ">Episode 2<i style="margin-left:10px; margin-right: auto;" class="fa fa-arrow-circle-right"></i></button></a>`;
    } else if (current == totalep) {
      html = `<a class="btns" href="${url + (totalep - 1)
        }"><button class="sbtn inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg "><i class="fa fa-arrow-circle-left"></i>Episode ${totalep - 1
        }</button></a>`;
    } else {
      html = `<a class="btns" href="${url + (current - 1)
        }"><button class="sbtn inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg "><i class="fa fa-arrow-circle-left"></i>Episode ${current - 1
        }</button></a>`;
      html += `<a class="btns" href="${url + (current + 1)
        }"><button class="sbtn inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ">Episode ${current + 1
        }<i style="margin-left:10px; margin-right: auto;" class="fa fa-arrow-circle-right"></i></button></a>`;
    }

    document.getElementsByClassName("selector")[0].innerHTML = html;
  }
}

// Function to get download links
async function getDownloadLinks(anime, episode) {
  const data = (await getJson(dlapi + anime + "-episode-" + episode))[
    "results"
  ];
  let html = "";

  for (const [key, value] of Object.entries(data)) {
    const quality = key.split("x")[1];
    const url = value;
    html += `<div class="sitem"> <a class="sobtn download" target="_blank" href="${url}"><i class="fa fa-download"></i>${quality}p</a> </div>`;
  }
  document.getElementById("dllinks").innerHTML = html;
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Running functions

async function loadEpisodeData(data) {
  data = data["data"];
  const name = data["title_post"];
  const episodes = data["episodes"];
  const stream = data["source"];
  const servers = data["servers"];


  try {
    loadVideo(name, stream).then(() => {
      console.log("Video loaded");
      loadServers(servers, true).then(() => {
        console.log("Servers loaded");
      });
    });
  } catch (err) {
    loadServers(servers, false).then(() => {
      console.log("Servers loaded");
    });
  }
}

async function loadData() {
  try {
    let data = await getJson(
      episodeapi +
      urlParams.get("anime") +
      "-episode-" +
      urlParams.get("episode")
    );

    loadEpisodeData(data).then(() => {
      getEpList(urlParams.get("anime")).then((eplist) => {
        console.log("Episode list loaded");

        getSelectorBtn(
          "./episode.html?anime=" + urlParams.get("anime") + "&episode=",
          urlParams.get("episode"),
          eplist.length
        ).then(() => {
          console.log("Selector btn loaded");
        });
      });
    });
  } catch (err) {
    // document.getElementById("main-section").style.display = "none";
    // document.getElementById("error-page").style.display = "block";
    // document.getElementById("error-desc").innerHTML = err;
    console.error(err);
  }
}

loadData();