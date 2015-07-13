var SuggestNoAjax = function(rootEl, q, formEl, textBoxEl, idEl, successHandler, instructions, suggestNames, suggestIDs, suggestLocs, placeholderText, defaultOptions, showNoMatches, positionEl)
{
  this.onInputChange = function()
  {
    if(oThis.typeAheadObj.displaySuggestList(oThis.suggestNames, oThis.suggestIDs, oThis.suggestLocs))
    {
      oThis.typeAheadObj.onListChange();
    }
  }

  this.updateSuggestLists = function(suggestNames, suggestIDs, suggestLocs)
  {
    oThis.suggestNames = suggestNames;
    oThis.suggestIDs = suggestIDs;
    oThis.suggestLocs = suggestLocs;
    //oThis.typeAheadObj.onListChange();
  }

  this.init = function()
  {
    oThis.typeAheadObj = new TypeAhead(rootEl, formEl, textBoxEl, idEl, defaultOptions, instructions, 1, successHandler, this.onInputChange, null, null, null, placeholderText, showNoMatches, false, positionEl);
    oThis.typeAheadObj.setText(q);
  }

  this.suggestNames = suggestNames;
  this.suggestIDs = suggestIDs;
  this.suggestLocs = suggestLocs;
  var oThis = this;
  this.init();
}