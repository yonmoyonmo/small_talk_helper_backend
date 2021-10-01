import { Sugguestion } from "../entity/Sugguestion"
import { Admin } from "../entity/Admin";
import { DeleteResult, getConnection } from 'typeorm';
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { UserSugguestion } from "../entity/UserSugguestion";

export const createMultipleSugguestion = (req: Request) => {
  const secret: string = process.env.jwtSecret;
  const token = req.headers.authorization;
  if (!token) {
    console.error("no token");
    throw new Error("no token");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("invalid token");
        throw new Error("invalid token");
      } else {
        let admin_name = decoded.adminName;
        const adminRepo = getConnection().getRepository(Admin);

        adminRepo.findOne({ where: { admin_name: admin_name } }).then(admin => {
          if (!admin) {
            console.error("invalid token");
            throw new Error("invalid token");
          } else {
            //after token validation
            const sugguestionRepo = getConnection().getRepository(Sugguestion);
            const body = req.body;
            const sugguTextArr = body.sugguestionText.split('\n');

            try {
              for (let i = 0; i < sugguTextArr.length; i++) {
                const newSugguestion = new Sugguestion();
                newSugguestion.sugguestion_type = body.type;
                newSugguestion.sugguestion_text = sugguTextArr[i];
                sugguestionRepo.save(newSugguestion).then(result => {
                  // console.log(i+1);
                  // console.log("result : ");
                  // console.log(result);
                });
              }

            } catch (e) {
              throw new Error(e);
            }
          }
        })
      }
    });
    return true;
  }
}

export const createSuggestion = (req: Request) => {
  const secret: string = process.env.jwtSecret;
  const token = req.headers.authorization;
  if (!token) {
    console.error("no token");
    throw new Error("no token");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("invalid token");
        throw new Error("invalid token");
      } else {
        let admin_name = decoded.adminName;
        const adminRepo = getConnection().getRepository(Admin);

        adminRepo.findOne({ where: { admin_name: admin_name } }).then(admin => {
          if (!admin) {
            console.error("invalid token");
            throw new Error("invalid token");
          } else {
            //after token validation
            const sugguestionRepo = getConnection().getRepository(Sugguestion);
            const body = req.body;
            const newSugguestion = new Sugguestion();
            newSugguestion.sugguestion_type = body.type;
            newSugguestion.sugguestion_text = body.sugguestionText;
            try {
              sugguestionRepo.save(newSugguestion).then(result => {
                console.log("result : ");
                console.log(result);
              });
            } catch (e) {
              throw new Error(e);
            }
          }
        })
      }
    });
    return true;
  }
}

export const updateSugguestion = (req: Request) => {
  const secret: string = process.env.jwtSecret;
  const token = req.headers.authorization;
  if (!token) {
    console.error("no token");
    throw new Error("no token");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("invalid token");
        throw new Error("invalid token");
      } else {
        let admin_name = decoded.adminName;
        const adminRepo = getConnection().getRepository(Admin);

        adminRepo.findOne({ where: { admin_name: admin_name } }).then(async admin => {
          if (!admin) {
            console.error("invalid token");
            throw new Error("invalid token");
          } else {
            //after token validation
            const sugguestionRepo = getConnection().getRepository(Sugguestion);
            const body = req.body;
            const targetSugguestion = await sugguestionRepo.findOne({ where: { id: body.id } });
            if (!targetSugguestion) {
              console.error("no sugguestion with id :" + body.id);
              throw new Error("no sugguestion with id :" + body.id);
            }
            targetSugguestion.sugguestion_type = body.type;
            targetSugguestion.sugguestion_text = body.sugguestionText;
            try {
              sugguestionRepo.save(targetSugguestion).then(result => {
                console.log("result : ");
                console.log(result);
              });
            } catch (e) {
              throw new Error(e);
            }
          }
        })
      }
    });
    return true;
  }
}

export const getSugguestionList = async (req: Request) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page.toString());
  const limitNumber = parseInt(limit.toString());

  const offset = (pageNumber - 1) * limitNumber;

  const sugguestionRepo = getConnection().getRepository(Sugguestion);
  const result = await sugguestionRepo.find({ skip: offset, take: limitNumber, order: { count_likes: "DESC" } });
  return result;
}

export const getUserSugguestionList = async (req: Request) => {
  const { page, limit } = req.query;

  const pageNumber = parseInt(page.toString());
  const limitNumber = parseInt(limit.toString());

  const offset = (pageNumber - 1) * limitNumber;

  const sugguestionRepo = getConnection().getRepository(UserSugguestion);
  const result = await sugguestionRepo.find({ skip: offset, take: limitNumber });
  return result;
}

export const deleteSugguestion = (req: Request) => {
  const secret: string = process.env.jwtSecret;
  const token = req.headers.authorization;
  if (!token) {
    console.error("no token");
    throw new Error("no token");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("invalid token");
        throw new Error("invalid token");
      } else {
        let admin_name = decoded.adminName;
        const adminRepo = getConnection().getRepository(Admin);

        adminRepo.findOne({ where: { admin_name: admin_name } }).then(async admin => {
          if (!admin) {
            console.error("invalid token");
            throw new Error("invalid token");
          } else {
            //after token validation
            const sugguestionRepo = getConnection().getRepository(Sugguestion);
            const body = req.body;
            console.log(`delete target : ${body.id}`);
            const deleteResult: DeleteResult = await sugguestionRepo.delete(body.id);
            if (deleteResult.affected === null) {
              console.error("no sugguestion with id :" + body.id);
              throw new Error("no sugguestion with id :" + body.id);
            } else {
              console.log(deleteResult);
              return true;
            }
          }
        })
      }
    });
    return true;
  }
}