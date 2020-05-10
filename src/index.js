document.addEventListener('DOMContentLoaded', () => {


  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyCollection = document.querySelector('#toy-collection')
  const addToyForm = document.querySelector('.add-toy-form')
  const likeButton = document.querySelector(`.like-btn`)
  const deleteButton = document.querySelector(`.delete-btn`)
  let addToy = false

  function fetchPokemon() {
  fetch("http://localhost:3000/toys/")
    .then(r => r.json())
    .then((toys) => {
      console.log(toys)
        toys.map(toy => {
          toyCollection.innerHTML += renderToys(toy)
        }).join('')
    })
  }



  function renderToys(toy) {
      return `<div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>like: <span id="likes">${toy.likes}</span></p>
      <button data-id=${toy.id} class="like-btn">Like <3</button>
      <button data-id=${toy.id} class="delete-btn">Delete</button>
      </div>`
  }


  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToyName = document.querySelector('.input-text-name').value
    const newToyUrl = document.querySelector('.input-text-url').value
    fetch("http://localhost:3000/toys/", {
      method: "POST",
      headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
        body: JSON.stringify({
          name: newToyName,
          image: newToyUrl,
          likes: "0"
        })
      })
        .then(r => r.json())
        .then(toy => {
            toyCollection.innerHTML += renderToys(toy)
        }).join('')
    })



  toyCollection.addEventListener('click', (e) => {
      if (e.target.classList =="like-btn") {
      const likes = e.target.previousElementSibling.firstElementChild
      const likeAmt = parseInt(likes.innerText)
      const toyId = e.target.dataset.id
      likes.innerHTML = `${likeAmt + 1}`
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers:
              {
                "Content-Type": "application/json",
                "Accept": "application/json"
              },
        body: JSON.stringify({
          likes: likeAmt + 1
        })
      })
    } // close if statement
  })


  toyCollection.addEventListener('click', (e) => {
    if (e.target.classList.value === "delete-btn") {
      alert("Are you sure?")
        const toyId = e.target.dataset.id
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "DELETE"
      })
      .then(function(){
        window.location.reload()

      })
    }
  })




  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
    } else {
      toyForm.style.display = 'none'
    }
  })


  fetchPokemon()

// OR HERE!

})
