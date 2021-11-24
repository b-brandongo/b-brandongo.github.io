<template>
  <div class="calc">
    <h2>{{ $t('title') }}</h2>
    <br/>
    <b-container>
      <b-row>
        <b-col sm="4">
          <label :for="sensitivityPercent">{{ $t('sensitivityPercent') }}</label>
        </b-col>
        <b-col>
          <b-form-input v-model="sensitivityPercent" placeholder="sensitivity" min='0' max='100' type="number"
                        id="sensitivityPercent"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input type="range" min="0" max="100" v-model="sensitivityPercent" ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4">
          <label :for="specificityPercent">{{ $t('specificityPercent') }}</label>
        </b-col>
        <b-col>
          <b-form-input v-model="specificityPercent" placeholder="specificity" min='0' max='100' type="number"
                        id="specificityPercent"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input type="range" min="0" max="100" v-model="specificityPercent" ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4">
          <label :for="total">{{ $t('total') }}</label>
        </b-col>
        <b-col>
          <b-form-input v-model="total" placeholder="total" min='0' type="number" step="3" id="total"></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4">
          <label :for="positiveSharePercent">{{ $t('positiveSharePercent') }}</label>
        </b-col>
        <b-col>
          <b-form-input v-model="positiveSharePercent" placeholder="total" min='0' max='100' type="number"
                        id="positiveShare"></b-form-input>
        </b-col>
        <b-col>
          <b-form-input type="range" min="0" max="100" v-model="positiveSharePercent" ></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4">
          <label :for="testCount">{{ $t('testCount') }}</label>
        </b-col>
        <b-col>
          <b-form-input v-model="testCount" placeholder="total" :min='requirePositiveTestCount' type="number"
                        id="testCount"></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col sm="4">
          <label :for="requirePositiveTestCount">{{ $t('requirePositiveTestCount') }}</label>
        </b-col>
        <b-col>
          <b-form-input v-model="requirePositiveTestCount" placeholder="total" min='1' :max="testCount" type="number"
                        id="requirePositiveTestCount"></b-form-input>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          {{ $t('accuracy') }} {{ accuracy.times(100).toPrecision(4) }} %
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ $t('precision') }} {{ precision.times(100).toPrecision(4) }} %
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ $t('NPV') }} {{ npv.times(100).toPrecision(4) }} %
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ $t('truePositive') }} {{ truePositive }}
        </b-col>
        <b-col>
          {{ $t('trueNegative') }} {{ trueNegative }}
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ $t('falsePositive') }} {{ falsePositive }}
        </b-col>
        <b-col>
          {{ $t('falseNegative') }} {{ falseNegative }}
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          {{ $t('falsePositiveRate') }} {{ falsePositiveRate.times(100).toPrecision(3) }} %
        </b-col>
        <b-col>
          {{ $t('falseNegativeRate') }} {{ falseNegativeRate.times(100).toPrecision(3) }} %
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ $t('sensitivityInSeries') }} {{ sensitivityInSeries.toPrecision(6) }}
        </b-col>
        <b-col>
          {{ $t('specificityInSeries') }} {{ specificityInSeries.toPrecision(6) }}
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ $t('truePositiveShare') }} {{ truePositiveShare }}
        </b-col>
        <b-col>
          {{ $t('trueNegativeShare') }} {{ trueNegativeShare }}
        </b-col>
        <b-col>
          {{ $t('falsePositiveShare') }} {{ falsePositiveShare }}
        </b-col>
        <b-col>
          {{ $t('falseNegativeShare') }} {{ falseNegativeShare }}
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          {{ $t('totalPositive') }} {{ totalPositive }}
        </b-col>
        <b-col>
          {{ $t('totalNegative') }} {{ totalNegative }}
        </b-col>
      </b-row>

    </b-container>

    <div>
      <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'

BigNumber.set({ROUNDING_MODE: BigNumber.ROUND_HALF_DOWN});

const messages = {
  'en': {
    'title': 'Medical Test Calculator',
    'sensitivityPercent': 'Sensitivity percent',
    'specificityPercent': 'Specificity percent',
    'total': 'Number of test people',
    'positiveSharePercent': 'Real positive cases share',
    'testCount': 'Test count per one',
    'requirePositiveTestCount': 'Require positive test count',
    'accuracy': 'Accuracy',
    'precision': 'Positive predictive value',
    'NPV': 'Negative predictive value ',
    'truePositive': 'True positive count',
    'trueNegative': 'True negative count',
    'falsePositive': 'False positive count',
    'falseNegative': 'True negative count',
    'falsePositiveRate': 'False positive rate',
    'falseNegativeRate': 'False negative rate',
    'sensitivityInSeries': 'Sensitivity in test series',
    'specificityInSeries': 'Specificity in test series',
    'truePositiveShare': 'True positive share',
    'trueNegativeShare': 'True negative share',
    'falsePositiveShare': 'False positive share',
    'falseNegativeShare': 'True negative share',
    'totalPositive': 'Total positive test results',
    'totalNegative': 'Total negative test results',
    'test100': '100% of tests',

  },
  'ru': {
    'title': 'Калькулятор медицинских тестов',
    'sensitivityPercent': 'Чувствительность в процентах',
    'specificityPercent': 'Специфичность в процентах',
    'total': 'Число тестируемых',
    'positiveSharePercent': 'Процент истинно положительных',
    'testCount': 'Количество тестов на одного человека',
    'requirePositiveTestCount': 'Минимальное число положительных тестов для подтверждения заболевания',
    'accuracy': 'Точность',
    'precision': 'Прогностическая ценность положительного результата',
    'NPV': 'прогностическая ценность отрицательного результата',
    'truePositive': 'Истинно положительные',
    'trueNegative': 'Истинно отрицательные',
    'falsePositive': 'Ложно положительные',
    'falseNegative': 'Ложно отрицательные',
    'falsePositiveRate': 'False positive rate',
    'falseNegativeRate': 'False negative rate',
    'sensitivityInSeries': 'Чувствительность в серии тестов',
    'specificityInSeries': 'Специфичность в серии тестов',
    'truePositiveShare': 'Доля истинно положительных',
    'trueNegativeShare': 'Доля истинно отрицательных',
    'falsePositiveShare': 'Доля ложно положительных',
    'falseNegativeShare': 'Доля ложно отрицательных',
    'totalPositive': 'Общее количество положительных тестов (серий тестов)',
    'totalNegative': 'Общее количество отрицательных тестов (серий тестов)',
    'test100': '100% тестов',
  }
}

