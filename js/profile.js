$('#list-tab a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
  $(document).ready(function () {
    adjustTabHeight();
  });
  
  $(window).on('resize', function () {
    adjustTabHeight();
  });
  
  $(document).on('shown.bs.tab', function () {
    adjustTabHeight();
  });
  
  function adjustTabHeight() {
    var activeTabContentHeight = $('.tab-pane.active').outerHeight();
    $('#list-tab').height(activeTabContentHeight);
  }

  function showMenu(){
    document.getElementById("subMenu").classList.toggle("open-menu");
  }
  
  function showDropdown() {
    document.getElementById("dropMenu").classList.toggle("open-dropdown");
  
  }
  
  function hideDropdown() {
    document.getElementById("dropMenu").classList.remove("open-dropdown");
  }