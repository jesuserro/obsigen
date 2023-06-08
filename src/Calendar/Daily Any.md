<%*
moment.locale("es");
const promptDate = await tp.system.prompt("Enter the date (YYYY-MM-DD):");
jeiSelectedDate = moment(promptDate, "YYYY-MM-DD");

// Validate if the date is valid 
if (!jeiSelectedDate.isValid()) { 
	new Notice("Invalid date format!", 5000); 
	return; 
}

let fileName = jeiSelectedDate.format("YYYYMMDD");
promptNameNote = jeiSelectedDate.format("dddd, DD MMMM YYYY");
promptNameNote = promptNameNote.charAt(0).toUpperCase() + promptNameNote.slice(1);
promptUrlNote = "";
jeiParentDate = jeiSelectedDate.format("MMDD");
jeiDate = jeiSelectedDate.format("YYYY-MM-DD HH:mm");

const newNotePath = `100 Calendar/Daily/${jeiSelectedDate.format("YYYY")}/${fileName}`;
-%>
<% tp.file.include("[[YAML]]") %>
# <% promptNameNote %>
<% tp.file.include("[[Migas Daily]]") %>
<%* 
await tp.file.rename( fileName )  
await tp.file.move(newNotePath)
tp.file.cursor(1)

// Resetea variables globales
jeiDate = "";
-%>

