document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.querySelector('#task');
    const submitButton = document.querySelector('#submit');
    const tasksList = document.querySelector('#tasks');

    // Ambil data dari localStorage
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // // Tampilkan tugas yang tersimpan
    savedTasks.forEach(task => addTask(task));

    // Nonaktifkan tombol jika input kosong
    taskInput.onkeyup = () => {
        submitButton.disabled = taskInput.value.trim() === '';
    };

    // Tambahkan tugas ke daftar
    document.querySelector('form').onsubmit = (e) => {
        e.preventDefault();
        const task = taskInput.value.trim();
        if (task) {
            const li = document.createElement('li');
            li.textContent = task;
            tasksList.appendChild(li);
            taskInput.value = '';
            submitButton.disabled = true;
            
        }
        // Tampilkan tugas yang tersimpan
        saveTask(task);
        return false; // Mencegah refresh halaman
    };

    // Fungsi untuk menambahkan tugas ke DOM
    function addTask(task) {
        const li = document.createElement('li'); // Membuat elemen <li>
        li.textContent = task; // Menambahkan teks tugas ke dalam <li>
    
        // Tambahkan tombol hapus
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.style.marginLeft = '10px';
        deleteButton.onclick = function () {
            removeTask(task); // Hapus tugas dari localStorage
            li.remove(); // Hapus elemen <li> dari DOM
        };
    
        li.appendChild(deleteButton); // Menambahkan tombol hapus ke <li>
        tasksList.appendChild(li); // Menambahkan <li> ke dalam daftar tugas
    }

    // Fungsi untuk menyimpan tugas ke localStorage

    function saveTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Ambil tugas yang ada di localStorage
        tasks.push(task); // Tambahkan tugas baru ke array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Simpan kembali ke localStorage
    }

    

    // Fungsi untuk menghapus tugas dari localStorage
    function removeTask(task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || []; // Ambil data tugas
        const updatedTasks = tasks.filter(t => t !== task); // Filter tugas yang tidak sama
        localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Simpan hasil filter kembali ke localStorage
    }


});