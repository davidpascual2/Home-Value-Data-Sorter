document.addEventListener("DOMContentLoaded", () => { //DOMContentLoaded?
    const priceButton = document.querySelector('#price-button');
    priceButton.onclick = () => {
        window.location.href = '/price';
    }
});