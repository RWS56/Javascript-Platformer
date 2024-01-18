const basePath = "images/";

function loadImage(path){
    let image = new Image();
    image.src = basePath + path;
    return image;
}

function loadImages(path, imageAmount){ //checka med marre lomme för bättre sätt
    let images = [];
    for(let i = 0; i < imageAmount; i++){
        images.push(loadImage(`${path}/${i}.png`));
    }
    return images;
}