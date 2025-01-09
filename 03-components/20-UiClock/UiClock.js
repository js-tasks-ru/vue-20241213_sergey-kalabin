import { defineComponent, ref, onMounted, onUnmounted } from 'vue'

export default defineComponent({
  name: 'UiClock',

  setup() {
    const timeData = new Intl.DateTimeFormat(navigator.language, { timeStyle: 'medium' });

    const timeActual = ref('');

    let intervalCount = 0;

    onMounted(() => {
      timeActual.value = timeData.format(new Date());

      intervalCount = setInterval(() => {
        timeActual.value = timeData.format(new Date());
      }, 1000);
    })

    onUnmounted(() => {
      clearInterval( intervalCount )
    });

    return {
      timeActual,
    }
  },

  template: `<div class="clock">{{ timeActual }}</div>`,
})
