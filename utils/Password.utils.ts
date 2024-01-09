const bycrpt = require('bcrypt')

export const GenerateSalt = async () => {
    return await bycrpt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
    return await bycrpt.hash(password, salt)
}