document.addEventListener('DOMContentLoaded', () => {
    const logo = document.getElementById('logoMc');
    const userBtn = document.getElementById('user-btn');
    const cartBtn = document.getElementById('cart-btn');

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
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('productos.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            generateProductCatalog(data); 
        })
        .catch(error => console.error('Error al obtener los productos:', error));
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

        // Verifica si el producto tiene imagen. Si no, muestra una imagen predeterminada o texto "Sin imagen".
        const productImage = product.imagen && product.imagen.trim() !== '' ? product.imagen : 'sin_imagen.png';

        const carritoButton = product.stock > 1 ? '<button class="add-to-cart-btn">Añadir al carrito</button>' : '';

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

    // Agregar eventos para los botones de filtro
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            
            // Obtener las subcategorías correspondientes
            const categorySubcategories = subcategories[category] || [];  // Verificamos si existen subcategorías

            // Realizar la búsqueda filtrando tanto por la categoría principal como por las subcategorías
            fetch(`productos.php?categoria=${category}`)
                .then(response => response.json())
                .then(products => {
                    // Filtrar los productos que pertenecen a la categoría o sus subcategorías
                    const filteredProducts = products.filter(product => 
                        product.categoria === category || categorySubcategories.includes(product.categoria)
                    );
                    generateProductCatalog(filteredProducts); // Generar el catálogo filtrado
                })
                .catch(error => console.error('Error al obtener los productos filtrados:', error));
        });
    });
};
