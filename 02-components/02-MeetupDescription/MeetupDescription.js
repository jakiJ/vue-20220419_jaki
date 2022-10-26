import { defineComponent } from './vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'MeetupDescription',

  template: `<p class="meetup-description"> {{ description }} </p>`,

  props: {
    description: {
      type: String,
      require: false,
    },
  },
});
