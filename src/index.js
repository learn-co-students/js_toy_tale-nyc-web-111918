document.addEventListener("DOMContentLoaded", function(){
  const addBtn = document.querySelector('#new-toy-btn')
  const toyContainer = document.querySelector('.container')
  const newToyForm = document.querySelector('.add-toy-form')
  const toyCollection = document.querySelector('#toy-collection')

  let addToy = false

  // YOUR CODE HERE

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyContainer.style.display = 'block'
      // submit listener here

    } else {
      toyContainer.style.display = 'none'
    }
  })  // End of addBtn Listener

  //FETCH INITAL LOAD
  fetch('http://localhost:3000/toys')
  .then((responseObject) => responseObject.json())
  .then((toys) => {
    toyCollection.innerHTML = ""
    toys.forEach(function(toy){
      toyCollection.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img width="100%" src="${toy.image}"/>
        <p>${toy.likes} Likes </p>
        <button data-id=${toy.id} class="like-btn">Like <3</button>
      </div>
      `
    })
  }) // End of initial Fetch

  newToyForm.addEventListener("submit", function(event){
    event.preventDefault()
    const nameInput = newToyForm.querySelector('#nameInput').value
    const imageInput = newToyForm.querySelector('#imageInput').value

    pessimisticallyPostToy(nameInput, imageInput)
  })  // End of newToy Listener

  toyCollection.addEventListener("click", function(event){
    event.preventDefault()
    if (event.target.classList.contains("like-btn")){
      const likes = event.target.previousElementSibling
      const likeAmt = parseInt(likes.innerText)
      const toyID = event.target.dataset.id

      likes.innerHTML = `${likeAmt + 1} Likes`
      fetch(`http://localhost:3000/toys/${toyID}`, {
        method: "PATCH",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likeAmt + 1
        })
      })
    }

  })  // End of toyCollection Listener



  //HELPER FUNCTIONS
  function fetchHelper(method, body){
    fetch(`http://localhost:3000/toys`, {
      method: method,
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: body
    })
  } // End of fetchHelper

  const pessimisticallyPostToy = (name, image) => {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
      {
        "name": name,
        "image": image,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(toy => {
      toyCollection.innerHTML += `
      <div class="card">
        <h2>${toy.name}</h2>
        <img width="100%" src="${toy.image}"/>
        <p>${toy.likes} Likes </p>
        <button data-id=${toy.id} class="like-btn">Like <3</button>
      </div>
      `
    })
  }
})  // End of DOMContentLoaded
