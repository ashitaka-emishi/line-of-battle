<script setup>
import { ref, onMounted } from 'vue'
import turnImg from '../assets/images/turn-record.jpg';

const turn = ref();
const day = ref(0);
const outer = ref(0);
const inner = ref(0); 

function nextTurn() {
  console.log(outer.value, inner.value, day.value);

  const hideDayMinutes = (outer.value < 1 || outer.value > 14);
  const hideNightMinutes = (outer.value < 22 || outer.value > 27);
  
  if (hideDayMinutes && hideNightMinutes) {
    outer.value += 1;
  } else {
    inner.value += 1;
    if ((hideNightMinutes && inner.value > 3)  || (hideDayMinutes && inner.value > 1)) {
        inner.value = 0;
        outer.value  += 1
      }
  }

  if (outer.value == 25 && inner.value == 0) day.value += 1;
  if (outer.value > 33) outer.value = 0;
  drawTurnRecord();
}


let isImageLoaded = false;
let isMounted = false;
let img = new Image();
img.onload = function() {
  isImageLoaded = true;
  drawTurnRecord();
};
img.src = turnImg;

onMounted(() => {
  isMounted = true;
  drawTurnRecord();
});


function drawTurnRecord() {
  const hideDayMinutes = (outer.value < 1 || outer.value > 14);
  const hideNightMinutes = (outer.value < 22 || outer.value > 28);

  if (isMounted && isImageLoaded) {
    turn.value.width = img.naturalWidth;
    turn.value.height = img.naturalHeight; 
    let ctx = turn.value.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const centerX = 608;
    const centerX2 = 605;
    const centerY = 507;
    const centerY2 = 848;
    const centerY3 = (846 + 507) / 2 + 69;
    const radius = 160;
    const radius2 = 80;
    const radius3 = 597;
    const radius4 = 503;



    let quarter = [
      { a0: Math.PI * - 3/4, a1: Math.PI * - 1/4},
      { a0: Math.PI * - 1/4, a1: Math.PI * 1/4},
      { a0: Math.PI * 1/4, a1: Math.PI * 3/4},
      { a0: Math.PI * 3/4, a1: Math.PI * - 3/4},
      { a0: -Math.PI, a1: Math.PI},
    ];

    let quarter2 = [
      { a0: -Math.PI / 2, a1: Math.PI / 2 },
      { a0: Math.PI / 2, a1: -Math.PI / 2},
      { a0: -Math.PI, a1: Math.PI},      
    ];




    let q = hideDayMinutes ? 4 : inner.value;
    let q2 = hideNightMinutes ? 2: inner.value; 
    const q3 = outer.value;// max 34

    // Draw 15 min marker
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.arc(centerX, centerY, radius, quarter[q].a0, quarter[q].a1, false);
    ctx.arc(centerX, centerY, radius2, quarter[q].a1, quarter[q].a0, true);
    ctx.arc(centerX, centerY, radius, quarter[q].a0, quarter[q].a0, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "rgba(50,50,50, 0.8)";
    ctx.arc(centerX, centerY, radius, quarter[q].a1, quarter[q].a0, false);
    ctx.arc(centerX, centerY, radius2, quarter[q].a0, quarter[q].a1, true);
    ctx.arc(centerX, centerY, radius, quarter[q].a1, quarter[q].a1, false);
    ctx.fill();
    ctx.stroke();

    // Draw 30 min marker
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.arc(centerX, centerY2, radius, quarter2[q2].a0, quarter2[q2].a1, false);
    ctx.arc(centerX, centerY2, radius2, quarter2[q2].a1, quarter2[q2].a0, true);
    ctx.arc(centerX, centerY2, radius, quarter2[q2].a0, quarter2[q2].a0, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "rgba(50,50,50, 0.8)";
    ctx.arc(centerX, centerY2, radius, quarter2[q2].a1, quarter2[q2].a0, false);
    ctx.arc(centerX, centerY2, radius2, quarter2[q2].a0, quarter2[q2].a1, true);
    ctx.arc(centerX, centerY2, radius, quarter2[q2].a1, quarter2[q2].a1, false);
    ctx.fill();
    ctx.stroke();    

    const turnq1 = Math.PI + (Math.PI * 2/34 * (q3));
    const turnq2 = Math.PI + (Math.PI * 2/34 * (q3+1));

    // Draw turn marker
    ctx.beginPath();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "rgb(50,50,50)";
    ctx.arc(centerX2, centerY3, radius3, turnq1, turnq2, false);
    ctx.arc(centerX2, centerY3, radius4, turnq2, turnq1, true);
    ctx.arc(centerX2, centerY3, radius3, turnq1, turnq1, false);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "rgba(50,50,50, 0.8)";
    ctx.arc(centerX2, centerY3, radius3, turnq2, turnq1, false);
    ctx.arc(centerX2, centerY3, radius4, turnq1, turnq2, true);
    ctx.arc(centerX2, centerY3, radius3, turnq2, turnq2, false);
    ctx.fill();
    ctx.stroke();    
    
    // Draw day markers
    ctx.beginPath();
    ctx.fillStyle = "rgba(50,50,50, 0.8)";
    if (day.value != 0) ctx.fillRect(624, 4, 189, 91);
    if (day.value != 1) ctx.fillRect(624 + 189 + 8, 4, 189, 91);
    if (day.value != 2) ctx.fillRect(624 + (189 + 8) * 2 + 1, 4, 189, 91);
  } 

}
</script>

<template>
    <!--button @click="nextTurn()">Next Turn</button -->
    <canvas ref="turn"></canvas>
</template>

<style scoped>
</style>
