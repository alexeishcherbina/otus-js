const fs = require('fs');
const lineByLine = require("n-readlines");

const unorderedFileName = 'unordered.txt'; // Имя большого файла с НЕотсортироваными числами
const fileSize = 100; // Размер файла unorderedFileName в МБ
const outputFileName = 'ordered.txt'; //  Имя большого файла с отсортироваными числами
const numOfMinFiles = 15; // Оптимальное число, чтобы уложиться в 50 МБ
const orderedFileName = 'ordered_min'; // Начальная часть имени маленьких отсортированных файлов

/* Этап 1. Создания большого файла */
console.log('---------------------------------------');
console.log(`Этап 1. Создание файла ${unorderedFileName} размером 100 Мб. Длительная операция.`);
const writeFile = fs.openSync(unorderedFileName, 'w');
for (let i = 0; i < Math.ceil(1024 * 1024 * fileSize / '10000000\n'.length); i++) {
    fs.writeSync(writeFile, `${Math.floor(Math.random() * (100000000 - 10000000)) + 10000000}\n`);
}
fs.close(writeFile);
console.log(`Файл ${unorderedFileName} Создан.`);
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Этап 1 использовал приблизительно ${Math.round(used * 100) / 100} MB\n`);


/* Этап 2. Дробление файла  */
async function splitAndSortFiles() {
    console.log('---------------------------------------');
    console.log('Этап 2. Дробление файла.');
    const stat = await fs.promises.stat(unorderedFileName);
    const originalFileSize = stat.size; // Размер исходного большого файла

    const numOfLines = Math.floor(originalFileSize / numOfMinFiles / '10000000\n'.length);

    console.log(`Размер исходного файла ${unorderedFileName}=${(originalFileSize / 1024 /1024).toFixed(2)} Мб`);
    console.log(`Исходный файл делится на ${numOfMinFiles} частей. Каждая из которых сортируется.`);

    const reader = new lineByLine(unorderedFileName);
    
    let num = parseInt(reader.next().toString("ascii").trim());
    let nums = [];
    let fileNumber = 0;

    function sortAndCreateFile(fileNumber) {
        nums.sort((a,b) => a - b);
        const fileName = orderedFileName + '_' + fileNumber + '.txt';
        const writeFile = fs.openSync(fileName, 'w');
        fs.writeSync(writeFile, nums.join('\n'));
        fs.close(writeFile);
        console.log(`${fileName} успешно создан.`);
    }

    while (!isNaN(num)) {
        nums.push(num);
        if (nums.length === numOfLines 
            && fileNumber !== numOfMinFiles - 1) { // в последнем файле может быть больше записей,
                                                   // поэтому не останавливаемся в чтении
            sortAndCreateFile(fileNumber);
            fileNumber++;
            nums = [];
        }
        num = parseInt(reader.next().toString("ascii").trim());
    }

    sortAndCreateFile(fileNumber);

    console.log('Все файлы созданы и отсортированы');

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Этап 2 использовал приблизительно ${Math.round(used * 100) / 100} MB\n`);
}

/* Этап 3. Соединение файлов */
function join_files() {
    console.log('---------------------------------------');
    console.log(`Этап 3. Соединение файлов в один: ${outputFileName}. Длительная операция.`);
    const writeFile = fs.openSync(outputFileName, 'w');

    const files = [];
    for (let i = 0; i < numOfMinFiles; i++) {
        files.push(new lineByLine(`${orderedFileName}_${i}.txt`));
    }

    const nums = [];
    files.forEach(file => {
        nums.push(parseInt(file.next().toString("ascii").trim(), 10));
    });

    function checkNums(nums) {
        return nums.some(num => num !== Infinity);
    };

    let min;
    let minIndex;
    while (checkNums(nums)) {
        min = Math.min(...nums);
        minIndex = nums.indexOf(min);
        fs.writeSync(writeFile, `${min}\n`);
        nums[minIndex] = parseInt(files[minIndex].next().toString("ascii").trim(), 10);
        if (isNaN(nums[minIndex])) { // Значит уже конец файла
            console.log(`Конец файла ${orderedFileName}_${minIndex}.txt.`);
            nums[minIndex] = Infinity;
        }
    }
    fs.close(writeFile);

    console.log(`Файлы объеденены. Результат в файле ${outputFileName}.`);
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Этап 3 использовал приблизительно ${Math.round(used * 100) / 100} MB`);
}


splitAndSortFiles().then(() => {
    join_files();
});