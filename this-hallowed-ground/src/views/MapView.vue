<script>
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { LMap, LImageOverlay, LMarker } from "@vue-leaflet/vue-leaflet" 

const counters = [

  { id: 1, name: "6 NY", unit: "2/1 Cav", loc: "N22.33", front: "CS2F-12-05.png", back: "CS2B-12-05.png",  },
  { id: 2 ,name: "9 NY", unit: "2/1 Cav", loc: "N19.35", front: "CS2F-12-06.png", back: "CS2B-12-06.png",  },  
  { id: 3, name: "17 Penn", unit: "2/1 Cav", loc: "N17.35", front: "CS2F-12-07.png", back: "CS2B-12-07.png",  },
  { id: 5, name: "8 Ill", unit: "1/1 Cav", loc: "N28.30", front: "CS2F-11-10.png", back: "CS2B-12-05.png",  },
  { id: 6 ,name: "12 Ill", unit: "1/1 Cav", loc: "N27.31", front: "CS2F-12-01.png", back: "CS2B-12-06.png",  },  
  { id: 7, name: "3 Ind", unit: "1/1 Cav", loc: "N25.32", front: "CS2F-12-02.png", back: "CS2B-12-07.png",  },  
  { id: 8, name: "8 NY", unit: "1/1 Cav", loc: "N32.28", front: "CS2F-12-03.png", back: "CS2B-12-07.png",  },  

  { id: 16, name: "1 Cav HQ", unit: "1 Cav", loc: "N30.33", front: "CS2F-11-07.png", back: "CS2B-12-04.png",  },
  { id: 17, name: "Buford", unit: "1 Cav", loc: "N30.32", front: "CS2F-11-08.png", back: "CS2B-12-04.png",  },

  { id: 14, name: "Gamble", unit: "1/1 Cav", loc: "N28.30", front: "CS2F-11-09.png", back: "CS2B-12-04.png", stack: 2 },
  { id: 15, name: "Devin", unit: "2/1 Cav", loc: "N22.33", front: "CS2F-12-04.png", back: "CS2B-12-04.png", stack: 2 },

  { id: 20, name: "76 NY", unit: "2/1/1", loc: "S45.14", front: "CS1B-02-09.png", back: "CS2B-12-04.png", },
  { id: 21, name: "Cutler", unit: "1 Corps", loc: "S45.14", front: "CS1F-02-06.png", back: "CS2F-12-04.png", stack: 2},
  { id: 22, name: "Road Column", loc: "S46.13", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },
  { id: 23, name: "Road Column", loc: "S47.13", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },

  { id: 21, name: "56 Penn", unit: "2/1/1", loc: "S48.12", front: "CS1B-03-02.png", back: "CS2F-12-04.png", },
  { id: 22, name: "Road Column", loc: "S48.11", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },
  
  { id: 21, name: "147 NY", unit: "2/1/1", loc: "S49.11", front: "CS1B-03-01.png", back: "CS2F-12-04.png", },
  { id: 22, name: "Road Column", loc: "S50.10", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },
  { id: 23, name: "Road Column", loc: "S51.10", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },

  { id: 21, name: "95 NY", unit: "2/1/1", loc: "S52.09", front: "CS1B-02-10.png", back: "CS2F-12-04.png", },
  { id: 22, name: "Road Column", loc: "S53.09", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },


  { id: 21, name: "14 Brklyn", unit: "2/1/1", loc: "S54.08", front: "CS1B-02-07.png", back: "CS2F-12-04.png", },
  { id: 22, name: "Road Column", loc: "S55.08", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },

  { id: 21, name: "Hall Battery", unit: "1 Corps", loc: "S56.07", front: "CS1B-06-07.png", back: "CS2F-12-04.png", },
  { id: 22, name: "Road Column", loc: "S57.07", front: "Mrkr Road Col 45 white background.png", back: "CS2B-12-04.png", },

  { id: 21, name: "Wadsworth", unit: "1/1", loc: "S58.05", front: "CS1F-01-09.png", back: "CS2F-12-04.png", },
  { id: 22, name: "Reynolds", unit: "Left Wing", loc: "S58.05", front: "CS1F-01-06.png", back: "CS2B-12-04.png", stack: 2},

  { id: 21, name: "19 Ind", unit: "Iron/1/1", loc: "S50.09", front: "CS1F-02-01.png", back: "CS2F-12-04.png", },
  { id: 21, name: "2 Wisc", unit: "Iron/1/1", loc: "S60.06", front: "CS1F-02-03.png", back: "CS2F-12-04.png", },
  { id: 22, name: "7 Wisc", unit: "Iron/1/1", loc: "S60.06", front: "CS1F-02-05.png", back: "CS2B-12-04.png", stack: 2},
  { id: 22, name: "Meredith", unit: "Iron/1/1", loc: "S60.06", front: "CS1F-01-10.png", back: "CS2B-12-04.png", stack: 4},
  
  { id: 21, name: "24 Mich", unit: "Iron/1/1", loc: "S61.07", front: "CS1F-02-02.png", back: "CS2F-12-04.png", },
  { id: 22, name: "6 Wisc", unit: "Iron/1/1", loc: "S62.06", front: "CS1F-02-04.png", back: "CS2B-12-04.png", },

  // CSA
  { id: 22, name: "55 NC-b", unit: "Dav/Heth", loc: "N15.18", front: "CS3F-11-18.png", back: "CS2B-12-04.png", },

  { id: 22, name: "Marye-a Battery", unit: "Pegram Bn", loc: "N17.16", front: "CS4B-07-10.png", back: "CS2B-12-04.png", stack: -2},
  { id: 22, name: "Pegram HQ", unit: "Pegram Bn", loc: "N17.16", front: "CS4F-07-05.png", back: "CS2B-12-04.png", },
  { id: 22, name: "Pengram", unit: "Pegran Bn", loc: "N17.16", front: "CS4F-07-04.png", back: "CS2B-12-04.png", stack: 2},

  { id: 22, name: "5 Ala Bn", unit: "Arch/Heth", loc: "N20.15", front: "CS3F-12-16.png", back: "CS2B-12-04.png", },
  { id: 22, name: "13 Ala", unit: "Arch/Heth", loc: "N23.14", front: "CS3F-12-15.png", back: "CS2B-12-04.png", },

];

