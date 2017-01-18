export const ItemOptions = {
    toString: input => {
        if (input.constructor !== Array) {
            throw new Error('Expect an Array of option groups');
        }
        let optionString = '';
        input.forEach(og => {
            const children = og
                .options
                .map(o => (o.code + (o.value
                    ? `=${o.value}`
                    : '')));
            optionString += `${og
                .code}: ${children
                .join(', ')} \n`;
        });
        return optionString;
    },
    toObject: str => {
        try {
            const ItemOptionGroups = [];
            const optionGroups = str
                .split(/[\n\r]/)
                .map(s => s.trim())
                .filter(f => !!f);
            optionGroups.forEach(og => {
                const [groupKey,
                    optionsString] = og.split(':')
                const newOptionGroup = {
                    code: groupKey.trim(),
                    options: []
                };
                const options = optionsString
                    .split(',')
                    .map(s => s.trim())
                    .filter(f => !!f);
                options.forEach(o => {
                    const [key,
                        value] = o
                        .split('=')
                        .map(s => s.trim())
                        .filter(f => !!f);
                    newOptionGroup
                        .options
                        .push({
                            code: key,
                            value: (+ value) || 0
                        })
                });
                ItemOptionGroups.push(newOptionGroup);
            });
            return ItemOptionGroups;
        } catch (e) {
            return [];
        }
    }
}