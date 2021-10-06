window.onload = function () {

    var dataTable = $('#dt-table').DataTable();

    function addRow(email, pass) {
        
        const formData = [email, pass];
        const addedRow = dataTable.row.add(formData).draw();
        addedRow.show().draw(false);
    }

    document.getElementById('save').onclick = () => {
        var email = String(document.querySelector('#email').value)
        var pass = String(document.querySelector('#password').value)
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/
        if (email.match(re)) {
            if (pass.match(passw)) {
                var check = String(document.querySelector('#check').value)
                if (pass == check) {
                    localStorage.setItem('email', email);
                    localStorage.setItem('password', pass);
                    addRow(email, pass);
                }
                else {
                    alert("Пароли не совпадают")
                }
            } else {
                alert('Нужен пароль длиной от 6 до 20 символов, содержащий минимум одну цифру, одну заглавную и одну строчную букву')
            }
        } else {
            alert("Неправильный формат почты")
        }
    }
    document.getElementById('load').onclick = () => {
        var email = localStorage.getItem('email');
        document.getElementById('email').value = email;
        var pass = localStorage.getItem('password');
        document.getElementById('password').value = pass;
    }
}