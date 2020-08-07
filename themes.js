/**
 * @param {{}} theme
 * @returns {string|boolean}
 */
export const validateThemeJSON = (theme) => {
    if (!theme.uuid) {
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
            new URL(theme.website); // eslint-disable-line
        } catch (error) {
            return 'Invalid website URL.';
        }
    }

    return false;
};
