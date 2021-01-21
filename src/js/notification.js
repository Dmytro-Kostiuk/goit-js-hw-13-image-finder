import * as PNotify from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';

const notifications = {
  onNull() {
    PNotify.info({
      title: 'Incorrect query',
      text: 'Check please the validity of entering, and try again',
    });
  },
  onIncorrect() {
    PNotify.error({
      title: 'Not found',
      text: 'Please enter a more specific query!',
    });
  },
  onEndOfQuery() {
    PNotify.info({
      title: 'All that is found according to your request',
      text: '',
    });
  },

  onError() {
    PNotify.error({
      title: 'Something went wrong',
      text: 'Please try again',
    });
  },
};
export default notifications;
