const SftpUploader = require('simple-sftp-uploader')
const fs = require('fs')

module.exports = {
  chainWebpack(config) {
    // 添加插件
    config
      .plugin('SftpUploaderPlugin')
      .use(SftpUploader)
      .tap(() => [
        {
          localDir: 'dist',
          remoteDir: '/www/wwwroot/bsr-admin.imba97.cn',
          connect: {
            host: '111.67.207.249',
            port: 22,
            username: 'root',
            privateKey: fs.readFileSync('C:/Users/imba97/.ssh/id_rsa')
          }
        }
      ])
  }
}
