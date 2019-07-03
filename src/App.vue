<template>
    <v-app>
        <app-header></app-header>
        <app-menu></app-menu>
        <v-content>
            <v-container fluid main-container>
                <router-view></router-view>
            </v-container>
        </v-content>
        <v-footer dark></v-footer>

    </v-app>
</template>
<script>


    import AppMenu from "./components/Menu/AppMenu";
    import AppHeader from "./components/Header/AppHeader";

    export default {
        name: 'app',
        components: { AppMenu, AppHeader }
    }
</script>
