export const getAuthToken = () => {
    if (typeof document === 'undefined') return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; authToken=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const logout = () => {
    if (typeof document !== 'undefined') {
        document.cookie = 'authToken=; Max-Age=0; path=/;';
    }
};
