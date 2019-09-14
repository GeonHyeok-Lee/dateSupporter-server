import jwt from "jsonwebtoken";
import User from "../entities/User";

const decodeJWT = async (token: string): Promise<User | undefined> => {
  try {
    let decoded: any;
    await jwt.verify(
      token,
      process.env.JWT_TOKEN || "",
      (error, decodedObject) => {
        if (error) {
          console.log(`jwt.verify: ${error}`);
        } else {
          decoded = decodedObject;
        }
      }
    );
    const { id } = decoded;
    const user = await User.findOne({ id });
    return user;
  } catch (error) {
    return undefined;
  }
};

export default decodeJWT;
