let carrito = [];

const listaCarrito = document.getElementById('lista-carrito');
const totalElemento = document.getElementById('total');
const modal = document.getElementById('carrito-modal');
const verCarrito = document.getElementById('ver-carrito');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const botonPagar = document.getElementById('pagar');
const formularioPago = document.getElementById('formulario-pago');

verCarrito.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarCarrito();
    modal.style.display = 'block';
});

cerrarCarrito.addEventListener('click', () => {
    modal.style.display = 'none';
    formularioPago.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        formularioPago.style.display = 'none';
    }
    
});

document.querySelectorAll('.producto button').forEach((btn) => {
    btn.addEventListener('click', () => {
        const producto = btn.parentElement;
        const nombre = producto.querySelector('h2').textContent;
        const precioTexto = producto.querySelector('p').textContent;
        const precio = parseFloat(precioTexto.replace('$', '').replace('MX', '').replace('USD', ''));
        const imagen = producto.querySelector('img').src;  

        const itemExistente = carrito.find(item => item.nombre === nombre);
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            const item = { nombre, precio, cantidad: 1, imagen };
            carrito.push(item);
        }

        mostrarToast(`${nombre} añadido al carrito.`);
    });
});


function mostrarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;
  
    carrito.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="item-carrito">
                <img src="${item.imagen}" alt="${item.nombre}">
                <div class="info">
                    <p>${item.nombre}</p>
                    <p>$${item.precio.toFixed(2)} x ${item.cantidad}</p>
                </div>
                <div class="acciones">
                    <button onclick="aumentarCantidad(${index})">+</button>
                    <button onclick="disminuirCantidad(${index})">-</button>
                    <button onclick="eliminarProducto(${index})">Eliminar</button>
                </div>
            </div>
        `;
        listaCarrito.appendChild(li);
        total += item.precio * item.cantidad;
    });
  
    totalElemento.textContent = total.toFixed(2);
}

function aumentarCantidad(index) {
    carrito[index].cantidad++;
    mostrarCarrito();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        mostrarCarrito();
    }
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    mostrarCarrito();
}

botonPagar.addEventListener('click', () => {
    if (carrito.length === 0) {
        mostrarToast("Tu carrito está vacío.");
    } else {
       formularioPago.style.display = 'block';
    }
});
const btnInicio = document.getElementById('btn-inicio');
const btnMetalicos = document.getElementById('btn-metalicos');

const seccionInicio = document.getElementById('seccion-inicio');
const seccionMetalicos = document.getElementById('seccion-metalicos');

btnInicio.addEventListener('click', (e) => {
    e.preventDefault();
    seccionInicio.style.display = 'flex';
    seccionMetalicos.style.display = 'none';
});

btnMetalicos.addEventListener('click', (e) => {
    e.preventDefault();
    seccionInicio.style.display = 'none';
    seccionMetalicos.style.display = 'flex';
});


window.addEventListener('DOMContentLoaded', () => {
    seccionInicio.style.display = 'flex';
    seccionMetalicos.style.display = 'none';
});
formularioPago.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const direccion = document.getElementById('direccion').value.trim();

    if (nombre === '' || correo === '' || direccion === '') {
        alert('Por favor, completa todos los campos del formulario.');
        return;
    }
    
    const fecha = new Date().toLocaleString();
let detalle = `
    <p><strong>Nombre:</strong> ${nombre}</p>
    <p><strong>Correo:</strong> ${correo}</p>
    <p><strong>Dirección:</strong> ${direccion}</p>
    <p><strong>Fecha:</strong> ${fecha}</p>
    <h4>Productos:</h4>
    <ul>
`;

let total = 0;

carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    detalle += `<li>${item.nombre} x${item.cantidad} - $${subtotal.toFixed(2)}</li>`;
});

detalle += `</ul><p><strong>Total:</strong> $${total.toFixed(2)}</p>`;
detalle += `
    <div style="margin-top: 20px; text-align: center;">
        <a href="https://wa.me/4422370749" target="_blank" style="text-decoration: none; color: green; font-weight: bold;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" style="width: 24px; vertical-align: middle; margin-right: 8px;">
            Contáctanos para el seguimiento de tu pedido
        </a>
    </div>
`;
document.getElementById('detalle-ticket').innerHTML = detalle;
document.getElementById('ticket-modal').style.display = 'block';
mostrarToast(`¡Gracias por tu compra, ${nombre}! Se enviará confirmación a ${correo}.`);


   carrito = [];

    mostrarCarrito();
    formularioPago.reset();
    formularioPago.style.display = 'none';
    modal.style.display = 'none';
});
function imprimirTicket() {
    const ticket = document.getElementById('detalle-ticket').innerHTML;
    const ventana = window.open('', '', 'width=600,height=600');
    ventana.document.write(`<html><head><title>Ticket de Compra</title></head><body>${ticket}</body></html>`);
    ventana.document.close();
    ventana.print(); 
}
function cerrarTicket() {
    document.getElementById('ticket-modal').style.display = 'none';
}
function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.style.display = 'block';
    toast.style.opacity = '1';

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 300);
    }, 2000);
}

