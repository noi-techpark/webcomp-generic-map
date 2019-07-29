import { html, LitElement } from 'lit-element';
import L from 'leaflet';
import leaflet_mrkcls from 'leaflet.markercluster';
import style__leaflet from 'leaflet/dist/leaflet.css';
import style__markercluster from 'leaflet.markercluster/dist/MarkerCluster.css';
import style from './scss/main.scss';
import { getStyle } from './utils.js';
import { fetchStations } from './api/ninjaApi.js';


class MapWidget extends LitElement {

  constructor() {
    super();

    /* Map configuration */
    this.map_center = [46.479, 11.331];
    this.map_zoom = 9;
    this.map_layer = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png";
    this.map_attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>';

    /* Internationalization */
    this.language_default = 'en';
    this.language = 'de';

    /* Data fetched from Open Data Hub */
    this.stations = [];

    /* Requests */
    this.fetchStations = fetchStations.bind(this);
  }

  async initializeMap() {
    let root = this.shadowRoot;
    let mapref = root.getElementById('map');

    this.map = L.map(mapref, { 
      zoomControl: false 
    }).setView(this.map_center, this.map_zoom);

    L.tileLayer(this.map_layer, {
      attribution: this.map_attribution
    }).addTo(this.map);
  }

  async drawMap() {
    await this.fetchStations();
    let columns_layer_array = [];

    this.stations.map(station => {
      const pos = getLatLongFromStationDetail(station);

      let icon2 = L.divIcon({
        html: '<div class="marker_green"><div>&nbsp;</div></div>',
        iconSize: L.point(25, 25)
      });

      let popupCont = '<div class="popup"><b>' + station.sname + '</b>';
      popupCont += '<table>';
      Object.keys(station.smetadata).forEach(key => {
        let value = station.smetadata[key];
        if (value) {
          popupCont += '<tr>';
          popupCont += '<td>' + key + '</td>';
          if (value instanceof Object) {
            let act_value = value[this.language];
            if (typeof act_value === 'undefined') {
              act_value = value[this.language_default];
            } 
            popupCont += '<td><div class="popupdiv">' + act_value + '</div></td>';
          } else {
            popupCont += '<td>' + value + '</td>';
          } 
          popupCont += '</tr>';
        }
      });
      popupCont += '</table></div>';

      let popup = L.popup().setContent(popupCont);

      let marker = L.marker([pos.lat, pos.lng], {
        icon: icon2,
      }).bindPopup(popup);

      columns_layer_array.push(marker);
    });

    this.visibleStations = columns_layer_array.length;
    let columns_layer = L.layerGroup(columns_layer_array, {});

    /** Prepare the cluster group for station markers */
    this.layer_columns = new leaflet_mrkcls.MarkerClusterGroup({
      showCoverageOnHover: false,
      chunkedLoading: true,
      iconCreateFunction: function(cluster) {
        return L.divIcon({
          html: '<div class="marker_cluster__marker">' + cluster.getChildCount() + '</div>',
          iconSize: L.point(36, 36)
        });
      }
    });
    /** Add maker layer in the cluster group */
    this.layer_columns.addLayer(columns_layer);
    /** Add the cluster group to the map */
    this.map.addLayer(this.layer_columns);

  }

  async firstUpdated() {
    this.initializeMap();
    this.drawMap();
  }

  render() {
    return html`
      <style>
        ${getStyle(style__markercluster)}
        ${getStyle(style__leaflet)}
        ${getStyle(style)}
      </style>
      <div id="map_widget">
        <div id="map" class="map"></div>
      </div>
    `;
  }
}

if (!window.customElements.get('map-widget')) {
  window.customElements.define('map-widget', MapWidget);
}
