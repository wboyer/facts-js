var Facts = Facts || {};

Facts.Util = {
  loadJSON: function(url, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (success)
                    success(JSON.parse(xhr.responseText));
            } else {
                if (error)
                    error(xhr);
            }
        }
    };
    xhr.open("GET", url, true);
    xhr.send();
  },
  
  colors: [ "lightpink", "lightblue", "lightgreen", "lightgoldenrodyellow", "lightcyan", "lightcoral", "lightseagreen" ],
  _nextColor: 0,
  
  nextColor: function() {
    Facts.Util._nextColor %= Facts.Util.colors.length;
    return Facts.Util.colors[Facts.Util._nextColor++];
  },
  
  resetColor: function() {
    Facts.Util._nextColor = 0;
  }
};

Facts.Search = {
  renderResults: function(div, result, types, forceBgColor, containerClass) {
    var type = types[0];
    var results = result[type].results;
  
    if (!results.length)
      return;
  
    var containerDiv = document.createElement("div");
    containerDiv.setAttribute("class", "fact-result-container " + containerClass  + "-" + type);
    div.appendChild(containerDiv);
  
    for (i in results) {
      var childDiv = document.createElement("div");
      childDiv.setAttribute("class", "fact-node fact-result");
  
      if ((i != 0) || forceBgColor)
        childDiv.setAttribute("style", "background-color: " + Facts.Util.nextColor());
  
      childDiv.textContent = results[i].label + " (" + (Math.floor(Math.random() * 1000) % 10) + ")";
  
      containerDiv.appendChild(childDiv);
  
      if (types.length > 1)
        Facts.Search.renderResults(childDiv, results[i], types.slice(1), false, containerClass);
    }
  },
  
  search: function(url, subjDiv, objDiv) {
    Facts.Util.loadJSON(url,
      function(data) {
        subjDiv.innerHTML = "";
        Facts.Util.resetColor();        
        Facts.Search.renderResults(subjDiv, data, ["subj", "pred", "obj"], true, "fact-right-container");
  
        objDiv.innerHTML = "";
        Facts.Util.resetColor();        
        Facts.Search.renderResults(objDiv, data, ["obj", "pred", "subj"], true, "fact-left-container");
      },
      function(xhr) { console.error(xhr); }
    );
  }
};
