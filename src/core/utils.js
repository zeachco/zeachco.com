import store from '../store'

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
        out.eval = initVars + formula;
        out.value = eval(out.eval);
        out.isValid = isFinite(out.value);
    } catch (error) {
        out.error = error.message;
    }
    return out;
}

export const getSpaces = () => {
    const {session} = store.getState();
    return session.spaces || [];
}