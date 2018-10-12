//jscs:disable
(function () {
//jscs:enable
const footerTpl = function () {
  /*
	<footer>
		<p>&copy;API Mocking Service</p>
	</footer>
  */
};

const footer = footerTpl.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '') +
      '</html>';
document.write(footer);
})();
