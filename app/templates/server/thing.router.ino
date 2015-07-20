Router thingRouter("/api/things");

void ThingRouter(WebApp &app) {
  thingRouter.get("/", &readThings);

  app.use(&thingRouter);
}
