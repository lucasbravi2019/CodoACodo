async function navigation() {
    let response = await fetch("../templates/nav.html")
    let data = await response.text()
    let nav = document.getElementById("nav")
    nav.innerHTML = data
    listeners()
}

async function hero() {
    let response = await fetch("../templates/hero.html")
    let data = await response.text()
    let app = document.getElementById("app")
    app.innerHTML = data
    let products = document.getElementById("tickets")
    products.addEventListener("click", (e) => {
        e.preventDefault()
        if (window.location.hash != "#products") {
            window.location.hash = "#products"
            let app = document.getElementById("app")
            app.innerHTML = tickets()
        }
    })
}

async function tickets() {
    let response = await fetch("../templates/products.html")
    let data = await response.text()
    let app = document.getElementById("app")
    app.innerHTML = data
    let divPadre = document.getElementById("lista")
    listaProductos(divPadre)
}

async function contacto() {
    let response = await fetch("../templates/contact.html")
    let data = await response.text()
    let app = document.getElementById("app")
    app.innerHTML = data
    let submit = document.getElementById("send")
    submitDisabled(submit)
    let nombre = document.getElementById("person")
    let phone = document.getElementById("phone")
    let email = document.getElementById("email")
    nombre.addEventListener('input', function(e) {
        if (e.target.value == "") {
            validateMessage(nombre)
        } else {
            deleteValidateMessage(nombre)
        }
        if (nombre.value != "" && phone.value != "" && email.value != "" && email.value.includes("@")) {
            submitEnabled(submit)
        } else {
            submitDisabled(submit)
        }

    })
    phone.addEventListener('input', function(e) {
        if (e.target.value == "") {
            validateMessage(phone)
        } else {
            deleteValidateMessage(phone)
        }

        if (nombre.value != "" && phone.value != "" && email.value != "" && email.value.includes("@")) {
            submitEnabled(submit)
        } else {
            submitDisabled(submit)
        }
    })
    email.addEventListener('input', function(e) {
        if (e.target.value == "" && !e.target.value.includes("@")) {
            validateMessage(email)
        } else {
            if (!e.target.value.includes("@") && e.target.value != "") {
                validateMessage(email)
            } else {
                deleteValidateMessage(email)
            }
        }
        if (nombre.value != "" && phone.value != "" && email.value != "" && email.value.includes("@")) {
            submitEnabled(submit)
        } else {
            submitDisabled(submit)
        }
    })
    submit.addEventListener("click", function(e) {
        e.preventDefault()
        if (document.getElementById("submitForm") == undefined) {
            var mensaje = document.createElement("p")
            mensaje.setAttribute("id", "submitForm")
            app.prepend(mensaje)
        }
        var mensaje = document.getElementById("submitForm")
        if (nombre.value == "" || phone.value == "" || email.value == "") {
            mensaje.innerText = "Fill all the inputs to send the form"
            mensajeStyleError(mensaje)
        } else {
            if (mensaje.innerText != "Message sent succesfully. We will contact you in a while.") {
                mensaje.innerText = "Message sent succesfully. We will contact you in a while."
            }
            mensajeStyleSuccess(mensaje)
        }
        submitDisabled(submit)
        nombre.value = ""
        phone.value = ""
        email.value = ""
    })
}

function validateMessage(child) {
    if (!document.getElementById(`validate${child.name}`)) {
        var mensaje = document.createElement("p")
        mensaje.setAttribute("id", `validate${child.name}`)
        mensajeStyleError(mensaje)
        var padre = child.parentElement.appendChild(mensaje)
    }
    var mensaje = document.getElementById(`validate${child.name}`)
    mensaje.className = "col-2"
    if (child.value == "" && !child.value.includes("@")) {
        mensaje.innerText = `Please fill the ${child.name}`;
    }
    if (!child.value.includes("@") && child.value != "") {
        mensaje.innerText = "Please enter a valid email"
    }
}

function deleteValidateMessage(child) {
    console.log(child.name)
    if (document.getElementById(`validate${child.name}`)) {
        let mensaje = document.getElementById(`validate${child.name}`)
        mensaje.remove()
    }
}

function mensajeStyleSuccess(mensaje) {
    mensaje.style.cssText = `
    background-color: green; 
    width: 70%;
    padding: .75em;
    margin: 1em auto;
    text-align: center;
    `
}

function mensajeStyleError(mensaje) {
    mensaje.style.cssText = `
    background-color: red; 
    width: 70%;
    padding: .75em;
    margin: 1em auto;
    text-align: center;
    `
}

function submitDisabled(submit) {
    submit.style.opacity = 0.5
    submit.style.cursor = "default"
    submit.disabled = true
}

function submitEnabled(submit) {
    submit.style.opacity = 1
    submit.style.cursor = "pointer"
    submit.disabled = false
}

async function aboutF() {
    let response = await fetch("../templates/about.html")
    let data = await response.text()
    let app = document.getElementById("app")
    app.innerHTML = data
}

