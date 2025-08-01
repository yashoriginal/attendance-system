const fp = require("fastify-plugin");
const multer = require("fastify-multer");
const Attendance = require("../models/Attendance");

module.exports = fp(async (fastify) => {
  fastify.register(multer.contentParser);

  fastify.get("/api/health", async () => {
    return { status: "ok" };
  });

  fastify.post(
    "/mark",
    { preHandler: multer({ storage: multer.memoryStorage() }).single("image") },
    async (req, reply) => {
      const { name, email } = req.body;
      if (!name || !email || !req.file) {
        return reply.code(400).send({ error: "Missing fields" });
      }
      const image = req.file.buffer.toString("base64");
      // Logic for ENTRY/EXIT type and saving omitted for brevity
      return reply.send({ success: true, type: "ENTRY" });
    }
  );
});
