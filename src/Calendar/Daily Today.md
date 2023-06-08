<%* 
moment.locale("es");
let fileName = tp.date.now("YYYYMMDD");
jeiSelectedDate = moment(fileName, "YYYY-MM-DD");
promptNameNote = tp.date.now("dddd, DD MMMM YYYY");
promptNameNote = promptNameNote.charAt(0).toUpperCase() + promptNameNote.slice(1);
promptUrlNote = "";
jeiParentDate = tp.date.now("MMDD");

const newNotePath = `100 Calendar/Daily/${tp.date.now("YYYY")}/${fileName}`;
-%>
<% tp.file.include("[[YAML]]") %>
# <% promptNameNote %>
<% tp.file.include("[[Migas Daily]]") %> 
<%* 
await tp.file.rename( fileName )  
await tp.file.move(newNotePath)
tp.file.cursor(1)
-%>
## Resumen


## Tareas
- [ ] 
