document.addEventListener('DOMContentLoaded', () => {

    fetch('http://localhost/inventario_integra/productos.php')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            generateProductCatalog(data); 
        })
        .catch(error => console.error('Error al obtener los productos:', error));
});

// catálogo de productos
const generateProductCatalog = (products) => {
    const productCatalog = document.getElementById('product-catalog');
    productCatalog.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        const carritoButton = product.stock > 1 ? '<button class="add-to-cart-btn">Añadir al carrito</button>' : '';

        // Crear el HTML para cada tarjeta de producto
        productCard.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="product-image">
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
            
            // Obtener los productos filtrados por categoría
            fetch(`http://localhost/inventario_integra/productos.php?categoria=${category}`)
                .then(response => response.json())
                .then(data => {
                    generateProductCatalog(data); // Generar el catálogo filtrado
                })
                .catch(error => console.error('Error al obtener los productos filtrados:', error));
        });
    });
    
};
