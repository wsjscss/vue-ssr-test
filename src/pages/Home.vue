<template>
  <div class="home">
    <div class="hero">
      <h1 contenteditable="">Welcome to Vue SSR</h1>
      <p>A modern Vue.js application with Server Side Rendering</p>
    </div>

    <div class="counter-card">
      <h2>Counter Demo</h2>
      <div class="counter-display">
        <span class="count">{{ counter.count }}</span>
        <div class="counter-controls">
          <button @click="counter.increment">Increment</button>
          <button class="reset-btn" @click="counter.count = 0">Reset</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "../stores/counter";

const counter = useCounterStore();
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.hero {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, #3aa876 100%);
  color: white;
  border-radius: var(--border-radius);
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.counter-card {
  background: white;
  padding: 2rem;
  border-radius: var(--border-radius);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.counter-card h2 {
  margin-bottom: 1.5rem;
  color: var(--secondary-color);
}

.counter-display {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.count {
  font-size: 4rem;
  font-weight: bold;
  color: var(--primary-color);
}

.counter-controls {
  display: flex;
  gap: 1rem;
}

.reset-btn {
  background-color: var(--secondary-color);
}

.reset-btn:hover {
  background-color: #2c3e50;
}
</style>
