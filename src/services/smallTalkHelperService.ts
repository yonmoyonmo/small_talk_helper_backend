import { Sugguestion } from "../entity/Sugguestion";
import { getConnection } from "typeorm";
/**
 * to do list
 * random sugguestion
 * like and dislike api
 * top 10 liked sugguestion list
 * user's sugguestion api
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

