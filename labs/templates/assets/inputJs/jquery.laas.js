
					/**
  * Description-keypad plug-in
  * Developed at-Reverie Language technologies Pvt. Ltd.
  * last update-19/11/2014
  **/

function buildurl1(Rurl, zmr, somlan, orilan, typ) // URL build here for processString
{
	
	return Rurl + "?inString=" + zmr + "&lang=" + somlan + "&originlang="
			+ orilan + "&type=" + typ;

}

function sendcache(som,revApi,estr){
	 var fp1 = new Fingerprint();
	 var deviceid=fp1.get();
	 var d = new Date();
	 var y = d.getFullYear();
	 var m = d.getMonth()+1;
	 var cd = d.getDate();
	 var words = estr.split(" ");
	 var cuntToken=words.length;
	 var datetime = d.getDate() + "/"
                + (d.getMonth()+1)  + "/" 
                + d.getFullYear() + " "  
                + d.getHours() + ":"  
                + d.getMinutes() + ":" 
                + d.getSeconds();
	 var requestJson = {
		                        "apiKey": revApi,
                                "deviceId": deviceid,
								"platform": 5,
                                "operation": "transliteration",
                                "source": "fresh",
								"language":som,	
								"tokenCount": cuntToken,
                                "apiCallCount": 1,
                                "month": m,
                                "year": y,
                                "reqDate": datetime
					 }
					 
	     var stringRequestObj = JSON.stringify(requestJson);	
         var ajaxurl = 'http://reverielaas.cloudapp.net/laaslm/setTokenCountJSON';		 
                          $.ajax({
								type : "POST",
								url : ajaxurl,
								data:stringRequestObj,
								async : true,
								contentType:"application/json;charset=UTF-8"
							}).done(function(strResp) {
								
								var statusCode = strResp.status;
							/*	alert(strResp.message);*/
								
							});	
						 
}
function docache(som,revApi,estr){
     var fp1 = new Fingerprint();
	 var deviceid=fp1.get();
	 var d = new Date();
	 var y = d.getFullYear();
	 var m = d.getMonth()+1;
	 var cd = d.getDate();
	// var words = estr.split(" ");
	// var cuntToken=words.length;
	 var datetime = d.getDate() + "/"
                + (d.getMonth()+1)  + "/" 
                + d.getFullYear() + " "  
                + d.getHours() + ":"  
                + d.getMinutes() + ":" 
                + d.getSeconds();
	 var requestJson = {
		                        "apiKey": revApi,
                                "deviceId": deviceid,
								"platform": 5,
                                "operation": "transliteration",
                                "source": "fresh",
								"language":som,	
								"tokenCount": 1,
                                "apiCallCount": 1,
                                "month": m,
                                "year": y,
                                "reqDate": datetime
					 }
					 
	     var stringRequestObj = JSON.stringify(requestJson);	
         var ajaxurl = 'http://reverielaas.cloudapp.net/laaslm/setTokenCountJSON';		 
                          $.ajax({
								type : "POST",
								url : ajaxurl,
								data:stringRequestObj,
								async : true,
								contentType:"application/json;charset=UTF-8"
							}).done(function(strResp) {
								
								var statusCode = strResp.status;
							/*	alert(strResp.message);   */
								
							});	
}
function buildurl2(Rurl, zmr, somlan, orilan, typ, noOfsug) // URL build here for processWord
{
	
	return Rurl + "?inString=" + zmr + "&lang=" + somlan + "&originlang="
			+ orilan + "&type=" + typ + "&noOfSuggs=" + noOfsug;
}



