<template>
  <div class="about">
    <div class="about-content">
      <h1 contenteditable="">About This App</h1>
      <div class="features">
        <div class="feature-card">
          <h3>Vue 3</h3>
          <p>Built with the latest Vue.js features including Composition API</p>
        </div>
        <div class="feature-card">
          <h3>Pinia Store</h3>
          <p>Current count: {{ counter.count }}</p>
        </div>
        <div class="feature-card">
          <h3>SSR</h3>
          <p>Server-side rendering for optimal performance</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";
import "./about.css";

const counter = useCounterStore();
</script>
