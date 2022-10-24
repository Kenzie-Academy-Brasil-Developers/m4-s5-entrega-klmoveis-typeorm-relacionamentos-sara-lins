import "reflect-metadata";
import express from "express";
import "express-async-errors";
import routeUser from "./routes/user/user.route";
import routeLogin from "./routes/login/login.route";
import errorMiddleware from "./middleware/error.middleware";
import routeCategory from "./routes/category/category.route";
import routeProperty from "./routes/property/property.route";
import routeSchedule from "./routes/schedule/schedule.route";

const app = express();
app.use(express.json());
app.use("/users", routeUser);
app.use("/login", routeLogin);
app.use("/categories", routeCategory);
app.use("/properties", routeProperty);
app.use("/schedules", routeSchedule);
app.use(errorMiddleware);

export default app;
