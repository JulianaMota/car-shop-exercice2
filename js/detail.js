const template = document.querySelector("#detail-template").content;
const parameters = new URLSearchParams(window.location.search);
const carID = parameters.get("carid");

function loadOneCar(carID){
    fetch(baseLink+"car/"+carID+"?_embed").then(e=>e.json()).then(showOneCar);
}

function showOneCar(data) {
    console.log(data._embedded);
    const copy = template.cloneNode(true);

    if(data._embedded['wp:featuredmedia'][0].media_details.sizes.large){
        copy.querySelector("img").src=data._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url;
    }else{
        copy.querySelector("img").src=data._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url;
    }


    copy.querySelector("h2").textContent=data.title.rendered;
    copy.querySelector(".year span").textContent=data.acf.year;
    copy.querySelector(".color span").textContent=data.acf.color;
    copy.querySelector(".horse-power span").textContent=data.acf.horse_power;
    copy.querySelector(".price span").textContent=data.acf.price;
    copy.querySelector(".engine span").textContent=data.acf.engine;
    copy.querySelector(".body").innerHTML=data.content.rendered;
    copy.querySelector(".video").innerHTML=data.acf.video;

    document.querySelector("main").appendChild(copy);

    myLoader.classList.add("hide");

}

loadOneCar(carID);