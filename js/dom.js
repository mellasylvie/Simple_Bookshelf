const UNFINISHED_BOOK = "Harus_baca";
const FINISHED_BOOK = "selesai_dibaca";
const READ_ID = "ReadId";

function make_read(title, author, year, isCompleted) {

	const textTitle = document.createElement("h2");
	textTitle.innerText = title;

	const textAuthor = document.createElement("h3");
	textAuthor.innerText = author;

	const textYear = document.createElement("p");
	textYear.innerText = year;

	const textContainer = document.createElement("div");
	textContainer.classList.add("inner")
	textContainer.append(textTitle, textAuthor, textYear);

	const container = document.createElement("div");
	container.classList.add("item", "shadow")
	container.append(textContainer);

	if (isCompleted) {
		container.append(createUndoButton(),
			createTrashButton());
	} else {
		container.append(
			createCheckButton(),
			createTrashButton());
	}

	return container;

}

function add_unfinished() {

	const unfinished_read = document.getElementById(UNFINISHED_BOOK);
	
	const text_judul = document.getElementById("judul_buku").value;
	const text_penulis = document.getElementById("penulis").value;
	const tahun_terbit = document.getElementById("tahun_buku").value;
	const completed_read = document.getElementById("done").checked;

	const to_read = make_read(text_judul, text_penulis, tahun_terbit, completed_read);
	const read_object = composeReadObject(text_judul, text_penulis, tahun_terbit, completed_read);

	to_read[READ_ID] = read_object.id;
	Harus_baca.push(read_object);

	unfinished_read.append(to_read);

	if (completed_read) {
		document.getElementById(FINISHED_BOOK).append(to_read);
	} else {
		document.getElementById(UNFINISHED_BOOK).append(to_read);
	}
	updateDataToStorage();
}

function add_finished(taskElement) {
	const taskTitle = taskElement.querySelector(".inner > h2").innerText;
	const taskP = taskElement.querySelector(".inner > h3").innerText;
	const taskP2 = taskElement.querySelector(".inner > p").innerText;
	
	const new_finish = make_read(taskTitle, taskP, taskP2, true);
	const list_finished = document.getElementById(FINISHED_BOOK);
	
	const toread = findMustRead(taskElement[READ_ID]);
	toread.isCompleted = true;
	new_finish[READ_ID] = toread.id; 

	list_finished.append(new_finish);
	taskElement.remove();

	updateDataToStorage();
}

function createButton(buttonTypeClass, eventListener) {
	const button = document.createElement("button");
	button.classList.add(buttonTypeClass);
	button.addEventListener("click", function (event) {
		eventListener(event);
	});
	return button;
}

function createCheckButton() {
	return createButton("check-button", function(event) {

		let dialog = confirm("Anda yakin Buku ini sudah selesai dibaca ?");

		if (dialog == true ) {
			add_finished(event.target.parentElement);
		} else {
			return 0;
		}
		
	});
}

function createTrashButton() {
	return createButton("trash-button", function(event){

		let dialog = confirm("Anda yakin ingin menghapus Data Buku ?");

		if (dialog == true) {
			remove_unfinished_book(event.target.parentElement);
		} else {
			return 0;
		}
		
	});
}

function createUndoButton() {
	return createButton("undo-button", function (event) {

		let dialog = confirm("Anda yakin ingin mengUndo Buku ini ?");
		if (dialog == true ) {
			undo_finished_book(event.target.parentElement);
		} else {
			return 0;
		}
		
	});
}

function remove_unfinished_book(taskElement) {
	const readPosition = findReadIndex(taskElement[READ_ID]);
	Harus_baca.splice(readPosition, 1);

	taskElement.remove();
	updateDataToStorage();
}

function undo_finished_book(taskElement) {
	const list_unfinished = document.getElementById(UNFINISHED_BOOK);
	
	const taskTitle = taskElement.querySelector(".inner > h2").innerText;
	const taskAuthor = taskElement.querySelector(".inner > h3").innerText;
	const taskP = taskElement.querySelector(".inner > p").innerText;

	const new_finish = make_read(taskTitle, taskAuthor, taskP, false);

	const toread = findMustRead(taskElement[READ_ID]);
	toread.isCompleted = false;
	new_finish[READ_ID] = toread.id;

	list_unfinished.append(new_finish);
	taskElement.remove();

	updateDataToStorage();
}

function SearchBook() {
	const input = document.getElementById("cari");
	const filter = input.value.toUpperCase();

	const judulbuku = document.getElementsByClassName("item shadow");

	for (i = 0; i < judulbuku.length; i++) {
		a = judulbuku[i].getElementsByTagName("h2")[0];
		txtValue = a.textContent || a.innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			judulbuku[i].style.display = "";
			document.getElementById("cari").value="";
		} else {
			judulbuku[i].style.display = "none";
			document.getElementById("cari").value="";
		}
	}
}

function refreshData() {
	const list_unfinished = document.getElementById(UNFINISHED_BOOK);
	let list_finished = document.getElementById(FINISHED_BOOK);

	for (to_read of Harus_baca) {
		const new_finish = make_read(to_read.title, to_read.author, to_read.year, to_read.isCompleted);
		new_finish[READ_ID] = to_read.id;

		if (to_read.isCompleted) {
			list_finished.append(new_finish);
		} else {
			list_unfinished.append(new_finish);
		}
	}
}