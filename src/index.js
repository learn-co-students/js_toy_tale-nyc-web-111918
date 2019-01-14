document.addEventListener('DOMContentLoaded', function (e) {
let allToys = []
let addToy = false
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const collectionDiv = document.querySelector('#toy-collection')
const newToyForm = document.querySelector('.add-toy-form')
const likeBtn = document.querySelector('.like-btn')
// YOUR CODE HERE
fetch('http://localhost:3000/toys/')
.then(r => r.json())
.then(myJson => {
  allToys = myJson
  showAllToys(allToys)
  console.log(allToys);
})

function showAllToys(toys){
  collectionDiv.innerHTML = allToys.map(rednerSingleToy).join('')
}

function rednerSingleToy(toy){
  return `<div class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} like(s)</p>
    <button id="${toy.id}" class="like-btn">Like <3</button>
  </div>`
}

newToyForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const newToyName = document.querySelector('#new-toy-name')
  const newToyImage = document.querySelector('#new-toy-image')
  fetch('http://localhost:3000/toys/',{
    method: "POST",
    headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToyName.value,
      image: newToyImage.value,
      likes: 0
    })
  })
  .then(r => r.json())
  .then(newToy => {
    console.log(newToy)
    allToys.push(newToy)
    showAllToys(allToys)
  });
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener HERE

  } else {
    toyForm.style.display = 'none'
  }
})

collectionDiv.addEventListener('click', (e) => {
  if(e.target.tagName === "BUTTON" ){
    const foundToy = allToys.find(toy => toy.id == e.target.id)
    const index = allToys.indexOf(foundToy)
    const increaseLikes = foundToy.likes + 1
    console.log(foundToy.likes)
    fetch(`http://localhost:3000/toys/${e.target.id}`,{
        method: "PATCH",
      headers:{
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        likes: increaseLikes
      })
    })
    .then(r => r.json())
    .then(update => {
      allToys[index] = update
      showAllToys(allToys)
    });

  }
})

// OR HERE!
});
