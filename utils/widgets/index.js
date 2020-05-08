import braidText from './text/index';
import multipleChoice from './multiple-choice/index';
import opinionScale from './opinion-scale/index';
import slider from './slider/index';
import ranking from './ranking/index';
import variable from './variable/index';
import separatorLine from './separator-line/index';

export default {
  [braidText.name]: braidText,
  [multipleChoice.name]: multipleChoice,
  [opinionScale.name]: opinionScale,
  [slider.name]: slider,
  [ranking.name]: ranking,
  [variable.name]: variable,
  [separatorLine.name]: separatorLine

  // [CKeditor.name]: CKeditor,
};
