// // fetch("https://api.github.com/search/repositories?q=tetris+language:assembly&sort=stars&order=desc")
// fetch("https://api.github.com/search/repositories?q=tetris")
// .then(response=>{
//     return response.json()
// }).then(posts => console.log(posts.items.forEach(el => {
//     console.log('name '+el.name);
//     console.log('star '+el.stargazers_count);
//     console.log('login '+el.owner.login);
// })))

let searchRep = document.querySelector(".page_searchRep");
let repCatalog = document.querySelector(".page_repCatalog");
let botomCatalog = document.querySelector(".main_botom");
const userValue = {};

searchRep.addEventListener("input", function (e) {
  debounceHandleInput(e);
  // console.log(searchRep.value);
});

function handleInput(e) {
  const { value } = e.target;
  if (value === "") {
    repCatalog.replaceChildren();
    return;
  }
  fetch(`https://api.github.com/search/repositories?q=${value}`)
    .then((response) => {
      return response.json();
    })
    .then((post) => showPredictions(post));
}

function showPredictions(repositories) {
  repCatalog.innerHTML = "";
  for (let repI = 0; repI < 5; repI++) {
    userValue[repI] = {};
    userValue[repI].name = repositories.items[repI].name;
    userValue[repI].owner = repositories.items[repI].owner.login;
    userValue[repI].stars = repositories.items[repI].stargazers_count;
    let name = repositories.items[repI].name;
    let outputList = `<div class="output-list" data-index='${repI}'>${name}</div>`;
    repCatalog.innerHTML += outputList;
  }
}

function debounce(fn, timeout) {
  let timer = null;

  return (...args) => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(fn(...args)), timeout);
    });
  };
}

const debounceHandleInput = debounce(handleInput, 1000);

repCatalog.addEventListener("click", (event) => {
  let target = event.target.dataset.index;
  console.log(userValue[target]);
  let name = `<div class="botom_user">
      <div>
        <div>Name:${userValue[target].name}</div> 
        <div>Owner: ${userValue[target].owner}</div> 
        <div>Stars: ${userValue[target].stars}</div> 
      </div> 
      <div class="btn-close"></div>
    </div>`;
  botomCatalog.innerHTML += name;
});

botomCatalog.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn-close")) {
    event.target.parentElement.remove();
  }
});
