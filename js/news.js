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
    const newsData = [
        { id: 1, title: 'Noticia 1', image: 'path/to/image1.jpg', timeline: [
            { date: '2024-01-01', content: 'Evento importante 1' },
            { date: '2024-02-15', content: 'Evento importante 2' }
        ]},
        { id: 2, title: 'Noticia 2', image: 'path/to/image2.jpg', timeline: [
            { date: '2024-03-01', content: 'Evento importante 1' },
            { date: '2024-04-10', content: 'Evento importante 2' }
        ]}
        // Añade más datos de noticias aquí
    ];

    const newsContainer = document.getElementById('news-cards-container');

    // Generar las tarjetas
    newsData.forEach(news => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card" data-news-id="${news.id}">
                <div class="card-inner">
                    <img src="${news.image}" alt="${news.title}" class="card-img-top">
                    <div class="card-content">
                        <h5 class="card-title">${news.title}</h5>
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
                // Configurar el título y contenido del modal
                document.getElementById('newsModalLabel').textContent = news.title;

                // Crear el contenido de la línea de tiempo
                const timelineContent = news.timeline.map(item => `
                    <li class="timeline-item">
                        <div class="timeline-content">
                            <h6>${item.date}</h6>
                            <p>${item.content}</p>
                        </div>
                    </li>
                `).join('');

                document.getElementById('timeline').innerHTML = `
                    <ul class="timeline">
                        ${timelineContent}
                    </ul>
                `;

                // Mostrar el modal
                const modalElement = document.getElementById('newsModal');
                modalElement.classList.add('show');
                modalElement.style.display = 'block';
                modalElement.removeAttribute('aria-hidden');
                modalElement.setAttribute('aria-modal', 'true');
                document.body.style.overflow = 'hidden'; // Previene el scroll de fondo

                // Cerrar el modal al hacer clic en el botón de cerrar o fuera del modal
                modalElement.querySelector('.btn-close').addEventListener('click', () => {
                    closeModal(modalElement);
                });

                modalElement.addEventListener('click', (e) => {
                    if (e.target === modalElement) {
                        closeModal(modalElement);
                    }
                });
            }
        }
    });

    function closeModal(modalElement) {
        modalElement.classList.remove('show');
        modalElement.style.display = 'none';
        modalElement.setAttribute('aria-hidden', 'true');
        modalElement.removeAttribute('aria-modal');
        document.body.style.overflow = ''; // Restaura el scroll del fondo
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Datos de ejemplo para la línea de tiempo
    const newsData = [
        {
            title: "Noticia 1",
            events: [
                { date: "2024-01-01", content: "Evento 1 de Noticia 1" },
                { date: "2024-01-15", content: "Evento 2 de Noticia 1" }
            ]
        },
        {
            title: "Noticia 2",
            events: [
                { date: "2024-02-01", content: "Evento 1 de Noticia 2" },
                { date: "2024-02-15", content: "Evento 2 de Noticia 2" }
            ]
        }
        // Agrega más noticias y eventos aquí según sea necesario
    ];

    // Selecciona todas las tarjetas
    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const news = newsData[index]; // Aquí se usa el índice para obtener los datos de la noticia correspondiente
            const modalTitle = document.querySelector('#newsModalLabel');
            const timelineContainer = document.querySelector('#timeline');

            modalTitle.textContent = news.title;
            timelineContainer.innerHTML = generateTimelineHTML(news.events);

            const modal = new bootstrap.Modal(document.getElementById('newsModal'));
            modal.show();
        });
    });

    function generateTimelineHTML(events) {
        return events.map(event => `
            <div class="timeline-item">
                <div class="timeline-content">
                    <h6>${event.date}</h6>
                    <p>${event.content}</p>
                </div>
            </div>
        `).join('');
    }
});
