<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <DateRangeFilter class="ma-2" :dates="search.dates"></DateRangeFilter>
        <v-card class="ma-2">
            <v-card-text>
                <v-layout row wrap>
                    <v-flex md3>
                        <v-data-table
                                :headers="table.headers"
                                :items="table.items"
                                class="elevation-1">
                            <template v-slot:items="props">
                                <td>{{ props.item.country }}</td>
                                <td class="text-xs-right">{{ props.item.value }}</td>
                            </template>
                        </v-data-table>
                    </v-flex>
                    <v-flex md9 class="pa-2">
                        <v-layout row wrap>
                            <v-flex xs3 class="text-xs-right pa-2">
                                <GranularityFilter :granularity.sync="search.granularity"></GranularityFilter>
                            </v-flex>
                            <v-flex xs3 offset-xs6 class="text-xs-right pa-2">
                                <CountryFilter :clear="clearCountryData" :country.sync="search.country"></CountryFilter>

                            </v-flex>
                            <v-flex xs12>
                                <apexchart height="450" type="line" :options="chart.chartOptions" :series="chart.series"></apexchart>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>

    </div>
</template>

<script>

    import axios from 'axios/index'
    import moment from "moment/moment"
    import DateRangeFilter from "../components/Filters/DateRangeFilter";
    import GranularityFilter from "../components/Filters/GranularityFilter";
    import CountryFilter from "../components/Filters/CountryFilter";


    export default {
        name: 'DataDisplay',
        components: {GranularityFilter, DateRangeFilter, CountryFilter},

        data() {
            return {

                search: {
                    granularity: 'DAY',
                    country: null,
                    dates: {
                        start: null,
                        end: null
                    },
                },

                error: false,

                //table data
                table: {
                    headers: [
                        {
                            text: 'Pays',
                            value: 'country'
                        },
                        {
                            text: 'valeur',
                            value: 'value'
                        }
                    ],
                    items: []
                },

                // graph data
                granularity: 'DAY',
                chart: {
                    chartOptions: {
                        chart: {
                            id: 'vuechart'
                        },
                        xaxis: {
                            categories: []
                        }
                    },
                    series: []
                },

                //search countries
                countriesSearched: [],
                countrySearchLoading: false,
                country: null

            }
        },
        watch: {
            dateCompute: {
                deep: true,
                handler(newVal) {
                    this.getTableData(newVal);
                    this.getChartData(newVal, this.search.granularity, this.search.country);
                }
            },
            countryCompute(newVal) {
                this.getChartData(this.search.dates, this.search.granularity, newVal);
            },
            granularityCompute(newVal) {
                this.getChartData(this.search.dates, newVal, this.search.country);
            }
        },
        computed: {
            format() {
                if (this.granularity === 'DAY') return 'L';
                if (this.granularity === 'WEEK') return 'Wo [semaine de] GGGG';
                if (this.granularity === 'MONTH') return 'MMMM YYYY';
                if (this.granularity === 'YEAR') return 'YYYY';
                return null;
            },
            dateCompute() {
                return this.search.dates;
            },
            granularityCompute() {
                return this.search.granularity;
            },
            countryCompute() {
                return this.search.country;
            },
            countryQueryCompute() {
                return this.search.countryQuery;
            }


        },

        methods: {

            clearCountryData() {
                this.chart.series = [this.chart.series[0]];
            },
            getTableData(dates) {
                let params = {
                    start: moment(dates.start).startOf('day').add(1, 'h').toISOString(),
                    end: moment(dates.end).endOf('day').add(1, 'h').toISOString()
                };
                axios.get('http://localhost:8080/data/table', {params})
                    .then(response => {
                        this.table.items = response.data;
                    })
            },
            getChartData(dates, granularity, country = null) {
                let params = {
                    start: moment(dates.start).startOf('day').add(1, 'h').toISOString(),
                    end: moment(dates.end).endOf('day').add(1, 'h').toISOString(),
                    granularity
                };
                axios.get('http://localhost:8080/data/chart', {params})
                    .then(response => {
                        this.formatAllCountriesToChart(response.data);
                        if (country) this.getChartDataForCountry(dates, granularity, country);
                    })

            },
            getChartDataForCountry(dates, granularity, country) {
                let params = {
                    start: moment(dates.start).startOf('day').add(1, 'h').toISOString(),
                    end: moment(dates.end).endOf('day').add(1, 'h').toISOString(),
                    granularity,
                    country
                };

                axios.get('http://localhost:8080/data/chart', {params})
                    .then(response => {
                        this.formatOneCountryToChart(response.data);
                    })

            },

            formatAllCountriesToChart(data) {
                this.chart.chartOptions = {
                    ...this.chart.chartOptions, ...{
                        xaxis: {
                            categories: data.map(d => moment(d[0]).startOf('day').format(this.format)),
                            labels: {
                                show: data.length < 30
                            }
                        }
                    },
                };

                this.chart.series = [{
                    name: 'Tous les pays',
                    data: data.map(d => d[1])
                }
                ];
            },
            formatOneCountryToChart(data) {

                this.chart.series.push({
                    name: this.country,
                    data: data.map(d => d[1])
                });
            }
        }
    }
</script>