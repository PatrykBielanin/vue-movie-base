import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
       movies: require("../data/movies"),
       favourites: require("../data/favourites"),
       page: 1,
       isLoading: false
    },
    mutations: {
        getMovies(state, payload){
            state.movies.push(payload);
            state.isLoading = false;
        },

        getMoreMovies(state, payload){
            for(let i=0; i < payload.length; i++){
                state.movies[0].push(payload[i]);
            }
            state.isLoading = false;
        },

        getFavourites(state){
            if (localStorage.getItem('favourites')) {
                const favArr = JSON.parse(localStorage.getItem('favourites'));
                for(let i=0; i < favArr.length; i++){
                    state.favourites.push(favArr[i]);
                }
            };
        },

        addFavourite(state, payload){
            return state.favourites.push({
                "title": payload.title,
                "poster": payload.poster
            });
        },

        removeFav(state, payload){
            const index = _.findIndex(state.favourites, {'title': payload});
            if (index > -1){
                state.favourites.splice(index, 1)
            }
        },

        saveFav(state){
            const movies = JSON.stringify(state.favourites);
            localStorage.setItem('favourites', movies);
        },

        increasePage(state){
            return state.page = state.page + 1;
        },

        isLoading(state){
            return state.isLoading = true;
        }

    },
    actions:{
        getMovies(context){
            context.commit("isLoading");
            axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8ff6b5ce57577af7e452c5e46accbe42&page=1")
                .then( ({data}) => {
                return context.commit("getMovies", data.results)
                })
                .catch(err => err);
        },

        getMoreMovies(context){
            context.commit("isLoading");
            context.commit("increasePage");
            const newMovies = [];
            axios.get("https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8ff6b5ce57577af7e452c5e46accbe42&page=" + context.state.page)
                .then( ({data}) => {
                    for(let i=0; i <= 19; i++){
                        newMovies.push(data.results[i]);
                    }
                    return context.commit("getMoreMovies", newMovies);
                })
                .catch(err => err);
        }
    }
});
