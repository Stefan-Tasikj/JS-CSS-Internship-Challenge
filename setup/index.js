//const apiUrl = 'http://127.0.0.1:5500/data.json';
const apiUrl = '/data.json';
var listItems = [];
var loadedItems = [];
var loadCount = 4;
var counter = 0;
var preview = document.querySelector('.preview');
var cardContainer = document.createElement('div');
const loadButton = document.createElement('div');
loadButton.innerHTML = `<button class='load-button' onclick="loadMore();">Load More</button>`;
loadButton.setAttribute("id", "loadbutton");
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    cardContainer.setAttribute("id", "cardcontainer");
    cardContainer.classList.add('card-container');
    data.forEach(item => { loadedItems.push(item) })
    console.log(loadedItems);
    loadedItems.push(data);
    let n = 0;
    data.forEach(item => {

      cardItem = `
      <div class="card">
      <div class="card-header">
        <div>
          <img src="${item.profile_image}" alt="Profile Image" class="user-profile-image">
            <div class="header-text">
                <div class="user-name">${item.name}
                </div>
                <div class="date-details">${dateFormatter(item.date)}
                </div>
            </div>
        </div>
      </div>
      <div class="source-icon">
        <img src=${imageSource(item.source_type)}>
        </div>
         <img src="${item.image}" alt="Card Image" class="content-image">
      <div class="post-caption"> ${descriptionFormatter(item.caption)}</div>
      <hr class="rounded">
      <div class="like-footer" onclick="like(this);" >
      <img src="/icons/heart.svg" alt="Likes" class="likes" >
      <div class="like-count" id=${n}>${item.likes} likes</div>
      </div>
      
     </div> `
      n = n + 1;
      listItems.push(cardItem);
    });
    preview.appendChild(cardContainer);
    loadMore();
  })
  .catch(error => console.error(error));

function imageSource(source) {
  let sources = { "instagram": "/icons/instagram-logo.svg", "facebook": "/icons/facebook.svg" };
  return sources[source];
}
function dateFormatter(date) {
  let monthsArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let dateArray = date.split(' ')[0].split('-')
  let formattedDate = dateArray[0] + ' ' + monthsArray[parseInt(dateArray[1]) - 1] + ' ' + dateArray[2]
  return formattedDate
}
function changeTheme() {
  var cardTheme = document.querySelector('input[name="theme"]:checked').value;
  if (cardTheme == 'darkTheme') {
    document.getElementById('theme_css').href = 'darkTheme.css';
    console.log(cardTheme);
  }
  else {
    document.getElementById('theme_css').href = 'style.css';
  }
}
function changeGridGap() {
  const gridGap = document.getElementById("cardSpaceBetween").value;
  const grid = document.getElementById("cardcontainer");
  grid.style.gap = gridGap;
}
function changeGridColor() {
  const cardColor = document.getElementById("cardBackgroundColor").value;
  var cards = document.getElementsByClassName("card");
  console.log(cards.children);
  [...cards].forEach(function(item) {item.style.backgroundColor=cardColor;
    console.log(item);

});
 
 
};
function descriptionFormatter(description) {
  if (!description) {
    return `No description.`;
  }
  if (description.length >= 150) {
    return description.substring(0, 149) + "...";
  }
  return description;

}
function filter(){
  var cardSource = document.querySelector('input[name="theme"]:checked').value;
  if (cardSource == 'darkTheme') {
    document.getElementById('theme_css').href = 'darkTheme.css';
    console.log(cardTheme);
  }
  else {
    document.getElementById('theme_css').href = 'style.css';
  }
}
function changeGridColumns() {
  const columnNumber = document.getElementById("numberOfColumns").value;
  const grid = document.getElementById("cardcontainer");
  switch (columnNumber) {
    case '1':
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "auto";
      break;
    case '2':
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "auto auto";
      console.log(columnNumber)
      break;
    case '3':
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "auto auto auto";
      console.log(columnNumber)
      break;
    case '4':
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "auto auto auto auto";
      console.log(columnNumber)
      break;
    case '5':
      grid.style.display = "grid";
      grid.style.gridTemplateColumns = "auto auto auto auto auto";
      console.log(columnNumber)
      break;
    case 'dynamic':
      grid.style.display = "flex";
      console.log(columnNumber)
      break;
  }
}
function like(item) {
  let image = item.getElementsByClassName('likes')[0];
  item.onclick = function () { unlike(this); };
  image.src = "/icons/heart_filled.svg";
  let likes = item.getElementsByClassName('like-count')[0];
  likenumber = parseInt(likes.innerHTML);
  likenumber = likenumber + 1;
  if (likenumber==1){
    likes.innerHTML = likenumber+' like';
  }
  else{
  likes.innerHTML = likenumber+' likes';
  }
}
function unlike(item) {
  let image = item.getElementsByClassName('likes')[0];
  item.onclick = function () { like(this); };
  image.src = "/icons/heart.svg";
  let likes = item.getElementsByClassName('like-count')[0];
  likenumber = parseInt(likes.innerHTML);
  likenumber = likenumber - 1;
  if (likenumber==1){
    likes.innerHTML = likenumber+' like';
  }
  else{
  likes.innerHTML = likenumber+' likes';
  }
}
function loadMore() {

  for (var i = 0; i <= 3; i = i + 1) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute("id", "card");
    card.innerHTML = listItems[counter];
    counter = counter + 1;
    if (counter <= listItems.length) {
      cardContainer.appendChild(card);

    }
  }
  preview.appendChild(loadButton);
  if (counter >= listItems.length - 3) {
    el = document.getElementById("loadbutton");
    preview.removeChild(el);
  }
};