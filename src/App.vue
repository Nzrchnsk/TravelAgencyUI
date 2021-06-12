<template>
  <div v-if="!authCheck">
    <login></login>
  </div>
  <div v-else>
    <headerBar/>
    <div class="container mt-5">
      <router-view/>
    </div>
  </div>
</template>

<script>
  import headerBar from './views/components/headerComponent';
  import login from './views/auth/login';

  export default {
    name: 'App',

    components: {
      headerBar,
      login
    },
    computed: {
      authCheck() {
        return localStorage.getItem('auth');

      }
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
