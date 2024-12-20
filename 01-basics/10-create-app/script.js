import { defineComponent, createApp } from 'vue'

const App = defineComponent({
    name: 'App',
  
    setup() {
  
      function formatAsLocalDate() {
        return new Date().toLocaleString(navigator.language, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      }
  
      return {
        formatAsLocalDate,
      }
    },

    template: `
    <div class="container">
        Сегодня {{ formatAsLocalDate() }}
    </div>
  `,

});

const app = createApp(App);

const vm = app.mount('#app');