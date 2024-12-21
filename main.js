document.addEventListener('DOMContentLoaded', function () {
    const noteCards = document.querySelectorAll('.note-card');

    function toggleActiveNote(event) {
        const card = event.currentTarget;

        // Si la tarjeta ya está activa, no hacer nada
        if (card.classList.contains('active')) {
            return;
        }

        // Eliminar la clase 'active' de todas las tarjetas
        noteCards.forEach(otherCard => {
            otherCard.classList.remove('active');
            otherCard.classList.remove('exiting');
        });

        // Añadir la clase 'active' a la tarjeta clicada
        card.classList.add('active');
    }

    // Cuando se hace clic en cualquier otra parte, restauramos la tarjeta a su posición original
    document.body.addEventListener('click', function (event) {
        if (!event.target.closest('.note-card')) {
            noteCards.forEach(card => {
                // Si la tarjeta está activa, restauramos su posición original
                if (card.classList.contains('active')) {
                    // Añadir la clase 'exiting' para la animación
                    card.classList.add('exiting');

                    // Eliminar la clase 'active'
                    setTimeout(() => {
                        card.classList.remove('active');
                        card.classList.remove('exiting');
                    }, 300); // 300ms para esperar que termine la animación
                }
            });
        }
    });

    // Selecciona la barra de búsqueda y las tarjetas de notas
    const searchBar = document.querySelector('.search-bar');
    const notes = document.querySelectorAll('.note-card');

    // Añade un evento para filtrar las notas
    searchBar.addEventListener('input', function () {
        const query = searchBar.value.toLowerCase(); // Convierte el texto a minúsculas para buscar sin distinción
        notes.forEach(note => {
            const title = note.querySelector('.note-title').textContent.toLowerCase();
            // Muestra u oculta la nota dependiendo de si el título coincide con la búsqueda
            if (title.includes(query)) {
                note.classList.remove('hidden'); // Mostrar nota
            } else {
                note.classList.add('hidden'); // Ocultar nota
            }
        });
    });


    // Asignar un evento de clic a cada tarjeta
    noteCards.forEach(card => {
        card.addEventListener('click', toggleActiveNote);
    });
});
