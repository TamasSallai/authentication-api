import { Request, Response, NextFunction } from 'express'

const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user

  if (!user) {
    res.status(401).send({ error: 'Unauthorized' })
  } else {
    next()
  }
}

export default requireUser
