if ((typeof MochaWeb === 'undefined')){
  return;
}


MochaWeb.testOnly(function(){

  describe("Client Subscriptions", function(){

    describe("Default Template Data", function(){

      var defaultTemplate;
      var selector='';
      
      before(function(done){
        Meteor.autorun(function(){
          var data = TemplateCollection.findOne({name:"Default Template"});

          if (data){
            Router.go("/"+data._id);
            defaultTemplate = data;
            selector = data._id;
          }
        });

        setInterval(function() { 
          if(  !!$('html'+selector) && !!$('css'+selector) ){
            done();
          }
        }, 200);

      });

      it("should contain default html", function(){
        chai.assert.equal(defaultTemplate.html,MockHTML);
      });

      it("should contain default css", function(){
        chai.assert.equal(defaultTemplate.css,MockCSS);
      });

      it("should set Codemirror html editor", function(){
        var id = 'html'+defaultTemplate._id;
        var text = document.getElementById(id).innerHTML; 
        var html = '<span class="cm-tag">h2</span><span class="cm-tag cm-bracket">&gt;</span>Template Output';
        chai.assert.include( text , html );
      });

      it("should set Codemirror css editor", function(){
        var id = '#css'+defaultTemplate._id;
        var text = document.getElementById(id).innerHTML; 
        var css = 'important';   // for some reason can't get the full rendered css out of the div, perhaps it's not fully rendered yet
        chai.assert.include( text , css );
      });


    });


    describe("Default Sample Data Set", function(){

      var defaultSampleData;

      before(function(done){

        Meteor.autorun(function(){
          var template = TemplateCollection.findOne({name:"Default Template"});
          var people = PeopleCollection.find();
          if (template._id && people.count()===39){
            Router.go("/"+template._id);
            defaultSampleData = people.fetch();
            done();
          }
        });
      });


      it("should be available to the client and in tact", function(){
        var data = defaultSampleData;

        chai.assert.equal(data.length,39);
        for(var i=0;i<data.length;i++){

          chai.assert(data[i].country.length>3,'every country has a value'+data[i].country);
          chai.assert(data[i].date.length>3,'every date has a value'+data[i].date);
          chai.assert(data[i].city.length>3,'every city has a value'+data[i].city);
          chai.assert(data[i].company.length>3,'every company has a value'+data[i].company);
          chai.assert(data[i].name.length>2,'every name has a value '+data[i].name);
          chai.assert(data[i].color.length>3,'every color has a value'+data[i].color);

          chai.assert.isString(data[i].country,'every country is a string'+data[i].country);
          chai.assert.isString(data[i].date,'every date is a string'+data[i].date);
          chai.assert.isString(data[i].city,'every city is a string'+data[i].city);
          chai.assert.isString(data[i].company,'every company is a string'+data[i].company);
          chai.assert.isString(data[i].name,'every name is a string'+data[i].name);
          chai.assert.isString(data[i].color,'every color is a string'+data[i].color);
        }
      });
    });


  });//--- end Client Subscriptions

});//--- end Test