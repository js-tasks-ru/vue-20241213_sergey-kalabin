import { computed, defineComponent, ref } from 'vue'

// Значения взяты из https://jsonplaceholder.typicode.com/comments
export const emails = [
  'Eliseo@gardner.biz',
  'Jayne_Kuhic@sydney.com',
  'Nikita@garfield.biz',
  'Lew@alysha.tv',
  'Hayden@althea.biz',
  'Presley.Mueller@myrl.com',
  'Dallas@ole.me',
  'Mallory_Kunze@marie.org',
  'Meghan_Littel@rene.us',
  'Carmen_Keeling@caroline.name',
  'Veronica_Goodwin@timmothy.net',
  'Oswald.Vandervort@leanne.org',
  'Kariane@jadyn.tv',
  'Nathan@solon.io',
  'Maynard.Hodkiewicz@roberta.com',
  'Christine@ayana.info',
  'Preston_Hudson@blaise.tv',
  'Vincenza_Klocko@albertha.name',
  'Madelynn.Gorczany@darion.biz',
  'Mariana_Orn@preston.org',
  'Noemie@marques.me',
  'Khalil@emile.co.uk',
  'Sophia@arianna.co.uk',
  'Jeffery@juwan.us',
  'Isaias_Kuhic@jarrett.net',
]

export default defineComponent({
  name: 'MarkedEmailsApp',

  setup() {

    const emailsArrow = ref(emails);

    const inputEmail = ref('');

    const filteredEmails = computed(() => {
      return emailsArrow.value.map(email => ({
        email,
        marked: email.toLowerCase().includes( inputEmail.value.toLowerCase() ) && inputEmail.value !== '',
      }))
    })

    return {
      emailsArrow,
      inputEmail,
      filteredEmails,
    }
  },

  template: `
    <div>
      <!-- {{ filteredEmails }} -->
      <div class="form-group">
        <input type="search" aria-label="Search" v-model.trim="inputEmail" />
      </div>
      <ul aria-label="Emails">
        <li v-for="email in filteredEmails" :class="{ 'marked': email.marked }">
            {{ email.email }}
        </li>
      </ul>
    </div>
  `,
})
