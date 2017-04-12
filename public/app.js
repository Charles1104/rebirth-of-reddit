/*jshint esversion: 6 */

// constant that will be used in different blocks in the code below
const mainimage = document.querySelector('.main_image');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const reddit = document.querySelector('.reddit');
const random = document.querySelector('#button1');
const myBoard = document.querySelector('#button2');
const getApp = document.querySelector('#button3');

// General function that will be used to request data
function onRequestData(url, listener){
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', listener);
    oReq.open('GET',url);
    oReq.send();
}

function checkURL(url) {
  return (url.match(/\.(jpeg|jpg|gif|png)$/) !== null);
}

function getImage() {
  const requestData = JSON.parse(this.responseText);

  for (let i = 0; i < requestData.data.children.length; i++){

    if(requestData.data.children[i].data.url.match(/\.(jpeg|jpg|gif|png)$/) === null){
      continue;
    }

    let individual_feed = document.createElement("div");
    individual_feed.className = "feed";
    reddit.appendChild(individual_feed );

    let img = document.createElement("img");
    img.className = "main_image";
    img.src = requestData.data.children[i].data.url;
    individual_feed.appendChild(img);

    let titleImage = document.createElement("div");
    titleImage.className = "title";
    individual_feed.appendChild(titleImage);
    let p1 = document.createElement("p");

    p1.innerHTML = requestData.data.children[i].data.title;
    titleImage.appendChild(p1);

    const test = new Date(requestData.data.children[i].data.created).toString();

    let authorImage = document.createElement("div");
    authorImage.className = "author";
    individual_feed.appendChild(authorImage);
    let p2 = document.createElement("p");
    p2.innerHTML = `by ${requestData.data.children[i].data.author}`;
    authorImage.appendChild(p2);
  }
}

random.addEventListener("click",function(){
  reddit.innerHTML = "";
  onRequestData("https://www.reddit.com/r/pic.json", getImage);
});

myBoard.addEventListener("click",function(){
  reddit.innerHTML = "";
  onRequestData("https://www.reddit.com/r/funnypictures.json", getImage);
});

getApp.addEventListener("click",function(){
  reddit.innerHTML = "";
  onRequestData("https://www.reddit.com/r/LandscapePhotography.json", getImage);
});

