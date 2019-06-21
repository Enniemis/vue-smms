var express = require('express');
var router = express.Router();

// 设置响应头
router.all('*',(req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*')
	next()
})
// 引入数据库连接模块
const connection = require('./js/conn')
// 引入jwt
const jwt = require('jsonwebtoken');
// 定义密钥
const secret = 'smms';
// 检查账号和密码是否正确
router.post('/checklogin', (req, res) => {
	// 接收参数
	let {user, pass} = req.body;

	// 准备sql
	const sqlStr = `select * from accounts where account='${user}' and password='${pass}'`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.length) { // 成功
			let dataStr = JSON.stringify(data[0]);
			let accountInfor = JSON.parse(dataStr);
			// 3. 生成token
			const token = jwt.sign(Object.assign({},  data[0]), secret, {
			    expiresIn:  60 * 60 * 2 // 过期时间
			})

			res.send({ code: 0, reason: '欢迎你，登录成功!', token,"user":user})
		} else {
			res.send({code: 1, reason: '请检查用户名或密码!'})
		}
	})
	
	
	
})


module.exports = router;
