import { defineComponent, ref, watch } from 'vue'
import { getMeetup } from './meetupsService.ts'

export default defineComponent({
  name: 'SelectedMeetupApp',

  setup() {
    const currentId = ref(1)
    const meetupTitle = ref('')

    const pages = [
      {
        id: 'meetup-id-1',
        name: 'meetupId',
        value: 1,
      },
      {
        id: 'meetup-id-2',
        name: 'meetupId',
        value: 2,
      },
      {
        id: 'meetup-id-3',
        name: 'meetupId',
        value: 3,
      },
      {
        id: 'meetup-id-4',
        name: 'meetupId',
        value: 4,
      },
      {
        id: 'meetup-id-5',
        name: 'meetupId',
        value: 5,
      },
    ]

    const prevMeetup = () => {
      currentId.value--
    }

    const nextMeetup = () => {
      currentId.value++
    }

    const fetchMeetups = async id => {
      try {
        const meetup = await getMeetup(id)
        meetupTitle.value = meetup.title
      } catch (e) {
        console.error(e)
        return ''
      }
    }

    watch(
      currentId,
      newId => {
        fetchMeetups(newId)
      },
      { immediate: true },
    )

    return {
      meetupTitle,
      currentId,
      prevMeetup,
      nextMeetup,
      pages,
    }
  },

  template: `
    <div class="meetup-selector">
      <div class="meetup-selector__control">
        <button class="button button--secondary" type="button" :disabled="currentId === 1" @click="prevMeetup">Предыдущий</button>

        <div class="radio-group" role="radiogroup">
          <div  v-for="page in pages" :key="page.id" class="radio-group__button">
            <input
              v-model="currentId"
              class="radio-group__input"
              type="radio"
              :id="page.id"
              :name="page.name"
              :value="page.value"
            />
            <label :for="page.id" class="radio-group__label">{{ page.value }}</label>
          </div>
        </div>

        <button class="button button--secondary" type="button" :disabled="currentId === 5" @click="nextMeetup">Следующий</button>
      </div>

      <div class="meetup-selector__cover">
        <div class="meetup-cover">
          <h1 class="meetup-cover__title">{{meetupTitle}}</h1>
        </div>
      </div>

    </div>
  `,
})