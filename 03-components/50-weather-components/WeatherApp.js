import { defineComponent } from 'vue'
import { getWeatherData } from './weather.service.ts'
import './WeatherApp.css'
import WeatherCard from './WeatherCard.js'

export default defineComponent({
  name: 'WeatherApp',

  components: {
    WeatherCard
  },

  setup() {

    const weatherData = getWeatherData();

    return {
      weatherData,
    }
  },

template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul class="weather-list unstyled-list">
        <WeatherCard v-for="cardsItem in weatherData" :cards="cardsItem" />
      </ul>
    </div>
  `,
})
