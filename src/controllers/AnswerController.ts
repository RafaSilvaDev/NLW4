import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppErrors } from "../errors/AppErrors";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

class AnswerController {
  /**
     * 
    Route Params => Parametros que compõe a rota / 
    routes.get("/answers/value")

    Query Params => Busca, Paginação, não obrigatórios
    ?
    chave=valor
     */

  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppErrors("Survey user doesn't exist!")
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
