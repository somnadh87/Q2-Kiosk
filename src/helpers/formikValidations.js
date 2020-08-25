import * as Yup from 'yup';
const customPatterns = [
    { type: 'alphanumaricsp', pattern: /^[a-zA-Z0-9]*$/, message: 'alphanumaric', alowChar: '^[a-zA-Z0-9{spacial}]*$' },
    { type: 'notarbicspn', pattern: /^[a-zA-Z0-9]*$/, message: 'alphanumaric', alowChar: '^[^\u0621-\u064A{spacial}]*$' },
    { type: 'alphanumericspacesp', pattern: /^[a-zA-Z0-9 ]*$/, message: 'alphanumaricandspace', alowChar: '^[a-zA-Z0-9 {spacial}]*$' },
    { type: 'alphasp', pattern: /^[a-zA-Z]*$/, message: 'alpha', alowChar: '^[a-zA-Z{spacial}]*$' },
    { type: 'alphaspacesp', pattern: /^[a-zA-Z ]*$/, message: 'alphaspace', alowChar: '^[a-zA-Z {spacial}]*$' },
    { type: 'alphanumaricallspecials', pattern: /^[a-zA-Z0-9 !”$@^#.?"':&’()*+-<>%,/;[\\\]^_`{|}~]*$/, message: 'arabicnumaricspecial', alowChar: null },
    { type: 'arabicnumaricallspecial', pattern: /^[\u0621-\u064A,0-9 !”$@^#.?"':&’()*+-<>%,/;[\\\]^_`{|}~]*$/, message: 'arabicnumaricspecial', alowChar: null },
    { type: 'arabicnumaricspacesp', pattern: /^[\u0621-\u064A0-9 ]*$/, message: 'arabicnumaricspace', alowChar: '^[\u0621-\u064A0-9 {spacial}]*$' },
    { type: 'arabicnumaricsp', pattern: /^[\u0621-\u064A0-9]*$/, message: 'arabicnumaricspace', alowChar: '^[\u0621-\u064A0-9{spacial}]*$' },
    { type: 'number', pattern: /^[0-9]{1,20}$/, message: 'number', alowChar: null },
    { type: 'commaseparatenumbers', pattern: /^[0-9]{1}[0-9,]*$/, message: 'commaseparatenumbers', alowChar: null },
    { type: 'capitalsAndNumbers', pattern: /^[A-Z0-9]*$/, message: 'capitalsAndNumbers', alowChar: null },
    { type: 'alphaCapitals', pattern: /^[A-Z]*$/, message: 'alphaCapitals', alowChar: null },
    { type: 'alphanumricwithoutspaceandallspecial', pattern: /^[a-zA-Z0-9!”$@^#.<>?":%&’()*+-,/;[\\\]^_`{|}~]+$/, message: 'alphanumricwithoutspaceandallspecial', alowChar: null },

];
const patterns = [
    { type: 'website', pattern: /^((http|https?|ftp|smtp):\/\/)?(www.)?([a-z0-9]+\.[a-z])?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/ },
    { type: 'path', pattern: /^(\/\w+){0,10}\/?$/ },
    { type: 'comaSaparateMobileNumber', pattern: /^((\d{10,15})|((\d{10,15})(,\d{10,15})*))$/ },
    { type: 'multiEmail', pattern: /^(\s?[^\s,]+@[^\s,]+\.[^\s,]+\s?,)*(\s?[^\s,]+@[^\s,]+\.[^\s,]+)$/g },
    { type: 'domain', pattern: /([a-z0-9]+\.)*[a-z0-9]+\.[a-z]+/ },
    { type: 'htmlTags', pattern: /<([^/>]+)\/>/g },
    { type: 'test', pattern: /^(\w+\s?)*\s*$/ },
    { type: 'roomNo', pattern: /^(?:(([0-9A-Z]{1,3})([,][0-9A-Z]{1,3})*)|([A-Z0-9]{1,3})|\d{1,3}-\d{1,3})$/ },
    { type: 'ipPattern', pattern: /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/ },
    { type: 'host', pattern: /^(([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9-]*[A-Za-z0-9])$/ },
    { type: 'path', pattern: /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/ },
    { type: 'ipOrDomain', pattern: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]))$/ }
];

const filterPattern = (type) => {
    let filteredPattern = patterns.find(pattern => pattern.type === type);
    if (filteredPattern)
        return filteredPattern.pattern
    else return type.startsWith('/^') ? type : '';
}

const filterCustomPattern = (type) => {
    let filteredPattern = customPatterns.find(pattern => pattern.type === type);
    if (filteredPattern)
        return filteredPattern
    else return '';
}
export const customContentValidation = (t, isRequired = '', pattern = null, maxLength = 0, minLength = 0, lanugage = '') => {
    console.log("englishContentValidate =>", isRequired, minLength, maxLength, pattern);
    let controleValidate = Yup.string();

    if (isRequired !== '')
        controleValidate = controleValidate.required(isRequired);
    if (minLength !== 0) {
        let minMsg = t('controleErrors.min' + lanugage).replace('{min}', minLength + '');
        controleValidate = controleValidate.min(minLength, minMsg).trim(minMsg);
    }
    if (maxLength !== 0)
        controleValidate = controleValidate.max(maxLength, t('controleErrors.max' + lanugage).replace('{max}', maxLength + ''));
    if (pattern) {
        let patterndata = pattern.patternType ? filterCustomPattern(pattern.patternType) : '';
        let message = t('controleErrors.' + pattern.message);
        if (patterndata !== '') {
            let patternVal = patterndata.pattern;
            if (pattern.spacialChar && patterndata.alowChar) {
                message = message.replace('{spacial}', pattern.spacialChar);
                patternVal = new RegExp((patterndata.alowChar).replace('{spacial}', pattern.spacialChar));
                console.log("patternVal=>", patternVal, patterndata.pattern);
            }
            controleValidate = controleValidate.matches(patternVal, { message: message });
        }
    }

    return controleValidate.nullable();
}

export const controleContentValidate = (isRequired, minLength, maxLength, pattern) => {
    console.log("englishContentValidate =>", isRequired, minLength, maxLength, pattern);
    let controleValidate = Yup.string();
    isRequired = isRequired ? isRequired : '';
    if (isRequired !== '') {
        controleValidate = controleValidate.required(isRequired);
        minLength = minLength ? minLength : '';
        maxLength = maxLength ? maxLength : '';
        let patterndata = pattern ? pattern.patternType ? filterPattern(pattern.patternType) : '' : '';
        if (minLength !== '')
            controleValidate = controleValidate.min(minLength.value, minLength.message).trim(minLength.message);
        if (maxLength !== '')
            controleValidate = controleValidate.max(maxLength.value, maxLength.message);
        if (patterndata !== '')
            controleValidate = controleValidate.matches(patterndata, { message: pattern.message });
    }
    return controleValidate.nullable();
}
export const defultContentValidate = (isRequired) => {
    console.log("defultContentValidate =>", isRequired);
    let defultValidate = Yup.string();
    isRequired = isRequired ? isRequired : '';

    if (isRequired !== '')
        defultValidate = defultValidate.required(isRequired);
    else
        defultValidate = defultValidate.notRequired();
    return defultValidate;
}
export const numericContentValidate = (isRequired, pattern) => {
    let patternMessage = pattern ? pattern.message ? pattern.message : isRequired : isRequired;
    let numericValidate = Yup.number().typeError(patternMessage);
    isRequired = isRequired ? isRequired : '';
    if (isRequired !== '') {
        numericValidate = numericValidate.required(isRequired);
    }
    return numericValidate;
}

export const emailContentValidate = (isRequired, minLength, maxLength, patternMsg = '') => {
    console.log("emailContentValidate =>", isRequired, minLength, maxLength);
    let emailValidate = Yup.string();
    isRequired = isRequired ? isRequired : '';
    if (isRequired !== '') {
        emailValidate = emailValidate.email(patternMsg).required(isRequired);
        minLength = minLength ? minLength : '';
        maxLength = maxLength ? maxLength : '';
        if (minLength !== '')
            emailValidate = emailValidate.min(minLength.value, minLength.message);
        if (maxLength !== '')
            emailValidate = emailValidate.max(maxLength.value, maxLength.message);
    }
    return emailValidate;
}
export const englishContentValidate = (isRequired, minLength, maxLength, pattern) => {
    console.log("englishContentValidate =>", isRequired, minLength, maxLength, pattern);
    let engValidate = Yup.string();
    isRequired = isRequired ? isRequired : '';
    if (isRequired !== '') {
        engValidate = engValidate.required(isRequired);
        minLength = minLength ? minLength : '';
        maxLength = maxLength ? maxLength : '';
        let patterndata = pattern ? pattern.patternType ? pattern.patternType : /^([a-zA-Z0-9 _-]+)$/ : '';
        if (minLength !== '')
            engValidate = engValidate.min(minLength.value, minLength.message);
        if (maxLength !== '')
            engValidate = engValidate.max(maxLength.value, maxLength.message);
        if (patterndata !== '')
            engValidate = engValidate.matches(patterndata, { message: pattern.message });
    }
    return engValidate;
}

export const arbicContentValidate = (isRequired, minLength, maxLength, pattern) => {
    console.log("arbicContentValidate =>", isRequired, minLength, maxLength, pattern);
    let arbValidate = Yup.string();
    isRequired = isRequired ? isRequired : '';

    if (isRequired !== '') {
        arbValidate = arbValidate.required(isRequired);
        minLength = minLength ? minLength : '';
        maxLength = maxLength ? maxLength : '';
        let patterndata = pattern ? pattern.patternType ? pattern.patternType : /^[\u0621-\u064A,0-9 !”$@^#.?"':&’()*+,/;[\\\]^_`{|}~]+$/ : '';
        if (minLength !== '')
            arbValidate = arbValidate.min(minLength.value, minLength.message);
        if (maxLength !== '')
            arbValidate = arbValidate.max(maxLength.value, maxLength.message);
        if (patterndata !== '')
            arbValidate = arbValidate.matches(patterndata, { message: pattern.message });
    }

    return arbValidate;
}
