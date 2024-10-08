document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost/intra/tabla_de_productos_de_la_tienda.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            generateProductCatalog(data); 
        })
        .catch(error => console.error('Error al obtener los productos:', error));
});

document.getElementById('logoMc').addEventListener('click', () => {
    window.location.reload();  // Recargar la página
});

document.getElementById('user-btn').addEventListener('click', () => {
    window.location.href = './registrarse/index.html';  // Redirigir a la página de registro
});

document.getElementById('cart-btn').addEventListener('click', () => {
    window.location.href = './carrito/index.html';  // Redirigir a la página del carrito
});


const subcategories = {
    "Comida": ["Vegetales", "Frutas", "Dulces"],
    "Bebidas": ["Jugos", "Gaseosas", "Licores"],
    "Limpieza": ["Casa", "Cocina", "Baño"],
    "Muebles": ["Mesas", "Camas", "Sillas"]
};

// catálogo de productos
const generateProductCatalog = (products) => {
    const productCatalog = document.getElementById('product-catalog');
    productCatalog.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        // Verifica si el producto tiene imagen, si no, muestra "sin imagen"
        const productImage = product.imagen ? product.imagen : "sin_imagen.png";  // Coloca una imagen predeterminada o texto

        const carritoButton = product.stock > 1 ? '<button class="add-to-cart-btn">Añadir al carrito</button>' : '';

        // Crear el HTML para cada tarjeta de producto
        productCard.innerHTML = `
            <img src="${productImage}" alt="${product.nombre}" class="product-image">
            <h2 class="product-name">${product.nombre}</h2>
            <p class="product-price">$${product.precio}</p>
            <p class="product-category">${product.categoria}</p>
            ${carritoButton}
        `;

        productCatalog.appendChild(productCard); // Añadir la tarjeta al catálogo
    });

    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.getAttribute('data-category');
            
            // Obtener las subcategorías correspondientes
            const categorySubcategories = subcategories[category];
    
            // Realizar la búsqueda filtrando tanto por la categoría principal como por las subcategorías
            fetch('http://localhost/inventario_integra/productos.php')
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
