const form = document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textarea = document.getElementById("textarea");
const msg = document.getElementById("msg");
const tasks = document.getElementById("tasks");
const add = document.getElementById("add");

// 3.a-creating empty array to collect all the information of form - title, date, description
let data = [];


// 5.e - click on button -> 1- form validation -> if success ->store the data in local storage and call (acceptData) function -> display data on the screen

// 1. Form validation
form.addEventListener('submit', (event) =>{
    // by default behaviour of form is it refreshes the page when submitted so to prevent this add event.preventDefault()
    event.preventDefault();
    // console.log("Form submited :", event);

    // calling the function
    formValidation();
});

// 2. creating the formValidation function
const formValidation = () => {
    // if the textInput value is empty => show error message
    if(textInput.value === "" ){
        console.log("Failure");
        // adding the error msg to the empty div- msg
        msg.textContent = "Task cannot be blank";
    }
    // console.log("textInput", textInput.value);
    // else success
    else{
        console.log("Success");
        // textContent is empty in case of success
        msg.textContent = "";

        // 3.f- calling the function we are successfully submit the form  - call the acceptData function.
        acceptData();

        // 4. Closing the modal when clicking on the add button using the property - data-bs-dismiss
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        // 4.a- IIFE- self calling function
        // remove the data-bs-dismiss property from the button when clicking it and submit the form
        (() => {
            // removing from the modal
            add.setAttribute("data-bs-dismiss", "");
        })

    }
};


// 3. Collecting the data and store it in local storage
// 3.b - create a function that accepts the data
// this function push the data inside the array
const acceptData = () => {
    //3.c- creating object to store the user input
    const task = {
        text : textInput.value,
        date : dateInput.value,
        description : textarea.value,
    };
    // 3.d- push inside the array
    data.push(task);

    // 3.e - store in local storage
    localStorage.setItem("tasks", JSON.stringify(data));
    console.log(data);

    // 5.f - call the function createtask
    createTasks();

    // 6.a - calling the resetForm function
    resetForm();
};

// sample input of information that will be store in the array named as - (data)

// [
//   {
//     text: "Task 1",
//     date: "2021-07-20",
//     description: "This is the first task",
//   },
//   {
//     text: "Task 2",
//     date: "2021-07-20",
//     description: "This is the first task",
//   },
// ];


// 5. displaying the data on the screen

//5.a-  this function will append the data to the (tasks) div in the html structure

const createTasks = () => {
    //5.b- first tasks div is empty
    tasks.innerHTML = "";
    //5.c- getting the data from the (data) array
    data.map((task, index) => {
        return (
            //5.d - appending the task data
            tasks.innerHTML += `
            <div id=${index}>
            <span class="fw-bold">${task.text}</span>
            <span class="text-secondary small-text">
               ${task.date}
            </span>
            <p>${task.description}</p>
            
            <span class="options">
            
                <i class="fa-solid fa-edit" onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"></i>

                <i class="fa-solid fa-trash" onclick="deleteTask(this)"></i>
            </span>
        </div>
    
        `);
        // 8.c- adding the property data-bs-toggle="modal" data-bs-target="#form" in the edit task to open the same  when click on it
    });

};




// 6. - create a function that will reset the form because the old task data is present when we click on the + button

const resetForm = () => {
    // male all fields empty
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};


// 7. delete a task
 const deleteTask = (e) => {
    // console.log(e);
    // to get the parent element and delete it which is the - div
    // console.log("e", e.parentElement.parentElement);

    // 7.a - delete the html element from the screen but the data is present in the array
    e.parentElement.parentElement.remove();

    // 7.b- deleting the data from the array also using slpice method
    // splice - element you want to delete (index of the element) and the no. of element you want to delete
    // remove element from the data array
    data.splice(e.parentElement.parentElement.id, 1);

    // 7.c - update the local storage
    localStorage.setItem("tasks", JSON.stringify(data));

 };


//  8.- create edit task

const editTask = (e) => {
    // 8.a- get the selected task which you want to edit
    let selectedTask = e.parentElement.parentElement;

    // 8.b- when clicking on the edit button we want to open the same modal
    // refer above 8.c for this


    // 8.d- set the textInput , dateInput and textarea value to the selected task

    // console.log(selectedTask);

    // get the value of children
    // console.log(selectedTask.children[0].textContent);

    textInput.value = selectedTask.children[0].textContent;

    dateInput.value = selectedTask.children[1].textContent;

    textarea.value = selectedTask.children[2].textContent;

    //8.e- it would add the new element in the array to prevent this - call the deleteTask function inside it
    // when appending the same task with new data the previous task shuld be deleted from the array

    deleteTask(e);
};


// 9. - when refreshing the screen task data should be present - by default when refreshing the whole data is gone

// call the self invoke function

(() => {
    //9.a-  need to store the data equal to data which we get from the local storage
    data = JSON.parse(localStorage.getItem("tasks")) || [];

    // 9.b- displaying in the screen fot that call the createTask function
    createTasks();
    
})();

