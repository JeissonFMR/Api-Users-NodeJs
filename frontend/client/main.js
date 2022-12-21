const loadInitialTemplate = () => {
    const template = `
        <h1>Usuarios</h1>
        <form id="user-form">
            <div id="div1">
                <label>Nombre</label>
                <input name="name"/>
            </div>
            <div>
            <label>Apellido</label>
            <input name="lastname"/>
        </div>

            <button type"submit" class="submit">Enviar</button>
        </form>
        <div class="block">
            <ul id="user-list"></ul>
        </div>
        
    `
    const body = document.getElementsByTagName('body')[0]
    console.log(body);
    body.innerHTML = template
}

const getUsers = async () => {
    const response = await fetch('/users')
    const users = await response.json()
    const template = user => `
        <li>
            ${user.name} ${user.lastname} <button data-id="${user._id}">Eliminar</button>
        </li>
    `

    const userList = document.getElementById('user-list')
    userList.innerHTML = users.map(user => template(user)).join('')

    //eliminar
    users.forEach(user => {
        const userNode = document.querySelector(`[data-id="${user._id}"]`)
        userNode.onclick = async e => {
            await fetch(`/users/${user._id}`, {
                method: 'DELETE',
            })
            userNode.parentNode.remove()
            alert('Eliminado con exito')
        }
    })
}

const addFormListener = () => {
    const userForm = document.getElementById('user-form')
    userForm.onsubmit = async (e) => {
        e.preventDefault()

        //buscar todos los valores del formulario
        const formData = new FormData(userForm)
        const data = Object.fromEntries(formData.entries())
        console.log(data);
        if (data.name === '' || data.lastname === '') {
            alert('Debes ingresar los datos completos')
        }
        if (data.name.length <= 2 || data.lastname.length <= 2) {
            alert('Como minimo debe tener 3 caracteres')
        }
        // enviar datos a api
        await fetch('/users', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        userForm.reset()
        getUsers() //pintar usuarios
    }
}
window.onload = () => {
    loadInitialTemplate()
    addFormListener()
    getUsers()

}