const markers = counters.map(c => {
  return {
    id: c.id,
    coords: hexToMapCoords(c.loc, c.stack || 0),
    url: `public/images/counters/${c.front}`,
    icon: new L.Icon({
      iconUrl: `public/images/counters/${c.front}`,
      iconSize: [60, 60],
      iconAnchor: [30, 30],
      //popupAnchor: [-3, -76],
    }),
  };
});

function hexToMapCoords(hexStr, pos) {
  const map = hexStr.substring(0,1);
  const yHex = parseInt(hexStr.substring(1,3)) + ((map == "S") ? 62 : 0);
  const xHex = parseInt(hexStr.substring(4,6));

  const x0 = -46.5; 
  const y0 = -30.5 + (81.37 / 2) + 10;
  const dx = 93.97;
  const dy = 81.37;

  function tx(x,y) {
    const shift = (y % 2 == 0) ? dx/2 : 0
    return x0 + dx * x + shift + (pos * 3);
  }

  function ty(x,y) {
    return y0 + dy * y + (pos * 3);
  }
  return [10179 - ty(xHex, yHex), tx(xHex, yHex)];
};


const mapOpts = {
      crs: L.CRS.Simple,
      center: [7500, 2500],
      maxZoom: 1,
      minZoom: -3,
      maxBounds: [[-50, -50], [10179, 6624]],
      maxBoundsViscosity: 1,
      zoom: -1,
      zoomControl: true,
  };

export default {
  components: {
    LMap,
    LImageOverlay,
    LMarker,
  },
  data () {
    return {
      url: "public/images/map.jpg",
      bounds: [[0, 0], [10129, 6574]],
      options: mapOpts,
      markers,
    };
  },
  methods: {
    onZoom(zoom) {
      const size = [15, 20, 30, 60, 120][zoom + 3];
      this.$refs.map.leafletObject.eachLayer((layer) => {
        if (layer._icon) {
          console.log(layer._icon.src);
          let icon = new L.Icon({
            iconUrl: layer._icon.src,
            iconSize: [size, size],
            iconAnchor: [size/2, size/2],
          });
          layer.setIcon(icon);
        }
      });
    },
  },
};

/*
const r = 52.5;
const a = 2 * Math.PI / 6;

function drawHexagon(cx, cy) {
  const x = tx(cx, cy);
  const y = ty(cx, cy);
  let ctx = map.value.getContext("2d");
  ctx.strokeStyle = "Red";
  ctx.beginPath();
  for (var i = 0; i < 6; i++) {
    ctx.lineTo(x + r * Math.sin(a * i), y + r * Math.cos(a * i));
  }
  ctx.closePath();
  ctx.stroke();
}
}*/
</script>

<template>
  <l-map ref="map" :options="options" @update:zoom="onZoom">
    <l-image-overlay :url="url" :bounds="bounds"></l-image-overlay>
    <l-marker v-bind:key="m.id" v-for="m in markers" :lat-lng="m.coords" :icon="m.icon" />
  </l-map>
</template>

<style scoped>

</style>
