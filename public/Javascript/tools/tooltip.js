
//Tooltip
document.addEventListener('DOMContentLoaded', function() {
    const rangeInput = document.getElementById('price-range');
    const tooltip = document.getElementById('price-tooltip');

    let tooltipTimeout;
    rangeInput.addEventListener('input', () => {
    tooltip.textContent = rangeInput.value === "10000" ? "Sin límite" : `$${rangeInput.value}`;
    tooltip.style.opacity = 1;

    const percent = (rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min);
    tooltip.style.left = `${percent * 100}%`;

    clearTimeout(tooltipTimeout);
    tooltipTimeout = setTimeout(() => {
        tooltip.style.opacity = 0;
    }, 500);
    });
});