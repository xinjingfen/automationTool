//kernel
var simba = module.exports = require('simba-kernel');

//default config
simba.config.set({
	welcomePage: 'index.html',
	templateOpenTag: '<{',
	templateCloseTag: '}>',
	md5Length: 7,  // the length of timestamp
	cssCompatibility: 'ie7' // css minify compatibility
});

//exports cli object
simba.cli = {};

simba.cli.name = 'simba';

//commander object
simba.cli.commander = null;

//package.json
simba.cli.info = simba.util.readJSON(__dirname + '/package.json');

//output version info
simba.cli.version = function () {
	var content = [
		'v' + simba.cli.info.version
	];
	simba.log.out(content.join('\n'));
};

//colors
simba.cli.colors = require('simba-kernel/node_modules/colors');

//output help info
simba.cli.help = function () {
	var content = [
		'',
		'  Usage: ' + simba.cli.name + ' <command>',
		'',
		'  Commands:',
		''
	];

	simba.cli.help.commands.forEach(function (name) {
		var cmd = simba.require('command', name);
		name = cmd.name || name;
		name = simba.util.pad(name, 12);
		content.push('    ' + name + (cmd.desc || ''));
	});

	content = content.concat([
		'',
		'  Options:',
		'',
		'    -h, --help     打印帮助信息',
		'    -v, --version  打印版本号',
		''
	]);
	console.log(content.join('\n'));
};

var commandsList = [ 'init', 'install', 'server', 'build', 'release' ];
simba.cli.help.commands = commandsList;

simba.cli.run = function (argv) {
	var first = argv[2];
	if (argv.length <= 2) {
		simba.cli.help();
	} else if (argv.length < 3 || first === '-h' || first === '--help') {
		simba.cli.help();
	} else if (first === '-v' || first === '--version') {
		simba.cli.version();
	} else if (first[0] === '-') {
		simba.cli.help();
	} else if (simba.util.inArray(commandsList, first)) {
		//register command
		var commander = simba.cli.commander = require('simba-kernel/node_modules/commander');
		var cmd = simba.require('command', argv[2]);
		cmd.register(
			commander
				.command(cmd.name || first)
				.usage(cmd.usage)
				.description(cmd.desc)
		);
		commander.parse(argv);
	} else {
		simba.cli.help();
	}
};