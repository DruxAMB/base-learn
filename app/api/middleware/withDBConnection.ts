import connectDB from "../utils/db";

export const withDBConnection = (handler: any) => async (req: any, res: any) => {
  await connectDB();
  return handler(req, res);
};
