// Script to convert SQLite dev.db to WAL mode for Turso upload
const { createClient } = require("@libsql/client");

async function convertToWAL() {
  console.log("Converting dev.db to WAL mode...");
  const client = createClient({
    url: "file:./prisma/dev.db",
  });

  try {
    const result = await client.execute("PRAGMA journal_mode=WAL");
    console.log("✅ Success! journal_mode =", result.rows[0]);
    console.log("Now you can upload prisma/dev.db to Turso!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    client.close();
  }
}

convertToWAL();
