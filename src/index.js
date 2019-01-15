const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
let allToys = [];

// YOUR CODE HERE
/*************************************
         GET THEM HTML ELEMENTS
***************************************/
const toyCollection = document.querySelector('#toy-collection');
const selectToyForm = document.querySelector('.add-toy-form');
/*************************************
              FETCH DATA
***************************************/
fetch('http://localhost:3000/toys')
.then(response => response.json())
.then(function(parsedJsonObj) {
  // console.log(parsedJsonObj)
  allToys = parsedJsonObj
  render(allToys)
  // parsedJsonObj.forEach(obj =>
  //   toyCollection.innerHTML += addToyCollectionHtml(obj)
  // )
    // console.log(obj)
})
// Add a new toy!
// get the data from the from.
// send the data to the server after the create a new toy button is clicked.
// use fetch() to send a post request to the API
// add a submit event listener on the button at the bottom of the form.
// have the new toy conditionally render to the page
// enusre the fetch request has the appropriate headers
//

/*************************************
         EVENT LISTENERS
***************************************/
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

selectToyForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const inputName = selectToyForm.querySelector('#inputName').value;
  const inputURL = selectToyForm.querySelector('#inputURL').value;
  console.log(inputName, inputURL)
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
        "name": inputName,
        "image": inputURL,
        "likes": 0
    })
  }).then(response => response.json())
    .then(toy => toyCollection.innerHTML += addToyCollectionHtml(toy))

})// end of submit event Listener

toyCollection.addEventListener('click', (event) => {
   // console.log(event.target)
  if (event.target.classList.contains('like-btn')) {
    const likes = event.target.previousElementSibling
    // console.log(likes)
    const likeAmt = parseInt(likes.innerText)
    //need the toy id to be attached to each like button.
    console.log(event)
    const toyID = event.target.dataset.id
    console.log(toyID)
    // console.log(likes.outerHTML)
    likes.innerHTML = `${likeAmt + 1} Likes`
    fetch(`http://localhost:3000/toys/${toyID}`, {
      method: 'PATCH',
      headers:
        {
        //Content type is what type of data headers your are heading.
        'Content-Type': 'application/json',
        //Accept is what the server is expecting to get. This is optional.
        //Accept: "application/json"
        },
      body: JSON.stringify({
        'likes': likeAmt + 1
      })
    })
  }// end of if statement
})

// toyCollection.addEventListener('click', (e) => {
//     if (e.target.classList.contains('like-btn')){
//       const likes = e.target.previousElementSibling
//       const likeAmt = parseInt(likes.innerText)
//       const toyID = e.target.dataset.id
//       likes.innerHTML = `${likeAmt + 1} Likes`
//       fetch(`http://localhost:3000/toys/${toyID}`, {
//         method: "PATCH",
//         headers:
//         {
//           "Content-Type": "application/json",
//           Accept: "application/json"
//         },
//         body: JSON.stringify({
//           "likes": likeAmt + 1
//         })
//       }
//       )
//     }
//   })


/*************************************
         HELPER FUNCTIONS
***************************************/
function addToyCollectionHtml(jsonData) {
   return `<div class="card">
   <h2>${jsonData.name}</h2>
   <img src="${jsonData.image}" class="toy-avatar"/>
   <p>${jsonData.likes} Likes </p>
   <button data-id="${jsonData.id}" class="like-btn">Likes <3</button>
   </div>
   `
}

function render(array) {
  array.forEach(function(el){
    toyCollection.innerHTML += addToyCollectionHtml(el)
  })
}

// console.log(toyCollection)
// OR HERE!
document.addEventListener('DOMContentLoaded', function(event) {
  console.log('Page loaded')
})
