const jsonServer = require('json-server');
const queryString = require('query-string');
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now();
    req.body.updateAt = Date.now();
  }else if(req.method === 'PATCH'){
    req.body.updateAt = Date.now();
  }
  // Continue to JSON Server router
  next()
})
router.render = (req, res) =>{
  const headers = res.getHeaders();
  const totalCount = headers['x-total-count'];
  if(req.method === "GET" && totalCount){
    const queryUrl = req._parsedOriginalUrl.query;
    const parsed = queryString.parse(queryUrl);
    return res.jsonp({
      data: res.locals.data,
      _page: Number.parseInt(parsed._page) || 1,
      _limit: Number.parseInt(parsed._limit) || 10,
      _totalCount: Number.parseInt(totalCount)
    });
  }
  return res.jsonp(res.locals.data);
}
// Use default router
server.use("/api", router);
server.listen(3000, () => {
  console.log('JSON Server is running')
})