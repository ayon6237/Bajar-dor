
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL পাওয়া যায়নি। .env.local চেক করো।");
}

const globalForMongo = globalThis;

const client =
  globalForMongo.mongoClient ??
  new MongoClient(mongoUrl);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = client;
}

const db = client.db("Bajar-Dor");

const trustedOrigins = [
  "http://localhost:3000",
  "https://bajar-dor-jade.vercel.app"
].filter(Boolean);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
  },

  account: {
  accountLinking: {
    enabled: true,
    trustedProviders: ["github", "google"],
    disableImplicitLinking: false,
    requireLocalEmailVerified: false,
  },
},

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});
