<template>
  <v-navigation-drawer app menu :clipped="true" v-model="drawer">
    <v-list dense expand>
      <v-list-tile :to="{name: 'import'}">
        <v-list-tile-title class="text-uppercase">Import des données</v-list-tile-title>
      </v-list-tile>
      <v-list-tile :to="{name: 'display'}">
        <v-list-tile-title class="text-uppercase">Affichage des données</v-list-tile-title>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

  export default {
    data () {
      return {
        drawer: true
      }
    }
  }
</script>
