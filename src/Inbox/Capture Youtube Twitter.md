<%* 
promptUrlNote = await tp.system.prompt("URL de la nota");
promptNameNote = await tp.system.prompt("Nombre de la nota");
jeiParentDate = tp.date.now("YYYYMMDD");

let fileName = tp.date.now("YYYYMMDDHHmm") + " " + promptNameNote
const newNotePath = `000 Inbox/Captures/${fileName}`;
-%>
<% tp.file.include("[[YAML]]") %>
# <% promptNameNote %>
[[<% tp.date.now("YYYYMMDD") %>]]
<%* if(promptUrlNote != ""){ -%>
[<% promptNameNote %>](<% promptUrlNote %>)
<%* } -%>
![<% promptNameNote %>](<% promptUrlNote %>)
<%* 
await tp.file.rename( fileName )
await tp.file.move(newNotePath)
tp.file.cursor(1)
-%>




