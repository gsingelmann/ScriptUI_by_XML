﻿/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */Array.prototype.contains = function(x) {	for ( var n = 0; n < this.length; n++ ) if ( this[n] == x ) return n;	return false;}main();function main() {	// ----------------------------------------------------------------------------------------	//	Die Scaffolding XML einlesen	// ----------------------------------------------------------------------------------------		var spath = getScriptPath ();	var xml_file = new File( spath + "/simple.xml" );	xml_file = xml_file.openDlg("Welche Config-XML?", function(f) { return ( f.constructor.name == "Folder" || f.name.search(/xml$/i) != -1 ) } );	if ( xml_file == null ) return;	xml_file.open("r");	var x = xml_file.read();	xml_file.close();	var xml = new XML( x );	var x = "undefined", y = "undefined", std_w = "std_w", std_h = "std_h";	var cr = "\n";		// Ich brauch die eine globale Variable, um automatisch IDs vergeben zu können	var crnt_id = 0;		// Soll w.group.panel.input_id aufgebaut werden oder w.input_id	var flat_object = true;	var final_code = Dialog( xml );		var ft = new File( xml_file.parent.fullName + "/" + xml_file.name.replace(/xml$/i, "jsx") );	ft.open("w");	ft.write( final_code );	ft.close();	return;	// Ich gehe davon aus, dass der <root> der XML dem Dialog entspricht.	function Dialog( xml ) {		var type = xml.@type == "palette" ? "palette" : "dialog";		var str = "";		str += 'function get_params() {'+ cr;		str += '	// ----------------------------------------------------------------' + cr;		str += '	//	Die Dialogkomponenten selbst' + cr;		str += '	// ----------------------------------------------------------------' + cr;		str += '	var std_w = 400, std_h = 100;' + cr		str += '	var sld_lbl_w = 100;' + cr;		str += '	var w = new Window("' + type + '");' + cr;		str += '	w.orientation = "column";' + cr;		str += '	w.alignChildren = ["fill", "fill" ];' + cr + cr;		str += '	// ----------------------------------------------------------------' + cr;		str += '	// Um Eingaben rückgängig machen zu können, müssen wir uns alle Werte merken' + cr;		str += '	// Macht das Auswerten auch leichter ;)' + cr;		str += '	// ----------------------------------------------------------------' + cr;		str += '	w.state = {}' + cr;		var children = xml.children();		for ( var n = 0; n < children.length(); n++ ) {			str += handler( children[n], undefined );		}			str += '	w.show()\n';				str += '	function toggle_iconbutton( btn ) {' + cr;		str += '		try {' + cr;		str += '			var sibs = btn.parent.children;' + cr;		str += '			for ( var c = 0; c < sibs.length; c++ ) {'  + cr;		str += '				if ( sibs[c].type == "iconbutton" ) {' + cr;		str += '					sibs[c].value = false;'  + cr;		str += '					btn.window.state[sibs[c].id] = false;' + cr;		str += '				}' + cr;		str += '			}' + cr;		str += '		} catch(e) { ' + cr;		str += '		}' + cr;		str += '		btn.value = true;' + cr;		str += '		btn.window.state[ btn.id ] = true' + cr;		str += '	}' + cr;		str += '}' + cr;		str += 'get_params();' + cr;				return str;	}	/*	fieldset	fieldset-legend	input:text -> edittext	input:number -> edittext	select	-> dropdown	select size	-> listbox	select size multiple	->listbox	textarea	-> edittext:multiline	slider	button			*/	function handler( element, parent ) {		var className = element.name().toString();		if ( className.toLowerCase() == "fieldset") {			return Fieldset( element, parent ) + "\n";		} else if ( className.toLowerCase() == "input") {			return Input( element, parent ) + "\n";		} else if (className.toLowerCase() == "select") {			return Select( element, parent ) + "\n";		} else if (className.toLowerCase() == "textarea") {			return Textarea( element, parent ) + "\n";		} else if (className.toLowerCase() == "slider") {			return Slider( element, parent ) + "\n";		} else if (className.toLowerCase() == "button") {			return Button( element, parent ) + "\n";		} else if (className.toLowerCase() == "checkbox") {			return Checkbox( element, parent ) + "\n";		} else if (className.toLowerCase() == "img") {			return Image( element, parent ) + "\n";		} else {			return "";		}	}	// ----------------------------------------------------------------------------------------	// 	Fieldsets = Groups und Panels	// ----------------------------------------------------------------------------------------	function Fieldset( element, parent ) {		var str = "";		if ( !parent ) parent = "w";		var fstype = element.legend.toString() != "" ? "panel" : "group";		var orientation = element.@orientation.toString() != "" ? element.@orientation.toString() : "column";		var valign = element.@valign.toString() != "" ? element.@valign.toString() : "fill";		var align = element.@align.toString() != "" ? element.@align.toString() : "fill";		var id = get_id( element );				str += build_line( '// ----------------- %1: %2', fstype, id );		str += build_line( 'w.%2 = %1.add("%3", undefined , "%4")', parent, id, fstype, element.legend.toString() );		str += build_line( 'w.%2.orientation = "%3"', parent, id, orientation );		str += build_line( 'w.%2.alignChildren = ["%4", "%3"]', parent, id, valign, align );		var children = element.children();		for ( var n = 0; n < children.length(); n++ ) {			str += handler( children[n], "w" + "." + id );		}		return str;	}	// ----------------------------------------------------------------------------------------	// 	Eingabefelder	// ----------------------------------------------------------------------------------------	function Input(element, parent) {		var str = "";		var id = get_id( element );		var type = element.@type.toString() || "text";		var value = trim( element.toString() );				str += build_line( '// ----------------- %1: %2', "edittext", id );		str += build_line( '%1.add("statictext", undefined, "%2")', parent, element.@label.toString() );		str += build_line( 'w.%2 = %1.add("edittext", [ undefined, undefined, std_w, 20], "")', parent, id );				str += build_line( 'w.%2.text = "%3"', parent, id, value );		str += build_line( 'w.state.%1 = "%2"', id, value );				str += build_line( 'w.%2.onChange = function() {', parent, id );		if ( type == "number" ) {			str += build_line( '	if ( ! isNaN( Number( this.text ) ) ) {' );			str += build_line( '		w.state.%1 = Number( this.text)', id );			str += build_line( '	} else {' );			str += build_line( '		this.text = w.state.%1', id );			str += build_line( '	}' );		} else {			str += build_line( '		w.state.%1 = this.text', id );					}		str += build_line( '}' );		return str;	}	function Textarea(element, parent) {		var str = "";		var id = get_id( element );		var value = trim(element.toString()).replace(/\r/g, "\\r").replace(/\n/g, "\\n");		str += build_line( '// ----------------- %1: %2', "textarea", id );		str += build_line( '%1.add("statictext", undefined, "%2")', parent, element.@label.toString() );		str += build_line( 'w.%2 = %1.add("edittext", [ undefined, undefined, std_w, std_h], "", {multiline:true, scrolling: true, wantReturn: true})', parent, id );str += build_line ( 'w.%2.text = w.state.%2 = "%3";', parent, id, value );		str += build_line( 'w.%2.onChange = function() {', parent, id );		str += build_line( '	this.window.state.%1 = this.text', id );		str += build_line( '}' );		return str;	}	// ----------------------------------------------------------------------------------------	// 	Checkbox	// ----------------------------------------------------------------------------------------	function Checkbox(element, parent) {		var str = "";		var id = get_id( element );		var value = element.toString() == "" ? "false" : "true";		str += build_line( '// ----------------- %1: %2', "checkbox", id );		str += build_line( 'w.%2 = %1.add("checkbox", undefined, "%3")', parent, id, element.@label.toString() );		str += build_line ( 'w.%2.value = w.state.%2 = "%3";', parent, id, value );		str += build_line( 'w.%2.onClick = function() {', parent, id );		str += build_line( '	this.window.state.%1 = this.value', id );		str += build_line( '}' );				return str;	}	// ----------------------------------------------------------------------------------------	// 	Slider	// ----------------------------------------------------------------------------------------	function Slider(element, parent) {		var str = "";		var id = get_id( element );		var min = element.@min.toString() != "" ? element.@min.toString() : "0";		var max = element.@max.toString() != "" ? element.@max.toString() : "100";		var val = element.toString() != "" ? element.toString() : "50";				str += build_line( '// ----------------- %1: %2', "slider", id );		str += build_line( 'w.%2_group = %1.add("group", undefined, "", {orientation: "row"})', parent, id );		str += build_line( 'w.%2_group.add("statictext", [undefined, undefined, sld_lbl_w, 20], "%3")', parent, id, element.@label.toString() );		str += build_line( 'w.%2 = w.%2_group.add("slider", [undefined, undefined, (std_w - (sld_lbl_w + 30)), 20], "")', parent, id );		str += build_line( 'w.%2_fd = w.%2_group.add("edittext", [undefined, undefined, 30, 20], "")', parent, id );				str += build_line( 'w.%2.minvalue = %3', parent, id, min );		str += build_line( 'w.%2.maxvalue = %3', parent, id, max );		str += build_line( 'w.%2.value = %3', parent, id, val );		str += build_line( 'w.%2_fd.text = "%3"', parent, id, val );		str += build_line( 'w.%2.id = "%2"', parent, id );		str += build_line( 'w.state.%1 = %2', id, val);				str += build_line( 'w.%2.onChange = function() {', parent, id );		str += build_line( '	w.%2_fd.text = this.value', parent, id );		str += build_line( '	this.window.state[ this.id ] = this.value' );		str += build_line( '}' );		str += build_line( 'w.%2_fd.onChange = function() {', parent, id );		str += build_line( '	if ( ! isNaN( Number( this.text ) ) ) {' );		str += build_line( '		w.%2.value = Number(this.text)', parent, id );		str += build_line( '		w.state.%1 = Number( this.text)', id );		str += build_line( '	} else {' );		str += build_line( '		this.text = w.%2.value', parent, id );		str += build_line( '	}' );		str += build_line( '}' );		return str;	}	// ----------------------------------------------------------------------------------------	// 	Image	// ----------------------------------------------------------------------------------------	function Image( element, parent ) {		var str = "";		var id = get_id( element );		str += build_line( '// ----------------- %1: %2', "image", id );				var src = element.@src.toString();		if ( src ) {			var img_string = get_escaped_image_string( src );			if ( img_string != null ) {					str += "\t"+parent+"."+id+' = '+parent+'.add("image", undefined, unescape("' + img_string + '"), {style: "toolbutton"} );\n';				} else {				str += build_line( 'w.%2 = %1.add("statictext", undefined, "%3")', parent, id, "missing image-src" );			}		} else {			str += build_line( 'w.%2 = %1.add("statictext", undefined, "%3")', parent, id, "missing image-src" );		}		return str;	}	// ----------------------------------------------------------------------------------------	// 	Buttons	// ----------------------------------------------------------------------------------------	function Button(element, parent) {		var dbg = false;		var str = "";		var id = get_id( element );		str += build_line( '// ----------------- %1: %2', "button", id );		if (dbg) $.writeln( "id: " + id );				if ( id == "defaultElement" || id == "cancelElement" ) {			str += build_line( 'w.%2 = %1.add("button", undefined, "%3")', parent, id, element.@label.toString() );			str += build_line( 'w.%2.onClick= function() {', parent, id );			if ( id == "defaultElement" ) {				str += build_line( '	this.window.close(1)');				str += build_line( '  alert("state\\n" + this.window.state.toSource() )');			} else {				str += build_line( '	this.window.close(2)');			}			str += build_line( '}' );		} else {			// 4.7. : ein button kann ein image="bildname.png" Attribut haben.			//		Das Bild muss im selben Ordner liegen wie die XML Datei			//		Die XML-fileobject steckt main:global in xml_file			var img = element.@image.toString();			if ( img ) {				var toggle = element.@toggle.toString();				toggle = ( toggle == "true" ) ? true : false;				var value = element.@value.toString();				value = (value == "true") ? true : false				var img_string = get_escaped_image_string( img );				if ( img_string != null ) {						str += "\tw."+id+' = '+parent+'.add(\						"iconbutton", \						undefined, \						unescape("' + img_string + '"), \						{style: "toolbutton"' 							+ (toggle ? ", toggle:true" : "")							+ (value ? ", value:true" : "" )						+ '} );\n';					str += build_line( 'w.%2["id"] = "%2";', parent, id );				} else {					str += build_line( 'w.%2 = %1.add("button", undefined, "%3")', parent, id, "missing icon" );				}			} else {				str += build_line( 'w.%2 = %1.add("button", undefined, "%3")', parent, id, element.@label.toString() );			}			str += build_line( 'w.%2.onClick = function() {', parent, id );			if ( toggle ) {				str += build_line( '	toggle_iconbutton( this )');				/*				str += build_line( '	try {');				str += build_line( '		var kids = this.parent.children;');				str += build_line( '		for ( var c = 0; c < kids.length; c++ ) {' );				str += build_line( '			if ( kids[c].type == "iconbutton" ) {' );				str += build_line( '				kids[c].value = false;' );				str += build_line( '				this.window.state[kids[c].id] = false;');				str += build_line( '			}');				str += build_line( '		}');				str += build_line( '	} catch(e) { ');				str += build_line( '	}');				str += build_line( '	this.value = true;');				*/			} else {				str += build_line( '\t// What should happen on Click?');			}			str += build_line( '}' );					}				return str;	}	// ----------------------------------------------------------------------------------------	// 	Dropdowns und Listen	// ----------------------------------------------------------------------------------------	function Select(element, parent) {		var str = "";		var id = get_id( element );		str += build_line( '// ----------------- %1: %2', "select", id );				// Wir brauchen ein Array (string[] ), um daraus die Liste zusammenzutstellen		if ( element.hasComplexContent()  ) {			str += build_line( "var aux = [" );			for ( var n = 0; n < element.children().length(); n++ ) {				str += build_line(' "%1", ', element.child(n).toString() );			}			str += build_line( "]");		} else if ( element.@var.toString() != "" ) {			str += build_line( 'var %1 = ["eins", "zwei", "drei"];	// #### Dies muss gegen eine sinnvolle Variablendefinition getauscht werden ####', element.@var.toString() );			str += build_line( 'var aux = %1.concat([]);  // Kopie des Array anlegen', element.@var.toString() );		} else {			// Darf eigentlich nicht passieren, aber wer baut schon immer sinnvolle XMLs?			str += build_line( 'var aux = [1, 2, 3]' );		}			var type = "dropdownlist";		if ( element.@multiple.toString() != "" ) {			type = "listbox";		} else if ( element.hasComplexContent() && element.children().length() < 4 ) {			type = "radio";		}		str += build_line( '%1.add("statictext", undefined, "%2")', parent, element.@label.toString() );		if ( type == "radio" ) {			str += build_line( 'var auxg = %1.add("group")', parent );			str += build_line( 'for ( var n = 0; n < aux.length; n++ ) auxg.add("radiobutton", undefined, aux[n]);' );		} else {			str += build_line( 'w.%2 = %1.add("%3", undefined, "")', parent, id, type );			str += build_line( 'for ( var n = 0; n < aux.length; n++ ) {' );			str += build_line( '	w.%2.add("item", aux[n]);', parent, id );			str += build_line( '}' );			if ( type == "listbox" ) {				str += build_line( 'w.%2.onChange = function() {', parent, id );				str += build_line( '	var item = this.find( this.selection );' );				str += build_line( '	if (item) item.checked = ! item.checked; ' );				str += build_line( '}' );			}		}		return str;	}	// ----------------------------------------------------------------------------------------	// 	Utilities	// ----------------------------------------------------------------------------------------	function get_escaped_image_string( img_name ) {		// 4.7. : ein button kann ein img="bildname.png" Attribut haben.		//		Das Bild muss im selben Ordner liegen wie die XML Datei		//		Die XML-fileobject steckt main:global in xml_file		var img_file = new File( xml_file.parent.fullName + "/" + img_name );		if ( img_file.exists ) {			img_file.encoding = "BINARY";			img_file.open("r");			var img_bytes = escape( img_file.read() );			img_file.close();			return img_bytes;		} else {			return null;		}	}	function get_id( element ) {		// Der Tag für panels und gruppen ist <fieldset>		var fstype = element.legend.toString() != "" ? "p" : "g";		var initial = element.name().toString().charAt(0);		initial = (initial == "f") ? fstype : initial;		var id = element.@id.toString() != "" ? element.@id.toString() : (initial + crnt_id++);		return id;	}		function build_line() {		if (false) $.writeln( arguments.toSource() );		if (arguments.length == 0) {			return "\t\n";		} else if ( arguments.length == 1 ) {			return "\t" + arguments[0] + "\n";		} else {			var a = arguments[0];			var b = (arguments[1].constructor.name == "Array") ? [""].concat( arguments[1] ) : arguments;			for (var n = b.length-1; n > 0; n--) {				var re = new RegExp( "%" + n, "g" );				a = a.replace( re, b[n].toString() );			}			return "\t" + a + "\n";		}	}	function trim(s) {		return s.replace(/^(\n|\r|\s)+/, "").replace(/(\n|\r|\s)+$/, "");	}		function getScriptPath() {		var skriptPath, scriptFolderPath;		try {			skriptPath  = app.activeScript.fullName;			skriptFolderPath  = app.activeScript.parent;		} 		catch (e) { 			/* We're running from the ESTK*/			skriptPath = e.fileName		}		return skriptPath;	}}