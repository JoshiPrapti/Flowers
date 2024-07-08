// Wait until the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Array of image objects containing fullsize, thumbnail, description, and color
    const images = [
        {
            fullsize: 'images/flowers-pink-large.jpg',
            thumb: 'images/flowers-pink-small.jpg',
            description: 'Pink Flowers',
            color: '#e4007c'
        },
        {
            fullsize: 'images/flowers-purple-large.jpg',
            thumb: 'images/flowers-purple-small.jpg',
            description: 'Red Flowers',
            color: '#FF0000'
        },
        {
            fullsize: 'images/flowers-red-large.jpg',
            thumb: 'images/flowers-red-small.jpg',
            description: 'White Flowers',
            color: '#F5F5F5'
        },
        {
            fullsize: 'images/flowers-white-large.jpg',
            thumb: 'images/flowers-white-small.jpg',
            description: 'Purple Flowers',
            color: '#800080'
        },
        {
            fullsize: 'images/flowers-yellow-large.jpg',
            thumb: 'images/flowers-yellow-small.jpg',
            description: 'Yellow Flowers',
            color: '#FFFF00'
        }
    ];

    // Current index to track the active image
    let currentIndex = 0;
    // Get references to the thumbnail list, featured image, and caption elements
    const thumbnailList = document.querySelector('.thumbnails');
    const featured = document.querySelector('.featured');
    const caption = document.querySelector('.caption');

    // Function to set the active thumbnail
    const setActiveThumbnail = (index) => {
        // Toggle the 'active' class on the selected thumbnail
        document.querySelectorAll('.thumbnails img').forEach((thumbnail, i) => {
            thumbnail.classList.toggle('active', i === index);
        });
    };

    // Function to dynamically create thumbnail list items
    const loadThumbnails = () => {
        images.forEach((img, index) => {
            const li = document.createElement('li'); // Create a list item
            const image = document.createElement('img'); // Create an image element
            image.src = img.thumb; // Set the thumbnail source
            image.setAttribute('data-fullsize', img.fullsize); // Set the fullsize image source
            image.setAttribute('data-caption', img.caption); // Set the caption text
            image.alt = img.caption; // Set the alt text
            image.width = 240; // Set the image width
            image.height = 160; // Set the image height
            if (index === 0) { // Set the first image as active
                image.classList.add('active');
                featured.src = img.fullsize; // Set the featured image source
                caption.textContent = img.caption; // Set the caption text
            }
            li.appendChild(image); // Append the image to the list item
            thumbnailList.appendChild(li); // Append the list item to the thumbnail list
        });
    };

    // Function to update the featured image and caption color
    const updateFeaturedImage = () => {
        const currentImage = images[currentIndex]; // Get the current image
        featured.src = currentImage.fullsize; // Update the featured image source
        caption.textContent = currentImage.description; // Update the caption text
        featured.style.borderColor = currentImage.color; // Update the border color
        caption.style.color = currentImage.color; // Update the caption color
        setActiveThumbnail(currentIndex); // Set the active thumbnail
    };

    // Function to show the previous image
    const showPreviousImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length; // Update the index
        updateFeaturedImage(); // Update the featured image
    };

    // Function to show the next image
    const showNextImage = () => {
        currentIndex = (currentIndex + 1) % images.length; // Update the index
        updateFeaturedImage(); // Update the featured image
    };

    // Load thumbnails and set the initial featured image
    loadThumbnails();

    // Add click event listener to thumbnails
    document.querySelectorAll('.thumbnails img').forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const fullsize = this.getAttribute('data-fullsize'); // Get the fullsize image source
            const altText = this.getAttribute('data-caption'); // Get the caption text
            featured.setAttribute('src', fullsize); // Update the featured image source
            caption.textContent = altText; // Update the caption text

            // Remove active class from all thumbnails and add to the selected one
            document.querySelectorAll('.thumbnails img').forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
    });
});