import bcrypt from 'bcrypt';

//hash password
async function hashPassword(plaintextPassword){
    const hash = await bcrypt.hash(plaintextPassword, 10);
    console.log("Hash generated: " + hash);
    return hash;
}

//validate password, bool return
async function comparePassword(plaintextPassword, hashIn) {
    return await bcrypt.compare(plaintextPassword, hashIn);
}

export {hashPassword, comparePassword}