function _leftMatch(string, area) { // This function belongs to autocomplete plugin

	//return string.substring(0, area.selectionStart).match(/[\wäöü\[\]\/\\ÄÖÜß@!?]+$/);   //(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
	return string.substring(0, area.selectionStart).match(/[\wäöüÄ\[\]\%\&\/\\\-ÖÜß^@!?*#()\+{}:;"'~=_`$]+$/);
}

function _setCursorPosition(area, pos) { // This function belongs to autocomplete plugin
											
	if (area.setSelectionRange) {
		area.setSelectionRange(pos, pos);
	} else if (area.createTextRange) {
		var range = area.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}
//******************************************************************Keypad Plug-in***************************************************//

(function($) {

	var pluginName = 'keypad';

	var layoutStandard = [ '  BSCECA', '_1_2_3_+@X', '_4_5_6_-@U',
			'_7_8_9_*@E', '_0_._=_/' ];

	/**
	 * Create the keypad plugin.
	 * <p>
	 * Sets an input field to popup a keypad for keystroke entry, or creates an
	 * inline keypad in a <code>div</code> or <code>span</code>.
	 * </p>
	 * <p>
	 * Expects HTML like:
	 * </p>
	 * 
	 * <pre>
	 * &lt;input type=&quot;text&quot;&gt; or &lt;div&gt;&lt;/div&gt;
	 * </pre>
	 * 
	 * <p>
	 * Provide inline configuration like:
	 * </p>
	 * 
	 * <pre>
	 * &lt;input type=&quot;text&quot; data-keypad=&quot;name: 'value'&quot;/&gt;
	 * </pre>
	 * 
	 * @module Keypad
	 * @augments JQPlugin
	 * @example $(selector).keypad()
	 */
	$.JQPlugin
			.createPlugin({

				/** The name of the plugin. */
				name : pluginName,

				/**
				 * Keypad before show callback. Triggered before the keypad is
				 * shown.
				 * 
				 * @callback beforeShowCallback
				 * @param div
				 *            {jQuery} The div to be shown.
				 * @param inst
				 *            {object} The current instance settings.
				 */

				/**
				 * Keypad on keypress callback. Triggered when a key on the
				 * keypad is pressed.
				 * 
				 * @callback keypressCallback
				 * @param key
				 *            {string} The key just pressed.
				 * @param value
				 *            {string} The full value entered so far.
				 * @param inst
				 *            {object} The current instance settings.
				 */

				/**
				 * Keypad on close callback. Triggered when the keypad is
				 * closed.
				 * 
				 * @callback closeCallback
				 * @param value
				 *            {string} The full value entered so far.
				 * @param inst
				 *            {object} The current instance settings.
				 */

				/**
				 * Keypad is alphabetic callback. Triggered when an alphabetic
				 * key needs to be identified.
				 * 
				 * @callback isAlphabeticCallback
				 * @param ch
				 *            {string} The key to check.
				 * @return {boolean} True if this key is alphabetic, false if
				 *         not.
				 * @example isAlphabetic: function(ch) { return (ch >= 'A' && ch <=
				 *          'Z') || (ch >= 'a' && ch <= 'z'); }
				 */

				/**
				 * Keypad is numeric callback. Triggered when an numeric key
				 * needs to be identified.
				 * 
				 * @callback isNumericCallback
				 * @param ch
				 *            {string} The key to check.
				 * @return {boolean} True if this key is numeric, false if not.
				 * @example isNumeric: function(ch) { return (ch >= '0' && ch <=
				 *          '9'); }
				 */

				/**
				 * Keypad to upper callback. Triggered to convert keys to upper
				 * case.
				 * 
				 * @callback toUpperCallback
				 * @param ch
				 *            {string} The key to convert.
				 * @return {string} The upper case version of this key.
				 * @example toUpper: function(ch) { return ch.toUpperCase(); }
				 */

				/**
				 * Default settings for the plugin.
				 * 
				 * @property [showOn='focus'] {string} 'focus' for popup on
				 *           focus, 'button' for trigger button, or 'both' for
				 *           either.
				 * @property [buttonImage=''] {string} URL for trigger button
				 *           image.
				 * @property [buttonImageOnly=false] {boolean} True if the image
				 *           appears alone, false if it appears on a button.
				 * @property [showAnim='show'] {string} Name of jQuery animation
				 *           for popup.
				 * @property [showOptions=null] {object} Options for enhanced
				 *           animations.
				 * @property [duration='normal'] {string|number} Duration of
				 *           display/closure.
				 * @property [appendText=''] {string} Display text following the
				 *           text field, e.g. showing the format.
				 * @property [useThemeRoller=false] {boolean} True to add
				 *           ThemeRoller classes.
				 * @property [keypadClass=''] {string} Additional CSS class for
				 *           the keypad for an instance.
				 * @property [prompt=''] {string} Display text at the top of the
				 *           keypad.
				 * @property [layout=this.numericLayout] {string} Layout of
				 *           keys.
				 * @property [separator=''] {string} Separator character between
				 *           keys.
				 * @property [target=null] {string|jQuery|Element} Input target
				 *           for an inline keypad.
				 * @property [keypadOnly=true] {boolean} True for entry only via
				 *           the keypad, false for real keyboard too.
				 * @property [randomiseAlphabetic=false] {boolean} True to
				 *           randomise the alphabetic key positions, false to
				 *           keep in order.
				 * @property [randomiseNumeric=false] {boolean} True to
				 *           randomise the numeric key positions, false to keep
				 *           in order.
				 * @property [randomiseOther=false] {boolean} True to randomise
				 *           the other key positions, false to keep in order.
				 * @property [randomiseAll=false] {boolean} True to randomise
				 *           all key positions, false to keep in order.
				 * @property [beforeShow=null] {beforeShowCallback} Callback
				 *           before showing the keypad.
				 * @property [onKeypress=null] {keypressCallback} Callback when
				 *           a key is selected.
				 * @property [onClose=null] {closeCallback} Callback when the
				 *           panel is closed.
				 */
				defaultOptions : {
					showOn : 'focus',
					buttonImage : '',
					buttonImageOnly : false,
					showAnim : 'show',
					showOptions : null,
					duration : 'normal',
					appendText : '',
					useThemeRoller : false,
					keypadClass : '',
					prompt : '',
					layout : [], // Set at the end
					separator : '',
					target : null,
					keypadOnly : true,
					randomiseAlphabetic : false,
					randomiseNumeric : false,
					randomiseOther : false,
					randomiseAll : false,
					beforeShow : null,
					onKeypress : null,
					onClose : null
				},

				/**
				 * Localisations for the plugin. Entries are objects indexed by
				 * the language code ('' being the default US/English). Each
				 * object has the following attributes.
				 * 
				 * @property [buttonText='...'] {string} Display text for
				 *           trigger button.
				 * @property [buttonStatus='Open the keypad'] {string} Status
				 *           text for trigger button.
				 * @property [closeText='Close'] {string} Display text for close
				 *           link.
				 * @property [closeStatus='Close the keypad'] {string} Status
				 *           text for close link.
				 * @property [clearText='Clear'] {string} Display text for clear
				 *           link.
				 * @property [clearStatus='Erase all the text'] {string} Status
				 *           text for clear link.
				 * @property [backText='Back'] {string} Display text for back
				 *           link.
				 * @property [backStatus='Erase the previous character']
				 *           {string} Status text for back link.
				 * @property [spacebarText='&#160;'] {string} Display text for
				 *           space bar.
				 * @property [spacebarStatus='Space'] {string} Status text for
				 *           space bar.
				 * @property [enterText='Enter'] {string} Display text for
				 *           carriage return.
				 * @property [enterStatus='Carriage return'] {string} Status
				 *           text for carriage return.
				 * @property [tabText='→'] {string} Display text for tab.
				 * @property [tabStatus='Horizontal tab'] {string} Status text
				 *           for tab.
				 * @property [shiftText='Shift'] {string} Display text for shift
				 *           link.
				 * @property [shiftStatus='Toggle upper/lower case characters']
				 *           {string} Status text for shift link.
				 * @property [alphabeticLayout=this.qwertyAlphabetic] {string}
				 *           Default layout for alphabetic characters.
				 * @property [fullLayout=this.qwertyLayout] {string} Default
				 *           layout for full keyboard.
				 * @property [isAlphabetic=this.isAlphabetic]
				 *           {isAlphabeticCallback} Function to determine if
				 *           character is alphabetic.
				 * @property [isNumeric=this.isNumeric] {isNumericCallback}
				 *           Function to determine if character is numeric.
				 * @property [toUpper=this.toUpper] {toUpperCallback} Function
				 *           to convert characters to upper case.
				 * @property [isRTL=false] {boolean} True if right-to-left
				 *           language, false if left-to-right.
				 */
				regionalOptions : { // Available regional settings, indexed by
									// language/country code
					'' : { // Default regional settings - English/US
						buttonText : '...',
						buttonStatus : 'Open the keypad',
						closeText : 'Close',
						closeStatus : 'Close the keypad',
						clearText : 'Clear',
						clearStatus : 'Erase all the text',
						backText : 'Back',
						backStatus : 'Erase the previous character',
						spacebarText : '&#160;',
						spacebarStatus : 'Space',
						enterText : 'Enter',
						enterStatus : 'Carriage return',
						tabText : '→',
						tabStatus : 'Horizontal tab',
						shiftText : 'Shift',
						shiftStatus : 'Toggle upper/lower case characters',
						alphabeticLayout : [], // Set at the end
						fullLayout : [],
						isAlphabetic : null,
						isNumeric : null,
						toUpper : null,
						toChange : null,
						isRTL : false
					}
				},

				/** Names of getter methods - those that can't be chained. */
				_getters : [ 'isDisabled' ],

				_curInst : null, // The current instance in use
				_disabledFields : [], // List of keypad fields that have been
										// disabled
				_keypadShowing : false, // True if the popup panel is showing ,
										// false if not
				_keyCode : 0,
				_specialKeys : [],

				_mainDivClass : pluginName + '-popup', // The main keypad
														// division class
				_inlineClass : pluginName + '-inline', // The inline marker
														// class
				_appendClass : pluginName + '-append', // The append marker
														// class
				_triggerClass : pluginName + '-trigger', // The trigger
															// marker class
				_disableClass : pluginName + '-disabled', // The disabled
															// covering marker
															// class
				_inlineEntryClass : pluginName + '-keyentry', // The inline
																// entry marker
																// class
				_rtlClass : pluginName + '-rtl', // The right-to-left marker
													// class
				_rowClass : pluginName + '-row', // The keypad row marker
													// class
				_promptClass : pluginName + '-prompt', // The prompt marker
														// class
				_specialClass : pluginName + '-special', // The special key
															// marker class
				_namePrefixClass : pluginName + '-', // The key name marker
														// class prefix
				_keyClass : pluginName + '-key', // The key marker class
				_keyDownClass : pluginName + '-key-down', // The key down
															// marker class

				// Standard US keyboard alphabetic layout
				qwertyAlphabetic : [ 'qwertyuiop', 'asdfghjkl', 'zxcvbnm' ],
				// Standard US keyboard layout
				qwertyLayout : [
						'!@#$%^&*()_=' + this.HALF_SPACE + this.SPACE
								+ this.CLOSE,
						this.HALF_SPACE + '`~[]{}<>\\|/' + this.SPACE + '789',
						'qwertyuiop\'"' + this.HALF_SPACE + '456',
						this.HALF_SPACE + 'asdfghjkl;:' + this.SPACE + '123',
						this.SPACE + 'zxcvbnm,.?' + this.SPACE
								+ this.HALF_SPACE + '-0+',
						'' + this.TAB + this.ENTER + this.SPACE_BAR
								+ this.SHIFT + this.HALF_SPACE + this.BACK
								+ this.CLEAR ],

				/**
				 * Add the definition of a special key.
				 * 
				 * @param id
				 *            {string} The identifier for this key - access via
				 *            <code>$.keypad.xxx</code>.<id>.
				 * @param name
				 *            {string} The prefix for localisation strings and
				 *            the suffix for a class name.
				 * @param action
				 *            {function} The action performed for this key -
				 *            receives <code>inst</code> as a parameter.
				 * @param noHighlight
				 *            {boolean} True to suppress highlight when using
				 *            ThemeRoller.
				 * @return {Keypad} The keypad object for chaining further
				 *         calls.
				 * @example $.keypad.addKeyDef('CLEAR', 'clear', function(inst) {
				 *          plugin._clearValue(inst); });
				 */
				addKeyDef : function(id, name, action, noHighlight) {
					if (this._keyCode == 32) {
						throw 'Only 32 special keys allowed';
					}
					this[id] = String.fromCharCode(this._keyCode++);
					this._specialKeys.push({
						code : this[id],
						id : id,
						name : name,
						action : action,
						noHighlight : noHighlight
					});
					return this;
				},

				/**
				 * Additional setup for the keypad. Create popup div.
				 */
				_init : function() {
					this.mainDiv = $('<div class="' + this._mainDivClass
							+ '" style="display: none;"></div>');
					this._super();
				},

				_instSettings : function(elem, options) {
					var inline = !elem[0].nodeName.toLowerCase().match(
							/input|textarea/);
					return {
						_inline : inline,
						ucase : false,
						_mainDiv : (inline ? $('<div class="'
								+ this._inlineClass + '"></div>')
								: plugin.mainDiv)
					};
				},

				_postAttach : function(elem, inst) {
					if (inst._inline) {
						elem.append(inst._mainDiv).on('click.' + inst.name,
								function() {
									inst._input.focus();
								});
						this._updateKeypad(inst);
					} else if (elem.is(':disabled')) {
						this.disable(elem);
					}
				},

				/**
				 * Determine the input field for the keypad.
				 * 
				 * @private
				 * @param elem
				 *            {jQuery} The target control.
				 * @param inst
				 *            {object} The instance settings.
				 */
				_setInput : function(elem, inst) {
					inst._input = $(!inst._inline ? elem : inst.options.target
							|| '<input type="text" class="'
							+ this._inlineEntryClass + '" disabled/>');
					if (inst._inline) {
						elem.find('input').remove();
						if (!inst.options.target) {
							elem.append(inst._input);
						}
					}
				},

				_optionsChanged : function(elem, inst, options) {
					$.extend(inst.options, options);
					elem.off('.' + inst.name).siblings('.' + this._appendClass)
							.remove().end().siblings('.' + this._triggerClass)
							.remove();
					var appendText = inst.options.appendText;
					if (appendText) {
						elem[inst.options.isRTL ? 'before' : 'after']
								('<span class="' + this._appendClass + '">'
										+ appendText + '</span>');
					}
					if (!inst._inline) {
						if (inst.options.showOn == 'focus'
								|| inst.options.showOn == 'both') {
							// pop-up keypad when in the marked field
							elem.on('focus.' + inst.name, this.show).on(
									'keydown.' + inst.name, this._doKeyDown);
						}
						if (inst.options.showOn == 'button'
								|| inst.options.showOn == 'both') {
							// pop-up keypad when button clicked
							var buttonStatus = inst.options.buttonStatus;
							var buttonImage = inst.options.buttonImage;
							var trigger = $(inst.options.buttonImageOnly ? $('<img src="'
									+ buttonImage
									+ '" alt="'
									+ buttonStatus
									+ '" title="' + buttonStatus + '"/>')
									: $(
											'<button type="button" title="'
													+ buttonStatus
													+ '"></button>')
											.html(
													buttonImage == '' ? inst.options.buttonText
															: $('<img src="'
																	+ buttonImage
																	+ '" alt="'
																	+ buttonStatus
																	+ '" title="'
																	+ buttonStatus
																	+ '"/>')));
							elem[inst.options.isRTL ? 'before' : 'after']
									(trigger);
							trigger
									.addClass(this._triggerClass)
									.click(
											function() {
												if (plugin._keypadShowing
														&& plugin._lastField == elem[0]) {
													plugin.hide();
												} else {
													plugin.show(elem[0]);
												}
												return false;
											});
						}
					}
					inst.saveReadonly = elem.attr('readonly');
					elem[inst.options.keypadOnly ? 'attr' : 'removeAttr'](
							'readonly', true).on('setData.' + inst.name,
							function(event, key, value) {
								inst.options[key] = value;
							}).on('getData.' + inst.name, function(event, key) {
						return inst.options[key];
					});
					this._setInput(elem, inst);
					this._updateKeypad(inst);
				},

				_preDestroy : function(elem, inst) {
					if (this._curInst == inst) {
						this.hide();
					}
					elem.siblings('.' + this._appendClass).remove().end()
							.siblings('.' + this._triggerClass).remove().end()
							.prev('.' + this._inlineEntryClass).remove();
					elem.empty().off('.' + inst.name)[inst.saveReadonly ? 'attr'
							: 'removeAttr']('readonly', true);
					inst._input.removeData(inst.name);
				},

				/**
				 * Enable the keypad for a jQuery selection.
				 * 
				 * @param elem
				 *            {Element} The target text field.
				 * @example $(selector).keypad('enable');
				 */
				enable : function(elem) {
					elem = $(elem);
					if (!elem.hasClass(this._getMarker())) {
						return;
					}
					var nodeName = elem[0].nodeName.toLowerCase();
					if (nodeName.match(/input|textarea/)) {
						elem.prop('disabled', false).siblings(
								'button.' + this._triggerClass).prop(
								'disabled', false).end().siblings(
								'img.' + this._triggerClass).css({
							opacity : '1.0',
							cursor : ''
						});
					} else if (nodeName.match(/div|span/)) {
						elem.children('.' + this._disableClass).remove();
						this._getInst(elem)._mainDiv.find('button').prop(
								'disabled', false);
					}
					this._disabledFields = $.map(this._disabledFields,
							function(value) {
								return (value == elem[0] ? null : value);
							}); // delete entry
				},

				/**
				 * Disable the keypad for a jQuery selection.
				 * 
				 * @param elem
				 *            {Element} The target text field.
				 * @example $(selector).keypad('disable');
				 */
				disable : function(elem) {
					elem = $(elem);
					if (!elem.hasClass(this._getMarker())) {
						return;
					}
					var nodeName = elem[0].nodeName.toLowerCase();
					if (nodeName.match(/input|textarea/)) {
						elem.prop('disabled', true).siblings(
								'button.' + this._triggerClass).prop(
								'disabled', true).end().siblings(
								'img.' + this._triggerClass).css({
							opacity : '0.5',
							cursor : 'default'
						});
					} else if (nodeName.match(/div|span/)) {
						var inline = elem.children('.' + this._inlineClass);
						var offset = inline.offset();
						var relOffset = {
							left : 0,
							top : 0
						};
						inline.parents().each(function() {
							if ($(this).css('position') == 'relative') {
								relOffset = $(this).offset();
								return false;
							}
						});
						elem.prepend('<div class="' + this._disableClass
								+ '" style="width: ' + inline.outerWidth()
								+ 'px; height: ' + inline.outerHeight()
								+ 'px; left: ' + (offset.left - relOffset.left)
								+ 'px; top: ' + (offset.top - relOffset.top)
								+ 'px;"></div>');
						this._getInst(elem)._mainDiv.find('button').prop(
								'disabled', true);
					}
					this._disabledFields = $.map(this._disabledFields,
							function(value) {
								return (value == elem[0] ? null : value);
							}); // delete entry
					this._disabledFields[this._disabledFields.length] = elem[0];
				},

				/**
				 * Is the text field disabled as a keypad?
				 * 
				 * @param elem
				 *            {Element} The target text field.
				 * @return {boolean} True if disabled, false if enabled.
				 * @example var disabled = $(selector).keypad('isDisabled');
				 */
				isDisabled : function(elem) {
					return (elem && $.inArray(elem, this._disabledFields) > -1);
				},

				/**
				 * Pop-up the keypad for a given text field.
				 * 
				 * @param elem
				 *            {Element|Event} The text field attached to the
				 *            keypad or event if triggered by focus.
				 * @example $(selector).keypad('show');
				 */
				show : function(elem) {
					elem = elem.target || elem;
					if (plugin.isDisabled(elem) || plugin._lastField == elem) { // already
																				// here
						return;
					}
					var inst = plugin._getInst(elem);
					plugin.hide(null, '');
					plugin._lastField = elem;
					plugin._pos = plugin._findPos(elem);
					plugin._pos[1] += elem.offsetHeight; // add the height
					var isFixed = false;
					$(elem).parents().each(function() {
						isFixed |= $(this).css('position') == 'fixed';
						return !isFixed;
					});
					var offset = {
						left : plugin._pos[0],
						top : plugin._pos[1]
					};
					plugin._pos = null;
					// determine sizing offscreen
					inst._mainDiv.css({
						position : 'absolute',
						display : 'block',
						top : '-1000px',
						width : 'auto'
					});
					plugin._updateKeypad(inst);
					// and adjust position before showing
					offset = plugin._checkOffset(inst, offset, isFixed);
					inst._mainDiv.css({
						position : (isFixed ? 'fixed' : 'absolute'),
						display : 'none',
						left : offset.left + 'px',
						top : offset.top + 'px'
					});
					var duration = inst.options.duration;
					var showAnim = inst.options.showAnim;
					var postProcess = function() {
						plugin._keypadShowing = true;
					};
					if ($.effects
							&& ($.effects[showAnim] || ($.effects.effect && $.effects.effect[showAnim]))) {
						var data = inst._mainDiv.data(); // Update old
															// effects data
						for ( var key in data) {
							if (key.match(/^ec\.storage\./)) {
								data[key] = inst._mainDiv.css(key.replace(
										/ec\.storage\./, ''));
							}
						}
						inst._mainDiv.data(data).show(showAnim,
								inst.options.showOptions || {}, duration,
								postProcess);
					} else {
						inst._mainDiv[showAnim || 'show']((showAnim ? duration
								: 0), postProcess);
					}
					if (inst._input[0].type != 'hidden') {
						inst._input[0].focus();
					}
					plugin._curInst = inst;
				},

				/**
				 * Generate the keypad content.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 */
				_updateKeypad : function(inst) {
					var borders = this._getBorders(inst._mainDiv);
					inst._mainDiv
							.empty()
							.append(this._generateHTML(inst))
							.removeClass()
							.addClass(
									inst.options.keypadClass
											+ (inst.options.useThemeRoller ? ' ui-widget ui-widget-content'
													: '')
											+ (inst.options.isRTL ? ' '
													+ this._rtlClass : '')
											+ ' '
											+ (inst._inline ? this._inlineClass
													: this._mainDivClass));
					if ($.isFunction(inst.options.beforeShow)) {
						inst.options.beforeShow.apply(
								(inst._input ? inst._input[0] : null), [
										inst._mainDiv, inst ]);
					}
				},

				/**
				 * Retrieve the size of left and top borders for an element.
				 * 
				 * @private
				 * @param elem
				 *            {jQuery} The element of interest.
				 * @return {number[]} The left and top borders.
				 */
				_getBorders : function(elem) {
					var convert = function(value) {
						return {
							thin : 1,
							medium : 3,
							thick : 5
						}[value] || value;
					};
					return [
							parseFloat(convert(elem.css('border-left-width'))),
							parseFloat(convert(elem.css('border-top-width'))) ];
				},

				/**
				 * Check positioning to remain on screen.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 * @param offset
				 *            {object} The current offset.
				 * @param isFixed
				 *            {boolean} True if the text field is fixed in
				 *            position.
				 * @return {object} The updated offset.
				 */
				_checkOffset : function(inst, offset, isFixed) {
					var pos = inst._input ? this._findPos(inst._input[0])
							: null;
					var browserWidth = window.innerWidth
							|| document.documentElement.clientWidth;
					var browserHeight = window.innerHeight
							|| document.documentElement.clientHeight;
					var scrollX = document.documentElement.scrollLeft
							|| document.body.scrollLeft;
					var scrollY = document.documentElement.scrollTop
							|| document.body.scrollTop;
					// recalculate width as otherwise set to 100%
					var width = 0;
					inst._mainDiv.find(':not(div)').each(
							function() {
								width = Math.max(width, this.offsetLeft
										+ $(this).outerWidth(true));
							});
					inst._mainDiv.css('width', width + 1);
					// reposition keypad panel horizontally if outside the
					// browser window
					if (inst.options.isRTL
							|| (offset.left + inst._mainDiv.outerWidth() - scrollX) > browserWidth) {
						offset.left = Math.max((isFixed ? 0 : scrollX), pos[0]
								+ (inst._input ? inst._input.outerWidth() : 0)
								- (isFixed ? scrollX : 0)
								- inst._mainDiv.outerWidth());
					} else {
						offset.left = Math.max((isFixed ? 0 : scrollX),
								offset.left - (isFixed ? scrollX : 0));
					}
					// reposition keypad panel vertically if outside the browser
					// window
					if ((offset.top + inst._mainDiv.outerHeight() - scrollY) > browserHeight) {
						offset.top = Math.max((isFixed ? 0 : scrollY), pos[1]
								- (isFixed ? scrollY : 0)
								- inst._mainDiv.outerHeight());
					} else {
						offset.top = Math.max((isFixed ? 0 : scrollY),
								offset.top - (isFixed ? scrollY : 0));
					}
					return offset;
				},

				/**
				 * Find an object's position on the screen.
				 * 
				 * @private
				 * @param obj
				 *            {Element} The element to find the position for.
				 * @return {number[]} The element's position.
				 */
				_findPos : function(obj) {
					while (obj && (obj.type == 'hidden' || obj.nodeType != 1)) {
						obj = obj.nextSibling;
					}
					var position = $(obj).offset();
					return [ position.left, position.top ];
				},

				/**
				 * Hide the keypad from view.
				 * 
				 * @param elem
				 *            {Element} The text field attached to the keypad.
				 * @param duration
				 *            {string} The duration over which to close the
				 *            keypad.
				 * @example $(selector).keypad('hide')
				 */
				hide : function(elem, duration) {
					var inst = this._curInst;
					if (!inst || (elem && inst != $.data(elem, this.name))) {
						return;
					}
					if (this._keypadShowing) {
						duration = (duration != null ? duration
								: inst.options.duration);
						var showAnim = inst.options.showAnim;
						if ($.effects
								&& ($.effects[showAnim] || ($.effects.effect && $.effects.effect[showAnim]))) {
							inst._mainDiv.hide(showAnim,
									inst.options.showOptions || {}, duration);
						} else {
							inst._mainDiv[(showAnim == 'slideDown' ? 'slideUp'
									: (showAnim == 'fadeIn' ? 'fadeOut'
											: 'hide'))]
									(showAnim ? duration : 0);
						}
					}
					if ($.isFunction(inst.options.onClose)) {
						inst.options.onClose.apply(
								(inst._input ? inst._input[0] : null), // trigger
																		// custom
																		// callback
								[ inst._input.val(), inst ]);
					}
					if (this._keypadShowing) {
						this._keypadShowing = false;
						this._lastField = null;
					}
					if (inst._inline) {
						inst._input.val('');
					}
					this._curInst = null;
				},

				/**
				 * Handle keystrokes.
				 * 
				 * @private
				 * @param event
				 *            {Event} The key event.
				 */
				_doKeyDown : function(event) {
					if (event.keyCode == 9) { // Tab out
						plugin.mainDiv.stop(true, true);
						plugin.hide();
					}
				},

				/**
				 * Close keypad if clicked elsewhere.
				 * 
				 * @private
				 * @param event
				 *            {Event} The mouseclick details.
				 */
				_checkExternalClick : function(event) {
					if (!plugin._curInst) {
						return;
					}
					var target = $(event.target);
					if (target.closest('.' + plugin._mainDivClass).length === 0
							&& !target.hasClass(plugin._getMarker())
							&& target.closest('.' + plugin._triggerClass).length === 0
							&& plugin._keypadShowing) {
						plugin.hide();
					}
				},

				/**
				 * Toggle between upper and lower case.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 */
				_shiftKeypad : function(inst) {
					inst.ucase = !inst.ucase;
					this._updateKeypad(inst);
					inst._input.focus(); // for further typing
				},
				_altKeypad : function(inst) {
					inst.uchange = !inst.uchange;
					this._updateKeypad(inst);
					inst._input.focus(); // for further typing
				},

				/**
				 * Erase the text field.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 */
				_clearValue : function(inst) {
					this._setValue(inst, '', 0);
					this._notifyKeypress(inst, plugin.DEL);
				},

				/**
				 * Erase the last character.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 */
				_backValue : function(inst) {
					var elem = inst._input[0];
					var value = inst._input.val();
					var range = [ value.length, value.length ];
					range = (inst._input.prop('readonly')
							|| inst._input.prop('disabled') ? range
							: (elem.setSelectionRange /* Mozilla */? [
									elem.selectionStart, elem.selectionEnd ]
									: (elem.createTextRange /* IE */? this
											._getIERange(elem) : range)));
					this._setValue(inst, (value.length == 0 ? '' : value
							.substr(0, range[0] - 1)
							+ value.substr(range[1])), range[0] - 1);
					this._notifyKeypress(inst, plugin.BS);
				},

				/**
				 * Update the text field with the selected value.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 * @param value
				 *            {string} The new character to add.
				 */
				_selectValue : function(inst, value) {
					this.insertValue(inst._input[0], value);
					this._setValue(inst, inst._input.val());
					this._notifyKeypress(inst, value);
				},

				/**
				 * Update the text field with the selected value.
				 * 
				 * @param input
				 *            {string|Element|jQuery} The jQuery selector, input
				 *            field, or jQuery collection.
				 * @param value
				 *            {string} The new character to add.
				 * @example $.keypad.insertValue(field, 'abc');
				 */
				insertValue : function(input, value) {
					input = (input.jquery ? input : $(input));
					var elem = input[0];
					var newValue = input.val();
					var range = [ newValue.length, newValue.length ];
					range = (input.attr('readonly') || input.attr('disabled') ? range
							: (elem.setSelectionRange /* Mozilla */? [
									elem.selectionStart, elem.selectionEnd ]
									: (elem.createTextRange /* IE */? this
											._getIERange(elem) : range)));
					input.val(newValue.substr(0, range[0]) + value
							+ newValue.substr(range[1]));
					pos = range[0] + value.length;
					if (input.is(':visible')) {
						input.focus(); // for further typing
					}
					if (elem.setSelectionRange) { // Mozilla
						if (input.is(':visible')) {
							elem.setSelectionRange(pos, pos);
						}
					} else if (elem.createTextRange) { // IE
						range = elem.createTextRange();
						range.move('character', pos);
						range.select();
					}
				},

				/**
				 * Get the coordinates for the selected area in the text field
				 * in IE.
				 * 
				 * @private
				 * @param elem
				 *            {Element} The target text field.
				 * @return {number[]} The start and end positions of the
				 *         selection.
				 */
				_getIERange : function(elem) {
					elem.focus();
					var selectionRange = document.selection.createRange()
							.duplicate();
					// Use two ranges: before and selection
					var beforeRange = this._getIETextRange(elem);
					beforeRange.setEndPoint('EndToStart', selectionRange);
					// Check each range for trimmed newlines by shrinking the
					// range by one
					// character and seeing if the text property has changed. If
					// it has not
					// changed then we know that IE has trimmed a \r\n from the
					// end.
					var checkCRLF = function(range) {
						var origText = range.text;
						var text = origText;
						var finished = false;
						while (true) {
							if (range.compareEndPoints('StartToEnd', range) == 0) {
								break;
							} else {
								range.moveEnd('character', -1);
								if (range.text == origText) {
									text += '\r\n';
								} else {
									break;
								}
							}
						}
						return text;
					};
					var beforeText = checkCRLF(beforeRange);
					var selectionText = checkCRLF(selectionRange);
					return [ beforeText.length,
							beforeText.length + selectionText.length ];
				},

				/**
				 * Create an IE text range for the text field.
				 * 
				 * @private
				 * @param elem
				 *            {Element} The target text field.
				 * @return {object} The corresponding text range.
				 */
				_getIETextRange : function(elem) {
					var isInput = (elem.nodeName.toLowerCase() == 'input');
					var range = (isInput ? elem.createTextRange()
							: document.body.createTextRange());
					if (!isInput) {
						range.moveToElementText(elem); // Selects all the text
														// for a textarea
					}
					return range;
				},

				/**
				 * Set the text field to the selected value, and trigger any on
				 * change event.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 * @param value
				 *            {string} The new value for the text field.
				 */
				_setValue : function(inst, value) {
					var maxlen = inst._input.attr('maxlength');
					if (maxlen > -1) {
						value = value.substr(0, maxlen);
					}
					inst._input.val(value);
					if (!$.isFunction(inst.options.onKeypress)) {
						inst._input.trigger('change'); // fire the change event
					}
				},

				/**
				 * Notify clients of a keypress.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 * @param key
				 *            {string} The character pressed.
				 */
				_notifyKeypress : function(inst, key) {
					if ($.isFunction(inst.options.onKeypress)) { // trigger
																	// custom
																	// callback
						inst.options.onKeypress.apply(
								(inst._input ? inst._input[0] : null), [ key,
										inst._input.val(), inst ]);
					}
				},

				/**
				 * Generate the HTML for the current state of the keypad.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 * @return {jQuery} The HTML for this keypad.
				 */
				_generateHTML : function(inst) {
					var html = (!inst.options.prompt ? ''
							: '<div class="'
									+ this._promptClass
									+ (inst.options.useThemeRoller ? ' ui-widget-header ui-corner-all'
											: '') + '">' + inst.options.prompt
									+ '</div>');
					var layout = this._randomiseLayout(inst);
					for (var i = 0; i < layout.length; i++) {
						html += '<div class="' + this._rowClass + '">';
						var keys = layout[i].split(inst.options.separator);
						for (var j = 0; j < keys.length; j++) {
							if (inst.ucase) {
								keys[j] = inst.options.toUpper(keys[j]);
							} else if (inst.uchange) {
								keys[j] = inst.options.toChange(keys[j]);
							}

							var keyDef = this._specialKeys[keys[j]
									.charCodeAt(0)];
							if (keyDef) {
								html += (keyDef.action ? '<button type="button" class="'
										+ this._specialClass
										+ ' '
										+ this._namePrefixClass
										+ keyDef.name
										+ (inst.options.useThemeRoller ? ' ui-corner-all ui-state-default'
												+ (keyDef.noHighlight ? ''
														: ' ui-state-highlight')
												: '')
										+ '" title="'
										+ inst.options[keyDef.name + 'Status']
										+ '">'
										+ (inst.options[keyDef.name + 'Text'] || '&#160;')
										+ '</button>'
										: '<div class="'
												+ this._namePrefixClass
												+ keyDef.name + '"></div>');
							} else {
								html += '<button type="button" class="'
										+ this._keyClass
										+ (inst.options.useThemeRoller ? ' ui-corner-all ui-state-default'
												: '') + '">'
										+ (keys[j] == ' ' ? '&#160;' : keys[j])
										+ '</button>';
							}
						}
						html += '</div>';
					}
					html = $(html);
					var thisInst = inst;
					var activeClasses = this._keyDownClass
							+ (inst.options.useThemeRoller ? ' ui-state-active'
									: '');
					html.find('button').mousedown(function() {
						$(this).addClass(activeClasses);
					}).mouseup(function() {
						$(this).removeClass(activeClasses);
					}).mouseout(function() {
						$(this).removeClass(activeClasses);
					}).filter('.' + this._keyClass).click(function() {
						plugin._selectValue(thisInst, $(this).text());
					});
					$.each(this._specialKeys, function(i, keyDef) {
						html.find('.' + plugin._namePrefixClass + keyDef.name)
								.click(
										function() {
											keyDef.action.apply(
													thisInst._input,
													[ thisInst ]);
										});
					});
					return html;
				},

				/**
				 * Check whether characters should be randomised, and, if so,
				 * produce the randomised layout.
				 * 
				 * @private
				 * @param inst
				 *            {object} The instance settings.
				 * @return {string[]} The layout with any requested
				 *         randomisations applied.
				 */
				_randomiseLayout : function(inst) {
					if (!inst.options.randomiseNumeric
							&& !inst.options.randomiseAlphabetic
							&& !inst.options.randomiseOther
							&& !inst.options.randomiseAll) {
						return inst.options.layout;
					}
					var numerics = [];
					var alphas = [];
					var others = [];
					var newLayout = [];
					// Find characters of different types
					for (var i = 0; i < inst.options.layout.length; i++) {
						newLayout[i] = '';
						var keys = inst.options.layout[i]
								.split(inst.options.separator);
						for (var j = 0; j < keys.length; j++) {
							if (this._isControl(keys[j])) {
								continue;
							}
							if (inst.options.randomiseAll) {
								others.push(keys[j]);
							} else if (inst.options.isNumeric(keys[j])) {
								numerics.push(keys[j]);
							} else if (inst.options.isAlphabetic(keys[j])) {
								alphas.push(keys[j]);
							} else {
								others.push(keys[j]);
							}
						}
					}
					// Shuffle them
					if (inst.options.randomiseNumeric) {
						this._shuffle(numerics);
					}
					if (inst.options.randomiseAlphabetic) {
						this._shuffle(alphas);
					}
					if (inst.options.randomiseOther
							|| inst.options.randomiseAll) {
						this._shuffle(others);
					}
					var n = 0;
					var a = 0;
					var o = 0;
					// And replace them in the layout
					for (var i = 0; i < inst.options.layout.length; i++) {
						var keys = inst.options.layout[i]
								.split(inst.options.separator);
						for (var j = 0; j < keys.length; j++) {
							newLayout[i] += (this._isControl(keys[j]) ? keys[j]
									: (inst.options.randomiseAll ? others[o++]
											: (inst.options.isNumeric(keys[j]) ? numerics[n++]
													: (inst.options
															.isAlphabetic(keys[j]) ? alphas[a++]
															: others[o++]))))
									+ inst.options.separator;
						}
					}
					return newLayout;
				},

				/**
				 * Is a given character a control character?
				 * 
				 * @private
				 * @param ch
				 *            {string} The character to test.
				 * @return {boolean} True if a control character, false if not.
				 */
				_isControl : function(ch) {
					return ch < ' ';
				},

				/**
				 * Is a given character alphabetic?
				 * 
				 * @param ch
				 *            {string} The character to test.
				 * @return {boolean} True if alphabetic, false if not.
				 */
				isAlphabetic : function(ch) {
					return (ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z');
				},

				/**
				 * Is a given character numeric?
				 * 
				 * @param ch
				 *            {string} The character to test.
				 * @return {boolean} True if numeric, false if not.
				 */
				isNumeric : function(ch) {
					return (ch >= '0' && ch <= '9');
				},

				/**
				 * Convert a character to upper case.
				 * 
				 * @param ch
				 *            {string} The character to convert.
				 * @return {string} Its uppercase version.
				 */
				toUpper : function(ch) {
					return ch.toUpperCase();
				},

				/**
				 * Randomise the contents of an array.
				 * 
				 * @private
				 * @param values
				 *            {string[]} The array to rearrange.
				 */
				_shuffle : function(values) {
					for (var i = values.length - 1; i > 0; i--) {
						var j = Math.floor(Math.random() * values.length);
						var ch = values[i];
						values[i] = values[j];
						values[j] = ch;
					}
				}
			});

	var plugin = $.keypad;

	// Initialise the key definitions
	plugin.addKeyDef('CLOSE', 'close', function(inst) {
		plugin._curInst = (inst._inline ? inst : plugin._curInst);
		plugin.hide();
	});
	plugin.addKeyDef('CLEAR', 'clear', function(inst) {
		plugin._clearValue(inst);
	});
	plugin.addKeyDef('BACK', 'back', function(inst) {
		plugin._backValue(inst);
	});
	plugin.addKeyDef('SHIFT', 'shift', function(inst) {
		plugin._shiftKeypad(inst);
	});
	plugin.addKeyDef('SPACE_BAR', 'spacebar', function(inst) {
		plugin._selectValue(inst, ' ');
	}, true);
	plugin.addKeyDef('SPACE', 'space');
	plugin.addKeyDef('HALF_SPACE', 'half-space');
	plugin.addKeyDef('ENTER', 'enter', function(inst) {
		plugin._selectValue(inst, '\x0D');
	}, true);//
	plugin.addKeyDef('LARROW', 'larrow', function(inst) {
		plugin._selectValue(inst, '\x2190');
	}, true);
	plugin.addKeyDef('ALT', 'alt', function(inst) {
		plugin._altKeypad(inst);
	});
	// plugin.addKeyDef('TAB', 'tab', function(inst) { plugin._selectValue(inst,
	// '\x09'); }, true);
	plugin.addKeyDef('TAB', 'tab', function(inst) {
		plugin._selectValue(inst, '  ');
	}, true);
	// Initialise the layouts and settings
	plugin.numericLayout = [ '123' + plugin.CLOSE, '456' + plugin.CLEAR,
			'789' + plugin.BACK, plugin.SPACE + '0' ];
	plugin.qwertyLayout = [
			'!@#$%^&*()_=' + plugin.HALF_SPACE + plugin.SPACE + plugin.CLOSE,
			plugin.HALF_SPACE + '`~[]{}<>\\|/' + plugin.SPACE + '789',
			'qwertyuiop\'"' + plugin.HALF_SPACE + '456',
			plugin.HALF_SPACE + 'asdfghjkl;:' + plugin.SPACE + '123',
			plugin.SPACE + 'zxcvbnm,.?' + plugin.SPACE + plugin.HALF_SPACE
					+ '-0+',
			'' + plugin.TAB + plugin.ENTER + plugin.SPACE_BAR + plugin.SHIFT
					+ plugin.HALF_SPACE + plugin.BACK + plugin.CLEAR ], $
			.extend(plugin.regionalOptions[''], {
				alphabeticLayout : plugin.qwertyAlphabetic,
				fullLayout : plugin.qwertyLayout,
				isAlphabetic : plugin.isAlphabetic,
				isNumeric : plugin.isNumeric,
				toUpper : plugin.toUpper
			});
	plugin.setDefaults($.extend({
		layout : plugin.numericLayout
	}, plugin.regionalOptions['']));

	// Add the keypad division and external click check
	$(function() {
		$(document.body).append(plugin.mainDiv).on('mousedown.' + pluginName,
				plugin._checkExternalClick);

	}); // keypad plugin ends here

   /**
	 * Description-Transliteration plug-in 
	 * Developed at-Reverie Language
	 * technologies Pvt. Ltd. last update-20/11/2014
	 **/

	// *************************************************Transliteration Plug-in goes here******************************************//
	
	$.fn.stringTrans = function(options) {

		var settings = $.extend({

			// These are the defaults
			originlan : "undefined",
			domain : "1"
		}, options);

		if (settings.language == null || settings.language == "" /*
																	 * ||
																	 * settings.language!="hindi"
																	 */) {
			// console.log("Stop.Required Field Language is EMPTY");

			alert("Stop.Required Field Language is EMPTY");
			return;

		} else {
			if (settings.rAppId == "" || settings.rAppId == null) {
				alert("Stop.Required Field APP-ID is EMPTY");
				return;
			}

			else {

				return this
						.each(function() {

							var $this = $(this);
							var somlan = settings.language;
							var orilan = settings.originlan;
							if (orilan == "undefined")   /* If origin Language  has not been provided
														    then by default origin language will
													        be the tranliteration language*/
													  
							{                         
								orilan = settings.language;
							}
							var typ = settings.domain;
							var revApi = settings.rApi;
							var revUrl = settings.rAppId;
							var checkSpace = 32;
							var checkEnter = 13;
							var previndex = 0;
							var ctl = this;
							var endPos = ctl.selectionEnd - 1;
							var str = $this.val(); // document.getElementById($this.attr("id")).value;
							// also works

							if (previndex > endPos) {
								previndex = endPos;
							}

							if (settings.keyCode == checkSpace
									) {

								var startPos = previndex;
								var prefix = str.substring(0, startPos);
								var suffix = str.substring(endPos);
								var estr = str.substring(startPos, endPos);
								//var filter = estr.replace(/,/g, '!');
								//var zmr = filter.split('\n');
								if (estr.trim().length == 0) {
									previndex = previndex + 1;
									return;
								}
								
							 var requestIdListObj = new Array();
							 requestIdListObj[0] = 0;
							 var tokenIdListObj = new Array();
							 tokenIdListObj[0] = 0;
							 
							var TokenObj = {
								"0":estr,//zmr[0],
								tokenIdList:tokenIdListObj
							}
							var requestJson = {
								"REV-APP-ID":revUrl,
								"REV-API-KEY":revApi,
								domain:3,
							//	language:somlang,
							    language:somlan,
								originLanguage:somlan,
								webSdk:0,
								"0":TokenObj,
								requestIdList:requestIdListObj
								
							}
							var stringRequestObj = JSON.stringify(requestJson);

						/*		var ajaxurl = buildurl1(revUrl, zmr, somlan,
										orilan, typ);   */

								$.ajax({
									   
									 type : "POST",
									 url : 'http://laascloud.cloudapp.net/parabola/transliterateJSON',
									 data:stringRequestObj,
								     async : true,
								     contentType:"application/json;charset=UTF-8",  
									
								}).done(
										function(strResp) {
											
									var statusCode = strResp.status;
								    if(statusCode == 1){
									var reqIdList = strResp.requestIdList;
									var reqId = reqIdList[0];
									var reqObj = strResp[""+reqId];
									var tokenObj = reqObj[""+0];
									var transSugg = tokenObj.transResponse
									
								
											
											
										/*	var str1 = jQuery
													.parseJSON(strResp);
											var trans = str1.response.trim();   */
											var resultStr = prefix + transSugg
													+ suffix;
											//resultStr = resultStr.replace(/,/g,
											//		'\n');
										//	resultStrfilter = resultStr
											//		.replace(/!/g, ',');
											$this.val(resultStr);

											if (suffix.length > 1) {

												ctl.setSelectionRange(startPos
														+ transSugg.length + 1,
														startPos + transSugg.length
																+ 1);
												previndex = startPos
														+ transSugg.length + 1;
											}

											else {

												previndex = resultStr.length;
											}
										sendcache(somlan,revApi,estr);	
											
									}
										
							});
								// Exception Handling done here

								

							} //Space check if ends here

						}); // this .each function ends here

			} //second top else ends here
			
		}  //Language check else ends here
		
	};// transliteration plugin ends here
	
	/**
	 * Description-keypad selection plug-in 
	 * Developed at-Reverie Language
	 * technologies Pvt. Ltd. last update-20/11/2014
	 **/

	//***********************************************************keypad selection plugin**************************************************//

	$.fn.reverieKeypad = function(options) {

		var settings = $.extend({

			language : "undefined",
			toggleSwitch : 'focus',
			onlyKeypad : false,
			animation : 'show'
		}, options);

		if (settings.vritualKetpad == "notrequired") {
			return;
		} else {
			if (settings.rApi == "" || settings.rApi == null) {
				alert("STOP!API-KEY not Provided");
			} else {
				if (settings.language == "undefined") {
					alert("STOP!Language not Provided");

				} else {

					return this.each(function() {

						var $this = $(this);
						var somlan = settings.language;
						var toggleMode = settings.toggleSwitch;
						var onlyKeyboard = settings.onlyKeypad;
						var anim = settings.animation;
						$this.keypad($.extend({
							prompt : 'Reverie Keypad',
							layout : $.keypad[somlan],
							showOn : toggleMode,
							keypadOnly : onlyKeyboard,
							showAnim : anim
						}, $.keypad.regionalOptions[somlan]));

					});
				} // top third else ends here.
			}    // top second else ends here.
		}       // top first else ends here.

	};        // $.fn.reverieKeypad method ends here.
	
	
/**
  * Description-autocomplete plug-in 
  * Developed at-Reverie Language technologies Pvt. Ltd. 
  * Last Update-26/11/2014
  **/
	
	
/**********************************************************************autocomplete plugin*******************************************************************/
	
	$.fn.autocom = function(options) {   // jQuery is an alias for $
       
		var settings = $.extend({

			// These are the defaults

			originlan : "undefined",
			domain : "1",
			numberofSug : "5"
			
		}, options);

		if (settings.autocomplete == "notRequired") {
			return;
		} else {
			
			if (settings.language == null || settings.language == "") {
				alert(" STOP!Required Field Language is EMPTY");
				return;
			} else {
				if (settings.rAppId == null || settings.rAppId == "") {
				alert(" STOP!Required Field AppId is EMPTY");
				return;
			    } else {

				return this.each(function() {
					var $this = $(this);
					
					
					$this

					.autocomplete({
						position : {
							my : "right top",
							at : "right bottom"
						},

						minLength : 1,
						autoFocus : true,
						source : function(request, response) {
							var lan = settings.language;
							var auto_lan = lan.toLowerCase();
							var orilan = settings.originlan;
							if (orilan == "undefined")          /* If origin Language  has not been provided then by default origin language will
													               be the tranliteration language */
							{ 
								orilan = settings.language;
							}
							orilan = orilan.toLowerCase();
							var typ = settings.domain;
							var revApi=settings.rApi;
							var str = _leftMatch(request.term, $this[0]);
							if(str==null)
							{
								response(null); 
							}
							var Rurl = settings.rAppId;
							var noOfsug = settings.numberofSug - 1;
							 var requestIdListObj = new Array();
							 requestIdListObj[0] = 0;
							 var tokenIdListObj = new Array();
							 tokenIdListObj[0] = 0;
							 
							var TokenObj = {
								"0":str[0],
								tokenIdList:tokenIdListObj
							}
							var requestJson = {
								"REV-APP-ID":Rurl,
								"REV-API-KEY":revApi,
								domain:3,
								language:auto_lan,
								originLanguage:orilan,
								webSdk:0,
								"0":TokenObj,
								requestIdList:requestIdListObj
								
							}
							
							var stringRequestObj = JSON.stringify(requestJson);
							var ajaxurl = 'http://laascloud.cloudapp.net/parabola/transliterateSuggJSON';
							
							$.ajax({
								type : "POST",
								url : ajaxurl,
								data:stringRequestObj,
								async : true,
								contentType:"application/json;charset=UTF-8"
							}).done(function(strResp) {
								var arr={};
								var statusCode = strResp.status;
								if(statusCode == 1){
									var reqIdList = strResp.requestIdList;
									var reqId = reqIdList[0];
									var reqObj = strResp[""+reqId];
									var tokenObj = reqObj[""+0];
									var transSugg = tokenObj.transResponse
									
									for (var i = 0; i < 5; i++) {
										    if(transSugg[i] != undefined){
									        arr[i] = transSugg[i] + " ";
											}
								    }
									response(arr);
									
								  }  
							});
							docache(lan,revApi,str[0]);
						}, // source ends here

						open : function(event, ui) {

						},

						focus : function() {
							// prevent value inserted on focus
							return false;
						},

						select : function(event, ui) {

							var m = _leftMatch(this.value, this)[0];

							var begin = this.value.substring(0,
									this.selectionStart - m.length);
							this.value = begin
									+ ui.item.value
									+ this.value.substring(this.selectionStart,
											this.value.length);
							var pos = begin.length + ui.item.value.length;
							_setCursorPosition(this, pos);
							return false;

						} // select ends here

					}); // autocomplete ends here
					
					//Exception Handling done here

				  });   // this.each ends here
				
				}     // Url check else ends here

			}       // language check else ends here
			
		}         // notrequired else ends here

	};          // autocomplete plugin ends here
	
	
})(jQuery);// plugin ends here //

/**
  * Description-keypad Layout plug-in
  * Developed at-Reverie Language technologies Pvt. Ltd.
  * last update-21/04/2015
  **/
  
(function($) {
		 
//*******************************************************Hindi keypad Layout******************************************************//

		 
		$.keypad.hindiAlphabetic = ['ॊ1234567890-ृ', 'ौैाीूबहगदजडॉ\\', 'ोे्िुपरकतचट','ॆंमनवलस,.य/'];  /*  Keyboard Layout  */
	    $.keypad.hindi = [    
		$.keypad.hindiAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.hindiAlphabetic[1] + $.keypad.HALF_SPACE  ,
		$.keypad.SPACE+$.keypad.hindiAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.hindiAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['hindi'] = {
		buttonText: 'क', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',
		alphabeticLayout: $.keypad.qwertyAlphabetic,
		fullLayout: $.keypad.qwertyLayout,
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
		
	 
	/*	buttonImageOnly: true,                          //image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {                        //right Shift key Response
        return {'ॊ': 'ऒ', '1': 'ऍ', '2': 'ॅ', '3': '्र', '4': 'र्', '5': 'ज्ञ', '6': 'त्र', '7': 'क्ष', '8': 'श्र', '9': '(', '0': ')', '-': 'ः', 'ृ': 'ऋ','ौ': 'औ',
		        'ै': 'ऐ', 'ा': 'आ', 'ी': 'ई', 'ू': 'ऊ', 'ब': 'भ', 'ह': 'ङ', 'ग': 'घ', 'द': 'ध', 'ज': 'झ', 'ड': 'ढ', 'ॉ': 'ञ', '\\': 'ऑ',
				'ो': 'ओ','े': 'ए','्': 'अ','ि': 'इ','ु': 'उ','प': 'फ','र': 'ऱ','क': 'ख','त': 'थ','च': 'छ','ट':'ठ','ॆ':'ऎ','ं':'ँ','म':'ण',
				'न':'ऩ','व':'ऴ','ल':'ळ','स':'श',',':'ष','.':'।','य':'य़'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //left shift key esponse
        return { '1': '१','2':'२','3':'३','4':'४','5':'५','6':'६','7':'७','8':'८','9':'९','ॆ':'॔','ं':'॓','ृ':'ॄ'         
		       }[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['hindi']);    //hindi keypad Layout ends here
	
	
//**************************************************************Bengali keypad Layout*********************************************************//

		  
		$.keypad.bengaliAlphabetic = ['঎1234567890-ৃ', 'ৌৈাীূবহগদজড]\\', 'োে্িুপরকতচট','৆ংমন঵লস,.য/'];  /*  Keyboard Layout  */
	    $.keypad.bengali = [    
		$.keypad.bengaliAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.bengaliAlphabetic[1] + $.keypad.HALF_SPACE  ,
		$.keypad.SPACE+$.keypad.bengaliAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.bengaliAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['bengali'] = {
		buttonText: 'ক', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',
		alphabeticLayout: $.keypad.qwertyAlphabetic,
		fullLayout: $.keypad.qwertyLayout,
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                          //image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {                        //Left Shift key Response
        return {'঎': '঎', '1': '঎', '2': '঎', '3': '্র', '4': 'র্', '5': 'জ্ঞ', '6': 'ত্র', '7': 'ক্ষ', '8': 'শ্র', '9': '(', '0': ')', '-': 'ঃ', 'ৃ': 'ঋ', 'ৌ': 'ঔ',
		        'ৈ': 'ঐ', 'া': 'আ', 'ী': 'ঈ', 'ূ': 'ঊ', 'ব': 'ভ', 'হ': 'ঙ', 'গ': 'ঘ', 'দ': 'ধ', 'জ': 'ঝ', 'ড': 'ঢ', ']': 'ঞ', '\\': '|',
				'ো': 'ও','ে': 'এ','্': 'অ','ি': 'ই','ু': 'উ','প': 'ফ','র': '঱','ক': 'খ','ত': 'থ','চ':'ছ','ট':'ঠ','৆':'঎','ং':'ঁ',
				'ম':'ণ','ন':'঎','঵':'঎','ল':'঎','স':'শ',',':'ষ','.':'঎','য':'য়'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse
        return { '1': '১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯','ৃ':'ৠ','ড':'ড়','ট':'ঢ়'
		       }[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['bengali']);  //bengali keypad Layout ends here
	
	
	//**************************************************************Assamese keypad Layout*********************************************************//
	
	$.keypad.assameseAlphabetic = ['঎1234567890-ৃ', 'ৌৈাীূবহগদজড]\\', 'োে্িুপৰকতচট','৆ংমন঵লস,.য/'];  /*  Keyboard Layout  */
	    $.keypad.assamese = [    
		$.keypad.assameseAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.assameseAlphabetic[1] + $.keypad.HALF_SPACE  ,
		$.keypad.SPACE+$.keypad.assameseAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.assameseAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['assamese'] = {
		buttonText: 'ক', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',
		alphabeticLayout: $.keypad.qwertyAlphabetic,
		fullLayout: $.keypad.qwertyLayout,
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                          //image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {                        //Left Shift key Response
        return {'঎': '঎', '1': '঎', '2': '঎', '3': '্র', '4': 'র্', '5': 'জ্ঞ', '6': 'ত্র', '7': 'ক্ষ', '8': 'শ্র', '9': '(', '0': ')', '-': 'ঃ', 'ৃ': 'ঋ', 'ৌ': 'ঔ',
		        'ৈ': 'ঐ', 'া': 'আ', 'ী': 'ঈ', 'ূ': 'ঊ', 'ব': 'ভ', 'হ': 'ঙ', 'গ': 'ঘ', 'দ': 'ধ', 'জ': 'ঝ', 'ড': 'ঢ', ']': 'ঞ', '\\': '|',
				'ো': 'ও','ে': 'এ','্': 'অ','ি': 'ই','ু': 'উ','প': 'ফ','র': '঱','ক': 'খ','ত': 'থ','চ':'ছ','ট':'ঠ','৆':'঎','ং':'ঁ',
				'ম':'ণ','ন':'঎','঵':'঎','ল':'ৱ','স':'শ',',':'ষ','.':'঎','য':'য়'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse
        return { '1': '১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯','ৃ':'ৠ','ড':'ড়','ট':'ঢ়'
		       }[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['assamese']);  //assamese keypad Layout ends here
	
	
	//**************************************************************Punjabi keypad Layout*********************************************************//
	
	$.keypad.punjabiAlphabetic = ['঎1234567890-঎', 'ੌੈਾੀੂਬਹਗਦਜਡ਼੉', 'ੋੇ੍ਿੁਪਰਕਤਚਟ','੆ਂਮਨਵਲਸ,.ਯ'];  /*  Keyboard Layout  */
	    $.keypad.punjabi = [    
		$.keypad.punjabiAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.punjabiAlphabetic[1] + $.keypad.HALF_SPACE  ,
		$.keypad.SPACE+$.keypad.punjabiAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.punjabiAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['punjabi'] = {
		buttonText: 'ਕ', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,   //            
		fullLayout: $.keypad.qwertyLayout,
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                          //image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {                        //Left Shift key Response
        return { '঎': '঎', '1': '঎', '2': '঎', '3': '੍ਰ', '4': 'ਰ੍', '5': 'ਜ੍ਞ', '6': 'ਤ੍ਰ', '7': 'ਕ੍਷', '8': 'ਸ਼੍ਰ', '9': '(', '0': ')', '-': 'ਃ', 'ੌ': 'ਔ', 'ੈ': 'ਐ',
		        'ਾ': 'ਆ', 'ੀ': 'ਈ', 'ੂ': 'ਊ', 'ਬ': 'ਭ', 'ਹ': 'ਙ', 'ਗ': 'ਘ', 'ਦ': 'ਧ', 'ਜ': 'ਝ', 'ਡ': 'ਢ', '਼': 'ਞ', 'ੋ': 'ਓ', 'ੇ': 'ਏ',
				'੍': 'ਅ','ਿ': 'ਇ','ੁ': 'ਉ','ਪ': 'ਫ','ਰ': '਱','ਕ': 'ਖ','ਤ': 'ਥ','ਚ': 'ਛ','ਟ': 'ਠ','ਂ':'ਁ','ਮ':'ਣ','ਨ':'਩','ਵ':'਴',
				'ਲ':'ਲ਼','ਸ':'ਸ਼',',':'਷','.':'੤','ਯ':'੟'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse
        return { '1': '੧','2':'੨','3':'੩','4':'੪','5':'੫','6':'੬','7':'੭','8':'੮','9':'੯','0':'੦'
		       }[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['punjabi']);  //assamese keypad Layout ends here
	
	
	//**************************************************************Tamil keypad Layout*********************************************************//
	
	$.keypad.tamilAlphabetic = ['ொ1234567890-௃', 'ௌைாீூ஬ஹ஗஦ஜ஡஼௉','ோே்ிுபரகதசட','ெஂமநவலஸ,.ய'];  /*  Keyboard Layout  */
	    $.keypad.tamil = [    
		$.keypad.tamilAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.tamilAlphabetic[1] + $.keypad.HALF_SPACE  ,
		$.keypad.SPACE+$.keypad.tamilAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.tamilAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['tamil'] = {
		buttonText: 'க', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,   //       
		fullLayout: $.keypad.qwertyLayout,             // 
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                 //image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {              //Left Shift key Response
        return { 'ொ': 'ஒ', '1': '঎', '2': '঎', '3': '்ர', '4': 'ர்', '5': 'ஜ்ஞ', '6': 'த்ர', '7': 'க்ஷ', '8': 'ஶ்ர', '9': '(', '0': ')', '-': 'ஃ','ௌ': 'ஔ',
		        'ை': 'ஐ', 'ா': 'ஆ', 'ீ': 'ஈ', 'ூ': 'ஊ', 'ஹ': 'ங', 'ஜ': 'ஞ', 'ோ': 'ஓ', 'ே': 'ஏ', '்': 'அ', 'ி': 'இ', 'ு': 'உ', 'ப': '஫',
				'ர': 'ற','க': '஖','த': '஥','ச': '஛','ட': '஠','ெ': 'எ','ஂ': '஁','ம': 'ண','ந': 'ன','வ':'ழ','ல':'ள','ஸ':'ஶ',',':'ஷ',
				'.':'௤','ய':'௟'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse
        return { '1': '௧','2':'௨','3':'௩','4':'௪','5':'௫','6':'௬','7':'௭','8':'௮','9':'௯','0':'௦'
		       }[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['tamil']);  //tamil keypad Layout ends here 
	
	
	//**************************************************************Telugu keypad Layout*********************************************************//
	
	$.keypad.teluguAlphabetic = ['ొ1234567890-ృ', 'ౌైాీూబహగదజడ఼ౠ','ోే్ిుపరకతచట','ెంమనవలస,.య'];  /*  Keyboard Layout  */
	    $.keypad.telugu = [    
		$.keypad.teluguAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.teluguAlphabetic[1] + $.keypad.HALF_SPACE  ,
		$.keypad.SPACE+$.keypad.teluguAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.teluguAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['telugu'] = {
		buttonText: 'క', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,    
		fullLayout: $.keypad.qwertyLayout,                
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                  // image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {              //Left Shift key Response
        return { 'ొ': 'ఒ', '1': '఍', '2': '౅', '3': '్ర', '4': 'ర్', '5': 'జ్ఞ', '6': 'త్ర','7': 'క్ష', '8': 'శ్ర', '9': '(', '0': ')', '-': 'ః','ృ': 'ఋ',
		        'ౌ': 'ఔ', 'ై': 'ఐ', 'ా': 'ఆ', 'ీ': 'ఈ', 'ూ': 'ఊ', 'బ': 'భ', 'హ': 'ఙ', 'గ': 'ఘ', 'ద': 'ధ', 'జ': 'ఝ', 'డ': 'ఢ', '఼': 'ఞ',
				'ో': 'ఓ','ే': 'ఏ','్': 'అ','ి': 'ఇ','ు': 'ఉ','ప': 'ఫ','ర': 'ఱ','క': 'ఖ','త': 'థ','చ':'ఛ','ట':'ఠ','ె':'ఎ','ం':'ఁ',
				'మ':'ణ','న':'ౡ','వ':'ఌ','ల':'ళ','స':'శ',',':'ష','.':'ౙ','య':'ఽ'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse
        return { '1': '౧','2':'౨','3':'౩','4':'౪','5':'౫','6':'౬','7':'౭','8':'౮','9':'౯','0':'౦','ృ':'ౄ','ీ':'ౣ','ి':'ౢ','క':'ౘ'
		       }[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['telugu']);  //telugu keypad Layout ends here
	
	
	//**************************************************************Kannada keypad Layout*********************************************************//
	
	$.keypad.kannadaAlphabetic = ['ೊ1234567890-ೃ', 'ೌೈಾೀೂಬಹಗದಜಡ౅౅','ೋೇ್ಿುಪರಕತಚಟ','ೆಂಮನವಲಸ,.ಯ'];  /*  Keyboard Layout  */
	    $.keypad.kannada = [    
		$.keypad.kannadaAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.kannadaAlphabetic[1] + $.keypad.HALF_SPACE  , 
		$.keypad.SPACE+$.keypad.kannadaAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.kannadaAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['kannada'] = {
		buttonText: 'ಖ', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,    //           
		fullLayout: $.keypad.qwertyLayout,                
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                  // image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {              //Left Shift key Response  // 
        return { 'ಒೊ': 'ಒ', '1': '఍', '2': '౅', '3': '್ರ', '4': 'ರ್', '5': 'ಜ್ಞ', '6': 'ತ್ರ','7': 'ಕ್ಷ', '8': 'ಶ್ರ', '9': '(', '0': ')', '-': 'ಃ','ೃ': 'ಋ',
		        'ೌ': 'ಔ', 'ೈ': 'ಐ', 'ಾ': 'ಆ', 'ೀ': 'ಈ', 'ೂ': 'ಊ', 'ಬ': 'ಭ', 'ಹ': 'ಙ', 'ಗ': 'ಘ', 'ದ': 'ಧ', 'ಜ': 'ಝ', 'ಡ': 'ಢ', '఼': 'ಞ',
				'ೋ': 'ಓ','ೇ': 'ಏ','್': 'ಅ','ಿ': 'ಇ','ು': 'ಉ','ಪ': 'ಫ','ರ': 'ಱ','ಕ': 'ಖ','ತ': 'ಥ','ಚ':'ಛ','ಟ':'ಠ','ೆ':'ಎ','ಮ':'ಣ',
				'ಲ':'ಳ','ಸ':'ಶ',',':'ಷ','ಂ':'ೡ','ನ':'ಌ','ವ':'ೞ','.':'ೠ','ಯ':'ಽ'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse
        return { '1': '೧','2':'೨','3':'೩','4':'೪','5':'೫','6':'೬','7':'೭','8':'೮','9':'೯','0':'೦','ೃ':'ೣ','ೀ':'ೢ'
		}[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['kannada']);  //kannada keypad Layout ends here
	
	
	//**************************************************************Malayalam keypad Layout*********************************************************//
	
	$.keypad.malayalamAlphabetic = ['ൊ1234567890-ൃ', 'ൗൈാീൂബഹഗദജഡൠർ','ോേ്ിുപരകതചട','െംമനവലസ,.യ'];  /*  Keyboard Layout  */
	    $.keypad.malayalam = [    
		$.keypad.malayalamAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.malayalamAlphabetic[1] + $.keypad.HALF_SPACE  , 
		$.keypad.SPACE+$.keypad.malayalamAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.malayalamAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['malayalam'] = {
		buttonText: 'ക', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,              
		fullLayout: $.keypad.qwertyLayout,                
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                  // image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {              //Left Shift key Response  //  
        return { 'ൊ': 'ഒ', '1': '഍', '2': '൅', '3': '്ര', '4': 'ര്', '5': 'ജ്ഞ', '6': 'ത്ര','7': 'ക്ഷ', '8': 'ൾ', '9': '(', '0': ')', '-': 'ഃ','ൃ': 'ഋ',
		        'ൗ': 'ഔ', 'ൈ': 'ഐ', 'ാ': 'ആ', 'ീ': 'ഈ', 'ൂ': 'ഊ', 'ബ': 'ഭ', 'ഹ': 'ങ', 'ഗ': 'ഘ', 'ദ': 'ധ', 'ജ': 'ഝ', 'ഡ': 'ഢ', 'ർ': 'ഞ',
				'ോ': 'ഓ','േ': 'ഏ','്': 'അ','ി': 'ഇ','ു': 'ഉ','പ': 'ഫ','ര': 'റ','ക': 'ഖ','ത': 'ഥ','ച':'ഛ','ട':'ഠ','െ':'എ','ം':'ൺ',
				'മ':'ണ','ന':'ൻ','വ':'ഴ','ല':'ള','സ':'ശ',',':'ഷ','.':'ൽ','യ':'ഌ','ൠ':'ൡ'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse
        return { '1': '൧','2':'൨','3':'൩','4':'൪','5':'൫','6':'൬','7':'൭','8':'൮','9':'൯','0':'൦','ൃ':'ൄ','ീ':'ൣ','ി':'ൢ ',',':'൰'
		}[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['malayalam']);  //malayalam keypad Layout ends here
	
	
	//**************************************************************Gujarati keypad Layout*********************************************************//
	
	$.keypad.gujaratiAlphabetic = ['૊1234567890-ૃ', 'ૌૈાીૂબહગદજડ઼ૉ','ોે્િુપરકતચટ','ૠંમનવલસ,.ય'];  /*  Keyboard Layout  */
	    $.keypad.gujarati = [    
		$.keypad.gujaratiAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.gujaratiAlphabetic[1] + $.keypad.HALF_SPACE  , 
		$.keypad.SPACE+$.keypad.gujaratiAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.gujaratiAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['gujarati'] = {
		buttonText: 'ખ', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,              
		fullLayout: $.keypad.qwertyLayout,                
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                  // image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {              //Left Shift key Response  //    
        return {'1': 'ઍ', '2': 'ૅ', '3': '્ર', '4': 'ર્', '5': 'જ્ઞ', '6': 'ત્ર','7': 'ક્ષ', '8': 'શ્ર', '9': '(', '0': ')', '-': 'ઃ','ૃ': 'ઋ',
		        'ૌ': 'ઔ', 'ૈ': 'ઐ', 'ા': 'આ', 'ી': 'ઈ', 'ૂ': 'ઊ', 'બ': 'ભ', 'હ': 'ઙ', 'ગ': 'ઘ', 'દ': 'ધ', 'જ': 'ઝ', 'ડ': 'ઢ', '઼': 'ઞ',
				'ૉ': 'ઑ','ો': 'ઓ','ે': 'એ','્': 'અ','િ': 'ઇ','ુ': 'ઉ','પ': 'ફ','ર': '઱','ક': 'ખ','ત':'થ','ચ':'છ','ટ':'ઠ','ં':'ઁ',
				'મ':'ણ','ન':'઩','વ':'઴','લ':'ળ','સ':'શ',',':'ષ','.':'ૣ','ય':'ૢ','ૠ':'ઽ','ન':'ૡ','વ':'ઌ'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse    
        return { '1': '૧','2':'૨','3':'૩','4':'૪','5':'૫','6':'૬','7':'૭','8':'૮','9':'૯','0':'૦','ૃ':'ૄ'
		}[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['gujarati']);  //gujarati keypad Layout ends here
	
	
	//**************************************************************Oriya keypad Layout*********************************************************//
	
	$.keypad.oriyaAlphabetic = ['૊1234567890-ୃ', 'ୌୈାୀୂବହଗଦଜଡ଼୉','ୋେ୍ିୁପରକତଚଟ','ୠଂମନଵଲସ,.ଯ'];  /*  Keyboard Layout  */
	    $.keypad.oriya = [    
		$.keypad.oriyaAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.oriyaAlphabetic[1] + $.keypad.HALF_SPACE  , 
		$.keypad.SPACE+$.keypad.oriyaAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.oriyaAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['oriya'] = {
		buttonText: 'କ', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,              
		fullLayout: $.keypad.qwertyLayout,                
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                  // image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {              //Left Shift key Response  //   
        return {'1': '଍', '2': '୅', '3': '୍ର', '4': 'ର୍', '5': 'ଜ୍ଞ', '6': 'ତ୍ର','7': 'କ୍ଷ', '8': 'ଶ୍ର', '9': '(', '0': ')', '-': 'ଃ','ୃ': 'ଋ',
		        'ୌ': 'ଔ', 'ୈ': 'ଐ', 'ା': 'ଆ', 'ୀ': 'ଈ', 'ୂ': 'ଊ', 'ବ': 'ଭ', 'ହ': 'ଙ', 'ଗ': 'ଘ', 'ଦ': 'ଧ', 'ଜ': 'ଝ', 'ଡ': 'ଢ', '଼': 'ଞ',
				'ୋ': 'ଓ','େ': 'ଏ','୍': 'ଅ','ି': 'ଇ','ୁ': 'ଉ','ପ': 'ଫ','ର': '଱','କ': 'ଖ','ତ': 'ଥ','ଚ':'ଛ','ଟ':'ଠ','ଂ':'ଁ','ମ':'ଣ',
				'ନ':'ଢ଼','ଵ':'ଌ','ଲ':'ଳ','ସ':'ଶ',',':'ଷ','.':'ଽ','ଯ':'ୟ','ୠ':'ୡ'  //,  'ય':'ૢ','ૠ':'ઽ','ન':'ૡ','વ':'ઌ'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse    
        return { '1': '୧','2':'୨','3':'୩','4':'୪','5':'୫','6':'୬','7':'୭','8':'୮','9':'୯','0':'୦','ୃ':'ୄ','ୀ':'ୣ','ଡ':'ଡ଼','ି':'ୢ',',':'୰'
		}[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['oriya']);  //oriya keypad Layout ends here
	
	//**************************************************************marathi keypad Layout*********************************************************//
	
	$.keypad.marathiAlphabetic = ['1234567890-ृॉ','ौैाीूबहगदजड़૊','ोे्िुपरकतचट','ंमनवलस,.य'];  /*  Keyboard Layout  */
	    $.keypad.marathi = [    
		$.keypad.marathiAlphabetic[0] + $.keypad.BACK,
	    $.keypad.TAB+$.keypad.marathiAlphabetic[1] + $.keypad.HALF_SPACE  , 
		$.keypad.SPACE+$.keypad.marathiAlphabetic[2] + $.keypad.ENTER+ $.keypad.HALF_SPACE,
		$.keypad.HALF_SPACE+$.keypad.SHIFT+$.keypad.marathiAlphabetic[3] + $.keypad.ALT,
		$.keypad.SPACE+$.keypad.SPACE+$.keypad.CLEAR+'\''+$.keypad.SPACE_BAR +'ॐ'+ $.keypad.CLOSE];     
		
	$.keypad.regionalOptions['marathi'] = {
		buttonText: 'क', buttonStatus: '',
		closeText: 'close', closeStatus: '',
		altText: 'shift ↑', closeStatus: '',
		clearText: 'clear ', clearStatus: '',
		backText: 'back', backStatus: '',
		spacebarText: '&nbsp;', spacebarStatus: '',
		enterText: 'Enter', enterStatus: 'Enter',
		tabText: 'tab →', tabStatus: '',
		shiftText: 'shift ↑',                               
		alphabeticLayout: $.keypad.qwertyAlphabetic,              
		fullLayout: $.keypad.qwertyLayout,                
		isAlphabetic: $.keypad.isAlphabetic,
		isNumeric: $.keypad.isNumeric,
	 	/*	buttonImageOnly: true,                  // image instead of text will appear
		buttonImage: 'img/keyboard.png', */
		toUpper: function(ch) {              //Left Shift key Response  //   
        return {'1': 'ऍ', '2': 'ॅ', '3': '्र', '4': 'र्', '5': 'ज्ञ', '6': 'त्र','7': 'क्ष', '8': 'श्र', '9': '(', '0': ')', '-': 'ः','ृ': 'ऋ',
		        'ॉ': ' ऑ','ौ': 'औ', 'ै': 'ऐ', 'ा': 'आ', 'ी': 'ई', 'ू': 'ऊ', 'ब': 'भ', 'ह': 'ङ', 'ग': 'घ', 'द': 'ध', 'ज': 'झ', 'ड': 'ढ',
				'़': 'ञ','ो': 'ओ','े': 'ए','्': 'अ','ि': 'इ','ु': 'उ','प': 'फ','र': 'ऱ','क':'ख','त':'थ','च':'छ','ट':'ठ','ं':'ँ',
				'म':'ण','ल':'ळ','स':'श',',':'ष','.':'।','य':'य़'
		       }[ch] || ch; 
         },
		toChange: function(ch) {                       //right shift key esponse    
        return { '1': '१','2':'२','3':'३','4':'४','5':'५','6':'६','7':'७','8':'८','9':'९','0':'०' 
		}[ch] || ch;
         },
		isRTL: false};
	$.keypad.setDefaults($.keypad.regionalOptions['marathi']);  //marathi keypad Layout ends here
	
	
	
})(jQuery);  //keypad Layouts end here
