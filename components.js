document.addEventListener("DOMContentLoaded", function () {
    fetch('contactbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('contactbar-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading contact bar:', error));

    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
});
