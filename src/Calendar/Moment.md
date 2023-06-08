<%* 
moment.locale("es");
promptUrlNote = await tp.system.prompt("URL de la nota");
promptNameNote = await tp.system.prompt("Nombre de la nota");
jeiParentDate = tp.date.now("YYYYMMDD");
jeiSubHeaderLinks = ""

let fileName = tp.date.now("YYYYMMDDHHmm") + " " + promptNameNote
const newNotePath = `100 Calendar/Moments/${fileName}`;
-%>
<% tp.file.include("[[YAML]]") %>
# <% promptNameNote %>
<% tp.file.include("[[Subheader]]") %>
<%* if(promptUrlNote != ""){ -%>
[<% promptNameNote %>](<% promptUrlNote %>)
<%* } -%>
<%* 
await tp.file.rename( fileName )  
await tp.file.move(newNotePath)
tp.file.cursor(1)
-%>








