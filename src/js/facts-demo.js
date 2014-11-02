var Facts = Facts || {};

/*jshint multistr: true */

Facts.Demo = {
	init: function(div) {
        jQuery(document).ready(function() {
            if (document.createStyleSheet)
                document.createStyleSheet('/dist/facts-js/dist/css/facts.css');
            else
                $("head").append($("<link rel='stylesheet' href='/dist/facts-js/dist/css/facts.css' type='text/css' media='screen' />"));

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
