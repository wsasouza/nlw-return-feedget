import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
// import nodemailer from 'nodemailer';

export const routes = express.Router();

// const transport = nodemailer.createTransport({
//   host: 'smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: 'adc3ffcd0b6ec5',
//     pass: '533ad643bba4f6',
//   },
// });

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  const feedback = await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  console.log(feedback);

  // await transport.sendMail({
  //   from: 'Equipe Feedget <oi@feedget.com>',
  //   to: 'Walter Souza <wsasouza@hotmail.com>',
  //   subject: 'Novo Feedback',
  //   html: [
  //     `<div style="font-family: sans-serif; font-size: 16px; color: #222;">`,
  //     `<p>Tipo do feedback: ${type}</p>`,
  //     `<p>Comentário: ${comment}</p>`,
  //     `</div>`,
  //   ].join('\n'),
  // });

  return res.status(201).json({ data: feedback });
});
