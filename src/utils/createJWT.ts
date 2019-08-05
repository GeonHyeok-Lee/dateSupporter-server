import jwt from "jsonwebtoken";

const backDate = Math.floor(Date.now() / 1000) - 30;
const toStrBackDate = backDate.toString();
const createJWT = (id: number): string => {
  const token = jwt.sign(
    {
      id
    },
    toStrBackDate
  );
  return token;
};

export default createJWT;
