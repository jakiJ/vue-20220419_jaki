import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from './meetupService.js';
import MeetupView from '../06-MeetupView/MeetupView.js';

export default defineComponent({
  name: 'PageMeetup',

  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },

  props: {
    meetupId: Number,
  },

  data() {
    return {
      isDownload: true,
      isError: null,
      meetup: null,
    };
  },

  watch: {
    meetupId() {
      this.getMeetup();
    },
  },

  created() {
    this.getMeetup();
  },

  methods: {
    getMeetup() {
      this.isDownload = true;
      this.isError = null;
      this.meetup = null;
      fetchMeetupById(this.meetupId)
        .then((data) => {
          this.meetup = data;
        })
        .finally(() => {
          this.isDownload = false;
        })
        .catch((err) => {
          this.isError = err;
        });
    },
  },

  template: `
    <div class="page-meetup">
      <ui-container v-if="isDownload">
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>
      <ui-container v-if="isError">
        <ui-alert>{{ isError.message }}</ui-alert>
      </ui-container>
      <meetup-view v-if="meetup" :meetup="meetup"/>
    </div>
  `,
});
