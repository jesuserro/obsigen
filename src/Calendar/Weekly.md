<%* 
let urlNote = await tp.system.prompt("URL de la nota")
let title = tp.date.now("dddd, DD MMMM YYYY")
let fecha = tp.date.now("YYYYMMDD")
let monthNumber = tp.date.now("MM")
let dayNumber = tp.date.now("DD")
let nameNote = tp.date.now("YYYY") + tp.date.now("MM") + tp.date.now("DD") 

let datePrefix = tp.date.now("YYYY") + tp.date.now("MM") + tp.date.now("DD") + tp.date.now("HH") + tp.date.now("mm")

let dateNow = tp.file.creation_date("YYYY-MM-DD HH:mm")
-%>
---
aliases: ["<% fecha %>"]
title: <% title %>
date: <% dateNow %>
creation: <% dateNow %> 
updated: <%+ tp.file.last_modified_date("YYYY-MM-DD HH:mm") %>
url: <% urlNote %>
author:  
people: 
tags:
- type/calendar/daily 
rating:
emotion: 
---
# <% title %>
[[<% monthNumber %><% dayNumber %>]]
<%* if(urlNote != ""){ -%>
[<% nameNote %>](<% urlNote %>)
<%* } -%>
## Resumen

## Details

- [[<% fecha %>]]: ![[<% fecha %>#Resumen]]

## Tareas
- [ ] 
<%* 
await tp.file.rename( nameNote )  
tp.file.cursor(1)
-%>




