var some_list = ["eins", "zwei", "drei", "vier", "f\u00FCnf"]var some_other_list = ["dreitausend", "dreitausendeins", "dreitausendzwei", "dreitausenddrei", "dreitausendvier"]var some_text = 'Ein Textfeldinhalt'var some_number = 1var some_boolean = false function my_dialog() {	// ----------------------------------------------------------------	//	Die Dialogkomponenten selbst	// ----------------------------------------------------------------	var std_w = 400, std_h = 100;	var w = new Window("dialog");	w.orientation = "column";	w.alignChildren = ["fill", "fill" ];  w.main = w.add("group", undefined , "");  w.main.orientation = "row";  w.main.alignChildren = ["fill", "fill"];    w.main.literals = w.main.add("panel", undefined , "Literals");    w.main.literals.orientation = "column";    w.main.literals.alignChildren = ["fill", "top"];      w.main.literals.add("statictext", undefined , "Eins von Vielen");      w.main.literals.one_of_n_literal = w.main.literals.add("dropdownlist", [undefined, undefined, std_w, 20]);      w.main.literals.add("statictext", undefined , "Mehrere von Vielen");      w.main.literals.n_of_m_literal = w.main.literals.add("listbox", [undefined, undefined, std_w, std_h]);      w.main.literals.add("statictext", undefined , "Zahl");      w.main.literals.number_literal = w.main.literals.add("edittext", [undefined, undefined, std_w, 20], "5");      w.main.literals.add("statictext", undefined , "Text");      w.main.literals.text_literal = w.main.literals.add("edittext", [undefined, undefined, std_w, 20], "some text");      w.main.literals.checkbox_literal = w.main.literals.add("checkbox", undefined , "Ja/Nein");    w.main.references = w.main.add("panel", undefined , "Referenzen");    w.main.references.orientation = "column";    w.main.references.alignChildren = ["fill", "top"];      w.main.references.add("statictext", undefined , "Eins von Vielen");      w.main.references.one_of_n = w.main.references.add("dropdownlist", [undefined, undefined, std_w, 20]);      w.main.references.add("statictext", undefined , "Mehrere von Vielen");      w.main.references.n_of_m = w.main.references.add("listbox", [undefined, undefined, std_w, std_h]);      w.main.references.add("statictext", undefined , "Zahl");      w.main.references.number = w.main.references.add("edittext", [undefined, undefined, std_w, 20], some_number);      w.main.references.add("statictext", undefined , "Text");      w.main.references.some_text = w.main.references.add("edittext", [undefined, undefined, std_w, 20], some_text);      w.main.references.checkbox = w.main.references.add("checkbox", undefined , "Ja/Nein");  w.buttons = w.add("group", undefined , "");  w.buttons.orientation = "row";  w.buttons.alignChildren = ["fill", "fill"];    w.buttons.test = w.buttons.add("button", undefined , "Schaltfl�che");    w.cancelElement = w.buttons.add("button", undefined , "Abbrechen");    w.defaultElement = w.buttons.add("button", undefined , "OK");	// ----------------------------------------------------------------	// 	Default-Werte und Listboxen einf�llen,  etc	// ----------------------------------------------------------------	w.values = {};	for ( var n = 0; n < ["einundzwanzig", "zweiundzwanzig", "dreiundzwanzig"].length; n++ ) {		var aux = w.main.literals.one_of_n_literal.add('item', ["einundzwanzig", "zweiundzwanzig", "dreiundzwanzig"][n])		w.main.literals.one_of_n_literal.selection = w.main.literals.one_of_n_literal[0]	}	w.values.one_of_n_literal = '['	for ( var n = 0; n < ["vierunddrei\u00DFig", "f\u00FCnfunddrei\u00DFig", "sechsunddrei\u00DFig"].length; n++ ) {		var aux = w.main.literals.n_of_m_literal.add('item', ["vierunddrei\u00DFig", "f\u00FCnfunddrei\u00DFig", "sechsunddrei\u00DFig"][n])		aux.checked = false;	}	w.values.n_of_m_literal = '['	w.values.number_literal = '5';	w.values.text_literal = 'some text';	w.values.checkbox_literal = 'true';	for ( var n = 0; n < some_list.length; n++ ) {		var aux = w.main.references.one_of_n.add('item', some_list[n])		w.main.references.one_of_n.selection = w.main.references.one_of_n[0]	}	w.values.one_of_n = 's'	for ( var n = 0; n < some_other_list.length; n++ ) {		var aux = w.main.references.n_of_m.add('item', some_other_list[n])		aux.checked = false;	}	w.values.n_of_m = 's'	w.values.number = some_number;	w.values.some_text = some_text;	w.values.checkbox = some_boolean;	// ----------------------------------------------------------------	// 	Event Handler f�r quasi alles	// ----------------------------------------------------------------	w.main.literals.one_of_n_literal.onChange = function () {		var w = this.window;		$.writeln( 'w.main.literals.one_of_n_literal was changed' );		w.values.one_of_n_literal = this.selection;		var item = this.find( this.selection );		if( item ) item.checked = ! item.checked;	}	w.main.literals.n_of_m_literal.onChange = function () {		var w = this.window;		$.writeln( 'w.main.literals.n_of_m_literal was changed' );		w.values.n_of_m_literal = this.selection;		var item = this.find( this.selection );		if( item ) item.checked = ! item.checked;	}	w.main.literals.number_literal.onChange = function () {		var w = this.window;		$.writeln( 'w.main.literals.number_literal was changed' );		if ( isNaN( Number ( this.text ) ) ) { 			this.text = w.values.number_literal;		} else {			w.values.number_literal = this.text		}	}	w.main.literals.text_literal.onChange = function () {		var w = this.window;		$.writeln( 'w.main.literals.text_literal was changed' );		w.values.text_literal = this.text	}	w.main.literals.checkbox_literal.onClick = function () {		var w = this.window;		$.writeln( 'w.main.literals.checkbox_literal was clicked' );		w.values.checkbox_literal = this.value;	}	w.main.references.one_of_n.onChange = function () {		var w = this.window;		$.writeln( 'w.main.references.one_of_n was changed' );		w.values.one_of_n = this.selection;		var item = this.find( this.selection );		if( item ) item.checked = ! item.checked;	}	w.main.references.n_of_m.onChange = function () {		var w = this.window;		$.writeln( 'w.main.references.n_of_m was changed' );		w.values.n_of_m = this.selection;		var item = this.find( this.selection );		if( item ) item.checked = ! item.checked;	}	w.main.references.number.onChange = function () {		var w = this.window;		$.writeln( 'w.main.references.number was changed' );		if ( isNaN( Number ( this.text ) ) ) { 			this.text = w.values.number;		} else {			w.values.number = this.text		}	}	w.main.references.some_text.onChange = function () {		var w = this.window;		$.writeln( 'w.main.references.some_text was changed' );		w.values.some_text = this.text	}	w.main.references.checkbox.onClick = function () {		var w = this.window;		$.writeln( 'w.main.references.checkbox was clicked' );		w.values.checkbox = this.value;	}	w.buttons.test.onClick = function () {		var w = this.window;		$.writeln( 'w.buttons.test was clicked' );	}	w.cancelElement.onClick = function () {		var w = this.window;		$.writeln( 'w.cancelElement was clicked' );		w.close(0)	}	w.defaultElement.onClick = function () {		var w = this.window;		$.writeln( 'w.defaultElement was clicked' );		alert('ok\n' + w.values.toSource() );		w.close(1)	}	w.show()}my_dialog();