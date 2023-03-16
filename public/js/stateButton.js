document.addEventListener('DOMContentLoaded', () => {
    const stateButton = document.querySelector('#state-button');
    stateButton.onclick = () => {
        window.location.href = '/state';
    }
});