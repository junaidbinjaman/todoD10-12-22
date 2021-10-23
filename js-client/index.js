function getData() {
  // title selection
  const taskTitle = document.getElementById("taskTitle");

  // data load fron DB;
  fetch("http://localhost:3000/taskes")
    .then((res) => res.json())
    .then((data) => {
      // set title
      data.map((element) => {
        const resultArea = document.createElement("div");
        resultArea.innerHTML = `
          <div class="task-title">
            <h1>${element.task}</h1>
          </div>
          <div class="action">
            <button onclick="deleteTask('${element._id}')" >
              <i class="fas fa-trash-alt"></i>
            </button>
            <button onclick="updateDate('${element._id}')">
              <i class="fas fa-edit"></i>
            </button>
          </div>
          `;
        resultArea.classList.add("available-tasked");
        taskTitle.appendChild(resultArea);
      });
    });
}

getData();

document.getElementById(
  "update"
).innerHTML = `<h3>Please select an item to update</h3>`;

const updateDate = (id) => {
  fetch(`http://localhost:3000/update/${id}`)
    .then((res) => res.json())
    .then((data) => {
      const update = document.getElementById("update");
      update.innerHTML = `
    <h3>Update: ${data._id}<h3/>
    <input type="text" value="${data.task}" id="updateTaskInput" />
    <button onclick="updateTask('${data._id}')">Update</button>
    `;
    });
};

// update a product

const updateTask = (id) => {
  const task = document.getElementById("updateTaskInput").value;
  fetch(`http://localhost:3000/updateTask/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
    window.location.reload()
  })
};


// delete a product

const deleteTask = (id) => {
  console.log(id);
  fetch(`http://localhost:3000/delete/${id}`, {
    method: 'DELETE'
  })
  .then(res => res.json())
  .then(data => {
    window.location.reload()
  })
}