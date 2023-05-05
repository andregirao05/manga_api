import dotenv from "dotenv";
dotenv.config();

export function getEnv(name: string, alternativeValue: string): string {
  return process.env[name] || alternativeValue;
}
