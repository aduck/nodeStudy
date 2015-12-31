/** 模块加载 **/
var fs=require('fs'),
	out=process.stdout;

/** main **/
var download=function(url,fname){
	var readStream=fs.createReadStream(url);
	var writeStream=fs.createWriteStream(fname);
	var stat=fs.statSync(url);

	// 控制台显示参数
	var lastSize=0,				//上次传输大小
		loadedSize=0,			//已传输大小
		percent,				//传输百分比
		loadTime=0,				//传输时间
		loadSpead,				//传输速度
		totalSize=stat.size,	//总大小
		startTime=Date.now(),	//开始时间
		endTime;				//结束时间

	// eventEmitter
	readStream.on('data',function(chunk){
		loadedSize+=chunk.length;
		if(writeStream.write(chunk)===false){
			readStream.pause();
		}
	});
	writeStream.on('drain',function(){
		readStream.resume();
	});
	readStream.on('end',function(){
		writeStream.end();
	});

	// 监控参数
	setTimeout(function show(){
		percent=Math.ceil(loadedSize/totalSize*100);	
		loadSpead=Math.ceil((loadedSize-lastSize)/1000000)*2;	//500ms刷新一次
		lastSize=loadedSize;
		out.clearLine();
    	out.cursorTo(0);
    	out.write('已完成'+loadedSize/1000000+'MB，'+percent+'%，速度：'+loadSpead+'MB/s \n');
		if(loadedSize<totalSize){
			setTimeout(show,500);
		}else{
			endTime=Date.now();
			console.log('共用时：'+(endTime-startTime)/1000+'s');
		}
	},500);
}
exports.download=download;