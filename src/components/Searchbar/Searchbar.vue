<template>
    <div class="searchBar">
        <input type="text" placeholder="Movie title..." @change="getMovie()" v-model="title" @click="showResults = true">
        <FavouritesList
            :favourites="favourites"
            >
        </FavouritesList>

        <span v-if="gotMovies.length && showResults" class="material-icons" @click="showResults = false">close</span>


        <transition name="list">
            <section v-if="showResults" class="searchMovies">
                <section class="movieResult" @click="showResults = false">
                    <SearchItem
                        v-for="movie in gotMovies"
                        :key="movie.id"
                        :title="movie.title"
                        :poster="movie.poster_path"
                        :date="movie.release_date"
                        :overview="movie.overview"
                        :favourites="favourites"
                        />
                </section>
            </section>
        </transition>
    </div>
</template>

<script>
    import SearchItem from './SearchItem';
    import FavouritesList from './FavouritesList';
    import axios from 'axios';
    import { Bus } from '../../main';
    import _ from 'lodash';

    export default {
        name: "Searchbar",
        props: ['favourites'],
        components:{
            FavouritesList,
            SearchItem
        },
        data(){
            return{
                title: "",
                showResults: false,
                gotMovies: [],
            }
        },
        methods:{
            getMovie(){
                axios.get("https://api.themoviedb.org/3/search/movie?language=en-US&include_adult=true&api_key=8ff6b5ce57577af7e452c5e46accbe42&query=" + this.title)
                    .then( ({data}) => {
                        this.gotMovies = data.results;
                    })
                    .catch(err => err);
            },
        },
        mounted() {
            Bus.$on('hideResults', (bool) =>{
                this.showResults = bool;
            });
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/Searchbar.scss';
    @import '../../styles/VueAnimations.scss';
    @import '../../styles/MediaQueries.scss';
</style>
