<template>
  <div class="app-container">
    <header>
      <nav>
        <div class="logo">
          <img src="./assets/logo.svg" alt="" />
          <span>Vue SSR App</span>
        </div>
        <div class="nav-links">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </nav>
    </header>

    <main>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer>
      <p>Built with Vue 3, Pinia & SSR</p>
    </footer>
  </div>
</template>

<script setup></script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo img {
  height: 2rem;
}

.logo span {
  font-weight: 600;
  font-size: 1.2rem;
  color: var(--primary-color);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: var(--text-color);
  font-weight: 500;
  transition: var(--transition);
  position: relative;
}

.nav-links a::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: var(--transition);
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  width: 100%;
}

main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
  width: 100%;
}

footer {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
