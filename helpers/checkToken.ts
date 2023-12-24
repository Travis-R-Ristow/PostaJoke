import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  console.log('token', authHeader);
  if (!authHeader) {
    console.log('No token');
    return res.status(401).send('Not authorized');
  }

  try {
    req.body.user = jwt.verify(authHeader, 'testPSW');
  } catch (err) {
    console.log(err);
    return res.status(401).send('Error authorizing');
  }

  next();
};
