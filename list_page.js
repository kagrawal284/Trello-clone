function getLists() {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get("id");
  console.log(boardId);
  const url = `http://localhost:8000/getLists/${boardId}`;
  fetch(url, { method: "GET" })
    .then((data) => {
      // console.log(data);
      return data.json();
    })

    .then((data) => {
      console.log(data);
      const list_group = document.getElementById("list-display");
      data.forEach((element) => {
        console.log(element);
        const listId = element.id;
        const listDiv = document.createElement("ul");

        listDiv.classList.add("list-group");
        // <h5 class="card-title"> ...</h5>
        // <a href="./list-page.html?id=${listId}" class="btn btn-primary">click here</a>

        //   listDiv.style.width = "18rem";
        listDiv.innerHTML = `
          <div class = "card" id = ${listId} style="width: 22rem ">
          
                <div class="card-body">
                <h5 class="card-title"> 
                <div class="alert alert-primary" role="alert" style ="display: flex ; justify-content:space-between" >
                   <div> ${element.name}</div>
                   <span class ="delete-list" id = ${listId}>X</span>
                </div>
                </h5>
        
                </div>

                <div class = "li-div"></div>

        
        </div>`;

        list_group.appendChild(listDiv);
        deleteList(listId, listDiv);
      });
    })
    .catch((err) => console.log(err));
}

function createList() {
  let getBtn = document.getElementById("create-button");
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get("id");

  getBtn.addEventListener("click", () => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const boardId = urlParams.get("id");

    let listName = prompt("Enter the list name here");

    const url = `http://localhost:8000/createList/${boardId}/${listName}`;
    fetch(url, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // console.log(response)
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log(data);
        const list_group = document.getElementById("list-display");
        const listId = data.id;
        const listDiv = document.createElement("ul");

        listDiv.classList.add("list-group");
        // <h5 class="card-title"> ...</h5>
        // <a href="./list-page.html?id=${listId}" class="btn btn-primary">click here</a>

        //   listDiv.style.width = "18rem";
        listDiv.innerHTML = `
          <div class = "card" id = ${listId} style="width: 22rem ">
          
                <div class="card-body">
                <h5 class="card-title"> 
                <div class="alert alert-primary" role="alert" style ="display: flex ; justify-content:space-between" >
                <div> ${data.name}</div>
                <span class ="delete-list" id = ${listId}>X</span>
             </div>
                </h5>
        
                </div>

                <div class = "li-div"></div>

        
        </div>`;

        list_group.appendChild(listDiv);
      })

      .catch((error) =>
        console.log("Oops, error occurred. Error is: " + error)
      );
  });
}

function deleteList(listId, listDiv) {
  if (listId == undefined) return;
  let span = document.getElementById(listId);
  console.log(`Spans of list`, span);
  span.addEventListener("click", () => {
    const url = `http://localhost:8000/deleteList/${listId}`;
    fetch(url, { method: "PUT" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // console.log(response)

        return response; // Parse the JSON response
      })
      .then((data) => {
        // window.location.reload();
        listDiv.remove();
      })
      .catch((error) => {
        console.log("Error while deleting list");
      });
  });
}

function getCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const boardId = urlParams.get("id");
  const url = `http://localhost:8000/getLists/${boardId}`;
  fetch(url, { method: "GET" })
    .then((data) => {
      // console.log(data);
      return data.json();
    })
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        // console.log(element);
        let listId = element.id;
        console.log(`Hello list Ids`, listId);
        const getCardUrl = `http://localhost:8000/getCards/${listId}`;
        fetch(getCardUrl, { method: "GET" })
          .then((data) => {
            // console.log(data);
            return data.json();
          })
          .then((data) => {
            // console.log(data);
            console.log(`Hello!`, listId);
            const listForCards = document.getElementById(listId);
            const li_div = listForCards.querySelector(".li-div");
            console.log(`li_div is`, li_div);
            console.log(listForCards);

            data.forEach((card) => {
              const li = document.createElement("div");

              const cardId = card.id;
              li.id = cardId;
              const cardName = card.name;
              console.log(cardName);

              li.innerHTML = `
                
              

                <div class="alert alert-light" role="alert" style ="display: flex ; justify-content:space-between" >
                   <div> ${cardName}</div>
                   <span class ="delete-card" id = ${cardId}>X</span>
                </div>
                
              
              `;
              // listForCards.appendChild(li);
              li_div.append(li);
              // listForCards.appendChild(li);

              deleteCard(cardId, li);
            });

            const addDiv = document.createElement("div");
            addDiv.innerHTML = `

            <div class="card-body">
            <button type="button" class="btn btn-primary"  id ="add-card-button${listId}">Add a card</button>
            </div>
            `;

            listForCards.appendChild(addDiv);
            createCard(listId);
          })
          .catch((error) => console.log(error));
      });
    });
}

// let getBtn = document.getElementById("add-card-button");
// console.log(getBtn);

function createCard(listId) {
  if (listId == undefined) return;
  console.log("insid create btn of card");

  let getBtn = document.getElementById(`add-card-button${listId}`);
  console.log("getBtn elements", getBtn);

  getBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    // const urlParams = new URLSearchParams(window.location.search);
    // const boardId = urlParams.get("id");
    console.log("inside add card");
    let cardName = prompt("Enter the card name here");
    // console.log

    const url = `http://localhost:8000/createCard/${listId}/${cardName}`;
    fetch(url, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // console.log(response)
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log(data);
        const listForCards = document.getElementById(listId);
        console.log("List for cards :", listForCards);
        const li_div = listForCards.querySelector(".li-div");
        const li = document.createElement("div");
        const cardId = data.id;
        li.id = cardId;
        const cardName = data.name;
        console.log(cardName);

        li.innerHTML = `
          <div class="alert alert-light" role="alert" style ="display: flex ; justify-content:space-between" >
             <div> ${cardName}</div>
             <span class ="delete-card" id = ${cardId}>X</span>
          </div>
          `;
        // listForCards.appendChild(li);
        console.log(
          `List for cards conatins button: `,
          listForCards.contains(getBtn)
        );
        li_div.append(li);
      })

      .catch((error) =>
        console.log("Oops, error occurred. Error is: " + error)
      );
  });
}

function deleteCard(cardId, li) {
  if (cardId == undefined) return;
  let span = document.getElementById(cardId);
  console.log(`Spans of card`, span);
  span.addEventListener("click", (e) => {
    e.stopPropagation();
    console.log("on delete card");
    const url = `http://localhost:8000/deleteCard/${cardId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // console.log(response)

        return response; // Parse the JSON response
      })
      .then((data) => {
        // window.location.reload();
        li.remove();
      })
      .catch((error) => {
        console.log("Error while deleting card");
      });
  });
}

getLists();
getCards();
createList();
createCard();
deleteList();
deleteCard();
