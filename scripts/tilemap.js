const neighborOffset = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 0], [-1, 1], [0, 1], [1, 1]];
const physicsTiles = ["grass"];

class Tilemap{
    constructor(game, ctx, canvas, tileSize = 16){
        this.game = game;
        this.ctx = ctx;
        this.canvas = canvas
        this.tileSize = tileSize;
        this.tilemap = {};
        this.offgridTiles = {};
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

    save(){
        let data = JSON.stringify({"tilemap": this.tilemap, "tileSize": this.tileSize, "offgridTiles": this.offgridTiles})
    }

    load(){
        
    }

    getPhysicsRectAround(position){ //använd for(let tile in x) etc ungefär som pythons for tile in tiles etc
        let rects = [];
        this.tilesAround(position).forEach(tile => {
            if(tile["type"] in physicsTiles){
                rects.push(new Rect(tile["pos"][0] * this.tileSize, tile["pos"][1] * this.tileSize, this.tileSize, this.tileSize));
            }
        });

        return rects;
    }
    
    draw(offset = [0, 0]){
        for(let x = Math.floor(offset[0] / this.tileSize) - 1; x < Math.floor((offset[0] + window.innerWidth) / this.tileSize) + 1; x++){
            for(let y = Math.floor(offset[1] / this.tileSize); y < Math.floor((offset[1] + window.innerHeight) / this.tileSize) + 1; y++){
                let checkLocation = `${x};${y}`;
                if(checkLocation in this.tilemap){
                    let tile = this.tilemap[checkLocation];
                    this.ctx.drawImage(this.game.assets[tile["type"]][tile["variant"]], tile["pos"][0] * this.tileSize - offset[0], tile["pos"][1] * this.tileSize - offset[1], this.tileSize, this.tileSize);
                }
            }
        }
    }
}

//module.exports = { Tilemap, neighborOffset }; Node