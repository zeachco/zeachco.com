export const bind = (object, ...methods) => {
    methods.forEach(m => {
        object[m] = object[m].bind(object);
    });
}

export const formula = (formula, context) => {
    const out = {};
    try {
        const vars = Object
            .keys(context)
            .map(k => `${k} = context['${k}']`)
            .join(', ');
        const initVars = vars ? `var ${vars}; ` : '';
        // eslint-disable-next-line
        out.value = eval(initVars + formula);
        out.isValid = isFinite(out.value);
    } catch (error) {
        out.error = error.message;
    }
    return out;
}