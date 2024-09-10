const products = [
    { name: "Producto 1", price: "$10", category: "Comida", image: "imagenes/pate_de_ternera.png" },
    { name: "Producto 2", price: "$20", category: "Bebidas", image: "imagenes/niños.jfif" },
    { name: "Producto 3", price: "$20", category: "Limpieza", image: "imagenes/esponja.jpg" },
    { name: "Producto 4", price: "$20", category: "Muebles", image: "imagenes/sillon.jpg" },
    { name: "Producto 5", price: "$20", category: "Bebidas", image: "ruta/imagen2.jpg" },
    { name: "Producto 6", price: "$20", category: "Limpieza", image: "ruta/imagen2.jpg" },
    { name: "Producto 7", price: "$20", category: "Limpieza", image: "ruta/imagen2.jpg" },
    { name: "Producto 8", price: "$20", category: "Muebles", image: "ruta/imagen2.jpg" },
    // Agrega el resto de los productos con sus imágenes correspondientes
];

// Función para generar catálogo de productos
const generateProductCatalog = (filterCategory = null) => {
    const productCatalog = document.getElementById('product-catalog');
    productCatalog.innerHTML = '';

    // Filtrar productos según la categoría seleccionada o mostrar todos si no hay filtro
    const filteredProducts = filterCategory ? products.filter(product => product.category === filterCategory) : products;

    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h2 class="product-name">${product.name}</h2>
            <p class="product-price">${product.price}</p>
            <p class="product-category">${product.category}</p>
            <button class="add-to-cart-btn">Añadir al carrito</button>
        `;

        productCatalog.appendChild(productCard);
    });
};

// Función para restablecer el catálogo completo
const resetProductCatalog = () => {
    generateProductCatalog(); // Llama a la función sin filtros
};

// Evento para el logo
document.getElementById('logoMc').addEventListener('click', resetProductCatalog);

// Filtrar por categoría al hacer clic en los botones
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const category = e.target.getAttribute('data-category');
        generateProductCatalog(category);
    });
});

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    generateProductCatalog(); // Mostrar todos los productos al cargar

    // Eventos de carrito y usuario
    document.getElementById('cart-btn').addEventListener('click', goToCart);
    document.getElementById('user-btn').addEventListener('click', goToUser);
});
