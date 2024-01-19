const neighborOffset = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [0, 0], [-1, 1], [0, 1], [1, 1]];
const physicsTiles = ["grass"];
const autoTiledTiles = ["grass"];

const autoTileMapRuleset = {
    "0,1,1,0": 0,
    "-1,0,0,1,1,0": 1,
    "-1,0,0,1": 2,
    "0,-1,0,1,1,0": 3,
    "-1,0,0,-1,0,1,1,0": 4,
    "-1,0,0,-1,0,1": 5,
    "0,-1,1,0": 6,
    "-1,0,0,-1,1,0": 7,
    "-1,0,0,-1": 8
};

class Tilemap{
    constructor(game, ctx, canvas, tileSize = 16, renderScale){
        this.game = game;
        this.ctx = ctx;
        this.canvas = canvas
        this.tileSize = tileSize;
        this.renderScale = renderScale;
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

    autoTile(){
        for(let location in this.tilemap){
            let tile = this.tilemap[location];
            let neighbors = [];
            for(let offset of [[1, 0], [0, 1], [-1, 0], [0, -1]]){
                let checkLocation = `${tile["pos"][0] + offset[0]};${tile["pos"][1] + offset[1]}`
                if(checkLocation in this.tilemap){
                    if(this.tilemap[checkLocation]["type"] == tile["type"]){
                        neighbors.push(offset);
                    }
                }
            }
            neighbors = neighbors.sort().toString();
            if(autoTiledTiles.includes(tile["type"]) && neighbors in autoTileMapRuleset){
                tile["variant"] = autoTileMapRuleset[neighbors];
            }
        }
    }

    save(){ //dåligt sätt
        let data = JSON.stringify({"tilemap": this.tilemap, "tileSize": this.tileSize, "offgridTiles": this.offgridTiles});
        let element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
        element.setAttribute("download", "map.json");

        element.style.display = "none";
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);
    }

    load(){
        let data;
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
        for(let x = Math.floor(offset[0] / this.tileSize) - 1; x < Math.floor((offset[0] + window.innerWidth / this.renderScale) / this.tileSize) + 1; x++){
            for(let y = Math.floor(offset[1] / this.tileSize) - 1; y < Math.floor((offset[1] + window.innerHeight / this.renderScale) / this.tileSize) + 1; y++){
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