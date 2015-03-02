Template.CreateTemplateButton.rendered = function(){

  $('#new-template-controls').hide();

}

Template.CreateTemplateButton.events({

  'click #create-new-template-btn' : function(e){
    $('#create-new-template-btn').hide();
    $('#new-template-controls').show();
  },

  'mouseup #confirm-new-template-btn' : function(e){

    var name = $('#template-name-field').val();
    if(name.length<2 || name.length>100){
      $('#new-template-error').html('Must be between 2 and 100 chars.');
      return;
    }
    Meteor.call('CreateNewTemplate',name,function(err,res){
      if(err || res === 0){
        console.warn("new template error! ", err,res );
      }else{
        Router.go('/'+res);  // navigate to the new template
      }

    }); 
  },
  'click #cancel-new-template-btn' : function(e){
    $('#create-new-template-btn').show();
    $('#new-template-controls').hide();
    $('#template-name-field').val('');
  },

});