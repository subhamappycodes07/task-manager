const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')

const params = window.location.search
const id = new URLSearchParams(params).get('id')
let temp


const showTask = async () => {
    try {
        const {
            data: { task },
        } = await axios.get(`/api/tasks/${id}`)


        taskIDDOM.textContent = task._id
        taskNameDOM.value = task.name
        temp = task.name
        if (task.completed) {
            taskCompletedDOM.checked = true
        }
    } catch (error) {
        console.log(error)
    }
}

showTask()

editFormDOM.addEventListener('submit', async (e) => {
    editBtnDOM.textContent = 'Loading...'
    e.preventDefault()
    try {
        const taskName = taskNameDOM.value
        const taskCompleted = taskCompletedDOM.checked
        await axios.patch(`/api/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        })
        formAlertDOM.style.display = 'block'
        formAlertDOM.textContent = `success, edited task`
    } catch (error) {
        console.error(error)
        taskNameDOM.value = tempName
        formAlertDOM.style.display = 'block'
        formAlertDOM.innerHTML = `error, please try again`
    }
    editBtnDOM.textContent = 'Edit'
    setTimeout(() => {
        formAlertDOM.style.display = 'none'
    }, 2000)
})