import { Sugguestion } from "../entity/Sugguestion";
import { getConnection } from "typeorm";
import { Request } from "express";
import { UserSugguestion } from "../entity/UserSugguestion";

/**
 * to do list
 * random sugguestion (o)
 * like and dislike api (o)
 * top 10 liked sugguestion list (o)
 * user's sugguestion api (o)
 */

export const getRandomSugguestion = async () => {
  const sugguestionRepo = getConnection().getRepository(Sugguestion);
  try {
    const randomSugguestion = await sugguestionRepo.createQueryBuilder("sugguestion").orderBy("RAND()").getOne();
    return randomSugguestion;
  } catch (e) {
    throw new Error(e);
  }
}

export const applyLikes = async (req: Request) => {
  const { likeValue, sugguestionId } = req.body;
  const sugguestionRepo = getConnection().getRepository(Sugguestion);
  const target = await sugguestionRepo.findOne({ where: { id: sugguestionId } });
  if (target) {
    target.count_likes = target.count_likes + likeValue;
  } else {
    throw new Error("no target with this id : " + sugguestionId);
  }
  try {
    await sugguestionRepo.save(target);
    return true
  } catch (e) {
    throw new Error(e);
  }
}

export const getTopTenList = async () => {
  const sugguestionRepo = getConnection().getRepository(Sugguestion);
  try {
    const getTopTenList = await sugguestionRepo.createQueryBuilder("sugguestion").orderBy("sugguestion.count_likes", "DESC").limit(10).getMany();
    return getTopTenList;
  } catch (e) {
    throw new Error(e);
  }
}

export const createUserSugguestion = async (req: Request) => {
  const { userName, text } = req.body;
  const userSugguestionRepo = getConnection().getRepository(UserSugguestion);
  const newUserSugguestion = new UserSugguestion();
  newUserSugguestion.user_name = userName;
  newUserSugguestion.text = text;
  try {
    await userSugguestionRepo.save(newUserSugguestion);
    return true;
  } catch (e) {
    throw new Error(e);
  }
}