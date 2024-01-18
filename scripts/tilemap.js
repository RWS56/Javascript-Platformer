const neighborOffset = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 0], [-1, 1], [0, 1], [1, 1]];
const physicsTiles = ["test"];

class Tilemap{
    constructor(ctx, canvas, tileSize = 16){
        this.ctx = ctx;
        this.canvas = canvas
        this.tileSize = tileSize;
        this.tilemap = {};
    }

    tilesAround(position, isGrid=false){
 
        let tiles = [];
        let tileLocation;

        tileLocation = !isGrid ? [Math.floor(position[0] / this.tileSize), Math.floor(position[1] / this.tileSize)] : position;

        neighborOffset.forEach(element => {
            let checkLocation = `${tileLocation[0] + element[0]};${tileLocation[1] + element[1]}`;

            if(checkLocation in this.tilemap){
                tiles.push(this.tilemap[checkLocation]);
            }
        });
        return tiles;
    }

    getPhysicsRectAround(position){
        let rects = [];
        this.tilesAround(position).forEach(tile => {
            if(tile["type"] in physicsTiles){
                rects.push(new Rect(tile["pos"][0] * self.tileSize, tile["pos"][1] * self.tileSize, self.tileSize, self.tileSize));
            }
        });

        return rects;
    }
    
    draw(offset = [0, 0]){
        for(let x = Math.floor(offset[0] / self.tileSize); x < Math.floor((offset[0] + this.canvas.width) / this.tileSize) + 1; x++){
            for(let y = Math.floor(offset[1] / self.tileSize); y < Math.floor((offset[1] + this.canvas.heigth) / this.tileSize) + 1; y++){
                let checkLocation = toString(x) + ";" + toString(y);
                if(checkLocation in this.tilemap){
                    let tile = slef.tilemap[checkLocation];
                    this.ctx.drawImage()
                }
            }
        }
    }
}

//module.exports = { Tilemap, neighborOffset }; Node