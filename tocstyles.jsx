 function my_dialog() {	// ----------------------------------------------------------------	//	Die Dialogkomponenten selbst	// ----------------------------------------------------------------	var std_w = 400, std_h = 100;	var w = new Window("dialog");	w.orientation = "column";	w.alignChildren = ["fill", "fill" ];  w.main = w.add("group", undefined , "");  w.main.orientation = "row";  w.main.alignChildren = ["fill", "fill"];    w.main.col_0 = w.main.add("group", undefined , "");    w.main.col_0.orientation = "column";    w.main.col_0.alignChildren = ["fill", "fill"];      w.main.col_0.add("statictext", undefined , "");      w.main.col_0.d1 = w.main.col_0.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_0.add("statictext", undefined , "");      w.main.col_0.d1 = w.main.col_0.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_0.add("statictext", undefined , "");      w.main.col_0.d1 = w.main.col_0.add("edittext", [undefined, undefined, std_w, 20], "doc1");    w.main.col_1 = w.main.add("group", undefined , "");    w.main.col_1.orientation = "column";    w.main.col_1.alignChildren = ["fill", "fill"];      w.main.col_1.add("statictext", undefined , "");      w.main.col_1.d1 = w.main.col_1.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_1.add("statictext", undefined , "");      w.main.col_1.d1 = w.main.col_1.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_1.add("statictext", undefined , "");      w.main.col_1.d1 = w.main.col_1.add("edittext", [undefined, undefined, std_w, 20], "doc1");    w.main.col_2 = w.main.add("group", undefined , "");    w.main.col_2.orientation = "column";    w.main.col_2.alignChildren = ["fill", "fill"];      w.main.col_2.add("statictext", undefined , "");      w.main.col_2.d1 = w.main.col_2.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_2.add("statictext", undefined , "");      w.main.col_2.d1 = w.main.col_2.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_2.add("statictext", undefined , "");      w.main.col_2.d1 = w.main.col_2.add("edittext", [undefined, undefined, std_w, 20], "doc1");    w.main.col_3 = w.main.add("group", undefined , "");    w.main.col_3.orientation = "column";    w.main.col_3.alignChildren = ["fill", "fill"];      w.main.col_3.add("statictext", undefined , "");      w.main.col_3.d1 = w.main.col_3.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_3.add("statictext", undefined , "");      w.main.col_3.d1 = w.main.col_3.add("edittext", [undefined, undefined, std_w, 20], "doc1");      w.main.col_3.add("statictext", undefined , "");      w.main.col_3.d1 = w.main.col_3.add("edittext", [undefined, undefined, std_w, 20], "doc1");  w.add("statictext", undefined , "Eins von Vielen");  w.one_of_n_literal = w.add("dropdownlist", [undefined, undefined, std_w, 20]);  w.buttons = w.add("group", undefined , "");  w.buttons.orientation = "row";  w.buttons.alignChildren = ["fill", "fill"];    w.buttons.test = w.buttons.add("button", undefined , "Schaltfl�che");    w.cancelElement = w.buttons.add("button", undefined , "Abbrechen");    w.defaultElement = w.buttons.add("button", undefined , "OK");	// ----------------------------------------------------------------	// 	Default-Werte und Listboxen einf�llen,  etc	// ----------------------------------------------------------------	w.values = {};	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	w.values.d1 = 'doc1';	for ( var n = 0; n < ["einundzwanzig", "zweiundzwanzig", "dreiundzwanzig"].length; n++ ) {		var aux = w.one_of_n_literal.add('item', ["einundzwanzig", "zweiundzwanzig", "dreiundzwanzig"][n])		w.one_of_n_literal.selection = w.one_of_n_literal[0]	}	w.values.one_of_n_literal = '['	// ----------------------------------------------------------------	// 	Event Handler f�r quasi alles	// ----------------------------------------------------------------	w.main.col_0.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_0.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_0.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_0.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_0.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_0.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_1.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_1.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_1.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_1.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_1.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_1.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_2.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_2.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_2.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_2.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_2.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_2.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_3.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_3.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_3.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_3.d1 was changed' );		w.values.d1 = this.text	}	w.main.col_3.d1.onChange = function () {		var w = this.window;		$.writeln( 'w.main.col_3.d1 was changed' );		w.values.d1 = this.text	}	w.one_of_n_literal.onChange = function () {		var w = this.window;		$.writeln( 'w.one_of_n_literal was changed' );		w.values.one_of_n_literal = this.selection;		var item = this.find( this.selection );		if( item ) item.checked = ! item.checked;	}	w.buttons.test.onClick = function () {		var w = this.window;		$.writeln( 'w.buttons.test was clicked' );	}	w.cancelElement.onClick = function () {		var w = this.window;		$.writeln( 'w.cancelElement was clicked' );		w.close(0)	}	w.defaultElement.onClick = function () {		var w = this.window;		$.writeln( 'w.defaultElement was clicked' );		alert('ok\n' + w.values.toSource() );		w.close(1)	}	w.show()}my_dialog();