import request from "supertest";
import { app } from "../../app";

const url = "/api/users/signin";
const signup = "/api/users/signup";

it("fails when email doesnt exists", async () => {
  await request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(400);
});

it("fails when email is wrong", async () => {
  await request(app)
    .post(signup)
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);

  await request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "1233456",
    })
    .expect(400);
});

it("respons with a cookie", async () => {
  await request(app)
    .post(signup)
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(201);

  const response = await request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "123456",
    })
    .expect(200);

  expect(response.get("Set-Cookie")).toBeDefined();
});
