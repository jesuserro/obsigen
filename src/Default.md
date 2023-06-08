<%* 
/*
plugin:kindtocs:1859 Access to XMLHttpRequest at 'https://parroquiaortodoxadealicante.blogspot.com/2022/11/sentarnos-la-mesa-como-cristianos-dando.html' from origin 'app://obsidian.md' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
*/
function httpGet(theUrl)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("POST", theUrl, false );
    xmlhttp.send();    
}

let urlNote = await tp.system.prompt("URL de la nota")
let nameNote = await tp.system.prompt("Nombre de la nota")
if(nameNote == ""){
	nameNote = urlNote.substring(urlNote.lastIndexOf("/") + 1)
	nameNote = nameNote.split('-').join(' ')
	nameNote = nameNote.split('.').slice(0, -1).join('.')
	nameNote= nameNote.charAt(0).toUpperCase() + nameNote.slice(1);
}

let fecha = tp.date.now("YYYYMMDD")
let datePrefix = fecha + tp.date.now("HHmm")

let allFileName = datePrefix + " " + nameNote

let dateNow = tp.file.creation_date("YYYY-MM-DD HH:mm")
-%>
---
aliases: [] 
title: <% nameNote %>
date: <% dateNow %>
creation: <% dateNow %> 
updated: <%+ tp.file.last_modified_date("YYYY-MM-DD HH:mm") %>
url: <% urlNote %>
author:  
people: 
parent: [ [[<% fecha %>]] ]
tags:
-
locations:
rating:
emotion: 
---
# <% nameNote %>
[[<% fecha %>]]
<%* if(urlNote != ""){ -%>
[<% nameNote %>](<% urlNote %>)
<%* } -%>

<%* 
await tp.file.rename( allFileName )  
tp.file.cursor(1)
-%>




