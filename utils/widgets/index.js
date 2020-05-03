import braidText from './text/index';
import multipleChoice from './multiple-choice/index';
import opinionScale from './opinion-scale/index';
import CKeditor from './ck-text';
export default {
    [braidText.name]: braidText,
    [multipleChoice.name]: multipleChoice,
    [opinionScale.name]: opinionScale,
    // [CKeditor.name]: CKeditor,
}

