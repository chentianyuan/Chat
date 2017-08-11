<script>
	//网页加载socket.io-client，暴露一个io全局对象
	//io默认连接这个页面的host服务器
	var socket = io();
	var name = '';
	var personalName = '';
	$("form").submit(function(){
		//触发socket的聊天事件，并传入input中的数据
		socket.emit('chat message',personalName+':  '+ $('#m').val());
		$('#m').val('');
		return false;
	});
	//客户端收到来自后端发送的聊天事件，将信息体现在页面中
	socket.on('chat message',function(msg){
		if(msg.indexOf(personalName) == 0){
			$('#messages').append($('<li style="text-align:right;width:100%;">').text(msg));
		}else{
			$('#messages').append($('<li>').text(msg));
		}
	});
	socket.on('someoneEnter',function(msg){
			$('#messages').append($('<li style="text-align:center;width:20%;height:30px;margin:5px auto;background:#EEEEEE;border-radius:10px;">').text('欢迎'+msg));
	});
	socket.on('hide',function(){
					$(".model").hide('slow');
					$(".cover").hide('slow');
	});
	socket.on('repeat',function(){
			alert('重复了哥');
	});
	socket.on('someoneLeave',function(msg){
			$('#messages').append($('<li style="text-align:center;width:20%;height:30px;margin:5px auto;background:#EEEEEE;border-radius:10px;">').text(msg+'离开了聊天室'));
	});
	$(function(){
			//emit触发自定义事件。没有回调函数，因为这个自定义事件也是在某种操作下发生的，相应操作也写在这个操作下就好了
			//socket.emit('login');
			$(".model").show('slow');
			$(".confirm").on('click',function(){
				name = $('.model input').val();
				if(name.trim() == ''){
					alert('昵称不能为空');
				}else{
					socket.emit('someoneEnter',name);
					personalName = name;
				}
			});

	window.onbeforeunload = function (e) {
	 		//点击关闭按钮直接触发离开页面事件，非socket自带disconnect事件，自设
	 		socket.emit('leave',name);
	};
	
	});
</script>	