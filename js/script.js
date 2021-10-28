document.addEventListener("DOMContentLoaded", function () {

    const submitForm  = document.getElementById("form_input");
    const cariForm = document.getElementById("cari_buku");

    submitForm.addEventListener("submit", function (event) {
        event.preventDefault();
        add_unfinished();

        document.getElementById("judul_buku").value = "";
        document.getElementById("penulis").value = "";
        document.getElementById("tahun_buku").value = "";
        document.getElementById("done").checked = false;

    });

    cariForm.addEventListener("submit", function (event) {
    	event.preventDefault();

    	const inputSearch = document.getElementById("cari").value;
    	SearchBook(inputSearch);
    });

    if(isStorageExist()) {
    	loadDataFromStorage();
    }
});

document.addEventListener("ondatasaved", () => {
	console.log("Data Berhasil Disimpan");
});

document.addEventListener("ondataloaded", () => {
	refreshData();
});