export { messages };

export default {
  name: 'Calculator',
  data() {
    return {
      total: 1_000_000,
      positiveSharePercent: 5,
      sensitivityPercent: 50,
      specificityPercent: 98,
      testCount: 1,
      requirePositiveTestCount: 1,
      chartOptions: {
        style: {},
        chart: {
          type: 'bar',
          height: 350,
          stacked: true,
          stackType: '100%'
        },
        plotOptions: {
          bar: {
            horizontal: true,
          },
        },
        colors: ['#008ffb', '#ff4560', '#00e396', '#feb019'],
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        title: {
          text: this.$t('test100')
        },
        xaxis: {
          categories: [''],
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return `${new BigNumber(val).times(100).toPrecision(3)}% (${new BigNumber(val).times(window.total)})`;
            }
          }
        },
        fill: {
          opacity: 1

        },
        legend: {
          position: 'top',
          horizontalAlign: 'left',
          offsetX: 40
        }
      },
    }
  },
  mounted() {
    window.total = this.total;
  },
  computed: {
    series() {
      return [{
        name: this.$t('truePositiveShare'),
        data: [this.truePositiveShare]
      }, {
        name: this.$t('falsePositiveShare'),
        data: [this.falsePositiveShare]
      }, {
        name: this.$t('trueNegativeShare'),
        data: [this.trueNegativeShare]
      }, {
        name: this.$t('falseNegativeShare'),
        data: [this.falseNegativeShare]
      }];
    },
    conditionPositive() {
      return Math.round(this.total * (this.positiveSharePercent / 100));
    },
    conditionNegative() {
      return this.total - this.conditionPositive;
    },
    sensitivity() {
      return this.sensitivityPercent / 100;
    },
    specificity() {
      return this.specificityPercent / 100;
    },
    sensitivityInSeries() {
      let p = new BigNumber(0);
      const n = Number(this.testCount);
      for (let k = Number(this.requirePositiveTestCount); k <= n; k++) {
        p = p.plus(this.combination(k, n)
            .times(Math.pow(this.sensitivity, k))
            .times(Math.pow(1 - this.sensitivity, n - k)));
      }
      return p;
    },
    specificityInSeries() {
      let p = new BigNumber(0);
      const n = Number(this.testCount);
      for (let k = n - Number(this.requirePositiveTestCount) + 1; k <= n; k++) {
        p = p.plus(this.combination(k, n)
            .times(Math.pow(this.specificity, k))
            .times(Math.pow(1 - this.specificity, n - k)));
      }
      return p;
    },
    truePositive() {
      return Math.round(this.conditionPositive * this.sensitivityInSeries);
    },
    trueNegative() {
      return Math.round(this.conditionNegative * this.specificityInSeries);
    },
    falsePositive() {
      return Math.round(this.conditionNegative * (1 - this.specificityInSeries));
    },
    falseNegative() {
      return Math.round(this.conditionPositive * (1 - this.sensitivityInSeries));
    },
    accuracy() {
      return new BigNumber((this.truePositive + this.trueNegative) / this.total);
    },
    precision() {
      return new BigNumber(this.truePositive / (this.truePositive + this.falsePositive));
    },
    npv() {
      return new BigNumber(this.trueNegative / (this.trueNegative + this.falseNegative));
    },
    truePositiveShare() {
      return this.truePositive / this.total;
    },
    trueNegativeShare() {
      return this.trueNegative / this.total;
    },
    falsePositiveShare() {
      return this.falsePositive / this.total;
    },
    falseNegativeShare() {
      return this.falseNegative / this.total;
    },
    totalPositive() {
      return this.truePositive + this.falsePositive;
    },
    totalNegative() {
      return this.trueNegative + this.falseNegative;
    },
    falsePositiveRate() {
      return new BigNumber(this.falsePositive / this.totalPositive);
    },
    falseNegativeRate() {
      return new BigNumber(this.falseNegative / this.totalNegative);
    }
  },
  methods: {
    factorial(num) {
      let retVal = new BigNumber(1);
      for (let i = 2; i <= num; i++) {
        retVal = retVal.times(new BigNumber(i));
      }
      return retVal;
    },
    combination(k, n) {
      return this.factorial(n).div(this.factorial(k).times(this.factorial(n - k)));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.calc {
  margin-top: 60px;
}

.row {
  margin-bottom: 10px;
}

h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
