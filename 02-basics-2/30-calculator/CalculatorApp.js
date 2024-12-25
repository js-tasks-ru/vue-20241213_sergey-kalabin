import { defineComponent, ref, computed, } from 'vue'

export default defineComponent({
  name: 'CalculatorApp',

  setup() {

    const operand1 = ref(0);

    const operand2 = ref(0);

    const operator = ref('sum');

    const result = computed(() => {
      switch (operator.value) {
        case 'sum':
          return operand1.value + operand2.value
        case 'subtract':
          return operand1.value - operand2.value
        case 'multiply':
          return operand1.value * operand2.value
        case 'divide':
          return operand1.value / operand2.value
        default:
          return operand1.value + operand2.value;
      }
    })

    return {
      operand1,
      operand2,
      operator,
      result,
    }
  },

  template: `
    <div class="calculator">
      <input type="number" aria-label="First operand" v-model="operand1" />

      <div class="calculator__operators">
        <label><input type="radio" name="operator" value="sum" v-model="operator"/>➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="operator"/>➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="operator"/>✖</label>
        <label><input type="radio" name="operator" value="divide" v-model="operator"/>➗</label>
      </div>

      <input type="number" aria-label="Second operand" v-model="operand2" />

      <div>=</div>

      <output>{{ result }}</output>
    </div>
  `,
})
