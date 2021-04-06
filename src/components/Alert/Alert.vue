<template>
        <transition name="list">
            <section v-if="alert" class="alert" :class="{'green': alert_icon == 'check', 'red': alert_icon == 'close'}">
                <span class="material-icons">
                    {{alert_icon}}
                </span>
                <p>{{alert_message}}</p>
            </section>
        </transition>
</template>

<script>
    import {Bus} from "../../main";

    export default {
        name: "Alert",
        data(){
            return{
                alert: false,
                alert_message: "",
                alert_icon: ""
            }
        },
        mounted() {
            Bus.$on("toggleAlert", (con)=>{
                this.alert = true;

                if(con == "add"){
                    this.alert_message = "Added movie to favourites";
                    this.alert_icon = "check"
                } else if (con == "exist"){
                    this.alert_message = "This movie is already set as favourite";
                    this.alert_icon = "close"
                }
                setTimeout(()=>{
                    this.alert = false
                }, 3000);

            });
        },
    }
</script>

<style lang="scss" scoped>
    @import '../../styles/Alert.scss';
    @import '../../styles/VueAnimations.scss';
</style>
