const regex = /^[a-zA-Z0-9@._-]*$/;

export const UsernameCheckValidity = (value: string) => {
    return regex.test(value)
};