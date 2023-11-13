const previewLinks = document.querySelectorAll('.preview-link');
const tooltip = document.getElementById('preview');

previewLinks.forEach(link => {
    link.addEventListener('mouseover', (event) => {
        const link = event.target;
        tooltip.innerHTML = '';
        tooltip.style.display = 'block';

        // Fetch the preview image or data from the website
        fetch(`https://api.microlink.io?url=${link.href}`)
            .then(response => response.json())
            .then(data => {
                if (data.data?.image) {
                    const image = document.createElement('img');
                    image.src = data.data.image.url;
                    tooltip.appendChild(image);
                } else {
                    tooltip.innerHTML = 'No preview available';
                }
            })
            .catch(error => {
                console.error('Error fetching preview:', error);
                tooltip.innerHTML = 'Error fetching preview';
            });
    });

    link.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
    });
});