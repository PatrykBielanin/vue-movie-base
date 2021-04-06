<template>
  <div id="app">
    <Header />
    <Searchbar :favourites="favourites" />
    <Movies :movies="movies" :favourites="favourites"/>
    <Alert />
  </div>
</template>

<script>
    import Header from './components/Header/Header';
    import Movies from './components/Movies/Movies';
    import Searchbar from "./components/Searchbar/Searchbar";
    import Alert from "./components/Alert/Alert";

    export default {
      name: 'App',
      computed: {
        movies() {
            return this.$store.state.movies;
        },
        favourites() {
            this.$store.getters.getFavourites;
            return this.$store.state.favourites;
        }
      },
      components: {
        Movies,
        Header,
        Searchbar,
        Alert
      }
    }
</script>
