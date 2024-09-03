let a = true;
let btn = document.getElementById("btn-chng-mode");
btn.innerHTML = "Dark Mode";
btn.addEventListener("click", function (e) {
  e.preventDefault;
  if (a) {
    btn.innerHTML = "Light Mode";
    darkMode();
    a = false;
  } else {
    btn.innerHTML = "Dark Mode";
    lightMode();
    a = true;
  }
});

// Dark mode
let darkMode = () => {
  document.body.style.backgroundColor = "black";
  document.documentElement.style.setProperty("--clr-primary", "#f4f4f4");
};
// Dark mode End

// Light mode
let lightMode = () => {
  document.body.style.backgroundColor = "white";
  document.documentElement.style.setProperty("--clr-primary", "#060505");
};
// Light mode End

document.getElementById('searchBtn').addEventListener('click', () => {
    const imgSearchName = document.getElementById('searchBox').value.trim();
    if (imgSearchName) {
        fetchPictures(imgSearchName);
    }
});

async function fetchPictures(imgSearchName) {
    
    const apiKey = 'zb-7pZGsHmlfIit1OCNGRPjVOH8dUp2Cyi61g-d5k2g'; // Unsplash API key
    const url = `https://api.unsplash.com/search/photos?query=${imgSearchName}&client_id=${apiKey}&per_page=15`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.results);
        displayPictures(data.results);
    } catch (error) {
        alert('Error fetching images:', error);
    }
}

let displayPictures = (images) => {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = '';

    images.map(img => {
        // console.log(img);
        const { urls, alt_description, user } = img;
        
        const { regular } = urls;
        const { name, profile_image, portfolio_url } = user;
        // console.log(profile_image);

        const galleryImgs = document.createElement('div');
        galleryImgs.className = 'gallery-img';
        
        
            galleryImgs.innerHTML = `
                <a href="${img.links.html}" class="img-link" target="_blank"><img loading="lazy" class="searchImgResult" src="${regular}" alt="${alt_description || 'Image'}"></a>
                <div class="imgInfo">
                    <div class="imgInfoFlx">
                        <img loading="lazy" class="profileImg" src="${profile_image.large}" alt="${name || 'Image'}">
                        <a href="${portfolio_url}" target="_blank">${name}</a>
                    </div>
                    <div class="img-description"><abbr>Description :</abbr> ${alt_description || 'No description'}</div>
                </div>
            `;
                
                // <div class="img-profile-link"><a href="${img.links.html}" target="_blank">View on Unsplash</a></div>
        gallery.appendChild(galleryImgs);
    });
}
