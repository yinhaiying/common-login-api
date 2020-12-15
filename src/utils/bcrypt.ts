import bcrypt from "bcrypt";
const saltRounds = 10;
export  const enbcrypt =  (password:string) => {
    return bcrypt.hash(password, saltRounds);
}

export const compare = (password:string,hash:string) => {
   return  bcrypt.compare(password, hash)
}

