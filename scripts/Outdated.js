
//module.exports = { Tilemap, neighborOffset }; Node
//OLDCODE
/*let input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => { 
            let file = e.target.files[0]; 

            let reader = new FileReader();
            reader.readAsText(file,'UTF-8');

            reader.onload = readerEvent => {
                let content = readerEvent.target.result; // this is the content of the file
                let data = JSON.parse(content);

                // Now you can use the data object to load your map
                // For example:
                this.tilemap = data.tilemap;
                this.tileSize = data.tileSize;
                this.offgridTiles = data.offgridTiles;
            }
        }

        input.click();*/
        /*this.tilemap = mapData.tilemap;
        this.tileSize = mapData.tileSize;
        this.offgridTiles = mapData.offgridTiles;*/

        //dåligt sätt
        /*let data = JSON.stringify({"tilemap": this.tilemap, "tileSize": this.tileSize, "offgridTiles": this.offgridTiles});
        let element = document.createElement("a");
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(data));
        element.setAttribute("download", "map.json");

        element.style.display = "none";
        document.body.appendChild(element);
        element.click();

        document.body.removeChild(element);*/