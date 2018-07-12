$(document).ready(function() {
  vat_number();
  vat_number_ajax();

  $(document).on('input', '#company, #company_invoice', function() {
    vat_number();
  });
});

function vat_number() {
  if ($('#company').length && ($('#company').val() != '')) {
    vat_number_show();
  } else {
    vat_number_hide();
  }

  if ($('#company_invoice').length && ($('#company_invoice').val() != ''))
    $('#vat_number_block_invoice').show();
  else
    $('#vat_number_block_invoice').hide();
}

function vat_number_show() {
  divs = $('#vat_area, #vat_number, #vat_number_block');
  divs.find('input').prop('disabled', false);
  divs.fadeTo('slow', 1.0);
}

function vat_number_hide() {
  divs = $('#vat_number, #vat_number_block');
  divs.find('input').prop('disabled', true);
  divs.fadeTo('slow', 0.5);
}

function vat_number_ajax() {
  $(document).on('change', '#id_country', function() {
    if ($('#company').length && !$('#company').val())
      return;
    if (typeof vatnumber_ajax_call !== 'undefined' && vatnumber_ajax_call)
      $.ajax({
        type: 'POST',
        headers: {'cache-control': 'no-cache'},
        url: baseDir + 'modules/vatnumber/ajax.php?id_country=' + parseInt($(this).val()) + '&rand=' + new Date().getTime(),
        success: function(isApplicable) {
          if (isApplicable == '1') {
            vat_number_show();
          } else {
            vat_number_hide();
          }
        }
      });
  });

  $(document).on('change', '#id_country_invoice', function() {
    if ($('#company_invoice').length && !$('#company_invoice').val())
      return;
    if (typeof vatnumber_ajax_call !== 'undefined' && vatnumber_ajax_call)
      $.ajax({
        type: 'POST',
        headers: {'cache-control': 'no-cache'},
        url: baseDir + 'modules/vatnumber/ajax.php?id_country=' + parseInt($(this).val()) + '&rand=' + new Date().getTime(),
        success: function(isApplicable) {
          if (isApplicable == '1') {
            $('#vat_area_invoice').show();
            $('#vat_number_invoice').show();
          } else
            $('#vat_area_invoice').hide();
        }
      });
  });
}
