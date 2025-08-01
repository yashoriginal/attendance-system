const fastify = require("fastify")({ logger: true });
const fastifyCors = require("@fastify/cors");
const mongoose = require("mongoose");
const redis = require("redis");
const attendanceRoutes = require("./routes/attendance");

fastify.register(fastifyCors, { origin: true });

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => fastify.log.info("MongoDB connected"));

const redisClient = redis.createClient({ url: process.env.REDIS_URI });
redisClient.connect().then(() => fastify.log.info("Redis connected"));
fastify.decorate("redis", redisClient);

fastify.register(attendanceRoutes, { prefix: "/api/attendance" });

fastify.listen({ port: 4000, host: "0.0.0.0" });
