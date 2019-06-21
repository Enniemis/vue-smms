var express = require('express');
var router = express.Router();


// 统一设置响应头解决跨域
router.all('*',(req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*')
	next()
})
// 引入数据库链接模块
const connection = require('./js/conn')
// router.get('/',(req,res)=>{
// 	res.send('ok')
// })


// 添加账号
router.post('/accountadd',(req,res)=>{
	//接收参数
	let {user,pass,userGurp} = req.body;
	
	// 准备sql
	const sqlStr = `insert into accounts(account, password, userGroup) values('${user}', '${pass}', '${userGurp}')`;
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err)throw err;
		console.log(data)
		if(data.affectedRows>0){
			res.send({code:0,reason:'添加账号成功'})
		}else{
			res.send({code:1,reason:'添加账号失败'})
		}
	})
	// res.send("1")
})
// 账号列表
router.get('/accountlist',(req,res)=>{
	// 准备sql
	const sqlStr = `select * from accounts order by ctime desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({ data }) // 响应数据给前端
	})
})
// 删除
router.get('/accountdel',(req,res)=>{
	// 接收id
	let{id}=req.query;
	// 准备sql
	const sqlStr = `delete from accounts where id=${id}`;
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err)throw err;
		// 判断
		if(data.affectedRows>0){
			res.send({code:0,reason:"删除成功"})
		}else{
			res.send({code:1,reason:"删除失败"})
		}
	})
	
})

/* 编辑数据回填 */ 
router.get('/accountedit', (req, res) => {
	// 接收id
	let {id} =req.query; 
	// 准备sql
	const sqlStr = `select * from accounts where id=${id}`
	// 执行sql
	connection.query(sqlStr,(err,data)=>{
		if(err)throw err;
		// 响应数据发给前端
		res.send({data})
	})

})

/* 保存修改请求 */ 
router.post('/saveedit', (req, res) => {
	// 接收新数据 和 老id
	let {account, userGroup, id} = req.body;

	// 准备sql
	const sqlStr = `update accounts set account='${account}', userGroup='${userGroup}' where id=${id}`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		// 判断
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '修改成功'})
		} else {
			res.send({code: 1, reason: '修改失败'})
		}
	})
})

// 批量删除
router.get('/deleteChooseItem', (req, res) => {
	// 接收id们
	let { idArr } = req.query; 
	
	// 准备sql
	const sqlStr = `delete from accounts where id in (${idArr})`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		if (data.affectedRows > 0) {
			res.send({code: 0, reason: '批量删除成功'}) // 响应成功数据
		} else {
			res.send({code: 1, reason: '批量删除失败'}) // 响应失败数据
		}
	})
})

// 分页
router.get('/accountlistbypage', (req, res) => {
	// 接收参数
	let {pageSize, currentPage} = req.query;

	// 定义变量 保存数据总条数据
	let total;

	// 准备sql
	let sqlStr = `select * from accounts order by ctime desc`;
	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		total = data.length; // 获取数据总条数
	})

	// 构造sql 按照分页查询数据
	let n = (currentPage - 1) * pageSize; // 跳过多少条
	sqlStr += ` limit ${n}, ${pageSize}`; // 分页的sql

	// 执行sql
	connection.query(sqlStr, (err, data) => {
		if (err) throw err;
		res.send({total, data})  // 把中数据条数 和 当前页码对应的数据响应给前端
	})
})
// 修改密码
router.get('/passwordmodify',(req,res)=>{
	let{username,oldPass}=req.query;
	const sqlStr = `select * from accounts where account="${username}"and password="${oldPass}"`;
	
	connection.query(sqlStr,(err,data)=>{
		if(err)throw err;
		if(data.affectedRows > 0){
			res.send({code: 0, reason: '原密码正确'})
	} else {
		res.send({code: 1, reason: '原密码错误'})
	}
	})

})
router.post('/savepasswordmod',(req,res)=>{
	let {username,oldPass,pass} = req.body;
	
	const sqlStr = `update accounts set password="${pass}" where account="${username}" and password="${oldPass}"`;

	connection.query(sqlStr,(err,data)=>{
		if(err)throw err;
		if(data.affectedRows > 0){
			res.send({code: 0, reason: '修改成功'})
	} else {
		res.send({code: 1, reason: '修改失败'})
	}
	})
})
module.exports = router;
