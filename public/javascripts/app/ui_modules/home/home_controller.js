define(function(require) {
    var headerView= require('./views/header_view');
    return {
        showHome: function(){
            var header = new headerView();
            app.appHeader.show(header);
        }
    };
});
