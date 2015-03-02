Fiber = Npm.require('fibers');
Future = Npm.require('fibers/future');

var MAX_CHARS = 800;

Meteor.methods({

  /*
  creates a copy of 'Default' Template
  */
  CreateNewTemplate : function(name){
    
    console.log( " CreateNewTemplate " , name );
    
    if(name==='Default'){
      throw new Error("error, cannot use default name")
    }
    var template = TemplateCollection.findOne({name:'Default'});
    template.name = name;
    template.created = new Date();
    template.modified = new Date();
    delete template._id;
    var newTemplate = TemplateCollection.insert(template);
    return newTemplate;
  },

  SaveTemplate : function(id,options){
    

    var future = new Future();

    if(options.name==='Default'){
       future.throw("error, cannot use default name");
    }

    if(options.created){
      delete options.created;
    }
    
    TemplateCollection.update({_id:id}, {$set:options}, function(err,res){
      if(err||res===0){
        future.throw("Error saving template ", err);
      }else{
        future.return(res);
      }
    });

    return future.wait();
  },

  saveHTML : function(newHTML,templateId,userId){
    if( newHTML.length<MAX_CHARS && !!userId){
      TemplateCollection.update({_id:templateId},{$set:{html:newHTML,lastModifiedBy:userId}},function(err,res){
        if(err||res===0){
          console.log("saveHTML err",err, res);
        }else{
          //console.log("saveHTML OK!", res);
        }
      });
    }
  },

  saveCSS : function(newCSS,templateId,userId){
    if(newCSS.length<MAX_CHARS && !!userId){
      TemplateCollection.update({_id:templateId},{$set:{css:newCSS,lastModifiedBy:userId}},function(err,res){
        if(err||res===0){
          console.log("saveCSS error",err, res);
        }else{
          //console.log("saveCSS OK!",res);
        }
      });
    }
  },



});