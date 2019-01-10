function login (e)  {
    e.preventDefault();
    
    //WEB SQL
    //localStorage
    //webstorage

    let username = $('#username').val();

    localStorage.setItem('session', username);

    window.location.href = "/home";
}

$(function() { //fungsi yang akan di execute ketika halaman selesai di 'render'
    //add 'submit; event on 'f_login'
    let username = localStorage.getItem('session');
    if (username) window.location.replace('/home');

    $('#f_login').submit(login);
});
