let team = [
    { name: "Gupta", position: "PSenior Manager", imageUrl: "https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
    { name: "Sujith", position: "Team Lead", imageUrl: "https://images.unsplash.com/photo-1557177324-56c542165309?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" },
];


let heroSection = document.querySelector('.hero-section .card-grid');


for (let i = 0; i < team.length; i++) {
    
    let cardAnchor = document.createElement('a');
    cardAnchor.classList.add('card');
    cardAnchor.href = "#";

    
    let cardBackground = document.createElement('div');
    cardBackground.classList.add('card__background');
    cardBackground.style.backgroundImage = `url(${team[i ].imageUrl})`;
    cardAnchor.appendChild(cardBackground);

    
    let cardContent = document.createElement('div');
    cardContent.classList.add('card__content');

    
    let categoryParagraph = document.createElement('p');
    categoryParagraph.classList.add('card__category');
    categoryParagraph.textContent = team[i ].position;
    cardContent.appendChild(categoryParagraph);

    
    let heading = document.createElement('h3');
    heading.classList.add('card__heading');
    heading.textContent = team[i ].name;
    cardContent.appendChild(heading);

    
    cardAnchor.appendChild(cardContent);

    
    heroSection.appendChild(cardAnchor);
}