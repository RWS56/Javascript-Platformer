const basePath = "data/images/";

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

class _Animation{
    constructor(images, imageDuration = 5, loop = true){
        this.images = images;
        this.imageDuration = imageDuration;
        this.loop = loop;
        this.done = false;
        this.frame = 0;
    }

    copy(){
        return new _Animation(this.images, this.imageDuration, this.loop);
    }

    update(){
        if(this.loop){
            this.frame = (this.frame + 1) % (this.imageDuration * this.images.length);
        }
        else{
            this.frame = min(this.frame + 1, this.imageDuration * this.images.length - 1)
            if(this.frame >= this.imageDuration * this.images.length){
                this.done = true;
            }
        }
    }

    getImage(){
        return this.images[Math.floor(this.frame / this.imageDuration)];
    }
}