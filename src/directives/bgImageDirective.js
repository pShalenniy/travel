import { encryptUrl } from '@/utils/encryptUrl';

export const bgImageDirective = {
  inserted: function(el, binding) {
    encryptUrl(binding.value).then(url => {
      el.style.backgroundImage = `url(${url})`;
    });
  }
};
