const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollectionContainer = document.querySelector('#toy-collection')
const toyNameInput = document.querySelector('#input-name')
const toyImageInput = document.querySelector('#input-image')
let addToy = false

// YOUR CODE HERE

allToys = []

document.addEventListener("DOMContentLoaded", function() {

  fetch('http://localhost:3000/toys', {method: "GET"})
    .then(r => r.json())
    .then((jsonToysData) => {
      allToys = jsonToysData
      toyCollectionContainer.innerHTML = renderAllToys(allToys)
    })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form

    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      toyForm.addEventListener('submit', function (e) {
        e.preventDefault()
        console.log(e.target)
        // function (name, image) {

          fetch('http://localhost:3000/toys', {
            method: "POST",
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({
              "name": toyNameInput.value,
              "image": toyImageInput.value,
              "likes": 0
            }) //end of JSON stringify
          }) //end of fetch

          .then(response => response.json())
          .then(jsonNewToy => {
            console.log(jsonNewToy)
            allToys.push(jsonNewToy)
            toyCollectionContainer.innerHTML = renderAllToys(allToys)
          }) //end of then

        // } //end of function

    }) //end of submit event listener

    } else {
    toyForm.style.display = 'none'
    }


  }) //end of click event listener


  toyCollectionContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "BUTTON") {
      fetch(`http://localhost:3000/toys/${e.target.parentElement.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "likes": (allToys.find(toy => toy.id == e.target.parentElement.dataset.id).likes) + 1
        })
      })
      .then(r => r.json())
      .then((jsonToy) => {
        toyIndex = allToys.findIndex(toy => toy.id == jsonToy.id)
        allToys[toyIndex].likes += 1
        toyCollectionContainer.innerHTML = renderAllToys(allToys)
      })
    }
  })



}) //end of DOM EVENT LISTENER


//HElPER methods

function renderAllToys(toysArray) {
  return toysArray.map(function(toy) {
    return `
      <div class="card" data-id="${toy.id}">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
      </div> `
  }).join('')
}


// OR HERE!
