import { defineComponent, ref, watch, computed } from 'vue'

export default defineComponent({
  name: 'MapApp',

  setup() {
    // Реактивные переменные для хранения координат метки
    let x = ref(0);
    let y = ref(0);

    /**
     * Обработчик клика по карте для установки координат метки
     * @param {MouseEvent} event
     */

    //Вариант 3 не работает
    /* const handleClick = computed((event) => {
      x.value = `${event.offsetX}px`
      y.value = `${event.offsetY}px`
    }) */

    //Вариант 2 работает
    function handleClick (event) {
      x.value = event.offsetX;
      y.value = event.offsetY;
    }

    const pinPlace = computed(() => {
      return {
        left: `${x.value}px`,
        top: `${y.value}px`
      }
    })

    // Вариант 1 работает
    // Следим за X и Y для установки нового положения
    // watch( [x, y], () => {
    //   // Находим метку и изменяем её положение
    //   let map = document.querySelector('.pin')
    //   map.style.left = `${x.value}px`
    //   map.style.top = `${y.value}px`
    // }, { deep: true })

    return {
      x,
      y,
      pinPlace,
      handleClick,
    }
  },

  template: `
    <div class="map" @click="handleClick">
      <img class="map-image" src="./map.png" alt="Map" />
      <span class="pin" :style="pinPlace">📍</span>
      <!-- <span class="pin" :style="{ left: x, top: y}">📍</span> -->
    </div>
  `,
})
