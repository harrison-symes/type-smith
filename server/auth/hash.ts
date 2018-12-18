import * as bcrypt from "bcrypt";

export const generate = async (password:string) => {
    const hash = await bcrypt.hash(password, 12)
    return hash
}

export const compare = async (password: string, hash: string) => {
    const match = await bcrypt.compare(password, hash)
    return match
}