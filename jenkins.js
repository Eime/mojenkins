document.addEventListener("DOMContentLoaded", function (event) { 
  try {
    if (window.location.href.match(/job\/[\w-]+\/\d+\//i)) {
      var
        ol = document.getElementsBySelector("ol")[0],
        pane = document.getElementsBySelector("table.pane")[0],
        paneElements = pane && pane.select(".pane"),
        li = ol && ol.children,
        tags = [],
        div = document.createElement("div"),
        filteredTags = [];
  
      if (!ol || !li || !li.length) {
        return;
      }
  
      div.className = "filterTags";
  
      for (var i = 0; i < li.length; i++) {
        var
          text = li[i].innerText,
          projects = text.match(/\[\w+\]/ig);
  
        if (projects) {
          projects.forEach(function (el) {
            tags.push(el.toUpperCase());
          });
        }
      }
  
      tags = tags.filter(function (value, index, self) {
        return tags.indexOf(value) === index;
      });
  
      tags.sort();
  
      tags.forEach(function (tag) {
        var
          a = document.createElement("a");
  
        a.onclick = function () {
          var idx = filteredTags.indexOf(tag);
          if (idx >= 0) {
            a.className = "";
            filteredTags.splice(idx, 1);
          } else {
            a.className = "active";
            filteredTags.push(tag);
          }
  
          for (var i = 0; i < li.length; i++) {
            var
              show = filteredTags.length == 0,
              liText = li[i].innerText;
  
            filteredTags.forEach(function (fTag) {
              var regExp = new RegExp(fTag.replace('[', '\\[').replace(']', '\\]'), "i");
              if (regExp.test(liText)) {
                  show = true;
              }
            });
  
            li[i].className = show ? '' : 'hidden';
          }
  
          if (paneElements) {
            for (var i = 0; i < paneElements.length; i++) {
              var
                show = filteredTags.length == 0,
                paneElement = paneElements[i],
                pre = paneElement.select("pre"),
                siblings = paneElement.nextSiblings(),
                x = 0,
                paneElementsText = paneElement && pre && pre[0].innerText.split("\n")[0];
  
              filteredTags.forEach(function (fTag) {
                var regExp = new RegExp(fTag.replace('[', '\\[').replace(']', '\\]'), "i");
                if (regExp.test(paneElementsText)) {
                    show = true;
                }
              });
  
              if (show) {
                paneElements[i].className = paneElements[i].className.replace(" hidden", "");
              } else {
                paneElements[i].className = paneElements[i].className + " hidden";
              }
  
              while (siblings[x] && !siblings[x].className.match(/pane/)) {
                if (show) {
                  siblings[x].className = siblings[x].className.replace(" hidden", "");
                } else {
                  siblings[x].className = siblings[x].className + " hidden";
                }
                x++;
              }
            }
          }
        };
        a.innerHTML = tag;
        div.append(a);
      });
  
      ol.parentNode.insertBefore(div, ol);
    }
  } catch (e) {
    console.log(e);
  }
});