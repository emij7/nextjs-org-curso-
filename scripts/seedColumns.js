const { db } = require("@vercel/postgres");
const bcrypt = require("bcrypt");

async function updateTable(client) {
  try {
    // await client.sql`
    // ALTER TABLE users
    // ADD COLUMN IF NOT EXISTS facesAmount INTEGER;
    // `;
    // Add "dateJoined" column if it doesn't exist
    await client.sql`
    ALTER TABLE users
    ADD COLUMN IF NOT EXISTS dateJoined TIMESTAMP;
    `;

    console.log(`Updated "users" table`);

    return {
      updateTable,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  await updateTable(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    "An error occurred while attempting to seed the database:",
    err
  );
});
