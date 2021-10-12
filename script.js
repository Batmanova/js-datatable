window.onload = function () {
    $(document).ready(function() {
        $('#save-data').submit(function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: 'server.php',
                data: '',
                success: function(response)
                {
                    alert('ready')
               }
           });
         });
    });

    var dataTable = $('#dt-table').DataTable( {
        buttons: [
            'csv'
        ]
    } );

    function addRow(email, pass) {
        
        const formData = [email, pass];
        const addedRow = dataTable.row.add(formData).draw();
        addedRow.show().draw(false);
    }

    document.getElementById('save').onclick = () => {
        var email = String(document.querySelector('#email').value)
        var pass = String(document.querySelector('#password').value)
        var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        var re = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/;
        var allData = dataTable.rows().data();
        var to_break = false;
        for (i = 0; i < allData.length; i++) {
               if (allData[i][0] == email) {
                  alert("Такая почта уже зарегистрирована");
                  to_break = true;
                  break;
               }
            }
        if (!to_break) {
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
    }
    document.getElementById('load').onclick = () => {
        var email = localStorage.getItem('email');
        document.getElementById('email').value = email;
        var pass = localStorage.getItem('password');
        document.getElementById('password').value = pass;
    }

    document.getElementById('delete').onclick=()=> {
        var login = String(document.querySelector('#login').value);
        var allData = dataTable.rows().data();
        for (i = 0; i < allData.length; i++) {
            if (allData[i][0] == login) {
                dataTable.row(i).remove().draw();
                break;
            }
        }
        }
        document.getElementById('change').onclick=()=> {
            var login = String(document.querySelector('#oldlogin').value);
            var password = String(document.querySelector('#new').value);
            var allData = dataTable.rows().data();
            for (i = 0; i < allData.length; i++) {
            if (allData[i][0] == login) {
                dataTable.row(i).data([login,password]).draw();
                break;
            }
        }
        }
        // document.getElementById('save-data').onclick = () => {
        //     let xhr = new XMLHttpRequest();
        //     url = "http://127.0.0.1:5500//server.php";
        //     xhr.open("POST", url, true);
        //     xhr.setRequestHeader("Content-Type", "application/json");
            
        //     xhr.onreadystatechange = function () {
        //           alert(this.responseText);
        //       };
        // }
}