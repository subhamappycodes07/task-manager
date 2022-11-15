const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')
const taskDeleteBtn = document.querySelector('.delete-btn')


const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const { data: { tasks } } = await axios.get('/api/tasks')
    // console.log(tasks);
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }

    tasksDOM.innerHTML = tasks.map((task) => {
      return `<div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
            "
          >
            <h5 style="display:flex; align-items: center;">
              <span
                ><i
                  class="far fa-check-circle"
                  style='margin-right: 5px ;display:none; ${task.completed && "display:block"}'
                ></i></span
              ><p style='${task.completed && "text-decoration: line-through"}'>${task.name}</p>
            </h5>
            <div>
              <a href="task.html?id=${task._id}"><i class="fas fa-edit"></i></a>
              <button type="button" class="delete-btn" onclick ="deleteTask(this)" delete_id=${task._id}>
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>`
    }).join('')


  } catch (error) {
    tasksDOM.innerHTML = '<h5>Task:Something wrong here...</h5>'
  }
  loadingDOM.style.visibility = 'hidden'
}

showTasks()

formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const taskName = taskInputDOM.value
  try {
    await axios.post('/api/tasks', { name: taskName })
    showTasks()
    taskInputDOM.value = ""
    formAlertDOM.style.display = "block"
    formAlertDOM.textContent = `Task added succesfully`
  } catch (error) {
    formAlertDOM.style.display = "block"
    formAlertDOM.textContent = `form add: something wrong here`
  }

  setTimeout(() => {
    formAlertDOM.style.display = "none"
  }, 2000)
})


async function deleteTask(e) {
  const id = e.attributes.delete_id.value
  try {
    await axios.delete(`/api/tasks/${id}`)
    showTasks()
  } catch (error) {
    console.log(error)
  }
}