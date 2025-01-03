const taskForm = document.getElementById("task-form")
const taskList = document.getElementById("task-list")

taskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const submitInput = document.getElementById("task-input")
    const task = submitInput.value
    console.log(task)

    if (task) {
        taskList.append(createTaskElement(task))
        submitInput.value = ''
    }
})

function createTaskElement(task) {
    const li = document.createElement('li')
    li.textContent = task
    li.append(createButton('❌','delete-btn'), createButton('✏️','edit-btn'))
    return li
}

function createButton(text, className) {
    const btn = document.createElement('span')
    btn.textContent = text
    btn.className = className
    return btn
}

taskList.addEventListener("click", ((event) => {
    if (event.target.classList.contains("delete-btn")) {
        deleteItem(event.target.parentElement)
    } else if (event.target.classList.contains("edit-btn")){
        editItem(event.target.parentElement)
    }

}))

function deleteItem(item) {
    if (confirm("Estás seguro de eliminar el elemento?")){
        item.remove()
    }
}

function editItem(item) {
    const newItem = prompt("Edita el item:", item.firstChild.textContent)
    if (newItem !== null) {
        item.firstChild.textContent = newItem
    }
}

function setItemInLocalStorage(item) {
    const items = JSON.parse(localStorage.getItem("items") || "[]")
    
}