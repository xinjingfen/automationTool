# simbajs

## 项目介绍

simbajs 是一套前端自动化工具集合，目的是为了解决前端开发过程中的一系列问题，如：脚手架、自动刷新、预编译、调试、打包、数据模拟等。simba ['sɪmbɑ:] 是狮子王辛巴的英文名，寓意为百兽之王，同时也与我司吉祥物相符。


## 安装
	
simba 依赖于 Node.js 环境，需要使用 git 客户端检出代码。
由于目前 simba 还是内部项目没有开源，不适合发布至 npm ，目前只能在内网通过以下方式安装：

	cd /temp # 进入某临时目录
	git clone https://fed.cnsuning.com/simbajs/simba.git  # 使用 git 客户端 clone 代码
	cd simba  # 进入代码目录
	npm install  # 安装依赖
	npm link  # 链接至全局
	
OK，此时就可以在任意目录使用 simba 了。

## config.json 配置

	{
	  "build": {    //对应simba build命令
	    "uglify": {  //对应文件压缩
			mangle: true,  			//默认=true 是否修改变量名
			compress: true, 		//默认=true 是否完全压缩
	    	"files":{ 				//默认={}	是否选定目录
	    		"src":["config/*.js","js/*.js"],//默认="./**/*.js"匹配项目全部js文件  ["config/*.js","js/*.js"]对应目录
    			"dest":"min"		//"min":压缩在匹配文件同级目录的min文件夹 "":压缩在匹配文件同级目录下 若没有配置则压缩在项目根本目录  
	    	}						//当config.json里files有配置项时，项目没有经过simba初始化，
	    },
	    "test": 1
	  }
	}
	

## simba 命令

### simba -v 
查看版本号，比如 0.1.0 的会输出

> v0.1.0

### simba [command] -h
输出帮助文档，如：

	simba -h    
	Usage: simba <command>
	
	Commands:
	
		init        快速初始化项目    
		install     安装组件或模块    
		server      启动本地web服务及集成开发环境    
		build       构建本地项目    
		release     发布项目    
	
	Options:
	
	-h, --help     打印帮助信息    
	-v, --version  打印版本号

如果有 command 参数，则输出具体命令的帮助，如：

	simba init -h 
	Usage: init [options]
	
	快速初始化项目
	
	Options:
	
	  -h, --help  output usage information


### simba init 
使用模板快速初始化项目，该命令使用交互式命令行。

	simba init
	? Project name (demo) #输入项目名
	? Has branches [yes/no]? (y/n) #是否包含分支，y:自动生成1.0分支，n:不包含，默认值y
	? Template # 读取simba/lib/templates/下初始化模板，可安装default自行创建模板，在命令行中选择
	> default
	> default
	#成功

### simba server 
启动本地web服务，支持修改代码浏览器自动刷新，支持less、stylus语法，支持多项目多端口监听，目录directlist。此功能需进入某项目具体的版本文件夹，如：

	cd project/1.0
	simba server

此时修改 src 目录下的文件，simba 会监控文件变化，自动构建至 dist 目录并刷新浏览器。自动刷新功能无需安装插件，目前支持 chrome / Firefox。

支持SSI(Server Side Includes)

	<!--#include virtual="" -->
	<!--#include file="" -->
	<!--#set var="" value="" -->
	<!--#echo var="" -->
	
	<!--#if expr="" -->
	<!--#elif expr="" -->
	<!--#else -->
	<!--#endif -->

### simba build 
该命令在项目开发完成后最终完全构建时使用，此步骤会进行 html / css / js 语法校验、组件打包、添加时间戳及资源定位等动作。
语法校验将在report文件夹生成js校验报告，在控制台打印css错误报告。
simba init后的项目可直接build
老项目可在根目录创建config.json文件，simba会读取config配置进行build。

### simba release 
该命令在检查确认项目构建结果符合要求后使用，可以推送文件至预览服务器。