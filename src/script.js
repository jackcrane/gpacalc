var loc = window.location.href
var boolLoc = loc.includes("summitcds.myschoolapp.com")


const GPA_MAP = {100:4.3,99:4.3,98:4.3,97:4.3,96:4.0,95:4.0,94:4.0,93:3.7,92:3.7,91:3.7,90:3.7,89:3.3,88:3.3,87:3.3,86:3.0,85:3.0,84:3.0,83:2.7,82:2.7,81:2.7,80:2.7,79:2.3,78:2.3,77:2.3,76:2.0,75:2.0,74:2.0,73:1.7,72:1.7,71:1.7,70:1.7,69:1.3,68:1.3,67:1.3,66:1.0,65:1.0,64:1.0,63:0.7,62:0.7,61:0.7,60:0.7,59:0,58:0,57:0,56:0,55:0,54:0,53:0,52:0,51:0,50:0,49:0,48:0,47:0,46:0,45:0,44:0,43:0,42:0,41:0,40:0,39:0,38:0,37:0,36:0,35:0,34:0,33:0,32:0,31:0,30:0,29:0,28:0,27:0,26:0,25:0,24:0,23:0,22:0,21:0,20:0,19:0,18:0,17:0,16:0,15:0,14:0,13:0,12:0,11:0,10:0,9:0,8:0,7:0,6:0,5:0,4:0,3:0,2:0,1:0,0:0}

const gpa_avg = []

if(boolLoc == true) {
	// This is the portal
	setTimeout(function(){ grade(); }, 5500);
} else {
	// this is not the portal, do nothing

}

window.onhashchange = function() { 
     setTimeout(function(){ grade(); }, 5500);
}


function grade() {
	var rows = getElements()
	var elem1 = rows[0]
	var elem2 = rows[1]
	var elem3 = rows[2]
	var elem4 = rows[3]
	var elem5 = rows[4]
	var elem6 = rows[5]
	var elem7 = rows[6]
	var elem8 = rows[7]
	var elem9 = rows[8]
	var elem10 = rows[9]
	var elem11 = rows[10]
	var elem12 = rows[11]
	var elem13 = rows[12]
	var elem14 = rows[13]
	var elem15 = rows[14]
	var elem16 = rows[15]
	var elem17 = rows[16]
	var elem18 = rows[17]
	var elem19 = rows[18]
	var elem20 = rows[19]
	var elem21 = rows[20]
	var elem22 = rows[21]
	var elem23 = rows[22]

	if(calcGrade(elem1) == "nc") {} else {gpa_avg.push(calcGrade(elem1))}
	if(calcGrade(elem2) == "nc") {} else {gpa_avg.push(calcGrade(elem2))}
	if(calcGrade(elem3) == "nc") {} else {gpa_avg.push(calcGrade(elem3))}
	if(calcGrade(elem4) == "nc") {} else {gpa_avg.push(calcGrade(elem4))}
	if(calcGrade(elem5) == "nc") {} else {gpa_avg.push(calcGrade(elem5))}
	if(calcGrade(elem6) == "nc") {} else {gpa_avg.push(calcGrade(elem6))}
	if(calcGrade(elem7) == "nc") {} else {gpa_avg.push(calcGrade(elem7))}
	if(calcGrade(elem8) == "nc") {} else {gpa_avg.push(calcGrade(elem8))}
	if(calcGrade(elem9) == "nc") {} else {gpa_avg.push(calcGrade(elem9))}
	if(calcGrade(elem10) == "nc") {} else {gpa_avg.push(calcGrade(elem10))}
	if(calcGrade(elem11) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem12) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem13) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem14) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem15) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem16) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem17) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem18) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem19) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem20) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem21) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem22) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}
	if(calcGrade(elem23) == "nc") {} else {gpa_avg.push(calcGrade(elem11))}

	appendGrades(averageIze())

	// calcGrade(elem2)
	// calcGrade(elem3)
	// calcGrade(elem4)
	// calcGrade(elem5)
	// calcGrade(elem6)
	// calcGrade(elem7)
	// calcGrade(elem8)
	// calcGrade(elem9)
	// calcGrade(elem10)
	// calcGrade(elem11)
}



function getElements() {
	var classes = document.getElementsByClassName('bb-tile-content-section')[3]
	var rows = classes.getElementsByClassName("row");
	rows = Array.from(rows)
	rows.shift()
	return rows
}



// ****************************************************************************** //

function calcGrade(elem) {
	
	if(elem != null) {
		var course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0].innerHTML.toString()
		if(course.toLowerCase().includes("ap") == true) {
			var modifier = 1.33
		} else {
			if(course.toLowerCase().includes("hon") == true) {
				var modifier = 0.666
			} else {
				var modifier = 0
			}
		}
		var currentGrade = elem.getElementsByClassName("showGrade")[0].innerHTML.toString()

		if(currentGrade.toString().includes("&nbsp;") == false) {

			var finalGrade = currentGrade.toString().replace(/\s/g, '');
			finalGrade = finalGrade.substring(0, finalGrade.length - 1);
			var gpa = gradeToGpa(finalGrade)
			gpa = +gpa.toString() + +modifier.toString()
			return gpa
		} else {
			return "nc"
		}
	} else {
		return "nc"
	}
}

function gradeToGpa(pct){
	var pctStr = pct.toString()
	return GPA_MAP[pctStr]
}

function averageIze() {
	var total = 0
	for(var i = 0; i < gpa_avg.length; i++) {
		total += gpa_avg[i];
	}
	var finalAverage = total / gpa_avg.length;
	return finalAverage.toFixed(3)
}

function appendGrades(gradesMaster) {
	// LEGACY
	// 	var parent = document.getElementById("courses").getElementsByClassName("col-md-12")[0]
	// 	var parentE = document.createElement("div")
	// 	var e = document.createElement("strong")
	// 	parentE.className = "pull-left bold h3-line-height"
	// 	parentE.style.marginTop = "4px"
	// 	parentE.style.marginLeft = "8px"
	// 	e.innerHTML = "GPA: "
	// 	e.innerHTML = e.innerHTML + gradesMaster
	// 	parentE.appendChild(e)
	// 	parent.appendChild(parentE)
	// / Legacy /

	document.getElementById("performanceCollapse").getElementsByTagName("div")[0].id = "gpaParent"

	if(document.getElementById("gpaDisplay")==null) {

		var z = document.createElement('a');
		z.innerHTML = ' GPA';
		z.id = "gpaDisplay"
		z.className = 'accordion-toggle';
		var x = document.createElement("span")
		x.className = 'label label-success'
		x.innerHTML = gradesMaster
		var br = document.createElement("br")
		var hr = document.createElement("hr")
		var y = document.getElementById("gpaParent")
		y.appendChild(x);
		y.appendChild(z);
		y.appendChild(br);
		y.appendChild(hr);
	}
	
}