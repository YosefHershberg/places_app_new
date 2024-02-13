export function isResponseStatusSuccess(status: number): boolean {
    return status >= 200 && status < 300;
}

export function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}