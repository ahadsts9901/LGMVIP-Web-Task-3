let form = document.querySelector("form");
let userInput = document.querySelector(".input");
let listContainer = document.querySelector(".list-container");
let heading = document.getElementById("center");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    heading.style.display = "none";
    let userTodo = userInput.value;

    if (!userTodo) return;

    let newList = document.createElement("div");
    newList.className = "list";
    // newList.setAttribute('draggable', 'true')
    listContainer.appendChild(newList);

    let handle = document.createElement("h1")
    handle.className = "bi bi-grip-horizontal col-handle"
    newList.appendChild(handle)

    let listHeading = document.createElement("h2");
    listHeading.className = "center";
    listHeading.innerText = userTodo;
    newList.appendChild(listHeading);

    let rowSecond = document.createElement("div");
    rowSecond.className = "row-task";
    newList.appendChild(rowSecond);

    let commentButton = document.createElement("p");
    commentButton.setAttribute(
        "class",
        "bi bi-chat-left-text-fill noMargin"
    );
    commentButton.style.fontSize = " 1.2em"
    commentButton.style.color = "#2980b9"
    commentButton.addEventListener("click", commentColumn);
    rowSecond.appendChild(commentButton);

    let deleteButton = document.createElement("p");
    deleteButton.setAttribute(
        "class",
        "bi bi-trash-fill noMargin"
    );
    deleteButton.style.fontSize = " 1.2em"
    deleteButton.style.color = "#e74c3c"
    deleteButton.addEventListener("click", deleteColumn);
    rowSecond.appendChild(deleteButton);

    let editButton = document.createElement("p");
    editButton.setAttribute(
        "class",
        "bi bi-pencil-fill noMargin"
    );
    editButton.style.fontSize = " 1.2em"
    editButton.style.color = "#27ae60"
    editButton.addEventListener("click", editColumn);
    rowSecond.appendChild(editButton);

    let comment = document.createElement("p");
    comment.className += " comment";
    let userComment = "";
    comment.innerText = userComment;
    newList.appendChild(comment);

    let row = document.createElement("div");
    row.className = "row";
    newList.appendChild(row);

    let listInput = document.createElement("input");
    listInput.setAttribute("type", "text");
    listInput.setAttribute("placeholder", "Enter Task...");
    listInput.addEventListener("keypress", makeTaskInput);
    listInput.className = "input-white";
    row.appendChild(listInput);

    let listButton = document.createElement("button");
    listButton.setAttribute("class", "list-button");
    listButton.innerText = "Add +";
    listButton.addEventListener("click", makeTask);
    row.appendChild(listButton);

    let appendedList = document.createElement("div");
    appendedList.className = "scrollable";
    newList.appendChild(appendedList);

    userInput.value = "";

    // Initialize Sortable.js on the list container
    Sortable.create(appendedList, {
        group: "tasks",
        animation: 300,
        handle: ".drag-handle",
    });

    Sortable.create(listContainer, {
        group: "newLists",
        animation: 100,
        handle: ".col-handle",
    });

});

function makeTaskInput(event) {
    if (event.key === "Enter") {
        // console.log(event.key);
        event.preventDefault();

        let submitTask = event.target;
        let userTodo = submitTask.value;
        // console.log(userTodo);
        // console.log(submitTask.previousElementSibling.value);
        let list = submitTask.parentNode.nextSibling;
        // console.log(list);

        if (!userTodo) return;

        let newWork = document.createElement("p");
        newWork.setAttribute("class", "task-flex");
        newWork.className += " task";
        list.appendChild(newWork);

        let taskRow = document.createElement("span");
        taskRow.className += " task-upper-row";
        newWork.appendChild(taskRow);

        newWork.addEventListener("dragstart", () => {
            newWork.className += " is-dragging";
        });

        newWork.addEventListener("dragend", () => {
            newWork.className = "task";
        });

        let span = document.createElement("p");
        span.setAttribute("class", "mine");
        span.innerText = userTodo;
        taskRow.appendChild(span);

        let row = document.createElement("div");
        row.className += " row-task";
        taskRow.appendChild(row);

        let drag = document.createElement("i")
        drag.className = "bi bi-grip-vertical drag-handle task-delete-button"
        row.appendChild(drag)

        let commentTask = document.createElement("i");
        commentTask.className += " bi bi-chat-left-text task-delete-button";
        commentTask.addEventListener("click", commentPresentTask);
        row.appendChild(commentTask);

        let editTask = document.createElement("i");
        editTask.className += " bi bi-pencil task-delete-button";
        editTask.addEventListener("click", editPresentTask);
        row.appendChild(editTask);

        let deleteTask = document.createElement("i");
        deleteTask.className += " bi bi-trash task-delete-button";
        deleteTask.addEventListener("click", deletePresentTask);
        row.appendChild(deleteTask);

        let comment = document.createElement("p");
        comment.className += " task-comment";
        let userComment = "";
        comment.innerText = userComment;
        newWork.appendChild(comment);

        event.target.value = "";

    }
}

