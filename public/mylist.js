function logout() {
    localStorage.removeItem('session');
    window.location.replace('/login');
}

function del(user_id) {
    let data = getData();

    let idx = data.indexOf(user_id);

    data.splice(idx, 1);

    let str = JSON.stringify(data);

    let username = localStorage.getItem('session');

    localStorage.setItem('contacts' + username, str);
    window.location.reload();
}

function getData() {
    let username = localStorage.getItem('session');
    let str = localStorage.getItem('contacts' + username);
    let data = JSON.parse(str);
    return data;
}

function addToList(data) {

    for (let i = 0; i < data.length; i++) {

        let temp = data[i];

        let user_id = temp;

        let URL = 'https://jsonplaceholder.typicode.com/users/' + user_id;

        let option = {
            url: URL,
            type: 'GET'
        };

        let request = $.ajax(option);

        request.done(function (r) {
            let name = r.name;

            let x = `<h3>${name}</h3>`;
            let a1 = `<a data-ajax="false" href="detail.html?user_id=${r.id}" data-role="button">Detail</a>`;
            let a2 = `<a onClick = "del(${r.id})" data-role="button">Delete</a>`;

            let item = `<li><div>${x}${a1}${a2}</div></li>`;

            let mylist = $('#lv_mylist');

            mylist.append(item);
            mylist.trigger('create');
            mylist.listview('refresh');

        });


    }

}

$(function () { //fungsi 'onload' ==== main() method setelah html dirender
    let username = localStorage.getItem('session');
    if (!username) window.location.replace('/login');
    let data = getData();
    if (data)
        addToList(data);


});
