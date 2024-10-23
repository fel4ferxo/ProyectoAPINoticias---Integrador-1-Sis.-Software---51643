// news.js
document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para las opciones
    const categories = ['Tecnología', 'Salud', 'Finanzas', 'Deportes', 'Cultura'];
    const regions = ['América del Norte', 'América del Sur', 'Europa', 'Asia', 'África'];

    // Cargar opciones de categorías
    const categorySelect = document.getElementById('filter-category');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.toLowerCase().replace(/\s+/g, '-');
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Cargar opciones de regiones
    const regionSelect = document.getElementById('filter-region');
    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region.toLowerCase().replace(/\s+/g, '-');
        option.textContent = region;
        regionSelect.appendChild(option);
    });
    
    
});

document.addEventListener('DOMContentLoaded', function() {
    const filterToggle = document.getElementById('filter-toggle');
    const filterArea = document.getElementById('filter-area');

    filterToggle.addEventListener('click', function() {
        filterArea.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!filterToggle.contains(event.target) && !filterArea.contains(event.target)) {
            filterArea.classList.remove('show');
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const dropdownToggle = document.querySelector('#userDropdown');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    // Función para cerrar el menú desplegable
    function closeDropdown() {
        dropdownMenu.classList.remove('show');
    }

    // Manejador de eventos para el clic en el botón del dropdown
    dropdownToggle.addEventListener('click', function(event) {
        event.stopPropagation(); // Evita que el clic en el botón cierre el menú
        dropdownMenu.classList.toggle('show');
    });

    // Manejador de eventos para el clic fuera del dropdown
    document.addEventListener('click', function(event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            closeDropdown();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const newsData = [{
            id: 1,
            categoria: 'Cultura',
            portal: 'El Comercio', 
            titular: 'Titular',
            subtitulo: 'Subtítulo',
            nombreAutor: 'Nombre del autor',
            fechaPublicacion: '24 de octubre 2024',
            imagen: 'https://via.placeholder.com/600x300',
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, lorem at dignissim gravida, eros sapien vehicula dolor, non lobortis lacus lorem sit amet lorem. Integer porttitor nisl sit amet dui malesuada, ut euismod quam fermentum. Cras non nibh eu eros euismod vehicula non et lacus.'},
        {
            id: 2,
            categoria: 'Cultura', 
            portal: 'El Comercio', 
            titular: 'Titular',
            subtitulo: 'Subtítulo',
            nombreAutor: 'Nombre del autor',
            fechaPublicacion: '24 de octubre 2024',
            imagen: 'https://via.placeholder.com/600x300',
            contenido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sollicitudin, lorem at dignissim gravida, eros sapien vehicula dolor, non lobortis lacus lorem sit amet lorem. Integer porttitor nisl sit amet dui malesuada, ut euismod quam fermentum. Cras non nibh eu eros euismod vehicula non et lacus.'}
        ];

    const newsContainer = document.getElementById('news-cards-container');

    // Generar las tarjetas
    newsData.forEach(news => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card" data-news-id="${news.id}">
                <div class="card-inner">
                    <img src="${news.imagen}" alt="${news.titular}" class="card-img-top">
                    <div class="card-content">
                        <h5 class="card-title">${news.titular}</h5>
                        <p class="card-text">Haga clic para ver más detalles.</p>
                    </div>
                </div>
            </div>
        `;
        newsContainer.appendChild(card);
    });

    // Manejar el clic en una tarjeta para abrir el modal
    newsContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.card');
        if (card) {
            const newsId = card.getAttribute('data-news-id');
            const news = newsData.find(item => item.id == newsId);

            if (news) {
                document.getElementById('cabecera').innerHTML = '';
                document.getElementById('cuerpo').innerHTML = '';

                // Configurar el título y contenido del modal
                document.getElementById('cabecera').insertAdjacentHTML('beforeEnd', `
                    <nav class="navbar">
                            <div class="container-fluid">
                                <a class="navbar-brand text-white" href="#">
                                <img src="../images/Chasky_News__3_-removebg-preview.png" alt="LogoChasky" width="120" height="120" class="d-inline-block align-text-center">
                                ${news.categoria}
                                </a>
                            </div>
                    </nav>
                `);

                const contenedorArticulo = document.getElementById('cuerpo');
                contenedorArticulo.insertAdjacentHTML('beforeEnd', `
                    <div class="news-outlet text-center">
                            <p>Portal de origen: <span>${news.portal}</span></p>
                        </div>
                        <div class="text-center">
                            <h1>${news.titular}</h1>
                            <h3 class="drophead">${news.subtitulo}</h3>
                        </div>

                        <div class="text-center my-4">
                            <img src="${news.imagen}" alt="Imagen de la noticia" class="img-fluid">
                        </div>

                        <hr>
                        <div class="author-date">
                            <p><strong><i class="fa-solid fa-user"></i> ${news.nombreAutor}</strong></p>
                            <p><em>Publicado el: ${news.fechaPublicacion}</em></p>
                        </div>
                        <hr>  
                        <div class="mt-4">
                            <p>${news.contenido}</p>
                    </div>
                `);
                
                const modal = document.getElementById('modal-articulo');
                modal.showModal();

                modal.addEventListener('click', (e) =>{
                    if (e.target === modal){   
                        modal.close();
                    }
                });
            }
        }
    });
});



