import request from "supertest";
import { app } from "../../app";
import { signIn } from "../../test/setup";
import { Ticket } from "../../models/tickets";

it("route handler to /api/tickets for post", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be if the user is loged in", async () => {
  await request(app).post("/api/tickets").send({}).expect(401);
});

it("if is loged in return success", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signIn())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("error when invalid title is provided", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signIn())
    .send({
      title: "",
      price: 10,
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signIn())
    .send({
      price: 12,
    })
    .expect(400);
});

it("error when invalid price is provied", async () => {
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signIn())
    .send({
      title: "Valid title",
    })
    .expect(400);
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signIn())
    .send({
      title: "Valid title",
      price: -10,
    })
    .expect(400);
});

it("creates a ticket with valid params", async () => {
  let tickets = await Ticket.find({});
  expect(tickets.length).toEqual(0);
  const title = "Valid title";
  const price = 25;
  await request(app)
    .post("/api/tickets")
    .set("Cookie", signIn())
    .send({
      title,
      price,
    })
    .expect(201);

  tickets = await Ticket.find({});
  expect(tickets.length).toEqual(1);
  expect(tickets[0].title).toEqual(title);
  expect(tickets[0].price).toEqual(price);
});
