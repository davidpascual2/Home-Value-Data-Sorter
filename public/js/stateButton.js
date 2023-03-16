document.addEventListener('DOMContentLoaded', () => { //DOMContentLoaded?
    console.log("Script loaded");
    const stateButton = document.querySelector('#state-button');
    stateButton.onclick = () => {
        console.log("clicked!")
        window.location.href = '/state';
    }
});