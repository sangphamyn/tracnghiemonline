$(document).ready(function(){
  $('.teacher-btn-add').click(() => {
    $('.add-teacher').removeClass('hide');
    $('.list-teacher').addClass('hide');
  })
  $('.teacher-btn-list').click(() => {
    $('.add-teacher').addClass('hide');
    $('.list-teacher').removeClass('hide');
  })
  let option = 2;
  $('.btn-addoption').click(() => {
    $('.thongtindethi').append(`<div class="optiondethi" style="border: 1px solid #ccc; padding: 20px">
    <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Số câu</label>
            <input type="number" class="form-control fs-3" id="name" name="socau${option}" min="1" step="1" max="100" value="1" required>
          </div>
          <select class="form-select fs-3 mb-3" aria-label="Default select example" name="chude${option}" required>
          ${$('.chudeoption').html()}
          </select>
          <select class="form-select fs-3 mb-3" aria-label="Default select example" name="dokho${option}" required>
          ${$('.dokhooption').html()}
          </select>
    </div>`);
    option++;
  })

})