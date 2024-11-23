const ID_TOKEN_KEY = "token" as string;
const getToken = (): string | null => {
    return window.localStorage.getItem(ID_TOKEN_KEY);
};

const saveToken = (token: string): void => {
    window.localStorage.setItem(ID_TOKEN_KEY, token);
};

const destroyToken = (): void => {
    window.localStorage.removeItem(ID_TOKEN_KEY);
};

export default { getToken, saveToken, destroyToken };