async function buy(prod) {
    window.location.hash = "#buy"
    let response = await fetch("../templates/bought.html")
    let data = await response.text()
    let app = document.getElementById("app")
    app.innerHTML = data
    let producto = document.createElement("p")
    let numberTickets = document.createElement("p")
    numberTickets.innerText = "Number of tickets"
    let quantity = document.createElement("input")
    quantity.setAttribute("type", "number")
    quantity.setAttribute("min", 0)
    quantity.setAttribute("value", 0)
    quantity.style.cssText = "padding: 0.5em; text-align: center;"
    let pay = 0
    let total = document.createElement("p")
    total.innerText = "Total: $ 0.00"
    let payButton = document.createElement("button")
    payButton.setAttribute("type", "submit")
    payButton.style.cssText = `
    display: block;
    width: max-content;
    margin: 0 auto;
    border: 2px solid var(--border-color);
    padding: 0.75em;
    color: var(--secondary-color)
    `
    payButton.setAttribute("href", "#bought")
    payButton.innerText = "Pay"
    submitDisabled(payButton)
    console.log(payButton)
    quantity.addEventListener("input", (e) => {
        pay = quantity.value
        total.innerText = "Total: " + pay * prod.precio
        if (e.target.value > 0) {
            submitEnabled(payButton)
        } else {
            submitDisabled(payButton)
        }
    })
    let precio = document.createElement("p")
    producto.innerText = "Flying ticket with destiny: " + prod.destino
    precio.innerText = "Price: $ " + prod.precio
    let buy = document.getElementById("buy")
    buy.appendChild(producto)
    buy.appendChild(numberTickets)
    buy.appendChild(quantity)
    buy.appendChild(precio)
    buy.appendChild(total)
    buy.appendChild(payButton)
    payButton.addEventListener("click", (e) => {
        e.preventDefault()
        payButton.disabled = true
        bought()
        payButton.style.opacity = 0.5

    })
    console.log(prod)
}

async function bought() {
    window.location.hash = "#bought"
    let app = document.getElementById("app")
    let message = document.createElement("h3")
    message.style.cssText = `
    background-color: green;
    text-align: center;
    font-weight: bold;
    margin: 0 auto;
    width: 50%;
    padding: .75em;
    color: var(--main-color);
    `
    message.innerText = "Ticket bought successfully"
    console.log(message)
    app.innerHTML = ""
    app.appendChild(message)
}

async function footer() {
    let response = await fetch("../templates/footer.html")
    let data = await response.text()
    let footer = document.getElementById("footer")
    footer.innerHTML = data
}

async function listaProductos(divPadre) {
    let response = await fetch("../listaProductos.txt")
    let data = await response.json()
    data.forEach(prod => {
        let card = document.createElement("div")
        let div = document.createElement("div")
        let producto = document.createElement("p")
        let imagen = document.createElement("img")
        let flyings = document.createElement("h4")
        let button = document.createElement("a")
        button.setAttribute("src", "#bought")
        button.innerText = "Buy"
        button.className = "text-secondary"
        button.style.cssText = `
        display: block;
        margin: 0 auto;
        width: max-content;
        border: 2px solid var(--border-color);
        border-radius: 0.5em;
        padding: 0.75em;
        cursor: pointer;
        `
        button.addEventListener("mouseenter", () => {
            button.style.backgroundColor = "var(--secondary-color)"
            button.style.color = "var(--main-color)"
        })
        button.addEventListener("mouseleave", () => {
            button.style.backgroundColor = "var(--button-color)"
            button.style.color = "var(--secondary-color)"
        })
        button.addEventListener("click", (e) => {
            e.preventDefault()
            buy(prod)
        })
        flyings.innerText = "Flyings"
        imagen.setAttribute("src", prod.foto)
        imagen.style.height = "25vh"
        imagen.style.width = "100%"
        imagen.style.objectFit = "cover"
        imagen.style.filter = "grayscale(100%)"
        imagen.style.transition = "all 0.5s ease-in-out"
        imagen.addEventListener("mouseenter", function() {
            imagen.style.filter = "grayscale(0%)"
        })
        imagen.addEventListener("mouseleave", function() {
            imagen.style.filter = "grayscale(100%)"
        })
        imagen.style.borderRadius = "0.5em 0.5em 0 0"
        let precio = document.createElement("p")
        precio.style.color = "#444"
        producto.style.color = "#444"
        producto.innerText = "Fly to " + prod.destino
        precio.innerText = "$ " + prod.precio
        card.style.display = "grid"
        card.style.gridTemplateRows = "repeat(2, 1fr)"
        card.style.border = "1px solid #ccc"
        card.style.borderRadius = "0.5em"
        div.style.backgroundColor = "#eee"
        div.style.borderRadius = "0 0 0.5em 0.5em"
        div.style.padding = "0 0 0 0.75em"
        div.appendChild(flyings)
        div.appendChild(producto)
        div.appendChild(precio)
        div.appendChild(button)
        card.appendChild(imagen)
        card.appendChild(div)
        divPadre.appendChild(card)
    })
}

function listeners() {
    let home = document.getElementById("home")
    let products = document.getElementById("products")
    let contact = document.getElementById("contact")
    let about = document.getElementById("about")
    home.addEventListener("click", (e) => {
        e.preventDefault()
        if (window.location.hash != "#home" && window.location.hash != "") {
            console.log(window.location.pathname)
            window.location.hash = "#home"
            let app = document.getElementById("app")
            app.innerHTML = hero()
        }
    })

    products.addEventListener("click", (e) => {
        e.preventDefault()
        if (window.location.hash != "#products") {
            window.location.hash = "#products"
            let app = document.getElementById("app")
            app.innerHTML = tickets()
        }
    })

    contact.addEventListener("click", (e) => {
        e.preventDefault()
        if (window.location.hash != "#contact") {
            window.location.hash = "#contact"
            let app = document.getElementById("app")
            app.innerHTML = contacto()
        }
    })

    about.addEventListener("click", (e) => {
        e.preventDefault()
        if (window.location.hash != "#about") {
            window.location.hash = "#about"
            aboutF()
        }
    })
}

document.addEventListener('DOMContentLoaded', function() {
    window.location.hash = ""

    navigation()
    if (window.location.hash == "") {
        hero()
    }
    footer()
});