import store from '../store';

export const bind = (object, ...methods) => {
    methods.forEach(m => {
        object[m] = object[m].bind(object);
    });
};

export const formula = (formule, context) => {
    const out = {};
    try {
        const vars = Object
            .keys(context)
            .map(k => `${k} = context['${k}']`)
            .join(', ');
        const initVars = vars ? `var ${vars}; ` : '';
        out.eval = initVars + formule;
        // eslint-disable-next-line
        out.value = eval(out.eval);
        out.isValid = isFinite(out.value);
    } catch (error) {
        out.error = error.message;
    }
    return out;
};

export const getSpaces = () => {
    const {session} = store.getState();
    return session.spaces || [];
};
