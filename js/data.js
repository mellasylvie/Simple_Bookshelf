const STORAGE_KEY = "BOOKSHELF_APPS";

let Harus_baca = [];

function isStorageExist() {
	if (typeof(Storage) === undefined) {
		alert("Browser Anda tidak mendukung Local Storage");
		return false
	}
	return true;
}

function saveData() {
	const parsed = JSON.stringify(Harus_baca);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);

	let data = JSON.parse(serializedData);

	if(data !== null)
		Harus_baca = data;

	document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
	if(isStorageExist())
		saveData();
}

function composeReadObject(title, author, year, isCompleted) {
	return {
		id: +new Date(),
		title,
		author,
		year,
		isCompleted
	};
}

function findMustRead(toReadId) {
	for(read of Harus_baca) {
		if(read.id === toReadId)
			return read;
	}
	return null;	
}

function findReadIndex(toReadId) {
	let index = 0
	for (read of Harus_baca) {
		if(read.id === toReadId)
			return index;

		index++;
	}

	return -1;
}
