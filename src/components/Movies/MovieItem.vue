<template>
        <div class="movieItem" @click="openModal(title, date, overview, poster)">
            <transition name="list">
                <img :src="'https://image.tmdb.org/t/p/w1280' + poster" alt="movie_cover">
                </transition>
                <section class="movieInfo">
                    <h4>{{title}}</h4>
                    <p :class="{ 'green': votes>=8, 'yellow': votes <8 && votes>6 , 'red': votes<=6 }">{{votes}}</p>
                </section>
        </div>
</template>

<script>
    import _ from 'lodash';
    import {Bus} from "../../main";

    export default {
        name: "MovieItem",
        props: ['poster', 'title', 'votes', 'overview', 'date'],
        data(){
            return{
                modalOpen: false
            }
        },
        methods:{
            openModal(title, date, overview, poster){
                Bus.$emit("toggleModal", {title, date, overview, poster})
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../styles/MovieItem.scss';
    @import '../../styles/VueAnimations.scss';
    @import '../../styles/MediaQueries.scss';
</style>
