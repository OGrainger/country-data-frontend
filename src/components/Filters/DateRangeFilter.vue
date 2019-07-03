<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-card>
        <v-card-text>
            <v-layout row wrap v-if="loadingDates">
                <v-progress-linear :indeterminate="true"></v-progress-linear>
            </v-layout>

            <v-layout row wrap v-if="!loadingDates">
                <v-flex xs6 class="text-xs-center">
                    <v-menu ref="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="formattedDates.start"
                                          label="Début"
                                          persistent-hint
                                          prepend-icon="event"
                                          v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="dates.start"
                                :first-day-of-week="1"
                                locale="fr-FR"
                                :min="datesRange.min"
                                :max="dates.end"
                                :show-current="false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>

                <v-flex xs6>
                    <v-menu ref="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            lazy
                            transition="scale-transition"
                            offset-y
                            full-width
                            max-width="290px"
                            min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="formattedDates.end"
                                          label="Fin"
                                          persistent-hint
                                          prepend-icon="event"
                                          v-on="on"
                            ></v-text-field>
                        </template>
                        <v-date-picker
                                v-model="dates.end"
                                :first-day-of-week="1"
                                locale="fr-FR"
                                :min="dates.start"
                                :max="datesRange.max"
                                :show-current="false"
                        ></v-date-picker>
                    </v-menu>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>

    import axios from 'axios/index'
    import moment from "moment/moment"


    export default {
        name: 'DateRangeFilter',
        components: {},
        props: {
            dates: {
                type: Object,
                default() {
                    return null
                }
            },
        },

        watch: {
            dates: {
                deep: true,
                handler(newVal) {
                    if (newVal) {
                        this.formattedDates.start = this.formatDate(newVal.start);
                        this.formattedDates.end = this.formatDate(newVal.end);
                    }
                }
            },
        },

        data() {
            return {

                error: false,
                loadingDates: true,
                datesRange: {
                    min: '',
                    max: ''
                },
                formattedDates: {
                    start: '',
                    end: ''
                }
            }
        },
        methods: {
            formatDate(date) {
                return moment(date).format('DD/MM/YYYY')
            },
        },
        mounted() {
            axios.get('http://localhost:8080/dates')
                .then(response => {
                    this.dates.start = moment(response.data.start).startOf('day').add(1, 'h').format('YYYY-MM-DD');
                    this.datesRange.min = moment(response.data.start).startOf('day').add(1, 'h').format('YYYY-MM-DD');
                    this.dates.end = moment(response.data.end).endOf('day').add(1, 'h').format('YYYY-MM-DD');
                    this.datesRange.max = moment(response.data.end).endOf('day').add(1, 'h').format('YYYY-MM-DD');
                }).catch(() => {
                this.error = true;
            }).finally(() => {
                this.loadingDates = false;
            })

        }
    }
</script>