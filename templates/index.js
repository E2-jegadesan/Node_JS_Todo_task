// Query Selector
const textInput = document.querySelector('.input-text');
const addbtn = document.querySelector('.add-button');
let addtasklist = document.getElementById('todoLists');
const filterOption = document.querySelector('.tab');
filterOption.addEventListener("click", filterTodo);

// Global varibles
let newdata = [];
let choice = "ADD"
let EditedIndex;

function getcall(){
    let html = '';
    if (newdata.length > 0) {
        newdata.forEach((item) => {
            html += `<div class="todo ${item.completed ? 'completed' : ''}">
                    <li class="todo-item">${item.datas}</li>
                    <button type="button"  class="complete-btn" onclick="Taskstatus('${item._id}','${item.completed}')"><i class="fas fa-check"></i></button>
                    <button type="button"  class="edit-btn" onclick="updatedata('${item._id}','${item.datas}')"><i class="fas fa-edit" ></i></button>
                    <button type="button"  class="trash-btn" onclick="removedata('${item._id}')"><i class="fas fa-trash"></i></button>     
                    </div>`
        });
    } else {
        html += `<div class="todo1">
                    <li class="todo-items">No record found</li>     
                    </div>`
    }
    addtasklist.innerHTML = html;
}

// ADD Function
document.addEventListener("DOMContentLoaded", () => {
    addbtn.addEventListener("click", (e) => {
        const items = textInput.value.trim();
        if (choice === "ADD") {
            e.preventDefault();
            if (items == 0) {
                const msg = "Please Enter the Task"
                const error = document.getElementById('error');
                error.innerHTML = msg

                setTimeout(() => {
                    const msg = ""
                    const error = document.getElementById('error');
                    error.innerHTML = msg
                }, 2000);

                return;
            } else {
                fetch('http://localhost:3000/addTask', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        datas: textInput.value
                    }),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        if(data.status == 'Success'){
                            iziToast.success({
                                title: 'Success',
                                message: data.message,
                                position: 'topRight'
                            });
                        }else{
                            iziToast.error({
                                title: 'Failure',
                                message: data.message,
                                position: 'topRight'
                            });
                        }
                    })

                    .catch((error) => {
                        iziToast.error({
                            title: 'Error',
                            message: 'Something went wrong',
                            position: 'topRight'
                        });
                    });
                textInput.value = '';
                gettodos();

            }
        } 
        if (choice === "SAVE") {
            choice = "ADD"
            addbtn.innerHTML = '<i class="fas fa-plus-square"></i>'
            var Data = newdata
            var InputValue = EditedIndex;
            for (var i = 0; i < Data.length; i++) {
                if (InputValue == Data[i]._id) {
                    var EditedInput = document.getElementById("InputText").value.trim();
                    fetch('http://localhost:3000/tasks/taskUpdated', {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            datas: EditedInput,
                            _id: InputValue
                        }),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            if(data.status == 'Success'){
                                iziToast.success({
                                    title: 'Success',
                                    message: data.message,
                                    position: 'topRight'
                                });
                            }else{
                                iziToast.error({
                                    title: 'Failure',
                                    message: data.message,
                                    position: 'topRight'
                                });
                            }
                           
                            gettodos();
                        })
                        .catch((error) => {
                            iziToast.error({
                                title: 'Error',
                                message: 'Something went wrong',
                                position: 'topRight'
                            });
                        });
                }
            }
        }
        textInput.value = '';
    });
    gettodos();
});
// Todo List button function
addtasklist.addEventListener('click', function (e) {
    const item = e.target;
    if (item.classList[0] === "complete-btn") {
        const newdata = item.parentElement;
        newdata.classList.toggle("completed");
    }
});
// Display todos Function
const gettodos = async function () {

    await fetch('http://localhost:3000/fetchTask', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then((response) => response.json())
        .then((data) => {
            newdata = data;
            if(data.status == 'Success'){
                return;
            }
        
        })
        .catch(() => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong',
                position: 'topRight'
            });
        })
        getcall()
        Taskstatus();
}
// Task Complete or Incomplete Button Function
function Taskstatus(value, done) {
    var id = value
    if (done === "false") {
        done = "true";
        fetch('http://localhost:3000/tasks/taskUpdated', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: done,
                _id: id
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status == "Success"){
                    iziToast.success({
                        title: 'Success',
                        message: data.message,
                        position: 'topRight'
                    });
                }else{
                    iziToast.error({
                        title: 'Failure',
                        message: data.message,
                        position: 'topRight'
                    });
                }
                gettodos();
            })
            .catch(() => {
                iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                    position: 'topRight'
                });;
            });
    }
    else if (done === "true") {
        done = "false";
        fetch('http://localhost:3000/tasks/taskUpdated', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                completed: done,
                _id: id
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.status == "Success"){
                    iziToast.success({
                        title: 'Success',
                        message: data.message,
                        position: 'topRight'
                    });
                }else{
                    iziToast.error({
                        title: 'Failure',
                        message: data.message,
                        position: 'topRight'
                    });
                }
                gettodos();
            })
            .catch((error) => {
                iziToast.error({
                    title: 'Error',
                    message: 'Something went wrong',
                    position: 'topRight'
                });
            });
    }
}
// Edit Function
function updatedata(value,data) {
    var todoIndex = data;
    textInput.value = todoIndex;
    
    choice = "SAVE"
    EditedIndex = value
    addbtn.innerHTML = '<i class="fas fa-save"></i>'
}
// Remove Function
function removedata(value) {
    fetch('http://localhost:3000/tasks/deleteTask', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            _id: value
        }),

    })
        .then((response) => response.json())
        .then((data) => {
            if(data.status == 'Success'){
                iziToast.success({
                    title: 'Success',
                    message: data.message,
                    position: 'topRight',
                });
            }else{
                iziToast.error({
                    title: 'Failure',
                    message: data.message,
                    position: 'topRight',
                });
            }
            
            gettodos();
        })
        .catch((error) => {
            iziToast.error({
                title: 'Error',
                message: 'Something went wrong',
                position: 'topRight'
            });
        })
}
// Filter Tab Function
function tabs(tabIndex) {
    document.getElementById('tab1').style.display = "inline";
    document.getElementById('tab2').style.display = "inline";
    document.getElementById('tab3').style.display = "inline";

    document.getElementById('tab' + tabIndex).style.display = "inline";
    if (tabIndex == 1) {
        document.getElementById('tab' + 3).classList.remove("active");
        document.getElementById('tab' + 2).classList.remove("active");
    } else if (tabIndex == 2) {
        document.getElementById('tab' + 1).classList.remove("active");
        document.getElementById('tab' + 3).classList.remove("active");
    } else if (tabIndex == 3) {
        document.getElementById('tab' + 1).classList.remove("active");
        document.getElementById('tab' + 2).classList.remove("active");
    }
    document.getElementById('tab' + tabIndex).classList.add("active");
}
// Filter todo Function
function filterTodo(e) {
    const todos = addtasklist.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "taball":
                todo.style.display = "flex";
                break;
            case "tabcompleted":
                if (newdata == 0) {
                    todo.style.display = "flex"
                }
                else if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "tabuncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}