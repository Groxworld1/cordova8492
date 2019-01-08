function logout() {
    localStorage.removeItem('session');
    window.location.replace('/login');
}

function getUser(user_id) {
    let URL = 'https://jsonplaceholder.typicode.com/users/' + user_id;

    let option = {
        url: URL,
        type: 'GET'
    };

    let request = $.ajax(option);

    request.done(function (r) {
        $('#name').text(r.name);
        $('#username').text(r.username);
        $('#email').text(r.email);
    });
}

$(function () {
    let username = localStorage.getItem('session');
    if (!username) window.location.replace('/login');

    let params = window.location.search;
    let search = new URLSearchParams(params);
    let user_id = search.get('user_id');

    getUser(user_id);
    


});