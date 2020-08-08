import url from 'url';

/**
 * @param {{}} theme
 * @param {boolean} checkUUID
 * @returns {string|boolean}
 */
export const validateThemeJSON = (theme, checkUUID = true) => {
    if (checkUUID && !theme.uuid) {
        return 'Missing UUID';
    }
    if (!theme.name || theme.name.trim() === '') {
        return 'Theme must have a name.';
    }
    if (!theme.version || theme.version.trim() === '') {
        return 'Theme must have a version';
    }
    const match = theme.version.match(/^([0-9]+)\.([0-9]+)\.([0-9]+)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+)?$/);
    if (!match) {
        return 'Version must match x.x.x for example 1.33.5';
    }
    if (!theme.author || theme.author.trim() === '') {
        return 'Theme must have an author';
    }
    if (theme.website) {
        try {
            const parsed = url.parse(theme.website);
            if (!parsed.protocol || ['http:', 'https:'].indexOf(parsed.protocol) === -1) {
                return `Invalid website protocol ${parsed.protocol}.`;
            }
            if (!parsed.host) {
                return 'Invalid website host.';
            }
        } catch (error) {
            return 'Invalid website URL.';
        }
    }

    return false;
};
