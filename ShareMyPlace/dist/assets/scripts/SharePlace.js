import {Modal} from './UI/Modal.js';
import {Map} from './Map.js';

class PlaceFinder{
    constructor(){
        const addressForm = document.querySelector('form');
        const locateUserBtn= document.getElementById('locate-btn');

        locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this));
        addressForm.addEventListener('submit', this.findAddressHandler);
    }

    async locateUserHandler(){
        if(!navigator.geolocation){
            alert(
                'Location feature is not available in your browser - please use another modern browser or write address manually!'
            );
            return;
        }
        const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
        modal.show();
        setTimeout(() => {
            navigator.geolocation.getCurrentPosition(
                successful=>{
                    const coordinates={
                        lat: successful.coords.latitude,
                        lng: successful.coords.longitude
                    }
                    const mapEl = document.getElementById('map');
                    mapEl.innerHTML='';
                    const map = new Map(coordinates, 'map');
                    modal.hide();
                }, 
                error=>{
                    alert('Could not locate you unfortunately! Please enter an address manually');
                    modal.hide();
                })
        }, 500);
        await modal.printTest();
        console.log('rat dep doi =))');
    }

    findAddressHandler(){};
}

const placeFinder = new PlaceFinder();