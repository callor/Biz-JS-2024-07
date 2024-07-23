import { createServer } from "node:http";

const server = createServer();
server.on("request", (req, res) => {
  const { method, url } = req;
  if (method === "GET") {
    switch (url) {
      case "/": {
        res.writeHead(200, { "Content-Type": "text/html" });
        return res.end("<h1>Hello Korea</h1");
      }
      case "/about": {
        res.writeHead(200, {
          "Content-Type": "text/html;charset=UTF-8",
        });
        return res.end("<h1>나는 누구일까</h1>");
      }
      case "/contact": {
        res.writeHead(200, {
          "Content-Type": "text/html;charset=UTF-8",
        });
        return res.end("<h1>만나서 반가워</h1>");
      }
    }
  }
});

server.listen(3000, "localhost", () => {
  console.log("Listen on http://localhost:3000");
});
