<template>
  <div class="p-4">
    <h1>Assets Demo</h1>
    <div>
      <h2>Icon</h2>
      <img :src="getAsset('logo', 'icon')" alt="Logo" width="100" />
    </div>
    <div>
      <h2>Image (Hero Banner)</h2>
      <img :src="getAsset('heroBanner', 'image')" alt="Hero" width="300" />
    </div>
    <div>
      <h2>Video</h2>
      <video :src="getAsset('introVideo', 'video')" controls width="300"></video>
    </div>
    <div>
      <h2>Script Load</h2>
      <button @click="loadScript">Load Slider Script</button>
    </div>
    <div>
      <h2>Links</h2>
      <a :href="getAsset('terms', 'link')" target="_blank">Terms</a>
    </div>
    <div>
      <h2>Current Values</h2>
      <pre>{{ debugInfo }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAsset } from "../utils/assetsLibraryHandler";

console.log(getAsset)
const debugInfo = {
  env: window.__ASSET_ENV__,
  locale: window.__ASSET_LOCALE__,
  version: window.__ASSET_VERSION__,
};

function loadScript() {
  const script = document.createElement("script");
  script.src = getAsset("sliderScript", "script");
  document.body.appendChild(script);
}
</script>
