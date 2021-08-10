
export class Map{
    constructor(coordinates, targetId){
        this.map = new ol.Map({
            target: targetId,
            layers:[
                new ol.layer.Tile({
                    source: new ol.source.OSM()
                })
            ],
            view: new ol.View({
                center: ol.proj.fromLonLat([coordinates.lng, coordinates.lat]),
                zoom: 16
            })
        })
    }
}
