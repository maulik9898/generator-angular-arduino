Router <%= name %>Router("<%= route %>");

void <%= classedName %>Router(WebApp &app) {
  <%= name %>Router.post("/", &create<%= classedName %>);
  <%= name %>Router.get("/:id", &read<%= classedName %>);
  <%= name %>Router.put("/:id", &update<%= classedName %>);
  <%= name %>Router.del("/:id", &delete<%= classedName %>);
  <%= name %>Router.get("/", &read<%= classedName %>s);

  app.use(&<%= name %>Router);
}
