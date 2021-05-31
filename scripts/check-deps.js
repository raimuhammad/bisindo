const maildeps = ["MAIL_HOST", "MAIL_PORT", "MAIL_USERNAME", "MAIL_PASSWORD"];
const { setEnv } = require("./env");
const voca = require("voca");

const openQuestion = async (q, cb) => {
  const prompts = require("prompts");
  const response = await prompts({
    type: "text",
    name: "response",
    message: q,
  });
  cb(`"${response.response}"`);
};

const accountDeps = async () => {
  const deps = ["DEV_EMAIL", "STUDENT_EMAIL"];
  const label = (v) => voca(v).replaceAll("_", " ").lowerCase().value();
  for (const index in deps) {
    const variable = deps[index];
    if (!process.env[variable]) {
      await openQuestion(label(variable), (value) => {
        setEnv(variable, value);
      });
    }
  }
};

const checkEmailDeps = async () => {
  require("dotenv").config();
  const emailHost = process.env.MAIL_HOST;
  const isMailTrap = emailHost === "smtp.mailtrap.io";
  if (!isMailTrap) {
    await setEnv("MAIL_HOST", `"smtp.mailtrap.io"`);
    await setEnv("MAIL_PORT", `"2525"`);
    await openQuestion("Mailtrap username :", (username) => {
      setEnv("MAIL_USERNAME", username);
    }).then(() => {
      return openQuestion("Mailtrap password :", (password) => {
        setEnv("MAIL_PASSWORD", password);
      });
    });
  }
};

module.exports = {
  run : ()=> checkEmailDeps().then(accountDeps)
}

