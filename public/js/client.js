document.addEventListener('DOMContentLoaded', function () {
    // Function to update the displayed list based on the todos array
    function updateTodoList() {
        const ul = document.querySelector('ul');
        ul.innerHTML = ''; // Clear the current list

        todos.forEach(function (todo, index) {
            const completedClass = todo.completed ? 'completed' : '';

            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" id="todo${index}" class="todo-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>
                <label for="todo${index}" class="todo-label ${completedClass}">${todo.text}</label>
            `;

            ul.appendChild(li);
        });
    }

    // Fetch the initial todos data from the server
    fetch('/initialTodos')
        .then(function (response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(function (data) {
            // Update the displayed list based on the response from the server
            todos = data.todos;
            updateTodoList();
        })
        .catch(function (error) {
            console.error('There was a problem with the fetch operation:', error);
        });


    // Function to update the displayed list based on the todos array
    function updateTodoList() {
        const ul = document.querySelector('ul');
        ul.innerHTML = ''; // Clear the current list

        todos.forEach(function (todo, index) {
            const completedClass = todo.completed ? 'completed' : '';

            const li = document.createElement('li');
            li.innerHTML = `
                <input type="checkbox" id="todo${index}" class="todo-checkbox" data-index="${index}" ${todo.completed ? 'checked' : ''}>
                <label for="todo${index}" class="todo-label ${completedClass}">${todo.text}</label>
            `;

            ul.appendChild(li);
        });
    }

    // Initial list rendering
    updateTodoList();

    // Handle form submission
    const form = document.querySelector('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const inputTodo = document.querySelector('input[name="inputTodo"]').value;
        if (inputTodo) {
            // Send a request to the server to add a new todo item
            fetch('/addTodo', {
                method: 'POST',
                body: JSON.stringify({ text: inputTodo }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function(response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            }).then(function(data) {
                // Update the displayed list based on the response from the server
                todos = data.todos;
                updateTodoList();
            }).catch(function(error) {
                console.error('There was a problem with the fetch operation:', error);
            });

            document.querySelector('input[name="inputTodo"]').value = ''; // Clear the input field
        }
    });
});
