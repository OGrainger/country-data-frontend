<template>
    <v-autocomplete v-model="countryInput"
                    lael="Ajouter un pays"
                    :items="results"
                    :loading="loading"
                    :search-input.sync="q"
                    clearable
                    @click:clear="clear"></v-autocomplete>
</template>

<script>

    import axios from 'axios/index'


    export default {
        name: 'DateRangeFilter',
        components: {},
        props: {
            clear: {type: Function},
            country: {type: String}
        },

        watch: {
            q(newVal) {
                this.searchCountries(newVal);
            },
        },

        data() {
            return {
                q: '',
                loading: false,
                results: []
            }
        },

        computed: {
            countryInput: {
                get() {
                    return this.country;
                },
                set(newVal) {
                    this.$emit('update:country', newVal)

                }
            }
        },

        methods: {
            searchCountries(q) {
                this.loading = true;
                axios.get('http://localhost:8080/countries/search', {params: {q: `%${q ? q : ''}%`}})
                    .then(response => {
                        this.results = response.data;
                    }).finally(() => {
                    this.loading = false;
                })
            }
        }
    }
</script>