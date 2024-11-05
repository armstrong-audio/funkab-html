document.addEventListener("DOMContentLoaded", function () {
    fetch('contactbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contactbar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading preloader:', error));
});