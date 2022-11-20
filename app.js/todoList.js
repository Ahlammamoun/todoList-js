//***select items *****/
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn")

//edit option
let editElement;
let editFlag = false;
let editId = "";


//***event listeners**** */
//submit form
form.addEventListener("submit", addItem);

clearBtn.addEventListener('click', clearItems);



//***function *****/
function addItem(e) {
    e.preventDefault();
    const value = grocery.value
    const id = new Date().getTime().toString();
    // console.log(id);
    if (value && !editFlag) {
        //create an element "article"
        const element = document.createElement("article");
        //add class to the element
        element.classList.add("grocery-item");
        //add id to the element
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class='fas fa-edit'></i>
            </button>
            <button type="button" class="delete-btn">
                <i class='fas fa-trash'></i>
            </button>
        </div>`;

        const deletBtn = element.querySelector('.delete-btn');
        const editBtn = element.querySelector('.edit-btn');
        deletBtn.addEventListener('click', deleteItem);
        editBtn.addEventListener('click', editItem);
        //append child
        list.appendChild(element);
        //display alert
        displayAlert("item added to the list", "success");
        container.classList.add("show-container");
        //add to local storage 
        addToLocalStorage(id, value);
        //set back to default
        setBackToDefault();
    }
    else if (value && editFlag) {
        editElement.innerHTML = value;
        displayAlert('value changed', 'success');
        //edit local storage
        editLocalStorage(editId, value);


        setBackToDefault();
    }
    else {
        displayAlert("please enter value", "danger");
    }
}

//display alert
function displayAlert(text, action) {
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);
    //remove alert
    setTimeout(function () {
        alert.textContent = text;
        alert.classList.remove(`alert-${action}`);
    }, 1000)

}

//clear items
function clearItems() {
    const items = document.querySelectorAll('.grocery-item');
    if (items.lenght > 0) {
        items.forEach(function (item) {
            list.removeChild(item);
        });

    }
    container.classList.remove("show-container");
    displayAlert("empty list", "danger");
    setBackToDefault();
    localStorage.removeItem('list');
}


//delete function
function deleteItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if (list.children.length === 0) {
        container.classList.remove("show-container");
    }
    displayAlert("item removed", "danger");
    setBackToDefault();


}

//edit function
function editItem(e) {
    const element = e.currentTarget.parentElement.parentElement;
    // set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editId = element.dataset.id;
    submitBtn.textContent = "edit";
}




//set back to default
function setBackToDefault() {

    grocery.value = '';
    editFlag = false;
    editId = "";
    submitBtn.textContent = "submit";
}
//****local storage ****/
function addToLocalStorage(id, value) {

    const grocery = { id, value };
    let items = getLocalStorage();
    //console.log(items);
    items.push(grocery);
    localStorage.setItem("list", JSON.stringify(items));

    //console.log(grocery);

}
function removeFromLocalStorage(id) {
    let items = getLocalStorage();
    items = items.filter(function (item) {
        if (item.id !== id) {
            return item;
        }
    });
    localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) { }
function getLocalStorage() {
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}