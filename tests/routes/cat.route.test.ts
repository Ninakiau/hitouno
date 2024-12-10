import request from "supertest";
import { describe, expect, it, vi } from "vitest";
import app from "../../src/app";



vi.mock("../../src/models/user.model", () => {
  return {
    UserModel: {
      findAll: vi.fn(async () => []),
    },
  };
});


vi.mock("../../src/middlewares/jwt.middleware", () => {
    return {
      verifyToken: vi.fn((req, res, next) => {

        req.email = "mocked@example.com";
        req.uid = "mocked-uid";
        next();
      }),
    };
  });
  
  describe("/cats", () => {
    it("GET should return cats", async () => {
      const { statusCode, body } = await request(app).get("/api/v1/cats");
      console.log(body);
  
      expect(statusCode).toBe(200);
    });
  });
  