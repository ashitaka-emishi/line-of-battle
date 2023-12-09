<script setup>
import { ref, onMounted } from 'vue'
import mapImg from '../assets/images/map.jpg';

const map = ref();
let isMapLoaded = false;
let isMounted = false;

let img = new Image();
img.onload = function() {
  isMapLoaded = true;
  drawMap();
};
img.src = mapImg;

onMounted(() => {
  isMounted = true;
  drawMap();
});

const x0 = -46.5; 
const y0 = -30.5;
const dx = 93.97;
const dy = 81.37;
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

function tx(x,y) {
  const shift = (y % 2 == 0) ? dx/2 : 0
  return x0 + dx * x + shift;
}

function ty(x,y) {
  return y0 + dy * y;
}

function drawMap() {
  if (isMounted && isMapLoaded) {
    map.value.width = img.naturalWidth;
    map.value.height = img.naturalHeight; 
    let ctx = map.value.getContext("2d");    
    ctx.drawImage(img, 0, 0);
    ctx.fillStyle = "Red";
    ctx.fillRect(x0, y0, 1, 1);
    for(let i=0; i < 71; i++){
      for (let j=1; j < 126; j++) {
        if (i == 0 && j % 2 != 0) continue; // skip odd rows left offmap hex
        drawHexagon(i,j);
      }
    }
  } 

}

</script>

<template>
    <canvas ref="map"></canvas>
</template>

<style scoped>
</style>
