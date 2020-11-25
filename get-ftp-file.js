let Client = require("ssh2-sftp-client");
const path = require("path");

module.exports = async function(req, res) {
  let sftp = new Client();
  let localPath = path.join(__dirname, process.env.TEMP_FILENAME);

  try {
    await sftp.connect({
      host: process.env.FTP_HOST,
      port: process.env.FTP_PORT,
      username: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      algorithms: {
        serverHostKey: ["ssh-rsa", "ssh-dss"]
      }
    });
    const list = await sftp.list(process.env.FTP_FOLDER);
    const sortedList = sortListByDate(list);
    if(sortedList.length < 1){
      res.sendStatus(404);
      return;
    }
    const remotePath = process.env.FTP_FOLDER + sortedList[0].name;
    await sftp.get(remotePath, localPath);
    res.sendFile(localPath);
  } catch (error) {
    console.log(error, "catch error");
  }
};


const sortListByDate = function(arr) {
  return arr.sort((a, b) => b.modifyTime - a.modifyTime);
};