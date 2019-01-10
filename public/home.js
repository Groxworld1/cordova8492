function logout() {
    localStorage.removeItem('session');
    window.location.replace('/login');
}

function save(id) {
    let username = localStorage.getItem('session');

    let contacts = JSON.parse(localStorage.getItem('contacts' + username));

    if(!contacts)   {
        contacts = [];
    }

    contacts.push(id);

    let data = JSON.stringify(contacts);

    localStorage.setItem('contacts' + username, data);
}

function addToList(data)  {
    for (let i = 0; i < data.length; i++) {
        let temp = data[i];

        let x = `<h3>${temp.name}</h3>`;
        let a1 = `<a data-ajax="false" href="detail.html?user_id=${temp.id}" data-role="button">Detail</a>`;
        let a2 = `<a onClick = "save(${temp.id})" data-role="button">Save</a>`;

        let item = `<li><div>${x}${a1}${a2}</div></li>`;

        //append(), ajax
        $('#lv_user').append(item);

    }
    $('#lv_user').trigger('create');
    $('#lv_user').listview('refresh');
};

$(function(){
    let param = window.location.search;

    let params = new URLSearchParams(param);

    let userData = params.get('userData');

    if (userData) {
        userData = JSON.parse(userData);
        localStorage.setItem('session', userData.facebook_id);
        alert(userData.displayName);
    }else {
        let username = localStorage.getItem('session');
        if (!username) { window.location.replace('/login')};
    }


    let URL = "https://jsonplaceholder.typicode.com/users";
    let option = {
            method:"GET",
            url: URL
    };


    let request = $.ajax(option);
    

    //bind event 'request' ketika sudah selesai

    request.done(function (r){ //r = responds
        //code di block ini, akan di execute ketika request selesai
        console.log(r);
        addToList(r);
    });
})