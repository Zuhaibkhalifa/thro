const TOKEN_KEY = 'token';

export const login = (id) => {
    console.log('ID '+ id);
    localStorage.setItem(TOKEN_KEY, id);
  //  window.location="./User/dashboard";
}

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.clear();
   // window.location="/signin";
}

export const isLogin = () => {
    if (localStorage.getItem(TOKEN_KEY)) {
        return true;
    }

    return false;
}

export const goBack= () => {

    window.history.back();
  
    }