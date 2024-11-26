const regex = /^[a-zA-Z0-9@._-]*$/;

export const EmailUsernameCheck = (value: string) => {
    return regex.test(value)
};