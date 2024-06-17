// absolute position of header background 
export function setContainerHeight() {
    const backgroundImage = document.getElementById('background_image');
    const containerHeader = document.getElementById('container_header');

    if (backgroundImage && containerHeader) {
        const imageHeight = backgroundImage.clientHeight;
        containerHeader.style.height = `${imageHeight}px`;
    }
}