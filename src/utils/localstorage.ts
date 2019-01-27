const {localStorage} = window

export const get = (key : string) : string | null => localStorage.getItem(key)

export const set = (key:string, value:string | null) : void => {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, value)
} 

export const remove = (key:string) => {
    localStorage.removeItem(key)
} 