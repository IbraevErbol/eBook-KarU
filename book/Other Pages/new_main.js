document.addEventListener('DOMContentLoaded', () => {
    const DIRECTION_BAR = document.querySelector('.direction');
    const IFRAME = document.querySelector('.iframe_text');

    function loadData(jsonPath) {
        let DIRECTION_DATA = [];

        function writeDATA() {
            DIRECTION_BAR.innerHTML = ''; 
            DIRECTION_DATA.forEach((el) => {
                const divHTML = document.createElement('div'); 
                divHTML.classList.add('nav_bar_page'); 
                divHTML.innerHTML = `<p>${el.num}. &nbsp;&nbsp;&nbsp; ${el.title}</p>`; 
                divHTML.addEventListener('click', () => {
                    clearActiveClasses(); // Очищаем все активные классы
                    divHTML.classList.add('active');
                    loadTextContent(el.contentPath);
                });
                DIRECTION_BAR.appendChild(divHTML);

                if (el.title_mini) {
                    const subList = document.createElement('div');
                    subList.classList.add('sub_list');

                    el.title_mini.forEach(subEl => {
                        const subDivHTML = document.createElement('div');
                        subDivHTML.classList.add('nav_bar_sub_page');
                        subDivHTML.innerHTML = `<p>${subEl.num}. &nbsp;&nbsp;&nbsp; ${subEl.title}</p>`;
                        subDivHTML.addEventListener('click', (event) => {
                            event.stopPropagation(); // Предотвращаем всплытие события клика на родительский элемент
                            clearActiveClasses(); // Очищаем все активные классы
                            subDivHTML.classList.add('active');
                            loadTextContent(subEl.contentPath);
                        });
                        subList.appendChild(subDivHTML);
                    });

                    DIRECTION_BAR.appendChild(subList);
                }
            });
        }

        function clearActiveClasses() {
            document.querySelectorAll('.nav_bar_page, .nav_bar_sub_page').forEach(btn => btn.classList.remove('active'));
        }

        function loadTextContent(filePath) {
            IFRAME.src = filePath;
        }

        fetch(jsonPath)
            .then(response => response.json())
            .then(data => {
                DIRECTION_DATA = data;
                writeDATA();
            })
            .catch(error => {
                console.error('Error loading navigation data:', error);
            });
    }

    // Вызов функции с путем к JSON файлу
    const jsonPath = document.querySelector('script[data-json-path]').dataset.jsonPath;
    loadData(jsonPath);
});
