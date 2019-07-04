<template>
    <v-select :items="granularities"
              class="pa-2"
              item-text="text"
              item-value="value"
              label="Granularité"
              v-model="granularityInput"
              hide-details
    ></v-select>
</template>

<script>

    export default {
        name: 'GranularityFilter',
        components: {},
        props: {
            granularity: {
                type: String,
                default() {
                    return null
                }
            },
        },

        computed: {
            granularityInput: {
                get() {
                    return this.granularity;
                },
                set(newVal) {
                    this.$emit('update:granularity', newVal)

                }
            }
        },

        data() {
            return {
                granularities: [{
                    value: 'DAY',
                    text: 'Jour'
                }, {
                    value: 'WEEK',
                    text: 'Semaine'
                }, {
                    value: 'MONTH',
                    text: 'Mois'
                }, {
                    value: 'YEAR',
                    text: 'Année'
                }],
            }
        }
    }
</script>