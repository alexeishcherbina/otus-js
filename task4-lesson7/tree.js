const fs = require('fs');
const path = require('path');

// В качестве пути для поиска берём либо аргумент из консоли, либо текущую папку
const initialPath = process.argv[2] || __dirname;

// outerFunction используем для замыкания
async function outerFunction(initialPath) {
	const res = {
		files: [],
		dirs: []
	};
	
	function pathFormatter(pathWin) { // Преобразуем путь из Windows-формата в POSIX
		return pathWin.split(path.sep).join(path.posix.sep)
	}
	
	// Начальная проверка
	const stat = await fs.promises.stat(initialPath);
	if (stat.isFile()) {
		res.files.push(pathFormatter(initialPath));
		console.log(res);
		return;
	} else if (stat.isDirectory()) {
		res.dirs.push(pathFormatter(initialPath));
	} else {
		throw 'What is it?!'
	}
	
	// innerFunction используем для рекурсивного обхода дочерних папок
	async function innerFunction(filePathInner) {
		const files = await fs.promises.readdir(filePathInner);
		if (files && files.length > 0) {
			for (const file of files) {
				const currFilePath = path.join(filePathInner, file);
				const stat = await fs.promises.stat(currFilePath);
				if (stat.isFile()) {
					res.files.push(pathFormatter(currFilePath));
				} else if (stat.isDirectory()) {
					res.dirs.push(pathFormatter(currFilePath));
					await innerFunction(currFilePath);
				} else {
					throw 'What is it?!'
				}
			}
		}
	};
	await innerFunction(initialPath);
	console.log(res);
}

outerFunction(initialPath);