document.addEventListener('DOMContentLoaded', function () {
    const burgerMenuIcon = document.querySelector('.burger-menu-icon');
    const overlayMenu = document.getElementById('overlayMenu');
    const closeOverlay = document.querySelector('.close-overlay');
    const overlayMenuItems = document.querySelectorAll('.overlay-menu-item');
    const pageMenuItems = document.querySelectorAll('.page-navigation__menu-item');

    // Toggle the overlay menu
    burgerMenuIcon.addEventListener('click', function () {
        overlayMenu.style.display = 'flex';
        requestAnimationFrame(() => {
            overlayMenu.classList.add('active'); // Smooth fade-in
        });
        document.body.classList.add('overlay-active');
    });

    // Function to close the overlay menu with fade-out effect
    function closeOverlayMenu() {
        overlayMenu.classList.remove('active');
        document.body.classList.remove('overlay-active');
    }

    // Close the overlay menu when the close button is clicked
    closeOverlay.addEventListener('click', function () {
        closeOverlayMenu();
    });

    // Close the overlay when clicking outside the menu
    window.addEventListener('click', function (e) {
        if (e.target === overlayMenu) {
            closeOverlayMenu();
        }
    });

    // Close the overlay menu when an item is clicked
    overlayMenuItems.forEach(item => {
        item.addEventListener('click', function () {
            closeOverlayMenu();
        });
    });

    // Ensure the overlay is hidden initially
    overlayMenu.style.display = 'none';

    // Ensure menu is hidden once transition ends
    overlayMenu.addEventListener('transitionend', function() {
        if (!overlayMenu.classList.contains('active')) {
            overlayMenu.style.display = 'none';
        }
    });

    // Smooth scroll for page navigation menu items
    pageMenuItems.forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});

// Shop (coming soon)

document.addEventListener('DOMContentLoaded', function () {
    const shopButton = document.querySelector('.page-navigation__menu-item--button');
    const overlayShopButton = document.querySelector('.overlay-menu-item[href="#"]'); // Shop Button im Overlay
    const comingSoonModal = document.createElement('div');
    const overlayMenu = document.getElementById('overlayMenu'); // Overlay-Menü

    comingSoonModal.id = 'comingSoonModal';
    comingSoonModal.innerHTML = `
        <div class="modal-content">
            <h2>Shop Coming Soon!</h2>
            <p>Der Shop ist eines unserer zukünftigen Projekte und befindet sich derzeit im Aufbau. Bleiben Sie dran für Updates!</p>
            <button class="close-modal">Schließen</button>
        </div>
    `;

    document.body.appendChild(comingSoonModal);

    // Funktion zum Öffnen des Modals
    function openComingSoonModal() {
        comingSoonModal.style.display = 'flex';
        // Overlay-Menü sofort deaktivieren, falls es aktiv ist
        overlayMenu.classList.remove('active');
        overlayMenu.style.display = 'none';
        document.body.classList.remove('overlay-active'); // Entfernt den dunklen Hintergrund
    }

    // Funktion zum Schließen des Modals
    function closeComingSoonModal() {
        comingSoonModal.style.display = 'none';
    }

    // Event listener für den Shop Button im Hauptmenü
    shopButton.addEventListener('click', function(e) {
        e.preventDefault();
        openComingSoonModal();
    });

    // Event listener für den Shop Button im Overlay-Menü
    overlayShopButton.addEventListener('click', function(e) {
        e.preventDefault();
        openComingSoonModal();
    });

    // Schließen des Modals
    const closeModalBtn = comingSoonModal.querySelector('.close-modal');
    closeModalBtn.addEventListener('click', function() {
        closeComingSoonModal();
    });

    // Optional: Schließen des Modals beim Klicken außerhalb des Modals
    window.addEventListener('click', function(e) {
        if (e.target === comingSoonModal) {
            closeComingSoonModal();
        }
    });
});





// Text Image

function checkTextOverflow() {
    const textElement = document.querySelector('.textbox__text');
    const imageElement = document.querySelector('.textbox__image--link');
    const containerElement = document.querySelector('.textbox__block');
    
    const textHeight = textElement.offsetHeight;
    const imageHeight = imageElement.offsetHeight;

    // Check if the text is taller than the image
    if (textHeight > imageHeight) {
        // Add a class to allow text to flow below the image
        containerElement.classList.add('wrap-text');
    } else {
        containerElement.classList.remove('wrap-text');
    }
}

// Run the function when the page loads
window.addEventListener('load', checkTextOverflow);

// Optional: Run the function when the window is resized
window.addEventListener('resize', checkTextOverflow);


