import supertest from "supertest";
import { APP } from "../app";

export const Supertest = supertest(APP);
