var Facts = Facts || {};

/*jshint multistr: true */

Facts.Demo = {
	init: function(div) {
        jQuery(document).ready(function() {
            if (document.createStyleSheet)
                document.createStyleSheet('/css/facts.css');
            else
                $("head").append($("<link rel='stylesheet' href='/css/facts.css' type='text/css' media='screen' />"));

			jQuery(div).html(' \
				<div class="row"> \
					<div class="col-xs-12 col-sm-4">   \
						<div class="fact-search-subj"> \
							<div class="fact-input-label">Subj:</div><input class="fact-input" id="fact-pfx-subj" type="text" onkeyup="Facts.Demo.search(\'subj\');" onfocus="Facts.Demo.search(\'subj\');" placeholder="type something" /> \
						</div> \
					</div> \
					<div class="col-xs-12 col-sm-4 col-sm-offset-4"> \
						<div class="fact-search-obj"> \
							<div class="fact-input-label">Obj:</div><input class="fact-input" id="fact-pfx-obj" type="text" onkeyup="Facts.Demo.search(\'obj\');" onfocus="Facts.Demo.search(\'obj\');" placeholder="type something"/> \
						</div> \
					</div> \
				</div> \
				<div class="row"> \
					<div class="col-xs-12"> \
						<div id="fact-top-results" class="fact-results"></div> \
						<div id="fact-bottom-results" class="fact-results"></div> \
					</div> \
				</div> \
			');
		});
	},

	search: function(node) {
		var i = document.getElementById('fact-pfx-' + node);
		var q = i.value.toLowerCase();
		if (q === '')
		return;

		var t = document.getElementById('fact-top-results');
		var b = document.getElementById('fact-bottom-results');

		if (node === 'subj') {
			document.getElementById('fact-pfx-obj').classList.remove('active');
			Facts.Search.search('/api/facts/browse/subj?q=' + q, t, b, 'Subjects matching: "' + q + '"', "Those Subjects as Objects");
		}
		else {
			document.getElementById('fact-pfx-subj').classList.remove('active');
			Facts.Search.search('/api/facts/browse/obj?q=' + q, b, t, "Those Objects as Subjects", 'Objects matching: "' + q + '"');
		}

		i.classList.add('active');
	}
};
;var Facts = Facts || {};

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
	renderResults: function(div, result, types, forceBgColor, containerClass, heading, headingClass) {
		var type = types[0];
		if (!result[type])
			return;

		var values = result[type].values;

		var containerDiv = document.createElement("div");
		containerDiv.setAttribute("class", "fact-result-container " + containerClass + "-" + type);

		if (heading) {
			var headingDiv = document.createElement("div");
			headingDiv.setAttribute("class", headingClass);
			headingDiv.textContent = heading;
			containerDiv.appendChild(headingDiv);
		}

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

	search: function(url, subjDiv, objDiv, subjHeading, objHeading) {
		Facts.Util.loadJSON(url,
			function(data) {
				subjDiv.innerHTML = "";
				Facts.Util.resetColor();
				Facts.Search.renderResults(subjDiv, data, ["subj", "pred", "obj"], true, "fact-right", subjHeading, "fact-result-heading");

				objDiv.innerHTML = "";
				Facts.Util.resetColor();
				Facts.Search.renderResults(objDiv, data, ["obj", "pred", "subj"], true, "fact-left", objHeading, "fact-result-heading fact-result-heading-right");
			},
			function(xhr) {
				console.error(xhr);
			}
		);
	}
};

