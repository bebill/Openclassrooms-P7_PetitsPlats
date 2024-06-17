/**
 * Sets the height of the container header based on the height of the background image.
 * Finds the background image and container header elements by their IDs,
 * calculates the height of the background image, and sets the container header's height accordingly.
 */
export function setContainerHeight() {
    const backgroundImage = document.getElementById('background_image');
    const containerHeader = document.getElementById('container_header');

    if (backgroundImage && containerHeader) {
        const imageHeight = backgroundImage.clientHeight;
        containerHeader.style.height = `${imageHeight}px`;
    }
}