import { Response, Request, NextFunction } from "express";

export = new (class {
  info = async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    console.log(req.user);

    res.send(req.user);
  };
})();
