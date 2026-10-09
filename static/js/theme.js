/* Light/dark theme: saved choice wins, otherwise follow the OS/browser setting. */
(function () {
	var root = document.documentElement;
	var saved = null;
	try { saved = localStorage.getItem('theme'); } catch (e) {}
	var dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;

	function apply(isDark) {
		root.setAttribute('data-theme', isDark ? 'dark' : 'light');
		var buttons = document.querySelectorAll('.theme-toggle');
		for (var i = 0; i < buttons.length; i++) {
			buttons[i].textContent = isDark ? 'Light mode' : 'Dark mode';
		}
	}

	apply(dark);

	// Delegated so it also works for the copy of the nav that skel builds for mobile.
	document.addEventListener('click', function (e) {
		var el = e.target;
		while (el && el !== document) {
			if (el.classList && el.classList.contains('theme-toggle')) {
				dark = !dark;
				try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (err) {}
				apply(dark);
				return;
			}
			el = el.parentNode;
		}
	});

	document.addEventListener('DOMContentLoaded', function () { apply(dark); });
})();
