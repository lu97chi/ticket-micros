import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";
console.clear();

const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Sub conected");

  stan.on("close", () => {
    console.log("out");
    process.exit();
  });

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName("orders-service");
  const subs = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subs.on("message", (msg: Message) => {
    const data = msg.getData();
    if (typeof data === "string") {
      console.log(
        `Recievend event #${msg.getSequence()}, with data ${JSON.parse(data)}`
      );
    }
    msg.ack();
  });
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
