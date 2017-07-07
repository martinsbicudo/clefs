$(function(){
  function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val(element.text()).select();
    document.execCommand("copy");
    $temp.remove();
  }

  function selectText(containerid) {
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(document.getElementById(containerid));
      range.select();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(document.getElementById(containerid));
      window.getSelection().addRange(range);
      }
    }

  $('.copy').on('click', function(){
    var container = $(this).closest('.code-box').find('code');
    copyToClipboard(container);
    container.attr('id', 'copy');
    selectText('copy');
  });

  $('.see').on('click', function(){
    var container = $(this).closest('.code-box').find('pre');
    var overflow = container.attr('data-overflow');
    container.attr('data-overflow', 'false');
    if(overflow == 'false')
      container.attr('data-overflow', 'true');
  });
});
