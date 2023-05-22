//index.js
const express = require("express"); //③번 단계에서 다운받았던 express 모듈을 가져온다.
const cors = require("cors");
const { callChatGPT } = require("./chatgpt");

const app = express(); //가져온 express 모듈의 function을 이용해서 새로운 express 앱을 만든다. 🔥
const port = 5000; //포트는 4000번 해도되고, 5000번 해도 된다. -> 이번엔 5000번 포트를 백 서버로 두겠다.

app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get("/ask", async function (req, res) {
  res.render("askgpt", {
    pass: true,
  });
});

app.post("/ask", async (req, res) => {
  console.log("hi");
  const prompt = req.body.prompt;
  const response = await callChatGPT(prompt);

  if (response) {
    res.json({ response: response });
  } else {
    res.status(500).json({ error: "Failed to get response from ChatGPT API" });
  }
});

app.get("/", (req, res) => {
  console.log("hello");
  //express 앱(app)을 넣고, root directory에 오면,
  res.send("Hello World!"); //"Hello World!" 를 출력되게 해준다.
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
}); //포트 5000번에서 이 앱을 실행한다.
