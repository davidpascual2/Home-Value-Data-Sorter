document.addEventListener('DOMContentLoaded', function(){ //DOMContentLoaded?
    const homeButton = document.querySelector('#home-button');
    homeButton.onclick = function() {
        window.location.href = '/';
    }
});