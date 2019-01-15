let allToys = []
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener("DOMContentLoaded", () => {
  const addToyForm = document.querySelector('.add-toy-form')
  const newToyName = toyForm.querySelector('#inputName')
  const newToyImage = toyForm.querySelector('#inputURL')
  const toyCollection = document.querySelector('#toy-collection')
  const apiURL = "http://localhost:3000/toys"

  fetch(apiURL)
    .then(resp => resp.json())
    .then(toysJSON => toysJSON.forEach((toy) => {
      toyCollection.innerHTML += `
        <div class="card">
          <h2>${toy.name}</h2>
          <img src=${toy.image} class="toy-avatar">
          <p>${toy.likes} Likes</p>
          <button data-id=${toy.id} class="like-btn">Like <3</button>
        </div>
      `
    }))

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newToyName.value,
        "image": newToyImage.value,
        "likes": 0
      })
    })
    .then(resp => resp.json())
    // pessimistic rendering
    .then((json) => {
      console.log(json);
      toyCollection.innerHTML += `
      <div class="card">
      <h2>${json.name}</h2>
      <img src=${json.image} class="toy-avatar">
      <p>0 Likes</p>
      <button class="like-btn">Like <3</button>
      </div>
      `
    })
  })

  toyCollection.addEventListener("click", (e) => {
    e.preventDefault()
    const likeText = e.target.previousElementSibling
    const likeNum = parseInt(likeText.innerText)
    const toyId = e.target.dataset.id

    if (e.target.classList.contains('like-btn')) {
      likeText.innerHTML = `${likeNum + 1} Likes`
      // optimistic rendering
      fetch(`http://localhost:3000/toys/${toyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": likeNum + 1
        })
      })
      .then(resp => resp.json())
    }
  })








// event listener for new toy form
// addToyForm.addEventListener("submit", (e) => {
//   e.preventDefault()
//   toyCollection.innerHTML += `
//     <div class="card">
  //     <h2>${newToyName.value}</h2>
  //     <img src=${newToyImage.value} class="toy-avatar" />
  //     <p>0 Likes </p>
  //     <button class="like-btn">Like <3</button>
//     </div>
//   `
//   connectAPI("POST", {
//     "name": newToyName.value,
//     "image": newToyImage.value,
//     "likes": 0
//   })
//   .then(resp => resp.json())
// }) // end of form event listener


// start of 'Like' button event listeners
// toyCollection.addEventListener("click", (e) => {
//   if (e.target.classList.contains('like-btn')) {
//     const likes = e.target.previousElementSibling
//     const likeNum = parseInt(likes.innerText)
//     const toyId = e.target.dataset.id
//     likes.innerHTML = `${likeNum + 1} Likes`
//
//     fetch(`http://localhost:3000/toys/${toyId}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json"
//       },
//       body: JSON.stringify({
//         "likes": likeNum + 1
//       })
//     })
//     .then(resp => resp.json())
//   }
// })

// ****************************************************
// Helper Functions (NOT PURE)
// function connectAPI(method, body) {
//   return fetch(apiURL, {
//     method: method,
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json"
//     },
//     body: JSON.stringify(body)
//   })
// }
// ****************************************************

// ****************************************************
// Helper Functions (PURE)
// function get() {
//   return fetch(apiURL)
//   .then(resp => resp.json())
// }
// ****************************************************

}) // end of DOMContentLoaded

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
