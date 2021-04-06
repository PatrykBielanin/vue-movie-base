<template>
    <div>
        <span class="material-icons starFav" @click="modalOpen = !modalOpen">star</span>

        <section v-show="modalOpen" class="favourites">
            <span class="material-icons closeFav" @click="modalOpen = !modalOpen">close</span>
            <template v-if="favourites.length">
                <p>Favourites</p>
                <ul>
                    <li v-for="movie in favourites" :key="movie.title">
                        <img :src="'https://image.tmdb.org/t/p/w1280' + movie.poster" alt="movie_cover"> {{movie.title}}
                        <span class="material-icons" @click="removeFav(movie.title)">close</span>
                    </li>
                </ul>
            </template>

            <template v-else>
                <p>Add some movies to your favourites</p>
            </template>
        </section>
    </div>
</template>

<script>

    export default {
        name: "FavouriteList",
        props: ['favourites'],
        data(){
            return{
                modalOpen: false
            }
        },
        methods:{
            removeFav(title){
                this.$store.commit("removeFav", title);
                this.$store.commit("saveFav");
            }
        },
        mounted(){
            this.$store.commit("getFavourites");
        }
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/FavouritesList.scss';
    @import '../../styles/MediaQueries.scss';
</style>
