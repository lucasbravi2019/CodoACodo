async function navigation() {
    let response = await fetch("../templates/nav.html")
    let data = await response.text()
    let nav = document.getElementById("nav")
    nav.innerHTML = data
    listeners()
    dropdown()
}

async function hero(home, products, contact, about) {
    let response = await fetch("../templates/hero.html")
    let data = await response.text()
    let app = document.getElementById("app")
    app.innerHTML = data
    let productos = document.getElementById("tickets")
    productos.addEventListener("click", (e) => {
        e.preventDefault()
        resetActiveLinks(home, products, contact, about)
        activeLink(products)
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
        validateMessage(nombre)
        if (nombre.value.trim().length > 3 && phone.value.trim().length == 10 && email.value.trim().length > 5 && email.value.includes("@")) {
            submitEnabled(submit)
        } else {
            submitDisabled(submit)
        }

    })
    phone.addEventListener('input', function(e) {
        var regex = /[^0-9]/g;
        var regexN = /[0-9]/g;
        validateMessage(phone)
        phone.value = phone.value.replaceAll(regex, "")
        if (phone.value.length > 10) {
            phone.value = (e.target.value - e.data) / 10
            validateMessage(phone)
        }
        if (nombre.value.trim().length > 3 && phone.value.trim().length == 10 && email.value.trim().length > 5 && email.value.includes("@")) {
            submitEnabled(submit)
        } else {
            submitDisabled(submit)
        }
    })
    email.addEventListener('input', function(e) {
        validateMessage(email)
        if (nombre.value.trim().length >= 3 && phone.value.trim().length == 10 && email.value.trim().length > 5 && email.value.includes("@")) {
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

function validateName(mensaje, child) {
    if (child.value.trim().length == 0) {
        mensaje.innerText = "Please fill the name";
    }
    if (child.value.trim().length > 0 && child.value.trim().length < 3) {
        mensaje.innerText = "The name must contain 3 or more letters"
    }
    if (child.value.trim().length >= 3) {
        deleteValidateMessage(child)
    }
}

function validatePhone(mensaje, child) {
    if (child.value.trim().length == 0) {
        mensaje.innerText = "Please fill the phone";
    }
    if (child.value.trim().length > 0 && child.value.trim().length < 10 || child.value.trim().length > 10) {
        mensaje.innerText = "The phone must contain 10 numbers"
    }
    if (child.value.trim().length == 10) {
        deleteValidateMessage(child)
    }
}

function validateEmail(mensaje, child) {
    if (child.value.trim().length == 0) {
        mensaje.innerText = "Please fill the email";
    }
    if (child.value.trim().length > 0 && child.value.trim().length < 5) {
        mensaje.innerText = "The email must contain 5 letters"
    }
    if (!child.value.trim().includes("@") && child.value.trim().length >= 5) {
        mensaje.innerText = "You must write a valid email (something@gmail.com)"
    }
    if (child.value.trim().length >= 5 && child.value.trim().includes("@")) {
        deleteValidateMessage(child)
    }
}

function validateMessage(child) {
    if (!document.getElementById(`validate${child.name}`)) {
        var mensaje = document.createElement("p")
        mensaje.setAttribute("id", `validate${child.name}`)
        mensajeStyleError(mensaje)
        var padre = child.parentElement.appendChild(mensaje)
    }
    var mensaje = document.getElementById(`validate${child.name}`)
    if (child.name == "person") {
        validateName(mensaje, child)
    }
    if (child.name == "phone") {
        validatePhone(mensaje, child)
    }
    if (child.name == "email") {
        validateEmail(mensaje, child)
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
    mensaje.classList.add("bg-success", "col-8", "mx-auto", "p-3", "m-3", "rounded-3", "text-center")
}

function mensajeStyleError(mensaje) {
    mensaje.classList.add("bg-danger", "col-8", "mx-auto", "p-3", "m-3", "rounded-3", "text-center")
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
    producto.classList.add("p-3", "m-0", "text-xl", "font-bold")
    let numberTickets = document.createElement("p")
    numberTickets.classList.add("p-3", "m-0")
    numberTickets.innerText = "Number of tickets"
    let quantity = document.createElement("input")
    quantity.setAttribute("type", "number")
    quantity.setAttribute("min", 0)
    quantity.setAttribute("value", 0)
    quantity.classList.add("text-center", "p-2", "font-bold")
    let pay = 0
    let total = document.createElement("p")
    total.classList.add("p-3", "m-0")
    total.innerText = "Total: $ 0.00"
    let payButton = document.createElement("button")
    payButton.setAttribute("type", "submit")
    payButton.classList.add("btn", "btn-primary")
    payButton.setAttribute("href", "#bought")
    payButton.innerText = "Pay"
    submitDisabled(payButton)
    console.log(payButton)
    quantity.addEventListener("input", (e) => {
        pay = quantity.value
        total.innerText = "Total: $ " + pay * prod.precio
        if (e.target.value > 0) {
            submitEnabled(payButton)
        } else {
            submitDisabled(payButton)
        }
    })
    let precio = document.createElement("p")
    precio.classList.add("p-3", "m-0")
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
        button.innerHTML = '<i class="fas fa-shopping-cart"></i> Buy'
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
        flyings.innerHTML = '<i class="fas fa-plane"></i> Flyings'
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
        producto.innerHTML = '<i class="fas fa-check-circle"></i> ' + "Fly to " + prod.destino
        precio.innerHTML = '<i class="fas fa-check-circle"></i> ' + "$ " + prod.precio
        card.style.display = "grid"
        card.style.gridTemplateRows = "repeat(2, 1fr)"
        card.style.border = "1px solid #ccc"
        card.style.borderRadius = "0.5em"
        div.style.backgroundColor = "#eee"
        div.style.borderRadius = "0 0 0.5em 0.5em"
        div.style.padding = "1em"
        div.appendChild(flyings)
        div.appendChild(producto)
        div.appendChild(precio)
        div.appendChild(button)
        card.appendChild(imagen)
        card.appendChild(div)
        divPadre.appendChild(card)
    })
}

function resetActiveLink(link) {
    link.classList.remove("active")
}

function resetActiveLinks(link1, link2, link3, link4) {
    resetActiveLink(link1)
    resetActiveLink(link2)
    resetActiveLink(link3)
    resetActiveLink(link4)
}

function activeLink(link) {
    link.classList.add("active")
}

function listeners() {
    let home = document.getElementById("home")
    let products = document.getElementById("products")
    let contact = document.getElementById("contact")
    let about = document.getElementById("about")
    resetActiveLinks(home, products, contact, about)
    activeLink(home)
    hero(home, products, contact, about)
    home.addEventListener("click", (e) => {
        e.preventDefault()
        if (window.location.hash != "#home" && window.location.hash != "") {
            window.location.hash = "#home"
            document.getElementById("navigation").classList.add("hidden")
            let app = document.getElementById("app")
            app.innerHTML = hero(home, products, contact, about)
            resetActiveLinks(home, products, contact, about)
            activeLink(home)
            document.getElementById("social-media").classList.replace("hidden", "flex")
        }
    })
    products.addEventListener("click", (e) => {
        e.preventDefault()
        resetActiveLinks(home, products, contact, about)
        activeLink(products)
        if (window.location.hash != "#products") {
            window.location.hash = "#products"
            document.getElementById("navigation").classList.add("hidden")
            let app = document.getElementById("app")
            app.innerHTML = tickets()

            document.getElementById("social-media").classList.replace("hidden", "flex")
        }
    })
    contact.addEventListener("click", (e) => {
        e.preventDefault()
        resetActiveLinks(home, products, contact, about)
        activeLink(contact)
        if (window.location.hash != "#contact") {
            window.location.hash = "#contact"
            document.getElementById("navigation").classList.add("hidden")
            let app = document.getElementById("app")
            app.innerHTML = contacto()
            document.getElementById("social-media").classList.replace("flex", "hidden")
        }
    })
    about.addEventListener("click", (e) => {
        e.preventDefault()
        resetActiveLinks(home, products, contact, about)
        activeLink(about)
        if (window.location.hash != "#about") {
            window.location.hash = "#about"
            document.getElementById("navigation").classList.add("hidden")
            aboutF()
            document.getElementById("social-media").classList.replace("hidden", "flex")
        }
    })
}

function dropdown() {
    var dropdown = document.getElementById("dropdown")
    var navigation = document.getElementById("navigation")
    dropdown.addEventListener("click", function() {
        navigation.classList.toggle("hidden")
    })
}

document.addEventListener('DOMContentLoaded', function() {
    window.location.hash = ""
    navigation()
    let home = document.getElementById("home")
    let products = document.getElementById("products")
    let contact = document.getElementById("contact")
    let about = document.getElementById("about")
    if (window.location.hash == "") {
        hero(home, products, contact, about)
    }
    footer()
});