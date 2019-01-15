const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection =  document.querySelector('#toy-collection')
const toyCard = document.querySelector('card')
const header = new Headers({
  'Content-Type': "application/json",
  Accept: "application/json"
})


let addToy = false

// YOUR CODE HERE

function htmlFormatter(toy){
  return `
  <div id ="${toy.id}" class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar" />
    <p>${toy.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  `
}

function toyParser(toys){

  toys.forEach(function(toy){
    toyCollection.innerHTML += htmlFormatter(toy)
  })
}

fetch('http://localhost:3000/toys/')
.then(rev => rev.json())
.then(toys => toyParser(toys))




addBtn.addEventListener('click', () => {
  // hide & seek with the form
  console.log(event.target)
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

toyForm.addEventListener('submit', () => {
  event.preventDefault()
  const nameInput = document.querySelector('#name-input').value
  const imgInput = document.querySelector('#img-input').value
  console.log(imgInput)


  fetch('http://localhost:3000/toys/', {
    method: "POST",
    headers: header,
    body:
     JSON.stringify({
      "name": nameInput,
      "image": imgInput,
      "likes": 0
      })
    })
    .then(rev => rev.json())
    .then(toys => toyCollection.innerHTML += htmlFormatter(toys))
  })

toyCollection.addEventListener('click', () => {
  if(event.target.classList.value === 'like-btn'){
    const likes = parseInt(event.target.previousElementSibling.innerHTML)
    const toyID = event.target.parentElement.id
    event.target.previousElementSibling.innerHTML = `${likes + 1} Likes`

    fetch(`http://localhost:3000/toys/${toyID}`, {
      method: "PATCH",
      headers: header,
      body:
       JSON.stringify({

        "likes": likes + 1
        })
      })
      .then(rev => rev.json())

  }


})





// OR HERE!
