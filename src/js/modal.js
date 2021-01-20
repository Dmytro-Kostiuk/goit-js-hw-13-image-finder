import * as basicLightbox from 'basiclightbox';

export default function onOpenModal(event) {
  if (event.target.nodeName === 'IMG') {
    const instance = basicLightbox
      .create(
        `
<img src="${event.target.getAttribute('data-source')}" alt="${
          event.target.alt
        }">
`,
      )
      .show();
  }
}
