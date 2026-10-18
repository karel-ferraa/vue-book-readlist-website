<template>
  <nav class="nav-bar">
    <RouterLink to="/favorites" class="nav-bar__link">Favorites</RouterLink>
    <RouterLink to="/library" class="nav-bar__link">Home</RouterLink>
    <RouterLink to="/explore" class="nav-bar__link">Explore</RouterLink>
  </nav>
</template>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  background: var(--grey);
  border-top: 2px solid var(--grey-dark);
}

.nav-bar__link {
  min-width: 5rem;
  padding: 0 0.6rem;
  border-radius: 6px;
  background: var(--blue);
  color: white;
  font-size: 1.25rem;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
}

/* RouterLink adds this class to the link of the current page */
.nav-bar__link.router-link-active {
  background: var(--green);
}

@media (max-width: 500px) {
  .nav-bar {
    gap: 0.5rem;
  }

  .nav-bar__link {
    min-width: 0;
    font-size: 1.05rem;
  }
}
</style>
