import moment
    from "moment";

export default {



    formatAllCountriesToChart(data, chart, formatter) {
        chart.chartOptions = {
            ...chart.chartOptions, ...{
                xaxis: {
                    categories: data.map(d => moment(d[0]).startOf('day').format(formatter)),
                    labels: {
                        show: data.length < 30
                    }
                }
            },
        };

        chart.series = [{
            name: 'Tous les pays',
            data: data.map(d => d[1])
        }
        ];
    },

    formatOneCountryToChart(data, chart, country) {
        chart.series.push({
            name: country,
            data: data.map(d => d[1])
        });
    }

}