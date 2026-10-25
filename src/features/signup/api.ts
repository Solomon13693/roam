export async function sendCode(email: string): Promise<void> {
    console.log('TODO: send code to', email)
}

export async function verifyCode(code: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 600))
    return code !== '000000'
}
