const taskForm = document.getElementById("task-form")
const taskList = document.getElementById("task-list")

loadStorageItems()

taskForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const submitInput = document.getElementById("task-input")
    const task = submitInput.value
    console.log(task)

    if (task) {
        taskList.append(createTaskElement(task))
        storeItemInLocalStorage(task)
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

function storeItemInLocalStorage(item) {
    // getItem(key): Recupera el valor almacenado con la clave proporcionada. El valor recuperado es una cadena, por lo que se usa JSON.parse() para convertirlo a un objeto o array.
    const items = JSON.parse(localStorage.getItem("items") || "[]")
    items.push(item)

    // setItem(key, value): Guarda un valor asociado a una clave. El valor debe de ser una cadena de texto, por lo que se usa JSON.stringify() para convertir objetos o arrays a formato JSON.
    localStorage.setItem("items", JSON.stringify(items))
}

function loadStorageItems() {
    const items = JSON.parse(localStorage.getItem("items") || "[]")
    items.forEach( (item) => {
        taskList.appendChild(createTaskElement(item))
    });
}