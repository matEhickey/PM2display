console.warn(process.env.NODE_ENV);

export default {
  backUrl: process.env.NODE_ENV === "production" ? "" : "http://localhost:7000",
};
