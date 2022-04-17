<template>
  <!-- Black Ops One -->
  <svg id="logo" fill="none" style="stroke:url(#gradient); stroke-width:0.20mm" width="253.027" height="64.795" viewBox="0 0 253.027 64.795" xmlns="http://www.w3.org/2000/svg">
      <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
          <stop offset="15%" stop-color="#f7f749"/>
          <stop offset="85%" stop-color="#47d747"/>
          <stop offset="10%" stop-color="#2596be"/>
          </linearGradient>
      </defs>
  <g>
    <path d="M 21.582 0 L 21.582 51.855 L 40.088 51.855 L 40.088 64.795 L 12.939 64.795 L 0 51.855 L 0 12.939 L 12.939 0 L 21.582 0 Z M 33.008 41.699 L 33.008 28.857 L 62.646 28.857 L 62.646 64.795 L 43.506 64.795 L 43.506 41.699 L 33.008 41.699 Z M 41.064 12.939 L 25 12.939 L 25 0 L 51.318 0 L 62.646 12.939 L 62.646 19.434 L 41.064 19.434 L 41.064 12.939 Z" id="0" vector-effect="non-scaling-stroke"/><path d="M 111.572 64.795 L 73.145 0 L 96.094 0 L 113.477 28.809 L 127.148 5.371 L 127.148 37.988 L 111.572 64.795 Z M 151.904 64.795 L 130.322 64.795 L 130.322 0 L 151.904 0 L 151.904 64.795 Z M 93.262 64.795 L 73.096 64.795 L 73.096 6.006 L 93.262 39.844 L 93.262 64.795 Z" id="1" vector-effect="non-scaling-stroke"/><path d="M 177.832 0 L 187.354 35.596 L 193.848 8.398 L 202.295 39.16 L 195.313 64.795 L 175.732 64.795 L 156.348 0 L 177.832 0 Z M 216.553 0 L 233.154 64.795 L 212.549 64.795 L 194.775 0 L 216.553 0 Z M 226.66 26.904 L 233.35 0 L 253.027 0 L 235.449 61.426 L 226.66 26.904 Z" id="2" vector-effect="non-scaling-stroke"/>
  </g>
  </svg>
</template>

<script setup>
// https://danmarshall.github.io/google-font-to-svg-path/
import Vivus from 'vivus'
import { onMounted } from 'vue'

onMounted(() => {
  new Vivus('logo', {
    type: 'sync',
    duration: 100,
    animTimingFunction: Vivus.EASE
  });
})
</script>