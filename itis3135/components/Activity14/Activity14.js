$(document).ready(function() {
    $('#nav_list a').click(function(e) {
        e.preventDefault();

        var title = $(this).attr('title');
        var jsonFile = 'json_files/' + title + '.json';

        $.getJSON(jsonFile, function(data) {
            var htmlContent = '';

            $.each(data.speakers, function(index, speaker) {
                htmlContent += '<h1>' + speaker.title + '</h1>';
                htmlContent += '<h2>' + speaker.month + '</h2>';
                htmlContent += '<h3>' + speaker.speaker + '</h3>';
                htmlContent += '<img src="' + speaker.image + '" alt="' + speaker.speaker + '_picture">';
                htmlContent += '<p>' + speaker.text + '</p>';
            });

            $('main').empty();
            $('main').html(htmlContent);
        });
    });
});