function makeTask(event) {
    event.preventDefault();

    let submitTask = event.target;
    let userTodo = submitTask.previousElementSibling.value;
    // console.log(submitTask.previousElementSibling.value);
    let list = submitTask.parentNode.nextSibling;
    // console.log(list);

    if (!userTodo) return;

    let newWork = document.createElement("p");
    newWork.setAttribute("class", "task-flex");
    newWork.className += " task";
    list.appendChild(newWork);

    let taskRow = document.createElement("span");
    taskRow.className += " task-upper-row";
    newWork.appendChild(taskRow);

    let span = document.createElement("p");
    span.setAttribute("class", "mine");
    span.innerText = userTodo;
    taskRow.appendChild(span);

    let row = document.createElement("div");
    row.className += " row-task";
    taskRow.appendChild(row);

    let drag = document.createElement("i")
    drag.className = "bi bi-grip-vertical drag-handle task-delete-button"
    row.appendChild(drag)

    let commentTask = document.createElement("i");
    commentTask.className += " bi bi-chat-left-text task-delete-button";
    commentTask.addEventListener("click", commentPresentTask);
    row.appendChild(commentTask);

    let editTask = document.createElement("i");
    editTask.className += " bi bi-pencil task-delete-button";
    editTask.addEventListener("click", editPresentTask);
    row.appendChild(editTask);

    let deleteTask = document.createElement("i");
    deleteTask.className += " bi bi-trash task-delete-button";
    deleteTask.addEventListener("click", deletePresentTask);
    row.appendChild(deleteTask);

    let comment = document.createElement("p");
    comment.className += " task-comment";
    let userComment = "";
    comment.innerText = userComment;
    newWork.appendChild(comment);

    submitTask.previousElementSibling.value = "";

    // Update draggables and droppables after adding a new task
    let draggables = list.querySelectorAll(".task");
    let droppables = document.querySelectorAll(".scrollable");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.className += " is-dragging";
        });
        task.addEventListener("dragend", () => {
            task.className = "task";
        });
    });

}

function deleteColumn(event) {
    event.stopPropagation();
    let button = event.target;
    let column = button.closest(".list");
    column.remove();
}

function deletePresentTask(event) {
    event.stopPropagation();
    let button = event.target;
    let task = button.closest(".task");
    task.remove();
}

// ...

function editColumn(event) {
    event.stopPropagation();
    let edit = event.target;
    let column = edit.closest(".list");
    let listHeading = column.querySelector("h2");

    Swal.fire({
        title: 'Edit Title',
        input: 'text',
        inputValue: listHeading.innerText,
        showCancelButton: true,
        confirmButtonText: 'Edit',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#212121',
        cancelButtonColor: '#212121',
        inputValidator: (value) => {
            if (!value || value.trim() === "") {
                return 'Please enter a valid title';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            listHeading.innerText = result.value;
        }
    });
}

function editPresentTask(event) {
    event.stopPropagation();
    let editTask = event.target;
    let whatToEdit = editTask.parentNode.parentNode.firstChild;

    Swal.fire({
        title: 'Edit Task',
        input: 'text',
        inputValue: whatToEdit.innerText,
        showCancelButton: true,
        confirmButtonText: 'Edit',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#212121',
        cancelButtonColor: '#212121',
        inputValidator: (value) => {
            if (!value || value.trim() === "") {
                return 'Please enter a valid task';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            whatToEdit.innerText = result.value;
        }
    });
}

function commentColumn(event) {
    event.preventDefault();
    event.stopPropagation();

    let commentButton = event.target;
    let commentContainer = commentButton
        .closest(".list")
        .querySelector(".comment");

    Swal.fire({
        title: 'Enter Comment',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#212121',
        cancelButtonColor: '#212121',
        inputValidator: (value) => {
            if (!value || value.trim() === "") {
                return 'Please enter a valid comment';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let newComment = result.value;

            let comment = document.createElement("p");
            comment.className += " comment";
            commentContainer.appendChild(comment);
            let commentText = document.createElement("p");
            commentText.className += " span-comment";
            commentText.textContent = newComment;
            comment.appendChild(commentText);
            let commentDelete = document.createElement("p");
            commentDelete.innerHTML = "<i class='bi bi-x-octagon-fill'></i>";
            commentDelete.className += " comment-delete-margin";
            commentDelete.addEventListener("click", commentColumnDelete);
            comment.appendChild(commentDelete);
        }
    });
}

function commentPresentTask(event) {
    event.preventDefault();
    event.stopPropagation();

    let commentButton = event.target;
    let commentContainer = commentButton
        .closest(".task")
        .querySelector(".task-comment");

    Swal.fire({
        title: 'Enter Comment',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Add',
        cancelButtonText: 'Cancel',
        confirmButtonColor: '#212121',
        cancelButtonColor: '#212121',
        inputValidator: (value) => {
            if (!value || value.trim() === "") {
                return 'Please enter a valid comment';
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            let newComment = result.value;

            let TaskCommentRow = document.createElement("span");
            TaskCommentRow.className += " comment-row";
            commentContainer.appendChild(TaskCommentRow);
            let comment = document.createElement("p");
            comment.className += " task-comment";
            comment.textContent = newComment;
            TaskCommentRow.appendChild(comment);

            let commentDelete = document.createElement("p");
            commentDelete.innerHTML = "<i class='bi bi-x-octagon-fill'></i>";
            commentDelete.addEventListener("click", deleteTaskComment);
            commentDelete.className += " comment-delete-margin";
            TaskCommentRow.appendChild(commentDelete);
        }
    });
}

function commentColumnDelete(event) {
    event.stopPropagation();
    let button = event.target;
    let column = button.closest(".comment");
    column.remove();
}


function deleteTaskComment(event) {
    event.stopPropagation();
    let button = event.target;
    let column = button.closest(".comment-row");
    column.remove();
}