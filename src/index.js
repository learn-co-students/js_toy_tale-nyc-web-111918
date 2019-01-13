const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyName = document.querySelector("#new-toy-name")
const newToyUrl = document.querySelector("#new-toy-url")
const createBtn = document.querySelector("#submit-button")
const toyContainer = document.querySelector("#toy-collection")
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', (e) => {
  // hide & seek with the form

  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
//not needed since the JS is loaded after the HTML
document.addEventListener("DOMContentLoaded", function(event) {
  console.log("DOM fully loaded and parsed");


  //fetch the JSON ---Step2
  fetch("http://localhost:3000/toys")
  .then(function(response) {
  return response.json()})
  .then(function(toysJSON) {
    console.log(toysJSON)
    loadUpToys(toysJSON)
  })

  //append it to the toyContainer ---Step3
  function loadUpToys(toysJSON){
    toysJSON.forEach(function(toy){
      toyContainer.innerHTML += `
        <div class="card" data-id = ${toy.id}>
        <h2>${toy.name}</h2>
        <img src="${toy.image}" alt="${toy.name}" class= "toy-avatar">
        <p> ${toy.likes}</p>
        <button data-id="${toy.id}" class="like-btn">Like ❤️</button>
        </div>
      `
    })
  }



  //adding new toys to database ---step4
  createBtn.addEventListener('click', (event) => {
    // event.preventDefault()
      fetch("http://localhost:3000/toys",{
        method: "POST",
        headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            name: newToyName.value,
            image: newToyUrl.value,
            likes: 0
          })
          //can stop the page from reloading and update the dom, set the form back to hidden
      })
  })

  //Increase Toy's likes ---step5
  toyContainer.addEventListener("click", function(event){
    let currentLikes = parseInt(event.target.parentElement.children[2].innerHTML)
    if (event.target.classList.contains("like-btn")){
      currentLikes = currentLikes + 1
      fetch(`http://localhost:3000/toys/${event.target.dataset.id}`,{
        method: "PATCH",
        headers:
          {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            likes: parseInt(currentLikes)
          })
      })
      .then(function() {
        event.target.parentElement.children[2].innerHTML = `${parseInt(currentLikes)}`;
      })
    }
  })

})
