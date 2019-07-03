<template>
    <v-card>
        <v-card-text>
            <v-btn color="primary" @click="importData" :disabled="importInProgress">Importer les données</v-btn>
        </v-card-text>
    </v-card>
</template>

<script>

    import axios from "axios/index";

    export default {
        name: 'DataDisplay',
        components: {},
        data() {
            return {
                importInProgress: false
            }
        },
        methods: {
            importData() {
                axios.get('http://localhost:8080/import')
                    .then(() => {
                        //
                    })
                    .finally(() => {
                        this.importInProgress = false;
                    })
            }
        }
    }
</script>