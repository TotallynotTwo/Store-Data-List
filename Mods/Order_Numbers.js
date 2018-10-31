module.exports = {

//---------------------------------------------------------------------
// Action Name
//
// This is the name of the action displayed in the editor.
//---------------------------------------------------------------------

name: "Order Numbers",

//---------------------------------------------------------------------
// Action Section
//
// This is the section the action will fall into.
//---------------------------------------------------------------------

section: "Other Stuff",

//---------------------------------------------------------------------
// Action Subtitle
//
// This function generates the subtitle displayed next to the name.
//---------------------------------------------------------------------

subtitle: function(data) {
	return `Sort ${data.intn}`;
},

//---------------------------------------------------------------------
	// DBM Mods Manager Variables (Optional but nice to have!)
	//
	// These are variables that DBM Mods Manager uses to show information
	// about the mods for people to see in the list.
	//---------------------------------------------------------------------
		
	// Who made the mod (If not set, defaults to "DBM Mods")
	author: "Two :p",
		
	// The version of the mod (Defaults to 1.0.0)
	version: "1.8.6",
		
	// A short description to show on the mod line for this mod (Must be on a single line)
	short_description: "Sort Numbers!",
	
	
//---------------------------------------------------------------------
// Action Storage Function
//
// Stores the relevant variable info for the editor.
//---------------------------------------------------------------------

variableStorage: function(data, varType) {
	const type = parseInt(data.storage);
	if(type !== varType) return;
	return ([data.varName, 'Sort Numbers Output']);
},

//---------------------------------------------------------------------
// Action Fields
//
// These are the fields for the action. These fields are customized
// by creating elements with corresponding IDs in the HTML. These
// are also the names of the fields stored in the action's JSON data.
//---------------------------------------------------------------------

fields: ["intn", "storage", "varName", "sort"],

//---------------------------------------------------------------------
// Command HTML
//
// This function returns a string containing the HTML used for
// editting actions. 
//
// The "isEvent" parameter will be true if this action is being used
// for an event. Due to their nature, events lack certain information, 
// so edit the HTML to reflect this.
//
// The "data" parameter stores constants for select elements to use. 
// Each is an array: index 0 for commands, index 1 for events.
// The names are: sendTargets, members, roles, channels, 
//                messages, servers, variables
//---------------------------------------------------------------------

html: function(isEvent, data) {
	return `
	<div style="padding-top: 8px;">
		<div><center><u>Mod Info:</u> Created by Two!</center></div><br>
</div>
			<select id="sort" class="round" style="width: 90%;">
			<option value="0" selected>Sort from Descending</option>
			<option value="1">Sort from Ascending</option>
		</select>
<div><br><br>
	Numbers:<br>
	<input id="intn" class="round" type="text" placeholder="Ex. 52 42 61 65 from descending would be 65 61 52 42"><br>
</div>
<div>
	<div style="float: left; width: 35%;">
		Store In:<br>
		<select id="storage" class="round">
			${data.variables[1]}
		</select>
	</div>
	<div id="varNameContainer" style="float: right; width: 60%;">
		Variable Name:<br>
		<input id="varName" class="round" type="text"><br>
	</div>
</div>`
},

//---------------------------------------------------------------------
// Action Editor Init Code
//
// When the HTML is first applied to the action editor, this code
// is also run. This helps add modifications or setup reactionary
// functions for the DOM elements.
//---------------------------------------------------------------------

init: function() {
},

//---------------------------------------------------------------------
// Action Bot Function
//
// This is the function for the action within the Bot's Action class.
// Keep in mind event calls won't have access to the "msg" parameter, 
// so be sure to provide checks for variable existance.
//---------------------------------------------------------------------

action: function(cache) {
	const data = cache.actions[cache.index];
    const integer = this.evalMessage(data.intn, cache);
		const varName = this.evalMessage(data.varName, cache);
		const storage = parseInt(data.storage);
			const sort = parseInt(data.sort);
var numArray = integer.split(" ");
var numarray2 = [];
for(var i=0; i<numArray.length; i++) { numArray[i] = +numArray[i]; } 


num = integer.replace(/\s/g, ', ');
list = [num];

	switch(sort) {
		case 0:
			numArray.sort(function(a, b){return b-a});
			break;
		case 1:
		    numArray.sort(function(a, b){return a-b});
			break;
	}
	numarray2.push(numArray.join(' '));

   this.storeValue(numarray2, storage, varName, cache);
  
    this.callNextAction(cache);	

},

//---------------------------------------------------------------------
// Action Bot Mod
//
// Upon initialization of the bot, this code is run. Using the bot's
// DBM namespace, one can add/modify existing functions if necessary.
// In order to reduce conflictions between mods, be sure to alias
// functions you wish to overwrite.
//---------------------------------------------------------------------

mod: function(DBM) {
	
}

}; // End of module