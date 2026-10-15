// pm2 process for the production site. Lives at ~/apps/sanchblackcar/ecosystem.config.cjs on the server.
// Runtime secrets (RESEND_API_KEY, BOOKING_WEBHOOK_*, ...) are read from shared/.env.
const path = require("path");

const root = __dirname;

module.exports = {
  apps: [
    {
      name: "sanchblackcar",
      cwd: path.join(root, "current"),
      script: "server.js",
      node_args: `--env-file-if-exists=${path.join(root, "shared/.env")}`,
      env: {
        NODE_ENV: "production",
        PORT: "3030",
        HOSTNAME: "127.0.0.1",
      },
      max_memory_restart: "300M",
      time: true,
    },
  ],
};