// Glossar
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.glossary__alphabet--filter button');
    const entries = document.querySelectorAll('.glossary__entries--entry');
    const letters = document.querySelectorAll('.glossary__letter');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            // Entferne die aktive Klasse von allen Buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Füge die aktive Klasse zum geklickten Button hinzu
            button.classList.add('active');

            const letter = button.getAttribute('data-letter');
            entries.forEach(entry => {
                const entryLetter = entry.getAttribute('data-letter');
                if (letter === 'all' || entryLetter === letter || (letter === '#' && entryLetter === '#')) {
                    entry.style.visibility = 'visible';
                    entry.style.position = 'relative';
                } else {
                    entry.style.visibility = 'hidden';
                    entry.style.position = 'absolute';
                }
            });

            letters.forEach(letterElement => {
                const letterText = letterElement.textContent.trim();
                if (letter === 'all' || letterText === letter || (letter === '#' && letterText === 'Zahlen')) {
                    letterElement.style.visibility = 'visible';
                    letterElement.style.position = 'relative';
                } else {
                    letterElement.style.visibility = 'hidden';
                    letterElement.style.position = 'absolute';
                }
            });
        });
    });

    // Initially show all entries and set "Alle" button as active
    const allButton = document.querySelector('[data-letter="all"]');
    allButton.click();
    allButton.classList.add('active');
});

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.glossary__alphabet--filter button');
    const dropdown = document.createElement('div');
    dropdown.classList.add('glossary__alphabet--dropdown');
    dropdown.style.display = 'none'; // Initially hide the dropdown
    const select = document.createElement('select');
    filterButtons.forEach(button => {
        const option = document.createElement('option');
        option.value = button.getAttribute('data-letter');
        option.textContent = button.textContent;
        select.appendChild(option);
    });
    dropdown.appendChild(select);
    document.querySelector('.glossary').insertBefore(dropdown, document.querySelector('.glossary__entries'));

    select.addEventListener('change', function() {
        const selectedLetter = this.value;
        filterButtons.forEach(button => {
            if (button.getAttribute('data-letter') === selectedLetter) {
                button.click();
            }
        });

        // Reset styles after selection
        select.style.backgroundColor = '#22232a';
        select.style.color = 'white';
        select.style.border = '2px solid white';
    });

    // Show the dropdown when the screen width is 870px or less
    function handleResize() {
        if (window.innerWidth <= 870) {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
});


    // Ans Oche - Container 1

    document.addEventListener('DOMContentLoaded', () => {
        const points = document.querySelectorAll('.point');
        const pointImages = document.querySelectorAll('.point-image');
        const upperPart = document.querySelector('.upper-part');
        const lowerPart = document.querySelector('.lower-part');
    
        const optionsInfo = {
            flight: {
                title: "Flights",
                description: "Der Flight gibt dem Dartpfeil den nötigen Auftrieb und ein stabiles Flugverhalten, ähnlich wie die Tragfläche bei einem Flugzeug.",
                items: {
                    "Standard Flight": {
                        title: "Standard Flight",
                        description: "Der Klassiker. Diese Flightform wird von den meisten Spielern bevorzugt.",
                        properties: "Bieten mehr Stabilität und Auftrieb, was zu einem langsameren und kontrollierteren Flug führt.",
                        advantages: "Einfache Kontrolle für stabile Würfe.",
                        disadvantages: "Unwendiger als andere Formen",
                        img: "/img/flight_standard.svg"
                    },
                    "Slim Flight": {
                        title: "Slim Flight",
                        description: "Oval geformte Flights. Der Slim Flight ist für präzise, schnelle Würfe konzipiert.",
                        properties: "Reduzieren den Luftwiderstand und ermöglichen einen schnelleren Flug. Sie bieten weniger Stabilität, was zu einem schnelleren und direkteren Wurf führt.",
                        advantages: "Erhöhte Geschwindigkeit und Präzision.",
                        disadvantages: "Weniger stabil in der Luft.",
                        img: "/img/flight_slim.svg"
                    },
                    "Pear Flight": {
                        title: "Pear Flight",
                        description: "Der Pear Flight bietet mehr Kontrolle für erfahrene Spieler.",
                        properties: "Kombinieren die Stabilität von Standard Flights mit der Geschwindigkeit von Slim Flights. Sie bieten eine gute Balance zwischen Kontrolle und Geschwindigkeit.",
                        advantages: "Hohe Kontrolle und Wurfgenauigkeit.",
                        disadvantages: "Schwierig für Anfänger.",
                        img: "/img/flight_pear.svg"
                    },
                    "Kite Flight": {
                        title: "Kite Flight",
                        description: "Der Kite Flight ist perfekt für lange Würfe.",
                        properties: "Bieten eine gute Balance zwischen Stabilität und Geschwindigkeit, ähnlich wie Pear Flights, aber mit einer etwas anderen Flugbahn.",
                        advantages: "Stabil bei langen Würfen.",
                        disadvantages: "Weniger geeignet für schnelle Würfe.",
                        img: "/img/flight_kite.svg"
                    }
                },
            },
            shaft: {
                title: "Shafts",
                description: "Der Shaft bildet das Verbindungsstück zwischen Barrel und Flight. Ein kürzerer oder längerer Shaft verändert den Schwerpunkt des Dartpfeils.",
                items: {
                    "Nylon/Plastik Shafts": {
                        title: "Nylon/Plastik Shafts",
                        description: "Nylon- oder Plastik-Shafts sind die am häufigsten verwendeten Shafts im Dartsport, bekannt für ihre Flexibilität und Erschwinglichkeit.",
                        properties: "Leicht, flexibel und in vielen Farben erhältlich.",
                        advantages: "Günstig und bruchsicher bei Robin-Hood-Würfen.",
                        disadvantages: "Flights können leichter abfallen.",
                        img: "/img/shaft_plastic.svg"
                    },
                    "Aluminium Shafts": {
                        title: "Aluminium Shafts",
                        description: "Aluminium-Shafts sind eine beliebte Wahl für Spieler, die eine robustere und stabilere Option suchen.",
                        properties: "Robuster und schwerer als Nylon, oft mit einer schlanken Form.",
                        advantages: "Sehr langlebig und stabil.",
                        disadvantages: "Kann bei Robin-Hood-Würfen brechen, was den Shaft unbrauchbar macht.",
                        img: "/img/shaft_aluminium.svg"
                    },
                    "Rotierende Shafts": {
                        title: "Rotierende Shafts:",
                        description: "Rotierende Shafts bieten eine innovative Lösung, um die Wahrscheinlichkeit von Robin-Hood-Würfen zu reduzieren.",
                        properties: "Der Flight kann sich frei drehen.",
                        advantages: "Reduziert die Wahrscheinlichkeit von Robin-Hood-Würfen.",
                        disadvantages: "Kann das Gewicht und die Balance des Darts beeinflussen.",
                        img: "/img/shaft_spin.svg"
                    }
                },
            },
            barrel: {
                title: "Barrels",
                description: "Das Barrel bildet das Herzstück des Dartpfeils.",
                items: {
                    "Zylinderform": {
                        title: "Zylinderform",
                        description: "Die Zylinderform ist die klassischste und am weitesten verbreitete Form für Dart-Barrels.",
                        properties: "Gleichmäßiger Durchmesser über die gesamte Länge, oft mit Rillen oder Noppen für besseren Grip. Diese Form bietet eine gute Balance und Kontrolle.",
                        advantages: "Einfach zu greifen und zu kontrollieren, ideal für Anfänger.",
                        disadvantages: "Kann bei Spielern mit speziellen Grifftechniken weniger stabil sein.",
                        img: "/img/barrel_zylinder.svg"
                    },
                    "Tropfenform": {
                        title: "Tropfenform",
                        description: "Die Tropfenform ist für Spieler gedacht, die einen zentralen Schwerpunkt bevorzugen.",
                        properties: "Breiter in der Mitte und verjüngt sich zu beiden Enden hin.",
                        advantages: "Bietet eine gute Balance und Kontrolle, besonders bei präzisen Würfen.",
                        disadvantages: "Kann für Spieler mit großen Händen weniger komfortabel sein und ist schwieriger zu kontrollieren.",
                        img: "/img/barrel_tropfen.svg"
                    },
                    "Torpedoform": {
                        title: "Torpedoform",
                        description: "Die Torpedoform ist ideal für Spieler, die einen schnellen und kraftvollen Wurf bevorzugen.",
                        properties: "Schmaler an der Spitze und breiter am hinteren Ende.",
                        advantages: "Erlaubt eine höhere Geschwindigkeit und Durchschlagskraft.",
                        disadvantages: "Erfordert eine präzise Wurftechnik, um die Vorteile voll auszuschöpfen.",
                        img: "/img/barrel_torpedo.svg"
                    }
                },
            },
            tip: {
                title: "Tips",
                description: "Die Spitze des Darts sorgt für den sicheren Halt im Bord.",
                items: {
                    "Glatte Spitzen": {
                        title: "Glatte Spitzen",
                        description: "Glatte Spitzen sind die einfachste Form von Dartspitzen ohne zusätzliche Riffelungen.",
                        properties: "Keine Rillen oder Einkerbungen, was eine glatte Oberfläche bietet.",
                        advantages: "Einfach zu reinigen und weniger anfällig für Abnutzung.",
                        disadvantages: "Kann weniger Grip im Board bieten, was zu einem höheren Risiko des Herausfallens führen kann.",
                        img: "/img/point_normal.svg"
                    },
                    "Geriffelte Spitzen": {
                        title: "Geriffelte Spitzen",
                        description: "Geriffelte Spitzen haben feine Rillen entlang der Spitze, um den Halt im Board zu verbessern.",
                        properties: "Rillen entlang der Spitze bieten zusätzlichen Grip.",
                        advantages: "Bessere Haftung im Board, was die Stabilität des Darts erhöht.",
                        disadvantages: "Kann schwieriger zu reinigen sein und neigt dazu, schneller abzunutzen.",
                        img: "/img/point_geriffelt.svg"
                    },
                    "Spiralförmige Spitzen": {
                        title: "Spiralförmige Spitzen",
                        description: "Spiralförmige Spitzen haben eine spiralförmige Riffelung, die sich um die Spitze windet.",
                        properties: "Spiralrillen bieten eine einzigartige Textur und verbesserten Halt.",
                        advantages: "Sehr guter Grip im Board, was die Wahrscheinlichkeit des Herausfallens minimiert.",
                        disadvantages: "Kann das Board stärker abnutzen und ist schwieriger zu reinigen.",
                        img: "/img/point_spirale.svg"
                    },
                    "Gefräste Spitzen": {
                        title: "Gefräste Spitzen",
                        description: "Gefräste Spitzen haben präzise gefräste Rillen oder Muster für maximalen Grip.",
                        properties: "Komplexe Muster bieten hervorragenden Halt und Stabilität.",
                        advantages: "Optimaler Grip und Stabilität im Board.",
                        disadvantages: "Teurer und erfordert mehr Pflege, um die Rillen sauber zu halten.",
                        img: "/img/point_gefräst.svg"
                    }
                },
            },
        };
    
        const updateUpperPart = (data) => {
            upperPart.innerHTML = `
                <div class="info-section">
                    <h2>${data.title}</h2>
                    <p>${data.description}</p>
                    <p class="properties"><strong>Eigenschaften:</strong> ${data.properties}</p>
                </div>
                <div class="advantages-disadvantages" style="--adv-disadv-height: 40px;">
                    <div class="advantage">
                        <span class="plus">+</span>
                        <p>${data.advantages}</p>
                    </div>
                    <div class="vertical-line"></div>
                    <div class="disadvantage">
                        <span class="minus">-</span>
                        <p>${data.disadvantages}</p>
                    </div>
                </div>
            `;
        };
        
        const showOptionsAndExplanation = (type) => {
            const optionData = optionsInfo[type];
            upperPart.innerHTML = `
                <h2 class="center-text">${optionData.title}</h2>
                <p class="center-text">${optionData.description}</p>
                <p class="center-text small-text">Wähle eine Option aus, um die Details zu sehen.</p>
            `;
        
            lowerPart.innerHTML = Object.entries(optionData.items).map(([label, data]) => `
                <div class="${type}-option" data-label="${label}">
                    <img src="${data.img}" alt="${label}">
                    <p>${label}</p>
                </div>
            `).join('');
        };
        
    
        const activatePoint = (pointsList, point) => {
            pointsList.forEach(p => p.classList.remove('active'));
            point.classList.add('active');
        };
    
        const handleOptionClick = (event) => {
            const target = event.target.closest('.flight-option, .barrel-option, .shaft-option, .tip-option');
            if (target) {
                const activeClass = target.classList[0].split('-')[0];
                const options = document.querySelectorAll(`.${activeClass}-option`);
                
                options.forEach(option => option.classList.remove('active'));
                target.classList.add('active');
    
                const label = target.getAttribute('data-label');
                const data = optionsInfo[activeClass].items[label];
                if (data) {
                    updateUpperPart(data);
                }
            }
        };
    
        lowerPart.addEventListener('click', handleOptionClick);
    
        // Eventlistener für Desktop (points)
        points.forEach(point => {
            point.addEventListener('click', () => {
                const label = point.getAttribute('data-label').toLowerCase();
                activatePoint(points, point);
                showOptionsAndExplanation(label);
            });
        });
    
        // Eventlistener für Mobile (point-images)
        pointImages.forEach(image => {
            image.addEventListener('click', () => {
                const label = image.getAttribute('data-label').toLowerCase();
                activatePoint(pointImages, image);
                showOptionsAndExplanation(label);
            });
        });
    
        // Standardmäßig den ersten Punkt aktivieren
        const defaultPoint = document.querySelector('.point[data-label="Flight"]') || document.querySelector('.point-image[data-label="Flight"]');
        if (defaultPoint) {
            activatePoint(points, defaultPoint);
            showOptionsAndExplanation('flight');
        }
    });
    
    
    document.addEventListener('DOMContentLoaded', () => {
        const pointItems = document.querySelectorAll('.point-item');
        const pointImages = document.querySelectorAll('.point-image');
        const lowerPart = document.querySelector('.lower-part');
        const upperPart = document.querySelector('.upper-part');
        let currentPointIndex = 0;
        let currentOptionIndex = 0;  // Verfolgt das aktuelle Item im lower-part (für < 550px)
    
        const optionsInfo = {
            flight: {
                title: "Flights",
                description: "Der Flight gibt dem Dartpfeil den nötigen Auftrieb und ein stabiles Flugverhalten, ähnlich wie die Tragfläche bei einem Flugzeug.",
                items: {
                    "Standard Flight": {
                        title: "Standard Flight",
                        description: "Der Klassiker. Diese Flightform wird von den meisten Spielern bevorzugt.",
                        properties: "Bieten mehr Stabilität und Auftrieb, was zu einem langsameren und kontrollierteren Flug führt.",
                        advantages: "Einfache Kontrolle für stabile Würfe.",
                        disadvantages: "Unwendiger als andere Formen",
                        img: "/img/flight_standard.svg"
                    },
                    "Slim Flight": {
                        title: "Slim Flight",
                        description: "Oval geformte Flights. Der Slim Flight ist für präzise, schnelle Würfe konzipiert.",
                        properties: "Reduzieren den Luftwiderstand und ermöglichen einen schnelleren Flug. Sie bieten weniger Stabilität, was zu einem schnelleren und direkteren Wurf führt.",
                        advantages: "Erhöhte Geschwindigkeit und Präzision.",
                        disadvantages: "Weniger stabil in der Luft.",
                        img: "/img/flight_slim.svg"
                    },
                    "Pear Flight": {
                        title: "Pear Flight",
                        description: "Der Pear Flight bietet mehr Kontrolle für erfahrene Spieler.",
                        properties: "Kombinieren die Stabilität von Standard Flights mit der Geschwindigkeit von Slim Flights. Sie bieten eine gute Balance zwischen Kontrolle und Geschwindigkeit.",
                        advantages: "Hohe Kontrolle und Wurfgenauigkeit.",
                        disadvantages: "Schwierig für Anfänger.",
                        img: "/img/flight_pear.svg"
                    },
                    "Kite Flight": {
                        title: "Kite Flight",
                        description: "Der Kite Flight ist perfekt für lange Würfe.",
                        properties: "Bieten eine gute Balance zwischen Stabilität und Geschwindigkeit, ähnlich wie Pear Flights, aber mit einer etwas anderen Flugbahn.",
                        advantages: "Stabil bei langen Würfen.",
                        disadvantages: "Weniger geeignet für schnelle Würfe.",
                        img: "/img/flight_kite.svg"
                    }
                },
            },
            shaft: {
                title: "Shafts",
                description: "Der Shaft bildet das Verbindungsstück zwischen Barrel und Flight. Ein kürzerer oder längerer Shaft verändert den Schwerpunkt des Dartpfeils.",
                items: {
                    "Nylon/Plastik Shafts": {
                        title: "Nylon/Plastik Shafts",
                        description: "Nylon- oder Plastik-Shafts sind die am häufigsten verwendeten Shafts im Dartsport, bekannt für ihre Flexibilität und Erschwinglichkeit.",
                        properties: "Leicht, flexibel und in vielen Farben erhältlich.",
                        advantages: "Günstig und bruchsicher bei Robin-Hood-Würfen.",
                        disadvantages: "Flights können leichter abfallen.",
                        img: "/img/shaft_plastic.svg"
                    },
                    "Aluminium Shafts": {
                        title: "Aluminium Shafts",
                        description: "Aluminium-Shafts sind eine beliebte Wahl für Spieler, die eine robustere und stabilere Option suchen.",
                        properties: "Robuster und schwerer als Nylon, oft mit einer schlanken Form.",
                        advantages: "Sehr langlebig und stabil.",
                        disadvantages: "Kann bei Robin-Hood-Würfen brechen, was den Shaft unbrauchbar macht.",
                        img: "/img/shaft_aluminium.svg"
                    },
                    "Rotierende Shafts": {
                        title: "Rotierende Shafts:",
                        description: "Rotierende Shafts bieten eine innovative Lösung, um die Wahrscheinlichkeit von Robin-Hood-Würfen zu reduzieren.",
                        properties: "Der Flight kann sich frei drehen.",
                        advantages: "Reduziert die Wahrscheinlichkeit von Robin-Hood-Würfen.",
                        disadvantages: "Kann das Gewicht und die Balance des Darts beeinflussen.",
                        img: "/img/shaft_spin.svg"
                    }
                },
            },
            barrel: {
                title: "Barrels",
                description: "Das Barrel bildet das Herzstück des Dartpfeils.",
                items: {
                    "Zylinderform": {
                        title: "Zylinderform",
                        description: "Die Zylinderform ist die klassischste und am weitesten verbreitete Form für Dart-Barrels.",
                        properties: "Gleichmäßiger Durchmesser über die gesamte Länge, oft mit Rillen oder Noppen für besseren Grip. Diese Form bietet eine gute Balance und Kontrolle.",
                        advantages: "Einfach zu greifen und zu kontrollieren, ideal für Anfänger.",
                        disadvantages: "Kann bei Spielern mit speziellen Grifftechniken weniger stabil sein.",
                        img: "/img/barrel_zylinder.svg"
                    },
                    "Tropfenform": {
                        title: "Tropfenform",
                        description: "Die Tropfenform ist für Spieler gedacht, die einen zentralen Schwerpunkt bevorzugen.",
                        properties: "Breiter in der Mitte und verjüngt sich zu beiden Enden hin.",
                        advantages: "Bietet eine gute Balance und Kontrolle, besonders bei präzisen Würfen.",
                        disadvantages: "Kann für Spieler mit großen Händen weniger komfortabel sein und ist schwieriger zu kontrollieren.",
                        img: "/img/barrel_tropfen.svg"
                    },
                    "Torpedoform": {
                        title: "Torpedoform",
                        description: "Die Torpedoform ist ideal für Spieler, die einen schnellen und kraftvollen Wurf bevorzugen.",
                        properties: "Schmaler an der Spitze und breiter am hinteren Ende.",
                        advantages: "Erlaubt eine höhere Geschwindigkeit und Durchschlagskraft.",
                        disadvantages: "Erfordert eine präzise Wurftechnik, um die Vorteile voll auszuschöpfen.",
                        img: "/img/barrel_torpedo.svg"
                    }
                },
            },
            tip: {
                title: "Tips",
                description: "Die Spitze des Darts sorgt für den sicheren Halt im Bord.",
                items: {
                    "Glatte Spitzen": {
                        title: "Glatte Spitzen",
                        description: "Glatte Spitzen sind die einfachste Form von Dartspitzen ohne zusätzliche Riffelungen.",
                        properties: "Keine Rillen oder Einkerbungen, was eine glatte Oberfläche bietet.",
                        advantages: "Einfach zu reinigen und weniger anfällig für Abnutzung.",
                        disadvantages: "Kann weniger Grip im Board bieten, was zu einem höheren Risiko des Herausfallens führen kann.",
                        img: "/img/point_normal.svg"
                    },
                    "Geriffelte Spitzen": {
                        title: "Geriffelte Spitzen",
                        description: "Geriffelte Spitzen haben feine Rillen entlang der Spitze, um den Halt im Board zu verbessern.",
                        properties: "Rillen entlang der Spitze bieten zusätzlichen Grip.",
                        advantages: "Bessere Haftung im Board, was die Stabilität des Darts erhöht.",
                        disadvantages: "Kann schwieriger zu reinigen sein und neigt dazu, schneller abzunutzen.",
                        img: "/img/point_geriffelt.svg"
                    },
                    "Spiralförmige Spitzen": {
                        title: "Spiralförmige Spitzen",
                        description: "Spiralförmige Spitzen haben eine spiralförmige Riffelung, die sich um die Spitze windet.",
                        properties: "Spiralrillen bieten eine einzigartige Textur und verbesserten Halt.",
                        advantages: "Sehr guter Grip im Board, was die Wahrscheinlichkeit des Herausfallens minimiert.",
                        disadvantages: "Kann das Board stärker abnutzen und ist schwieriger zu reinigen.",
                        img: "/img/point_spirale.svg"
                    },
                    "Gefräste Spitzen": {
                        title: "Gefräste Spitzen",
                        description: "Gefräste Spitzen haben präzise gefräste Rillen oder Muster für maximalen Grip.",
                        properties: "Komplexe Muster bieten hervorragenden Halt und Stabilität.",
                        advantages: "Optimaler Grip und Stabilität im Board.",
                        disadvantages: "Teurer und erfordert mehr Pflege, um die Rillen sauber zu halten.",
                        img: "/img/point_gefräst.svg"
                    }
                },
            },
        };
    
        // Funktion zum Aktualisieren des upperPart basierend auf dem aktuellen Item
        function updateUpperPartItem(itemData) {
            // Nur auf Bildschirmen unter 550px die detaillierten Informationen anzeigen
            if (window.innerWidth <= 550) {
                upperPart.innerHTML = `
                    <div class="info-section">
                        <h2>${itemData.title}</h2>
                        <p>${itemData.description}</p>
                        <!-- Entferne das class="properties", damit es keinen falschen Klassennamen gibt -->
                        <p><strong>Eigenschaften:</strong> ${itemData.properties}</p>
                    </div>
                    <div class="advantages-disadvantages">
                        <div class="advantage">
                            <span class="plus">+</span>
                            <p>${itemData.advantages}</p>
                        </div>
                        <div class="vertical-line"></div>
                        <div class="disadvantage">
                            <span class="minus">-</span>
                            <p>${itemData.disadvantages}</p>
                        </div>
                    </div>
                `;
            }
        }
    
    
        // Funktion zum Aktualisieren des upperPart für große Bildschirme (Allgemeine Info)
        function updateUpperPartGeneral(label) {
            const optionData = optionsInfo[label];
            if (!optionData) {
                console.error(`No options found for label: ${label}`);
                return;
            }
    
            // Nur allgemeine Informationen für größere Bildschirme anzeigen
            if (window.innerWidth > 550) {
                upperPart.innerHTML = `
                    <h2 class="center-text">${optionData.title}</h2>
                    <p class="center-text">${optionData.description}</p>
                    <p class="center-text small-text">Wähle eine Option aus, um die Details zu sehen.</p>
                `;
            }
        }
    
        // Zeige nur ein Item im lowerPart an (für kleine Bildschirme)
        function activateLowerPartCarousel(label) {
            const optionData = optionsInfo[label];
            if (!optionData) {
                console.error(`No options found for label: ${label}`);
                return;
            }
    
            const items = Object.entries(optionData.items);
    
            if (currentOptionIndex >= items.length) {
                currentOptionIndex = 0;
            } else if (currentOptionIndex < 0) {
                currentOptionIndex = items.length - 1;
            }
    
            const [itemLabel, data] = items[currentOptionIndex];
    
            // Zeige nur das aktuell ausgewählte Item im lowerPart
            lowerPart.innerHTML = `
                <div class="${label}-option active" data-label="${itemLabel}">
                    <img src="${data.img}" alt="${itemLabel}">
                    <p>${itemLabel}</p>
                </div>
                <button class="carousel-control prev" id="lower-prev">‹</button>
                <button class="carousel-control next" id="lower-next">›</button>
            `;
    
            // Aktualisiere den upperPart mit den Details des aktuellen Items
            updateUpperPartItem(data);
    
            // Event-Listener für die Carousel-Buttons (prev und next)
            document.getElementById('lower-prev').addEventListener('click', () => {
                currentOptionIndex = (currentOptionIndex === 0) ? items.length - 1 : currentOptionIndex - 1;
                activateLowerPartCarousel(label);  // Aktualisiere das Carousel
            });
    
            document.getElementById('lower-next').addEventListener('click', () => {
                currentOptionIndex = (currentOptionIndex + 1) % items.length;
                activateLowerPartCarousel(label);  // Aktualisiere das Carousel
            });
        }
    
        // Funktion zum Aktualisieren des lowerPart (für größere Bildschirme)
        function updateLowerPart(label) {
            const optionData = optionsInfo[label];
            if (!optionData) {
                console.error(`No options found for label: ${label}`);
                return;
            }
    
            // Alle Items anzeigen (für größere Bildschirme)
            lowerPart.innerHTML = Object.entries(optionData.items).map(([itemLabel, data]) => `
                <div class="${label}-option" data-label="${itemLabel}">
                    <img src="${data.img}" alt="${itemLabel}">
                    <p>${itemLabel}</p>
                </div>
            `).join('');
    
            // Allgemeine Informationen im upper-part für große Bildschirme
            updateUpperPartGeneral(label);
        }
    
        // Funktion zum Überprüfen der Bildschirmbreite und Umschalten des Carousels
        function checkScreenWidth(label) {
            const screenWidth = window.innerWidth;
    
            if (screenWidth <= 550) {
                // Carousel für kleine Bildschirme aktivieren
                activateLowerPartCarousel(label);
            } else {
                // Alle 4 Items anzeigen bei größeren Bildschirmen
                updateLowerPart(label);
            }
        }
    
        // Funktion zum Aktualisieren des Carousels
        function updateCarousel() {
            pointItems.forEach((item, index) => {
                item.classList.remove('active');
                if (index === currentPointIndex) {
                    item.classList.add('active');
                }
            });
    
            pointImages.forEach((image, index) => {
                image.classList.remove('active');
                if (index === currentPointIndex) {
                    image.classList.add('active');
    
                    const label = image.getAttribute('data-label').toLowerCase();
                    checkScreenWidth(label);  // Überprüfe die Bildschirmbreite und aktualisiere den lowerPart entsprechend
                }
            });
        }
    
        // Event-Listener für die vorherige Carousel-Steuerung
        document.querySelector('.carousel-control.prev').addEventListener('click', () => {
            currentPointIndex = (currentPointIndex === 0) ? pointItems.length - 1 : currentPointIndex - 1;
            updateCarousel();
        });
    
        // Event-Listener für die nächste Carousel-Steuerung
        document.querySelector('.carousel-control.next').addEventListener('click', () => {
            currentPointIndex = (currentPointIndex === pointItems.length - 1) ? 0 : currentPointIndex + 1;
            updateCarousel();
        });
    
        // Initialisierung: Initialisiere das Carousel und zeige die Standard-Optionen
        updateCarousel();
    
        // Überprüfe die Bildschirmgröße bei Resize-Events
        window.addEventListener('resize', () => {
            const label = pointImages[currentPointIndex].getAttribute('data-label').toLowerCase();
            checkScreenWidth(label);
        });
    });    

    // Formluar Radio Button Instagram

    document.addEventListener('DOMContentLoaded', function() {
        const instagramInput = document.getElementById('instagram');
        const instagramRadio = document.getElementById('faq-instagram-contact');
    
        // Funktion zum Überprüfen und Aktivieren/Deaktivieren des Radio-Buttons
        function checkInstagramInput() {
            if (instagramInput.value.trim() === '') {
                instagramRadio.disabled = true;
                instagramRadio.checked = false; // Deaktiviert auch die Auswahl, falls ausgewählt
            } else {
                instagramRadio.disabled = false;
            }
        }
    
        // Überprüfen beim Laden der Seite
        checkInstagramInput();
    
        // Überprüfen bei jeder Änderung des Instagram-Feldes
        instagramInput.addEventListener('input', checkInstagramInput);
    });

    // FAQ 5 Fragen
    
    document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
    
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            let isOpen = false;
    
            // Toggle open/close on click
            question.addEventListener('click', () => {
                isOpen = !isOpen;
                item.classList.toggle('open', isOpen);
            });
    
            // Handle mouseover on question and answer
            item.addEventListener('mouseover', () => {
                if (!isOpen) {
                    answer.style.maxHeight = '250px'; // Show the answer
                    answer.style.padding = '1rem';
                }
            });
    
            // Handle mouseout when neither question nor answer is hovered
            item.addEventListener('mouseout', () => {
                if (!isOpen) {
                    answer.style.maxHeight = '0'; // Hide the answer
                    answer.style.padding = '0';
                }
            });
        });
    });
    


    // Footer

    document.addEventListener('DOMContentLoaded', function() {
        const logoLink = document.querySelector('.page-footer__logo--link');

        logoLink.addEventListener('click', function(event) {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    });

    // Checkout-Chart

    document.addEventListener('DOMContentLoaded', function() {
        // Funktion, die sicherstellt, dass der korrekte Radio-Button ausgewählt ist
        function setCheckedRadioButton() {
            const selectedStrategy = document.querySelector('input[name="strategy"]:checked').value; // Speichert die aktuelle Auswahl
            const safeRadioOriginal = document.getElementById('checkout-safe');
            const safeRadioNew = document.getElementById('checkout-safe-new');
            
            // Prüfe, welche Optionen sichtbar sind
            const isOriginalVisible = window.getComputedStyle(document.querySelector('.original-options')).display !== 'none';
            const isNewVisible = window.getComputedStyle(document.querySelector('.new-options')).display !== 'none';
    
            if (isOriginalVisible) {
                document.getElementById(`checkout-${selectedStrategy}`).checked = true; // Setzt die Auswahl in den original-options basierend auf der gespeicherten Strategie
            }
            if (isNewVisible) {
                document.getElementById(`checkout-${selectedStrategy}-new`).checked = true; // Setzt die Auswahl in den new-options basierend auf der gespeicherten Strategie
            }
        }
    
        // Setze den richtigen Radio-Button beim Laden der Seite
        setCheckedRadioButton();
    
        // Setze den initialen Zustand für checkout-middle und checkout-right
        const initialNumber = 40; // Hier die Zahl, die standardmäßig angezeigt werden soll
        const initialStrategy = document.querySelector('input[name="strategy"]:checked').value; // Hole die aktuelle Strategie beim Laden der Seite
    
        // Populiere die mittlere und rechte Spalte basierend auf der initialen Strategie und Zahl
        populateMiddleColumn(initialNumber, initialStrategy);
        populateRightColumn(initialNumber, checkouts[initialNumber][initialStrategy].path, checkouts[initialNumber][initialStrategy].explanation);
    
        // Setze die aktive Klasse für die initiale Zahl in der linken Spalte
        document.querySelector(`.checkout-text[data-number="${initialNumber}"]`).classList.add('active');
    
        // Führe die Funktion bei jeder Fenstergrößenänderung erneut aus
        window.addEventListener('resize', setCheckedRadioButton);
        
        // Restlicher Event Listener Code bleibt unverändert
    });
    
    // Die populateMiddleColumn und populateRightColumn Funktionen bleiben unverändert
    
    

    
    document.querySelectorAll('.checkout-text').forEach(text => {
        text.addEventListener('click', function() {
            const number = parseInt(this.getAttribute('data-number'));
            const strategy = document.querySelector('input[name="strategy"]:checked').value;
            const checkoutNumberElement = document.getElementById('checkout-number');
    
            // Überprüfen, ob die angeklickte Zahl bereits ausgewählt ist
            if (checkoutNumberElement.textContent == number) {
                return; // Beende die Funktion, wenn die Zahl bereits ausgewählt ist
            }
    
            animateNumberChange(checkoutNumberElement, number);
    
            // Entferne die aktive Klasse von allen Elementen und füge sie dem angeklickten Element hinzu
            document.querySelectorAll('.checkout-text').forEach(text => {
                text.classList.remove('active');
            });
            this.classList.add('active');
    
            populateMiddleColumn(number, strategy);
    
            // Wähle den ersten Checkout-Weg im mittleren Abschnitt aus und zeige ihn im rechten Abschnitt an
            const firstOption = document.querySelector('.checkout-option');
            if (firstOption) {
                firstOption.classList.add('active');
                const firstNumber = parseInt(firstOption.querySelector('span:first-child').textContent);
                populateRightColumn(firstNumber, checkouts[firstNumber][strategy].path, checkouts[firstNumber][strategy].explanation);
            }
        });
    });
    
    document.querySelectorAll('input[name="strategy"]').forEach(radio => {
        radio.addEventListener('change', function() {
            const number = parseInt(document.getElementById('checkout-number').textContent);
            const strategy = this.value;
            
            // Die aktuell aktive Zahl im mittleren Abschnitt herausfinden
            const activeMiddleOption = document.querySelector('.checkout-option.active');
            const activeMiddleNumber = activeMiddleOption ? parseInt(activeMiddleOption.querySelector('span:first-child').textContent) : number;
    
            populateMiddleColumn(number, strategy);
    
            // Sicherstellen, dass nur die aktive Zahl ausgewählt bleibt und keine doppelte Auswahl erfolgt
            document.querySelectorAll('.checkout-option').forEach(option => {
                option.classList.remove('active');
            });
    
            // Wähle die vorher aktive Zahl im mittleren Abschnitt aus und zeige sie im rechten Abschnitt an
            const activeOption = Array.from(document.querySelectorAll('.checkout-option')).find(option => parseInt(option.querySelector('span:first-child').textContent) === activeMiddleNumber);
            if (activeOption) {
                activeOption.classList.add('active');
                const activeNumber = parseInt(activeOption.querySelector('span:first-child').textContent);
                populateRightColumn(activeNumber, checkouts[activeNumber][strategy].path, checkouts[activeNumber][strategy].explanation);
            } else if (document.querySelector('.checkout-option')) {
                // Falls die vorher aktive Zahl nicht mehr existiert, wähle die erste Option aus
                const firstOption = document.querySelector('.checkout-option');
                firstOption.classList.add('active');
                const firstNumber = parseInt(firstOption.querySelector('span:first-child').textContent);
                populateRightColumn(firstNumber, checkouts[firstNumber][strategy].path, checkouts[firstNumber][strategy].explanation);
            }
        });
    });
    
    function animateNumberChange(element, newNumber) {
        const currentNumber = parseInt(element.textContent);
        const duration = 500; // Dauer der Animation in Millisekunden
        const stepTime = Math.abs(Math.floor(duration / Math.abs(newNumber - currentNumber)));
        let start = currentNumber;
        const increment = newNumber > currentNumber ? 1 : -1;
    
        const timer = setInterval(() => {
            start += increment;
            element.textContent = start;
            if (start === newNumber) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    
    function populateMiddleColumn(number, strategy) {
        const middleColumn = document.getElementById('checkout-middle');
        middleColumn.innerHTML = ''; // Clear previous content
    
        for (let i = number; i < number + 10; i++) {
            if (checkouts[i] && checkouts[i][strategy]) {
                const div = document.createElement('div');
                div.classList.add('checkout-option');
                div.innerHTML = `<span>${i}</span><span>-</span><span>${checkouts[i][strategy].path}</span>`;
                div.addEventListener('click', function() {
                    // Entferne die aktive Klasse von allen anderen Optionen
                    document.querySelectorAll('.checkout-option').forEach(option => {
                        option.classList.remove('active');
                    });
                    // Markiere die angeklickte Option als aktiv
                    div.classList.add('active');
                    populateRightColumn(i, checkouts[i][strategy].path, checkouts[i][strategy].explanation);
                });
                middleColumn.appendChild(div);
            }
        }
    
        // Wähle die vorher aktive Option im mittleren Abschnitt aus, falls sie existiert
        const activeOption = Array.from(document.querySelectorAll('.checkout-option')).find(option => parseInt(option.querySelector('span:first-child').textContent) === number);
        if (activeOption) {
            activeOption.classList.add('active');
            const activeNumber = parseInt(activeOption.querySelector('span:first-child').textContent);
            populateRightColumn(activeNumber, checkouts[activeNumber][strategy].path, checkouts[activeNumber][strategy].explanation);
        }
    }
    
    function populateRightColumn(number, path, explanation) {
        const rightColumn = document.getElementById('checkout-right');
        rightColumn.innerHTML = `
            <div class="checkout-number">${number}</div>
            <div class="checkout-path">${path}</div>
            <div class="checkout-explanation">${explanation}</div>
        `;
    }
    
// Footstand-Carousel

const boxes = document.querySelectorAll('.oche__footstand--box');
let currentIndex = 0;

function updateCarousel() {
    boxes.forEach((box, index) => {
        box.classList.remove('prev', 'next', 'active');
        
        if (index === currentIndex) {
            box.classList.add('active'); // Die mittlere Box ist aktiv
        } else if (index === (currentIndex - 1 + boxes.length) % boxes.length) {
            box.classList.add('prev'); // Linke Box
        } else if (index === (currentIndex + 1) % boxes.length) {
            box.classList.add('next'); // Rechte Box
        }
    });
}

document.querySelector('.carousel-control__footstand-prev').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? boxes.length - 1 : currentIndex - 1;
    updateCarousel();
});

document.querySelector('.carousel-control__footstand-next').addEventListener('click', () => {
    currentIndex = (currentIndex === boxes.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
});

updateCarousel(); // Initialisierung

