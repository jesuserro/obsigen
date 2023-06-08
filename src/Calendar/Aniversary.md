<%* 
moment.locale("es");
let fileName = tp.date.now("MMDD");
promptUrlNote = "";
promptNameNote = fileName;
jeiParentDate = tp.date.now("MMMM");

const newNotePath = `100 Calendar/Aniversaries/${tp.date.now("MM")}/${fileName}`;
let noteName = tp.date.now("DD MMMM");

jeiSelectedDate = moment(tp.date.now("YYYYMMDD")); 
jeiSubHeaderLinks = "[[aniversarios]], [[Erro Iribarren Jesús|mismemorias]]";
-%>
<% tp.file.include("[[YAML]]") %>
# <% noteName.charAt(0).toUpperCase() + noteName.slice(1) %>
<% tp.file.include("[[Subheader]]") %>
<% tp.file.include("[[Migas Aniversary]]") %>

## Santoral


## Evangelio


## Cumpleaños


## Eventos


## Meteo


## Agro


## Aniversarios
### ![[<% tp.date.now("YYYYMMDD") %>]]

<%* 
await tp.file.rename( fileName )  
await tp.file.move(newNotePath)
tp.file.cursor(1)
-%>