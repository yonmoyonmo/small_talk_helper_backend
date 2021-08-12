import * as bcrypt from 'bcrypt';
import { Connection, getConnection } from 'typeorm';
import { Admin } from '../entity/Admin';

export const registerAdmin = async (req) => {
  const connection: Connection = getConnection();
  const adminRepo = connection.getRepository(Admin);
  const { admin_name, password } = req.body;

  if (!admin_name || !password) {
    console.error("no name no gain");
    return false
  }

  const saltRounds: number = parseInt(process.env.bcryptSaltRounds);
  console.log(saltRounds);
  let newAdmin: Admin = new Admin();
  newAdmin.admin_name = admin_name;

  const salt: string = await bcrypt.genSalt(saltRounds);
  const encrypted = await bcrypt.hash(password, salt);

  // //--debug---
  // console.log("debug : " + encrypted);
  // const debug1 = await bcrypt.compare(password, encrypted);
  // const debug2 = await bcrypt.compare("ssss", encrypted);
  // console.log(debug1);
  // console.log(debug2);
  // //-------

  newAdmin.password = encrypted;

  try {
    await adminRepo.save(newAdmin);
    console.log(`new admin registerd : ${newAdmin.admin_name}`);
    return true
  } catch (e) {
    throw new Error(e);
  }
}

export const loginAdmin = async (req) => {
  const connection: Connection = getConnection();
  const adminRepo = connection.getRepository(Admin);
  const { admin_name, password } = req.body;

  if (!admin_name || !password) {
    console.error("no name no gain");
    return false
  }

  const admin = await adminRepo.createQueryBuilder("admin")
    .where("admin.admin_name = :admin_name", { admin_name: admin_name })
    .getOne();
  const match = await bcrypt.compare(password, admin.password);

  if(match){
    return true;
  }else{
    return false;
  }

}