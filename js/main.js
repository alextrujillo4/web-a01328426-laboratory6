var i = 0;
function addEventListener(){
    $('#shop_input').val("");
        $('#button_submit').on('click', function (event){
      
            event.preventDefault();
            let item = $('#shop_input').val()
            if(item != "" ){
                $('#shop_list').append(`<li class="list_item item_${i}">
                    <p class="list_body">${item}</p> 
                    <div class="item_buttons">
                        <button class="btn_check" >Check</button>
                        <button class="btn_delete">Delete</button>
                    </div>
                </li>`);
                $('#shop_input').val("");
                i++;

            }else{
                alert("Empty Item");
            }
      });

      
} 

$(document).on('click','.btn_check', function(event){
    console.log("Click check")
    event.preventDefault(); 
    let listbody = $(this).parent().parent().find('.list_body');
    if(listbody.hasClass('item_checked')){
        listbody.removeClass('item_checked')
    }else{
        listbody.addClass('item_checked')
    }
});

$(document).on('click','.btn_delete', function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
});
addEventListener();