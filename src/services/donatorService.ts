import * as bcrypt from 'bcrypt';
import { Connection, getConnection } from 'typeorm';
import { Donator } from '../entity/Donator';

export const registerDonator = async (req) => {
  const connection: Connection = getConnection();
  const donatorRepo = connection.getRepository(Donator);
  const { donator_name, password } = req.body;

  if (!donator_name || !password) {
    console.error("no name no gain");
    return { success: false, message: "no name, no password" };
  }

  const donator = await donatorRepo.createQueryBuilder("donator")
    .where("donator.donator_name = :donator_name", { donator_name: donator_name })
    .getOne();
  if (donator) {
    return { success: false, message: "fail", error: "duplicated name", dup: true };
  }

  const saltRounds: number = parseInt(process.env.bcryptSaltRounds);
  let newDonator: Donator = new Donator();
  newDonator.donator_name = donator_name;
  const salt: string = await bcrypt.genSalt(saltRounds);
  const encrypted = await bcrypt.hash(password, salt);
  newDonator.password = encrypted;

  try {
    await donatorRepo.save(newDonator);
    console.log(`new donator registerd : ${newDonator.donator_name}`);
    return { success: true, message: "success" };
  } catch (e) {
    return { success: false, message: "fail", error: e };
  }
}

export const check = async (req) => {
  const connection: Connection = getConnection();
  const donatorRepo = connection.getRepository(Donator);
  const { donator_name, password } = req.body;

  if (!donator_name || !password) {
    console.error("no name no gain");
    return false
  }
  try {
    const donator = await donatorRepo.createQueryBuilder("donator")
      .where("donator.donator_name = :donator_name", { donator_name: donator_name })
      .getOne();
    if (donator) {
      const match = await bcrypt.compare(password, donator.password);
      if (match) {
        return true;
      } else {
        return false;
      }
    } else return false;
  } catch (e) {
    throw new Error(e);
  }
}