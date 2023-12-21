<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">This Hallowed Ground</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page" to="/">Map</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" aria-current="page" to="/turn">Turn Record</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <!-- Begin page content -->
  <main class="d-flex justify-content-center">
    <RouterView />
  </main>

  <footer class="mt-0 bg-dark">
    <div class="container-fluid">
      <span>Place sticky footer content here.</span>
    </div>
  </footer>
   
</template>

<style scoped>
  main {
    height: calc(100vh - 60px - 20px);
    overflow: hidden;
  }
</style>
