<template>
    <div class="container" @click="hideResults()">

        <template v-if="isLoading">
            <div class="loadingDataScreen">
                <div class="loader"></div>
            </div>
        </template>

        <section class="movies">
            <MovieItem
                v-for="movie in movies[0]"
                :key="movie.id"
                :poster="movie.poster_path"
                :title="movie.title"
                :votes="movie.vote_average"
                :overview="movie.overview"
                :date="movie.release_date"
                />
        </section>

        <section v-if="modalOpen" class="movieDetails">
            <span class="material-icons" @click="modalOpen = !modalOpen">close</span>
            <h2>{{modal[0].title}}</h2>
            <p class="date"><small>{{modal[0].date}}</small></p>
            <p>{{modal[0].overview}}</p>
            <button class="addToFav" @click="addToFav(modal[0].title, modal[0].poster)">Add to favourites</button>
        </section>

        <button :disabled="isLoading" @click="getMoreMovies()">Show more movies</button>
    </div>
</template>

<script>
    import {Bus} from "../../main";
    import _ from "lodash";
    import MovieItem from "./MovieItem";

    export default {
        name: "Movies",
        props: ['movies', 'favourites'],
        components:{
            MovieItem
        },
        data(){
            return{
                modalOpen: false,
                modal: [],
                alert: false,
                alert_message: "",
                alert_icon: ""
            }
        },
        computed:{
            isLoading(){
                return this.$store.state.isLoading;
            }
        },
        methods:{
            hideResults(){
                Bus.$emit("hideResults", false);
            },

            getMoreMovies(){
                this.$store.dispatch('getMoreMovies');
            },

            addToFav(title, poster){
                if (!title) {
                    return;
                }
                const index = _.findIndex(this.favourites, {'title': title});
                if (index > -1){
                    this.toggleAlert("exist");
                } else{
                    this.toggleAlert("add");
                    this.$store.commit("addFavourite", {title, poster});
                    this.$store.commit("saveFav");
                }
            },

            toggleAlert(con){
                Bus.$emit("toggleAlert", con);
            }
        },
        created(){
            this.$store.dispatch('getMovies');
        },
        mounted(){
            Bus.$on("toggleModal", ({title, date, overview, poster})=>{
               this.modalOpen = true;
               this.modal = [{
                   "title": title,
                   "date": date,
                   "overview": overview,
                   "poster": poster
               }];
            })
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/Movies.scss';
    @import '../../styles/VueAnimations.scss';
    @import '../../styles/MediaQueries.scss';
</style>
