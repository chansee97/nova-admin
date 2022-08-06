import Unocss from 'unocss/vite'; // https://github.com/unocss/unocss
import { presetUno, presetAttributify, presetIcons } from 'unocss';

export default Unocss({
  presets: [presetUno(), presetAttributify(), presetIcons()],
});
