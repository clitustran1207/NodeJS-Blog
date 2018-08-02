$(document).ready(() => {
    $('.edit-post').click(() => {
        var params = {
            id: $('#id').val(),
            title: $('#title').val(),
            author: $('#author').val(),
            content: tinymce.get('content').getContent()
        };
        var url = location.protocol + '//' + document.domain + ':' + location.port;

        $.ajax({
            url: url + '/admin/edit-post',
            method: 'PUT',
            data: params,
            dataType: 'JSON',
            success: (res) => {
                if(res.status_code == 200){
                    location.reload();
                } 
            }
        });
    });

    $('.delete-post').click(() => {
        var id = $('.delete-post').attr('data_id');
        var url = location.protocol + '//' + document.domain + ':' + location.port;

        $.ajax({
            url: url + '/admin/delete-post',
            method: 'DELETE',
            data: { id: id },
            dataType: 'JSON',
            success: (res) => {
                if(res.status_code == 200){
                    location.reload();
                }
            }
        });
    });
});
    