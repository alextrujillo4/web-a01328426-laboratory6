let url = "https://www.googleapis.com/youtube/v3/search";
let apiKey = 'AIzaSyAea5vw_5utzmze7O2i5xEn4MeSXbLwI8g';
let LASTSEARCH = null;
let NEXTPAGE = null;
function addData(responseJSON) {
    responseJSON.items.forEach(function(video) {
        console.log(video);
        let videoUrl = 'https://www.youtube.com/watch?v=' + video.id.videoId;
        $('#search-container').append(`
                <div  class="card horizontal white">
                    <div class="card-image">
                      <a href="${videoUrl}" target="_blank">
                      <img class="materialboxed" width="200" src="${video.snippet.thumbnails.medium.url}">
                        </a>
                    </div>
                    <div class="card-stacked">
                      <div class="card-content">
                        <div class="subtitle">${video.snippet.channelTitle}</div>
                        <b>${video.snippet.title}</b>
                        <p>${video.snippet.description}</p>
                      </div>
                      <div class="card-action">
                        <a href="${videoUrl}" target="_blank">Abrir video en nueva página</a>
                      </div>
                    </div>
                  </div>
                `);
    });
    $('#no-content').hide();
    $('#buscar-mas').show();
}
function callYoutubeAPI(searchdata) {
    LASTSEARCH = searchdata;
    $.ajax({
        url: url,
        data: {
            part: "snippet",
            q: searchdata,
            key: apiKey,
            maxResults: 10,
            type: "video"
        },
        method: "GET",
        dataType: "json",
        success: function (responseJSON) {
            addData(responseJSON)
            $('#search-input').val("");
            NEXTPAGE = responseJSON.nextPageToken;
        },
        error: function (err) {
            M.toast({html: 'Error de llamada a la API', classes: 'rounded'});
        }
    });
}
function callMoreYoutubeAPI() {
    $.ajax({
        url: url,
        data: {
            part: "snippet",
            q: LASTSEARCH,
            key: apiKey,
            maxResults: 10,
            type: "video",
            pageToken: NEXTPAGE
        },
        method: "GET",
        dataType: "json",
        success: function (responseJSON) {
            addData(responseJSON)
            $('#search-input').val("");
            NEXTPAGE = responseJSON.nextPageToken;
        },
        error: function (err) {
            M.toast({html: 'Error de llamada a la API', classes: 'rounded'});
        }
    });
}

function addEventListener(){
    $('#search-input').val("");
        $('#search-button').on('click', function (event){
            event.preventDefault();
            let searchitem = $('#search-input').val()
            if(searchitem !== "" ){
                callYoutubeAPI(searchitem)
            }else{
                M.toast({html: 'La barra de búsqueda está vacía...', classes: 'rounded'});
            }
      });

}
function addSearchMoreListener(){
    $('#buscar-mas').on('click', function (event){
        event.preventDefault();
        callMoreYoutubeAPI()
    });
}


$('#buscar-mas').hide();
addEventListener();
addSearchMoreListener();

