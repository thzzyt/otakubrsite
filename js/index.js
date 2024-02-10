// Api urls

const ProxyApi = ""
const IndexApi = "/releases";
const recentapi = "/releases/";
const sliderapi = "/banners";

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
        return getJson(path, errCount + 1);
    }
}

function genresToString(genres) {
    return genres.join(", ");
}

function shuffle(array) {
    

    return array;
}


var urll = "https://tanoshi.digital/api/v2" + sliderapi;//Sua URL

var xhttp = new XMLHttpRequest();
xhttp.open("GET", urll, false);
xhttp.send();//A execução do script pára aqui até a requisição retornar do servidor

// console.log(xhttp.responseText);
    // const response = await fetch(url);
    // return await response.json();

var json = xhttp.responseText;

var datas = json;
// console.log(datas);

// Adding slider animes (trending animes from anilist)

// async function getTrendingAnimes(datas) {
    let SLIDER_HTML = "";

     for (let pos = 0; pos < datas.length; pos++) {
//let pos = 0;
        let anime = datas[pos];
        let title = anime["titulo"];
        let type = anime["tempo"];
        let status = anime["idioma"];
        let genres = anime["data"];
        let description = anime["resumo"];
        let urls = "./search.html?query=" + encodeURIComponent(title);

        let poster = anime["banner"];

        SLIDER_HTML += `<div class="mySlides fade"> <div class="data-slider"> <p class="spotlight">#${status} Spotlight</p><h1>${title}</h1> <div class="extra1"> <span class="year"><i class="fa fa-play-circle"></i>${type}</span> <span class="year year2"><i class="fa fa-calendar"></i>${status}</span> <span class="cbox cbox1">${genres}</span> <span class="cbox cbox2">HD</span> </div><p class="small-synop">${description}</p><div id="watchh"> <a href="${urls}" class="watch-btn"> <i class="fa fa-play-circle"></i> Watch Now </a> <a href="${urls}" class="watch-btn watch-btn2"> <i class="fa fa-info-circle"></i> Details<i class="fa fa-angle-right"></i> </a> </div></div><div class="shado"> <a href="${urls}"></a> </div><img src="${poster}"> </div>`;

    document.querySelector(".slideshow-container").innerHTML = SLIDER_HTML;//+ '<a class="prev" onclick="plusSlides(-1)">&#10094;</a><a class="next" onclick="plusSlides(1)">&#10095;</a>';

 }
//episodios
async function getEpisodesAnimes(data) {
    let EPISODES_HTML = "";

    for (let pos = 0; pos < data.length; pos++) {
        let anime = data[pos];
        let title = anime["title_episode"];
        let dubbed = anime["date"];
        let idioma = anime["idioma"];
        let id = anime["id"];
        let url = "/episode.html?anime=" + id;
        let image = anime["thumbnail"];
        let info = anime["anime"]["title"];
        let subOrDub;
        if (idioma.includes("dublado")) {
            subOrDub = "DUB";
        } else {
            subOrDub = "SUB";
        }

        EPISODES_HTML += `<a href="${url}"><div class="poster2 ep-anime"> <div id="shadow1" class="shadow"><div class="dubb">${title}</div> <div class="dubb dubb2">${subOrDub}</div> </div><div id="shadow2" class="shadow"> <img class="lzy_img" src="./static/loading1.gif" data-src="${image}"> </div><div class="la-details"> <h3>${info}</h3></div></div></a>`;
    }

    document.querySelector(".episodo").innerHTML = EPISODES_HTML;
}

