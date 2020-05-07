import request from "supertest";
import { app } from "../../app";
import { signIn } from "../../test/setup";

const createTicket = () =>
  request(app).post("/api/tickets").set("Cookie", signIn()).send({
    title: "Some title",
    price: 20,
  });

it("sends back all the tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send();
  expect(200);

  expect(response.body.length).toEqual(3);
});
