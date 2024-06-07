const NAV_BAR = document.querySelector('.nav_bar');
const IFRAME = document.querySelector('.frame')


let NAV_DATA = []; 

function writeJSON(){
    NAV_BAR.innerHTML = '';

    NAV_DATA.forEach(el => {
        const navItemHTML = `<div class="nav-text">
                                <a class="nav-btn" href="${el.url}">${el.id} ${el.text}</a>
                             </div>`;
        NAV_BAR.innerHTML += navItemHTML;
    });
    

}

function loadPage(url){
    IFRAME.src = url;
    url = '';
}

NAV_BAR.addEventListener('click', (event) => {
    if(event.target.classList.contains('nav-btn')){
        const url = event.target.getAttribute('href');

        loadPage(url)
        event.preventDefault();
    }
})


fetch('data/nav_data.json')
  .then(response => response.json())
  .then(JSONdata => {
    NAV_DATA = JSONdata;

    writeJSON();
    
  });

