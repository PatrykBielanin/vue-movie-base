<template>
    <section class="movie" @click="openModal(title, date, overview, poster)">
        <img :src="'https://image.tmdb.org/t/p/w1280' + poster" alt="" srcset="">
        <p>{{title}} <br /> <small class="date">{{date}}</small></p>
    </section>
</template>

<script>

    import _ from 'lodash';
    import {Bus} from '../../main';

    export default {
        name: "SearchItem",
        props: ['poster', 'title', 'overview', 'date', 'favourites'],
        data(){
            return{
                modalOpen: false
            }
        },
        methods:{
            addToFav(title, poster){
                if (!title) {
                    return;
                } else{
                    this.$store.commit("addFavourite", {title, poster});
                    this.$store.commit("saveFav");
                }
            },

            openModal(title, date, overview, poster){
                Bus.$emit("toggleModal", {title, date, overview, poster});
            }
        },
    }
</script>
<style lang="scss" scoped>
    @import '../../styles/SearchItem.scss';
    @import '../../styles/MediaQueries.scss';
</style>
