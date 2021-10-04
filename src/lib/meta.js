
export const HEADER_VALUES = {
    MINUTES: 'Minutes',
    HOURLY: 'Hourly',
    DAILY: 'Daily',
    WEEKLY: 'Weekly',
    MONTHLY: 'Monthly',
    CUSTOM: 'Custom'
};

const defaultTabs = [HEADER_VALUES.MINUTES, HEADER_VALUES.HOURLY, HEADER_VALUES.DAILY, HEADER_VALUES.WEEKLY, HEADER_VALUES.MONTHLY, HEADER_VALUES.CUSTOM];

export const metadata = [{
    name: HEADER_VALUES.MINUTES,
    initialCron: ['0','0/1','*','*','*','?','*']
}, {
    name: HEADER_VALUES.HOURLY,
    initialCron: ['0','0','0','1/1','*','?','*']
}, {
    name: HEADER_VALUES.DAILY,
    initialCron: ['0','0','0','1/1','*','?','*']
}, {
    name: HEADER_VALUES.WEEKLY,
    initialCron: ['0','0','0','?','*','*','*']
}, {
    name: HEADER_VALUES.MONTHLY,
    initialCron: ['0','0','0','1','1/1','?','*']
}, {
    name: HEADER_VALUES.CUSTOM,
    initialCron: ['*','*','*','*','*','*','*']
}];

const validateHeaders = (headers) => {
    const validatedHeaders = [];
    headers.forEach(header => {
        if(!HEADER_VALUES[header]) {
            throw new Error('Invalid header ' + header);
            // Avoid duplicates
        } else if(validatedHeaders.indexOf(HEADER_VALUES[header]) === -1) {
            validatedHeaders.push(HEADER_VALUES[header]);
        }
    });
    return validatedHeaders;
}

/**
 * Validate and load headers
 * @param {*} options 
 */
export const loadHeaders = (options) => {
    if(options) {
        if(options.headers) {
            if(!options.headers.length) {
                throw new Error('Atleast one header is required.');
            }
            return validateHeaders(options.headers);
        }
    }
    return defaultTabs;
};

export const translateFn = (key, translations) => {
    let translatedText = key;
    if(translations) {
        translatedText = translations[key];
        if(typeof translatedText !== 'string') {
            throw new Error('translateFn expects a string translation');
        }
    }
    return translatedText;
}