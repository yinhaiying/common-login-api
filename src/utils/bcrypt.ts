import bcrypt from "bcrypt";
const saltRounds = 10;
export  const enbcrypt =  (password:string) => {
    return bcrypt.hash(password, saltRounds);
}

console.log ( enbcrypt("123") )
