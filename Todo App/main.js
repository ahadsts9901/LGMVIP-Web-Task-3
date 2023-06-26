
function makeCol(event){
    event.preventDefault()
    
    let container = document.querySelector(".container")
    let input = document.getElementById("colInput")
    
    if(input.value === ""){
        return
    }

    let list = document.createElement("div")
    list.className += " col"

    let listH = document.createElement("h2")
    listH.className += " listH"
    listH.innerText = input.value
    list.appendChild(listH)

    let row = document.createElement("div")
    row.className += " row-left"
    list.appendChild(row)

    let del = document.createElement("p")
    // del.style.color = "#000"
    del.innerHTML = `<i class="bi bi-trash"></i>`
    row.appendChild(del)

    let edit = document.createElement("p")
    // del.style.color = "#000"
    edit.innerHTML = `<i class="bi bi-pencil"></i>`
    row.appendChild(edit)

    let comment = document.createElement("p")
    // del.style.color = "#000"
    comment.innerHTML = `<i class="bi bi-chat-left-text"></i>`
    row.appendChild(comment)

    let form = document.createElement("form")
    form.addEventListener('submit', makeTask)
    list.appendChild(form)

    let taskInp = document.createElement("input")
    taskInp.setAttribute("type", "text")
    taskInp.className += " taskInp"
    taskInp.setAttribute("placeholder", "New Task")
    form.appendChild(taskInp)

    let taskbtn = document.createElement("button")
    taskbtn.className += " taskbtn"
    taskbtn.innerText = "+ Add"
    form.appendChild(taskbtn)

    let taskCont = document.createElement("div")
    taskCont.className += " taskCont"
    list.appendChild(taskCont)

    container.appendChild(list)
    input.value = ""
}

function makeTask(event){
    event.preventDefault()
}