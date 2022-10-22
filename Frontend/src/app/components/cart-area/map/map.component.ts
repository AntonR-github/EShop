import { Component, ElementRef, Input, OnChanges, ViewChild } from '@angular/core';
import { icon, LatLngTuple, Marker, Map, map, tileLayer, LeafletMouseEvent, LatLngExpression, LatLng, marker } from 'leaflet';
import { LocationService } from 'src/app/services/location.service';
import { OrderModel } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnChanges  {

  @Input()
  order:OrderModel;
  @Input()
  readonly = false;
  private readonly MARKER_ZOOM_LEVEL = 16;
  private readonly MARKER_ICON = icon({
    iconUrl:'https://res.cloudinary.com/foodmine/image/upload/v1638842791/map/marker_kbua9q.png',
    iconSize: [42, 42],
    iconAnchor: [21, 42],
  });
  private readonly DEFAULT_LATLNG: LatLngTuple = [32.08, 34.78];

  @ViewChild('map',{static:true})
  mapRef: ElementRef;

  map: Map;
  currentMarker: Marker;

  constructor(private locationService: LocationService) { }

  ngOnChanges(): void {
    if(!this.order) return;
    this.initializeMap();
    if(this.readonly && this.order.latLng){
      this.showLocationOnReadOnlyMode();
    }
  }

  showLocationOnReadOnlyMode(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL);
        this.currentMarker = marker(latlng, {icon: this.MARKER_ICON}).addTo(this.map);
        this.map.dragging.disable();
        this.map.touchZoom.disable();
        this.map.doubleClickZoom.disable();
        this.map.scrollWheelZoom.disable();
        this.map.boxZoom.disable();
        this.map.keyboard.disable();
        this.map.off('click');
        this.map.tap?.disable();
        this.currentMarker.dragging.disable();
      }
    })
  }

  initializeMap(){
    if(this.map) return;

    this.map = map(this.mapRef.nativeElement, {
      attributionControl: false
    }).setView(this.DEFAULT_LATLNG, 1);
    
    tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(this.map)

    this.map.on('click', (e:LeafletMouseEvent) => {
      this.setMarker(e.latlng);
    })
      
  }

  findMyLocation(){
    this.locationService.getCurrentLocation().subscribe({
      next: (latlng) => {
        this.map.setView(latlng, this.MARKER_ZOOM_LEVEL)
        this.setMarker(latlng)
      }
    })
  }


  setMarker(latlng:LatLngExpression){
    this.addressLatLng = latlng as LatLng
    if(this.currentMarker)
    {
    this.currentMarker.setLatLng(latlng);
    return; 
    }

    this.currentMarker = marker(latlng,{
      draggable: true,
      icon: this.MARKER_ICON
    }).addTo(this.map);

    this.currentMarker.on('dragend', () => {
      this.addressLatLng = this.currentMarker.getLatLng();
    })

  }

  set addressLatLng(latlng: LatLng){

    if(!latlng.lat.toFixed) return;

    latlng.lat = parseFloat(latlng.lat.toFixed(8))
    latlng.lng = parseFloat(latlng.lng.toFixed(8))
    this.order.latLng = latlng;
  }

  get addressLatLng(){
    return this.order.latLng;
  }

}
