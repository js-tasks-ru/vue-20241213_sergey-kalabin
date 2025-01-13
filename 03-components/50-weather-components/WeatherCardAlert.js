import { defineComponent } from 'vue';

export default defineComponent({
    name: 'WeatherCardAlert',

    props: {
        senderName: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        }
    },

    template: `
        <div class="weather-alert">
            <span class="weather-alert__icon">⚠️</span>
            <span class="weather-alert__description">{{ senderName }}: {{ description }}</span>
        </div>
    `
})