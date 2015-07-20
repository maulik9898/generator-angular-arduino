void readThings(Request &req, Response &res) {

  // P macro for printing strings from program memory
  P(things) =
  "["
  "  {\"name\":\"Multiple platforms\",\"info\":\"Compatible with the Arduino family of development boards.\"},"
  "  {\"name\":\"Development Tools\",\"info\":\"Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.\"},"
  "  {\"name\":\"Server and Client integration\",\"info\":\"Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.\"},"
  "  {\"name\":\"Smart Build System\",\"info\":\"Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html\"},"
  "  {\"name\":\"Modular Structure\",\"info\":\"Best practice client and server structures allow for more code reusability and maximum scalability\"},"
  "  {\"name\":\"Optimized Build\",\"info\":\"Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.\"}"
  "]";

  res.success();
  res.printP(things);
}