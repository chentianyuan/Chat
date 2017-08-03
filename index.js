//app相当于一个http服务器
var app = require('express')();
//传入一个express实例，开启服务器
var http = require('http').Server(app);
//通过传递一个http服务器对象新建了一个socket.io对象
var io = require('socket.io')(http);

//express对象实例使用get方法发送一个标签
app.get("/",function(req,res){
	//res.send('<h1>Hello socket.io</h1>')
	res.sendfile('index.html');
});

io.on('connection',function(socket){
	//监听connection事件，当检测到服务器被连接时，socket响应]
	//对传进来的socket套接字处理
	//socket.emit只在本页面触发，而io.emit则对每个客户端进行广播
	socket.on('login',function(){
		//后端在此处只要检测登陆用户名的唯一性就可以了，其他的都可以交给前端来做
	});
	socket.on('disconnect',function(){
	});
	socket.on('chat message',function(msg){
		//前端触发了聊天事件，后端对传来的数据进行处理
		//io.emit给每个客户端发送事件
		//前端触发聊天事件，因为需要广播到所有的socket，广播的操作前端做不到，只能由后端来做，这里的io.emit就是广播方法的一种
		io.emit('chat message',msg);
	});
});

http.listen(3333,function(){
	console.log('服务器开启成功');
});
