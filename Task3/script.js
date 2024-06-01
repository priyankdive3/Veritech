const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;

        // Create delete button
        let deleteSpan = document.createElement("span");
        deleteSpan.textContent = "\u00D7"; // Unicode for '×'
        deleteSpan.className = "delete";
        li.appendChild(deleteSpan);

        // Create edit button
        let editSpan = document.createElement("span");
        editSpan.innerHTML = "&#9998;"; // HTML entity for pencil icon (✎)
        editSpan.className = "edit";
        li.appendChild(editSpan);

        listContainer.appendChild(li);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.classList.contains("delete")) {
        e.target.parentElement.remove();
        saveData();
    } else if (e.target.classList.contains("edit")) {
        let li = e.target.parentElement;
        let newValue = prompt("Edit your task:", li.firstChild.textContent);
        if (newValue !== null && newValue.trim() !== "") {
            li.firstChild.textContent = newValue;
            saveData();
        }
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTask();
