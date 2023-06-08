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
<iframe style="border-radius:12px" src="<% promptUrlNote %>" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
<%* 
await tp.file.rename( fileName )
await tp.file.move(newNotePath)
tp.file.cursor(1)
-%>




