const TOKEN_KEY = 'token';
const role = 'role';

export const Adminlogin = (id) => {
    localStorage.setItem(TOKEN_KEY, id);
    localStorage.setItem(role, 'Admin');
};

export const Adminlogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(role);
    localStorage.clear();
    window.location = '/signin';
};

export const isAdminLogin = () => {
    if (localStorage.getItem(role)) {
        return true;
    }

    return false;
};
