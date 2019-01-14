document.addEventListener('DOMContentLoaded', () => {

  /*****************************************************************************
    * All of our variables and data.
  *****************************************************************************/

  const addBtn = document.querySelector('#new-toy-btn')
  const toyForm = document.querySelector('.container')
  const toyContainer = document.querySelector('#toy-collection')
  const toyNameInput = document.querySelector('#input-name')
  const toyImageInput = document.querySelector('#input-image')
  let addToy = false
  let allToys = []


  /*****************************************************************************
    * On load fetch actions
  *****************************************************************************/

  fetch('http://localhost:3000/toys')
  .then((responseObject) => responseObject.json())
  .then((toysJSONData) => {
    allToys = toysJSONData
    // call helper here
    toyContainer.innerHTML = renderAllToys(allToys)
  })

  /*****************************************************************************
   * Event Listeners
  *****************************************************************************/

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      // submit listener here
      toyForm.addEventListener('submit', (e) => {
        e.preventDefault()
        // Post request to add the new toy
        fetch('http://localhost:3000/toys', {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            "name": toyNameInput.value,
            "image": toyImageInput.value,
            "likes": 0
          })
        })
        .then(response => response.json())
        .then(jsonNewToy => {
          allToys.push(jsonNewToy)
          toyContainer.innerHTML = renderAllToys(allToys)
        })
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  toyContainer.addEventListener('click', function(e) {
    if (e.target.tagName === "BUTTON") {
      fetch(`http://localhost:3000/toys/${e.target.parentElement.dataset.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "likes": (allToys.find(toy => toy.id == e.target.parentElement.dataset.id).likes) + 1
        })
      })
      .then(response => response.json())
      .then((jsonToy) => {
        toyIndex = allToys.findIndex(toy => toy.id == jsonToy.id)
        allToys[toyIndex].likes += 1
        toyContainer.innerHTML = renderAllToys(allToys)
      })
    }
  })

}) //DOMContentLoaded END

// FETCH RETURNS DATA AFTER DOM LOADS!!

/*****************************************************************************
* Helper Functions (PURE!) << This means will not cause mutations
*****************************************************************************/

const renderAllToys = (allToys) => {
  return allToys.map((toy) => toyCardHTML(toy)).join('')
}

const toyCardHTML = (toy) => {
  return `
    <div class="card" data-id="${toy.id}">
      <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar" />
      <p>${toy.likes} Likes </p>
      <button data-id="${toy.id}" class="like-btn">Like <3</button>
    </div>
  `;
}
