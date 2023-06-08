<%* 
let urlNote = await tp.system.prompt("URL de la nota")
let yearNumber = tp.date.now("YYYY")
let fecha = tp.date.now("YYYYMMDD")
let monthNumber = tp.date.now("MM")
let dayNumber = tp.date.now("DD")
let nameNote = tp.date.now("YYYY") + tp.date.now("MM") + tp.date.now("DD") 

let datePrefix = tp.date.now("YYYY") + tp.date.now("MM") + tp.date.now("DD") + tp.date.now("HH") + tp.date.now("mm")

let dateNow = tp.file.creation_date("YYYY-MM-DD HH:mm")
-%>
---
aliases: []
title: <% yearNumber %>
date: <% dateNow %>
creation: <% dateNow %> 
updated: <%+ tp.file.last_modified_date("YYYY-MM-DD HH:mm") %>
url: <% urlNote %>
author:  
people: 
tags:
- type/calendar/yearly
rating:
emotion: 
---
# <% yearNumber %>

<%* if(urlNote != ""){ -%>
[<% nameNote %>](<% urlNote %>)
<%* } -%>
## Resumen

## Tareas
- [ ] 
## Meses
### Enero
[[<% yearNumber %>01]]
### Febrero
[[<% yearNumber %>02]]
### Marzo
[[<% yearNumber %>03]]
### Abril
[[<% yearNumber %>04]]
### Mayo
[[<% yearNumber %>05]]
### Junio
[[<% yearNumber %>06]]
### Julio
[[<% yearNumber %>07]]
### Agosto
[[<% yearNumber %>08]]
### Septiembre
[[<% yearNumber %>09]]
### Octubre
[[<% yearNumber %>10]]
### Noviembre
[[<% yearNumber %>11]]
### Diciembre
[[<% yearNumber %>12]]
<%* 
await tp.file.rename( yearNumber )  
tp.file.cursor(1)
-%>




