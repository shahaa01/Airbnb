    document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById('slider');
    const value = document.getElementById('slider-value');

    slider.addEventListener('input', () => {
        value.innerHTML = `<strong>Price: &#8377; ${slider.value}`    });
    });

    