var Facts = Facts || {};

Facts.Util = {
	loadJSON: function(url, success, error) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
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
		if (!result[type])
			return;

		var values = result[type].values;

		var containerDiv = document.createElement("div");
		containerDiv.setAttribute("class", "fact-result-container " + containerClass + "-" + type);

		var hasChildren = false;

		for (var i in values) {
			var value = values[i];
			if (forceBgColor && !value.children)
				continue;
			else
				hasChildren = true;

			var childDiv = document.createElement("div");
			childDiv.setAttribute("class", "fact-node");

			if ((i >= 1) || forceBgColor)
				childDiv.setAttribute("style", "background-color: " + Facts.Util.nextColor());

			var labelDiv = document.createElement("div");
			labelDiv.setAttribute("class", "fact-label " + containerClass + "-" + type + "-label");

			labelDiv.textContent = value.label;

			childDiv.appendChild(labelDiv);
			containerDiv.appendChild(childDiv);

			if ((types.length > 1) && (value.children))
				Facts.Search.renderResults(childDiv, value.children, types.slice(1), false, containerClass);
		}

		if (hasChildren)
			div.appendChild(containerDiv);
	},

	search: function(url, subjDiv, objDiv) {
		Facts.Util.loadJSON(url,
			function(data) {
				subjDiv.innerHTML = "";
				Facts.Util.resetColor();
				Facts.Search.renderResults(subjDiv, data, ["subj", "pred", "obj"], true, "fact-right");

				objDiv.innerHTML = "";
				Facts.Util.resetColor();
				Facts.Search.renderResults(objDiv, data, ["obj", "pred", "subj"], true, "fact-left");
			},
			function(xhr) {
				console.error(xhr);
			}
		);
	}
};
