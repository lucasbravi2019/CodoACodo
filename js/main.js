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
    submit.style.cursor = "pointer"
    submit.addEventListener("click", function(e) {
        e.preventDefault()
        let nombre = document.getElementById("person")
        nombre.value = ""
        let phone = document.getElementById("phone")
        phone.value = ""
        let email = document.getElementById("email")
        email.value = ""
        let mensaje = document.createElement("p")
        mensaje.innerText = "Message sent succesfully. We will contact you in a while."
        mensaje.style.backgroundColor = "green"
        mensaje.style.width = "70%"
        mensaje.style.padding = "0.75em"
        mensaje.style.margin = "1em auto"
        mensaje.style.textAlign = "center"
        app.prepend(mensaje)
        submit.disabled = true
        submit.style.cursor = "default"
        submit.style.opacity = 0.5
    })



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
        let div = document.createElement("div")
        let producto = document.createElement("p")
        let imagen = document.createElement("img")
        imagen.setAttribute("src", prod.foto)
        imagen.style.height = "50vh"
        imagen.style.width = "100%"
        imagen.style.objectFit = "cover"
        imagen.style.borderRadius = "4px"
        imagen.style.padding = "5px"
        imagen.style.border = "2px solid #ddd"
        imagen.style.filter = "grayscale(100%)"
        imagen.style.transition = "all 0.5s ease-in-out"
        imagen.addEventListener("mouseenter", function() {
            imagen.style.filter = "grayscale(0%)"
        })
        imagen.addEventListener("mouseleave", function() {
            imagen.style.filter = "grayscale(100%)"
        })
        let precio = document.createElement("p")
        producto.innerText = prod.destino
        precio.innerText = "$ " + prod.precio
        div.appendChild(producto)
        div.appendChild(imagen)
        div.appendChild(precio)
        divPadre.appendChild(div)
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
            console.log("about")
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