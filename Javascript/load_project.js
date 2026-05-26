async function loadProjects() {
    // Détecter le numéro de l'année (BUT1, BUT2, BUT3) à partir du chemin
    const pathMatch = window.location.pathname.match(/projets-BUT(\d)/);
    const year = pathMatch ? pathMatch[1] : '3';
    
    const jsonFile = `../../data/projet_but${year}.json`;
    
    try {
        const response = await fetch(jsonFile);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const projects = await response.json();
        const container = document.getElementById('projects-container');

        projects.forEach(project => {
            // Créer le HTML avec support optionnel pour un lien externe
            let imageHTML = `<img src="${project.image}" alt="${project.title}">`;
            if (project.link) {
                imageHTML = `
                    <a href="${project.link}" target="_blank" title="${project.title}">
                        ${imageHTML}
                        <p class="acces-projet">Accéder au projet »</p>
                    </a>
                `;
            }

            const projectHTML = `
                <div class="${project.background}">
                    <section class="projet-unique">
                        <div class="grid-div">

                            <div class="photo-projet">
                                ${imageHTML}
                            </div>

                            <div class="titre-desc">
                                <h2>${project.title}</h2>

                                <p>${project.description}</p>

                                <div class="projet-competence">
                                    <h3>Compétences développées :</h3>

                                    <ul class="list-competence">
                                        ${project.skills.map(skill => `<li>${skill}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            `;

            container.innerHTML += projectHTML;
        });
    } catch (error) {
        console.error('Erreur lors du chargement des projets:', error);
        document.getElementById('projects-container').innerHTML = '<p>Erreur lors du chargement des projets.</p>';
    }
}

loadProjects();