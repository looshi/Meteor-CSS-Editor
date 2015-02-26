/*
TextEditor
editable text field
wraps an instance of CodeMirror
*/


/**
* constructor
* @param {Object} _textArea, DOM id for the TextArea to apply this editor, e.g. "myTextArea"
* @param {String} _type , only "css" , "html" are supported now
*/
TextEditor = function(_textArea,_type) {

  if(_type!=="css"&&_type!=="html"){
    error("error unsupported type : " + _type);
  }

  if(!Utils.isPosString(_textArea)){
    error("selector required : "+_textArea);
  }

  var textArea = document.getElementById(_textArea);
  if(!textArea && !textArea.tagName){
    error('element '+_textArea+'not found, double check you are passing id and not classname');
  }
  if(textArea.tagName.toUpperCase()!=='TEXTAREA'){
    error('textarea '+textArea+ 'is not a <TextArea>');
  }

  this.editor = CodeMirror.fromTextArea(textArea);

}

TextEditor.prototype.setValue = function(_text){
  this.editor.getDoc().setValue(_text);
}

TextEditor.prototype.getValue = function(){
  return this.editor.getDoc().getValue();
}

TextEditor.prototype.on = function(_type,_handler){
  if(_type!=="change"){
    error("error unsupported event : " + _type);
  }
  this.editor.on(_type,_handler);
}

TextEditor.prototype.off = function(_type,_handler){
  if(_type!=="change"){
    error("error unsupported event : " + _type);
  }
  this.editor.off(_type,_handler);
}

var error = function(msg){
  console.warn(msg);
  throw new Error(msg);
}