// Adding popular animes (popular animes from gogoanime)
async function getPopularAnimes(data) {
    let POPULAR_HTML = "";

    for (let pos = 0; pos < data.length; pos++) {
        let anime = data[pos];
        let title = anime["title"];
        let dubbed = anime["dubbed"]
        let id = anime["id"];
        let url = "/anime.html?anime=" + id;
        let image = anime["thumbnail"];
        let subOrDub;
        if (dubbed = true) {
            subOrDub = "DUB";
        } else {
            subOrDub = "SUB";
        }

        POPULAR_HTML += `<a href="${url}"><div class="poster la-anime"> <div id="shadow1" class="shadow"><div class="dubb"># ${pos + 1
            }</div> <div class="dubb dubb2">${subOrDub}</div> </div><div id="shadow2" class="shadow"> <img class="lzy_img" src="./static/loading1.gif" data-src="${image}"> </div><div class="la-details"> <h3>${title}</h3></div></div></a>`;
    }

    document.querySelector(".popularg").innerHTML = POPULAR_HTML;
}
// Adding popular animes (popular animes from gogoanime)
async function getRecentAnimes(data) {
    let RECENT_HTML = "";

    for (let pos = 0; pos < data.length; pos++) {
        let anime = data[pos];
        let title = anime["title"];
        let id = anime["id"];
        let url = "/anime.html?anime=" + id;
        let image = anime["thumbnail"];
        let ep = anime["category"];
        let subOrDub;
        if (title.toLowerCase().includes("dublado")) {
            subOrDub = "DUB";
        } else {
            subOrDub = "SUB";
        }

        RECENT_HTML += `<a href="${url}"><div class="poster la-anime"> <div id="shadow1" class="shadow"><div class="dubb">${subOrDub}</div><div class="dubb dubb2">EP ${ep}</div> </div><div id="shadow2" class="shadow"> <img class="lzy_img" src="./static/loading1.gif" data-src="${image}"> </div><div class="la-details"> <h3>${title}</h3></div></div></a>`;
    }

    document.querySelector(".recento").innerHTML += RECENT_HTML;
}

// Slider functions
let slideIndex = 0;
let clickes = 0;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "flex";
}

async function showSlides2() {
    if (clickes == 1) {
        await sleep(10000);
        clickes = 0;
    }
    let i;
    let slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].style.display = "flex";
    setTimeout(showSlides2, 5000);
}

function plusSlides(n) {
    showSlides((slideIndex += n));
    clickes = 1;
}
function currentSlide(n) {
    showSlides((slideIndex = n));
    clickes = 1;
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

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


// To load more animes when scrolled to bottom
let page = 2;
let isLoading = false;

async function loadAnimes() {
    try {
        if (isLoading == false) {
            //isLoading = true;
            //await getRecentAnimes(page)
            //RefreshLazyLoader();
            console.log("Recent animes loaded");
            //page += 1;
            //isLoading = false;
        }
    } catch (error) {
        //isLoading = false;
        console.error(`Failed To Load Recent Animes Page : ${page}`);
        //page += 1;
    }
}

// Add a scroll event listener
window.addEventListener('scroll', function () {
    // Calculate how far the user has scrolled
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if ((scrollPosition + (3 * windowHeight)) >= documentHeight) {
        //loadAnimes();
    }
});

RefreshLazyLoader();
        showSlides(slideIndex);
        showSlides2();
        console.log("Sliders loaded");
// Running functions

getJson(IndexApi).then((data) => {
    const EpisodesAnimes = shuffle(data["lancamentos"]);
    const anilistTrending = shuffle(data["mais_vistos"]);
    const gogoanimePopular = shuffle(data["ultimos_adicionados"]);

    // getTrendingAnimes(0).then((data) => {
        // RefreshLazyLoader();
        // showSlides(slideIndex);
        // showSlides2();
        console.log("Sliders loaded");
    // });

    getEpisodesAnimes(EpisodesAnimes).then((data) => {
        RefreshLazyLoader();
        console.log("Episodes animes loaded");
    });

    getPopularAnimes(anilistTrending).then((data) => {
        RefreshLazyLoader();
        console.log("Popular animes loaded");
    });

    getRecentAnimes(gogoanimePopular).then((data) => {
        RefreshLazyLoader();
        console.log("Recent animes loaded");
    });
});
