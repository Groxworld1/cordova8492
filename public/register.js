$(function(){
    let search = window.location.search;
    let param = new URLSearchParams(search);

    if(param.has('fbID')){
        $('#fbID').val(param.get('fbID'))
    }
})