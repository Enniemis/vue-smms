var express = require('express');
var router = express.Router();


// 统一设置响应头解决跨域
router.all('*',(req,res,next)=>{
	res.header('Access-Control-Allow-Origin','*')
	next()
})
// 引入数据库链接模块
const connection = require('./js/conn.js')
// router.get('/',(req,res)=>{
// 	res.send('ok')
// })

router.post('/goodsadd',(req,res)=>{
	// 接收响应参数
	let {classify,barCode,goodsName,goodsSell,marketPrice,goodsPrice,storage,goodsWeight,goodsUnit,vipDiscount,promotion,goodsDesc}=req.body;
	// 准备sql
	const sqlStr = `insert into goods(classify,barCode,goodsName,goodsSell,marketPrice,goodsPrice,storage,goodsWeight,goodsUnit,vipDiscount,promotion,goodsDesc) values(?,?,?,?,?,?,?,?,?,?,?,?)` 
	// 参数
	 const sqlParams = [classify,barCode,goodsName,goodsSell,marketPrice,goodsPrice,storage,goodsWeight,goodsUnit,vipDiscount,promotion,goodsDesc]
	 // 执行sql
	connection.query(sqlStr, sqlParams, (err, data) => {
	 	if (err) throw err;
	 	// 判断
	 	if (data.affectedRows > 0) {
	 		res.send({code: 0, reason: '添加商品成功'}) // 响应成功的数据给前端
	 	} else {
	 		res.send({code: 1, reason: '添加商品失败'}) // 响应失败的数据给前端
	 	}
	 })
	
	
})


/* 商品列表 */ 
router.get('/goodslistbypage', (req, res) => {
// 接收参数
	let {pageSize, currentPage} = req.query;

	// 定义变量 保存数据总条数据
	let total;

	// 准备sql
	let sqlStr = `select * from goods order by ctime desc`;
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
// 删除
router.get('/goodsdel',(req,res)=>{
	// 接收id
	let{id}=req.query;
	// 准备sql
	const sqlStr = `delete from goods where id=${id}`;
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
// 批量删除
router.get('/deleteChooseItem', (req, res) => {
	// 接收id们
	let { idArr } = req.query; 
	
	// 准备sql
	const sqlStr = `delete from goods where id in (${idArr})`;
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


module.exports = router;