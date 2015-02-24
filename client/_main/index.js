function adjustContentHeight() {
    $('#content').css('height', window.innerHeight - 47);
    $('#right').css('height', window.innerHeight - 47);
    $('#searchbar').css('width', $('#search').width() - 54);
}

$(function() {
  $(window).resize(function() {
    adjustContentHeight()
  });
  $(window).resize();
});

Template.layout.events({
  'click #right': function(e) {
    toggleSearch_hide(); toggleMenu_hide();
  },
});

function toggleSearch_hide() { searchswitch = false; $('#searchbar').addClass('hiddensearch'); return false; }
function toggleMenu_hide() { menuswitch = false; $('.menu').addClass('hiddenmenu'); return false; }