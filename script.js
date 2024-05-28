function getAllBoards() {
  const url = "http://localhost:8000/getAllBoards";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const dashboard = document.getElementById("dashboard");
      // console.log(data);
      data
        .filter((elem) => elem.closed === false)
        .forEach((element) => {
          // console.log(element);
          const url = element.shortUrl;
          // const boardId = url.split("/b/")[1];
          const boardId = element.id;
          const cardDiv = document.createElement("div");
          cardDiv.classList.add("card");

          cardDiv.style.width = "18rem";
          cardDiv.innerHTML = `
                <div class="card-body">
                <div style ="display: flex ; justify-content:space-between" >
                <h5 class="card-title" >
                <div>${element.name}</div></h5>
                <span class = "delete-board" id = ${element.id}>X</span>
  
                </div>
                    <a href="./list-page.html?id=${boardId}" class="btn btn-primary">click here</a>
                </div>`;
          dashboard.appendChild(cardDiv);

          deleteBoard(boardId, cardDiv);
        });
    })

    .catch((err) => {
      console.log(err);
    });
}

function createBoard() {
  let getBtn = document.getElementById("create-button");

  getBtn.addEventListener("click", () => {
    let boardName = prompt("Enter the board name here");

    const url = `http://localhost:8000/createBoard/${boardName}`;
    fetch(url, { method: "POST" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // console.log(response)
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        // console.log(data);
        const dashboard = document.getElementById("dashboard");
        const url = data.shortUrl;
        // console.log(url);
        // const boardId = url.split("/b/")[1];
        const boardId = data.id;
        let cardDiv = document.createElement("div");
        console.log("caed", cardDiv);
        cardDiv.classList.add("card");

        cardDiv.style.width = "18rem";
        cardDiv.innerHTML = `
              <div class="card-body">

              <div style ="display: flex ; justify-content:space-between" >
              <h5 class="card-title" >
              <div>${data.name}</div></h5>
              <span class = "delete-board" id = ${data.id}>X</span>

              </div>
              <a href="./list-page.html?id=${boardId}" class="btn btn-primary">click here</a>
              </div>`;
        // deleteBoard(boardId, cardDiv);
        dashboard.appendChild(cardDiv);
      })

      .catch((error) =>
        console.log("Oops, error occurred. Error is: " + error)
      );
  });
}

function deleteBoard(boardId, cardDiv) {
  if (boardId == undefined) return;
  let span = document.getElementById(boardId);
  // console.log(span);
  span.addEventListener("click", () => {
    const url = `http://localhost:8000/deleteBoard/${boardId}`;
    fetch(url, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        // console.log(response)
        return response.json(); // Parse the JSON response
      })
      .then((data) => {
        console.log(cardDiv);
        // window.location.reload();
        cardDiv.remove();
      })
      .catch((error) => {
        console.log("Error while deleting");
      });
  });
}

getAllBoards();
createBoard();
deleteBoard();
