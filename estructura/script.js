
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logoMc');
    const userBtn = document.getElementById('user-btn');
    const cartBtn = document.getElementById('cart-btn');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    let allProducts = []; // Variable para almacenar todos los productos

    // Obtener todos los productos al cargar la página
    fetch('productos.php')
        .then(response => response.json())
        .then(data => {
            allProducts = data; // Guardar los productos en la variable global
            generateProductCatalog(allProducts); // Generar el catálogo completo
        })
        .catch(error => console.error('Error al obtener los productos:', error));
    
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.reload();  // Recargar la página
        });
    }

    if (userBtn) {
        userBtn.addEventListener('click', () => {
            window.location.href = './loguearse/index.html';  // Redirigir a la página de registro
        });
    }

    if (cartBtn) {
        cartBtn.addEventListener('click', () => {
            window.location.href = './carrito/index.html';  // Redirigir a la página del carrito
        });
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita la recarga de la página

            // Verificar que searchInput y su valor existan
            const searchText = searchInput?.value?.toLowerCase();
            if (!searchText) {
                console.warn("Campo de búsqueda vacío o no encontrado");
                return;
            }

            // Filtrar productos localmente sin hacer una nueva solicitud
            const filteredProducts = allProducts.filter(product => 
                product.nombre.toLowerCase().includes(searchText)
            );

            generateProductCatalog(filteredProducts); // Muestra los productos filtrados
        });
    }
});


const subcategories = {
    "Comida": ["Vegetales", "Fruta", "Dulces"],
    "Bebidas": ["Jugo", "Gaseosa", "Licores"],
    "Limpieza": ["Casa", "Cocina", "Baño"],
    "Muebles": ["Mesa", "Cama", "Silla"]
};

// Catálogo de productos
const generateProductCatalog = (products) => {
    const productCatalog = document.getElementById('product-catalog');
    productCatalog.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const productImage = product.imagen && product.imagen.trim() !== '' ? product.imagen : 'sin_imagen.png';

        // Asegúrate de usar el nombre de campo correcto aquí, por ejemplo `product.producto` o `product.ID_producto`
        const carritoButton = `<button class="add-to-cart-btn" data-id="${product.ID_producto}">Añadir al carrito</button>`;

        // Crear el HTML para cada tarjeta de producto
        productCard.innerHTML = `
            <img src="${productImage}" alt="${product.nombre}" class="product-image">
            <h2 class="product-name">${product.nombre}</h2>
            <p class="product-description">${product.descripcion}</p>
            <p class="product-price">$${product.precio}</p>
            <p class="product-category">${product.categoria}</p>
            ${carritoButton}        
        `;

        productCatalog.appendChild(productCard); // Añadir la tarjeta al catálogo
    });

    // Configurar un solo evento de click para capturar todos los botones "Añadir al carrito"
    productCatalog.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const ID_producto = event.target.getAttribute('data-id');
            if (ID_producto) {
                agregarAlCarrito(ID_producto);
            } else {
                console.error("ID de producto no encontrado");
                alert("Error: ID de producto no encontrado");
            }
        }
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(ID_producto) {
    const formData = new FormData();
    formData.append('ID_producto', ID_producto);
    formData.append('correo', 'prueba@prueba');
    formData.append('total_carrito', 1);

    fetch('agregar_carrito.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        alert(data || "Elemento agregado correctamente");
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        alert("Error en la solicitud");
    });
}