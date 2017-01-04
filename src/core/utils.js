export const bind = (object, ...methods) => {
    methods.forEach(m => {
        object[m] = object[m].bind(object);
    });
}