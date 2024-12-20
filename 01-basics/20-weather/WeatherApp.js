import { defineComponent } from 'vue'
import { getWeatherData, WeatherConditionIcons } from './weather.service.ts'

export default defineComponent({
  name: 'WeatherApp',

  setup() {

    const weatherData = getWeatherData();

    const weatherIcons = WeatherConditionIcons;

    function roundCelcium ( num ) {
      // return Math.round( num * 10 ) / 10; // плюс в том, что получаем чило, но при целых числах нет нулей после точки
      return num.toFixed( 1 ); // получаем строку
    };

    function getTemperature( kelvin ) {
      let celsius = kelvin - 273.15;
      let result = `${roundCelcium ( celsius )} °C`;
      return result;
    };

    function getPressure( value ) {
      let algoritm = value * 0.75;
      let result = Math.round( algoritm );
      return result;
    };

    function findSunDay( actualTime, sunriseTime, sunsetTime ) {
      return {
        'weather-card--night': !( actualTime > sunriseTime && actualTime < sunsetTime ),
      }
    };

    return {
      weatherData,

      weatherIcons,

      getTemperature,

      getPressure,

      findSunDay,
    }
  },

  template: `
    <div>
      <h1 class="title">Погода в Средиземье</h1>
      <ul v-for="cards of weatherData" :ref="weatherData" class="weather-list unstyled-list">
        <li class="weather-card" :class="findSunDay( cards.current.dt, cards.current.sunrise, cards.current.sunset )">
          <div v-if:="cards.alert" class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ cards.alert.sender_name }}: {{ cards.alert.description }}</span>
          </div>
          <div>
            <h2 class="weather-card__name">
              {{ cards.geographic_name }}
            </h2>
            <div class="weather-card__time">
              {{ cards.current.dt }}
            </div>
          </div>
          <div class="weather-conditions">
            <div class="weather-conditions__icon" key:="weatherIcons" :title="cards.current.weather.description">{{ weatherIcons[cards.current.weather.id] }}</div>
            <div class="weather-conditions__temp">{{ getTemperature( cards.current.temp ) }}</div>
          </div>
          <div class="weather-details">
            <div class="weather-details__item">
              <div class="weather-details__item-label">Давление, мм рт. ст.</div>
              <div class="weather-details__item-value">{{ getPressure( cards.current.pressure ) }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Влажность, %</div>
              <div class="weather-details__item-value">{{ cards.current.humidity }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Облачность, %</div>
              <div class="weather-details__item-value">{{ cards.current.clouds }}</div>
            </div>
            <div class="weather-details__item">
              <div class="weather-details__item-label">Ветер, м/с</div>
              <div class="weather-details__item-value">{{ cards.current.wind_speed }}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `,
})
