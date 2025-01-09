import { computed, defineComponent } from 'vue';
import { WeatherConditionIcons } from './weather.service.ts'
import WeatherCardAlert from './WeatherCardAlert.js';

export default defineComponent({
    name: 'WeatherCard',

    components: {
        WeatherCardAlert,
    },

    props: {
        cards: {
            type: Object,
            required: true
        }
    },

    setup( props ) {
    
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
          return actualTime > sunriseTime && actualTime < sunsetTime;
        };
    
        return {
    
          weatherIcons,
    
          getTemperature,
    
          getPressure,
    
          findSunDay,
        }
      },

    template: `
        <li class="weather-card" :class="{ 'weather-card--night': !findSunDay( cards.current.dt, cards.current.sunrise, cards.current.sunset ) }">
          <WeatherCardAlert v-if="cards.alert" :sender-name="cards.alert.sender_name" :description="cards.alert.description" />
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
    `

});