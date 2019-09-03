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

	if(calcGrade(elem1) == "nc") {} else {doStuffWith(elem1)}
	if(calcGrade(elem2) == "nc") {} else {doStuffWith(elem2)}
	if(calcGrade(elem3) == "nc") {} else {doStuffWith(elem3)}
	if(calcGrade(elem4) == "nc") {} else {doStuffWith(elem4)}
	if(calcGrade(elem5) == "nc") {} else {doStuffWith(elem5)}
	if(calcGrade(elem6) == "nc") {} else {doStuffWith(elem6)}
	if(calcGrade(elem7) == "nc") {} else {doStuffWith(elem7)}
	if(calcGrade(elem8) == "nc") {} else {doStuffWith(elem8)}
	if(calcGrade(elem9) == "nc") {} else {doStuffWith(elem9)}
	if(calcGrade(elem10) == "nc") {} else {doStuffWith(elem10)}
	if(calcGrade(elem11) == "nc") {} else {doStuffWith(elem11)}
	if(calcGrade(elem12) == "nc") {} else {doStuffWith(elem12)}
	if(calcGrade(elem13) == "nc") {} else {doStuffWith(elem13)}
	if(calcGrade(elem14) == "nc") {} else {doStuffWith(elem14)}
	if(calcGrade(elem15) == "nc") {} else {doStuffWith(elem15)}
	if(calcGrade(elem16) == "nc") {} else {doStuffWith(elem16)}
	if(calcGrade(elem17) == "nc") {} else {doStuffWith(elem17)}
	if(calcGrade(elem18) == "nc") {} else {doStuffWith(elem18)}
	if(calcGrade(elem19) == "nc") {} else {doStuffWith(elem19)}
	if(calcGrade(elem20) == "nc") {} else {doStuffWith(elem20)}
	if(calcGrade(elem21) == "nc") {} else {doStuffWith(elem21)}
	if(calcGrade(elem22) == "nc") {} else {doStuffWith(elem22)}
	if(calcGrade(elem23) == "nc") {} else {doStuffWith(elem23)}

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

function doStuffWith(elem) {
	gpa_avg.push(calcGrade(elem))
	populateModalTable(elem)
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

function getClassName(elem) {
	
	if(elem != null) {
		var course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0].innerHTML.toString()
		return course
	} else {
		return "nc"
	}
}

function getClassWeight(elem) {
	var course = elem.getElementsByClassName("col-md-3")[0].getElementsByTagName("h3")[0].innerHTML.toString()
		if(course.toLowerCase().includes("ap") == true) {
			var modifier = 1.33
			return 1.33
		} else {
			if(course.toLowerCase().includes("hon") == true) {
				var modifier = 0.666
				return 0.66
			} else if(course.toLowerCase().includes("study hall") == true) {
				elem.style.display = 'none'
			} else {
				var modifier = 0
				return 0.0
			}
		}
}

function getClassGrade(elem) {
	if(elem != null) {
		var currentGrade = elem.getElementsByClassName("showGrade")[0].innerHTML.toString()

		if(currentGrade.toString().includes("&nbsp;") == false) {
			var finalGrade = currentGrade.toString().replace(/\s/g, '');
			return finalGrade
		} else {
			return "nc"
		}
	} else {
		return "nc"
	}
}

function populateModalTable(elem) {
	var modalClassName = getClassName(elem)
	var modalClassGrade = getClassGrade(elem)
	var modalClassGpa = gradeToGpa(modalClassGrade.replace('%','').toString())
	var modalClassWeight = getClassWeight(elem)
	console.log(modalClassGrade.replace('%','').toString())

	var parent = document.getElementById('gpaOutTable')
	var row = document.createElement('tr')
	var thClass = document.createElement('td')
	thClass.innerHTML = modalClassName
	var thGrade = document.createElement('td')
	thGrade.innerHTML = modalClassGrade
	var thGpa = document.createElement('td')
	thGpa.innerHTML = modalClassGpa

	row.appendChild(thClass)
	row.appendChild(thGrade)
	row.appendChild(thGpa)


	parent.appendChild(row)

	document.getElementById('insightGpaOut').innerHTML = averageIze()

	// CONTINUE FROM HERE


}

function gradeToGpa(pct){
	return GPA_MAP[pct]
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
		z.href = "javascript:openInsights()"
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

function createModalV2() {
	var modalParent = document.createElement('div')
	modalParent.setAttribute('style','position:fixed;width:100%;height:100%;z-index:9999;background-color:rgba(0,0,0,0.4);top:0;')
	modalParent.setAttribute('id','modalParent')
	var bbModal = document.createElement('div')
	bbModal.setAttribute('style','position:absolute;width:60%;padding:15px;margin-top:15%;margin-left:20%;background-color:white;box-shadow: 0 5px 15px rgba(0,0,0,0.5);')
	var close = document.createElement('button')
	close.setAttribute('type','button')
	close.setAttribute('onclick','closeInsights()')
	close.setAttribute('class','btn btn-default')
	close.innerHTML = "Close Insights"
	var gpaOutTitle = document.createElement('h1')
	gpaOutTitle.innerHTML = "Your GPA: "
	var gpaOut = document.createElement('span')
	gpaOut.setAttribute('style','color:#39FF14')
	gpaOut.innerHTML = "4.0"
	gpaOut.setAttribute('id','insightGpaOut')


	var table = document.createElement('table')                           // --------------table:19-------------
	table.setAttribute('id','gpaOutTable')                                // |  Class  |  Grade  |  GPA Score  |  tr 21
	var headerTr = document.createElement('tr')                           //   th 23      th 27     th 31
	
	var th = document.createElement('th')
	th.innerHTML = 'Class'
	headerTr.appendChild(th)

	th = document.createElement('th')
	th.innerHTML = "Grade"
	headerTr.appendChild(th)

	th = document.createElement('th')
	th.innerHTML = "GPA Score (unweighted)"
	headerTr.appendChild(th)

	// CONTINUE HERE: GRADE WEIGHT

	table.setAttribute('class','table table-striped table-condensed table-mobile-stacked')

	table.appendChild(headerTr)

	var style = document.createElement('style')
	// style.innerHTML = "table,th,td{border:1px solid black;border-collapse:collapse} th,td {width:30%}"

	style.innerHTML = "tr:nth-child(even) {background-color: #f2f2f2}"

	modalParent.appendChild(style)

	var br = document.createElement(br)

	gpaOutTitle.appendChild(gpaOut)
	bbModal.appendChild(gpaOutTitle)
	bbModal.appendChild(br)
	bbModal.appendChild(table)
	bbModal.appendChild(close)
	modalParent.appendChild(bbModal)
	document.body.appendChild(modalParent)
	console.log(modalParent)
}
                    //total Class 1 name,class1average,class1grade
function populateModal(gpa,c1n,c1a,c1g,c2n,c2a,c2g,c3n,c3a,c3g,c4n,c4a,c4g,c5n,c5a,c5g,c6n,c6a,c6g,c7n,c7a,c7g,c8n,c8a,c8g,c9n,c9a,c9g,c10n,c10a,c10g,c11n,c11a,c11g,c12n,c12a,c12g,c13n,c13a,c13g,c14n,c14a,c14g,c15n,c15a,c15g) {
	document.getElementById('insightGpaOut').innerHTML = gpa
	var parentTable = document.getElementById('gpaOutTable')

	if(c1n!=null) {
		var tr = document.createElement('tr')

		var td1 = document.createElement('td')
		td1.innerHTML = c1n
		tr.appendChild(td1)

		var td2 = document.createElement('td')
		td2.innerHTML = c1g
		tr.appendChild(td2)

		var td3 = document.createElement('td')
		td3.innerHTML = c1a
		tr.appendChild(td3)

		parentTable.appendChild(tr)
	}

	if(c2n!=null) {
		var tr = document.createElement('tr')

		var td1 = document.createElement('td')
		td1.innerHTML = c2n
		tr.appendChild(td1)

		var td2 = document.createElement('td')
		td2.innerHTML = c2g
		tr.appendChild(td2)

		var td3 = document.createElement('td')
		td3.innerHTML = c2a
		tr.appendChild(td3)

		parentTable.appendChild(tr)
	}

	if(c3n!=null) {
		var tr = document.createElement('tr')

		var td1 = document.createElement('td')
		td1.innerHTML = c3n
		tr.appendChild(td1)

		var td2 = document.createElement('td')
		td2.innerHTML = c3g
		tr.appendChild(td2)

		var td3 = document.createElement('td')
		td3.innerHTML = c3a
		tr.appendChild(td3)

		parentTable.appendChild(tr)
	}

	if(c4n!=null) {
		var tr = document.createElement('tr')

		var td1 = document.createElement('td')
		td1.innerHTML = c4n
		tr.appendChild(td1)

		var td2 = document.createElement('td')
		td2.innerHTML = c4g
		tr.appendChild(td2)

		var td3 = document.createElement('td')
		td3.innerHTML = c4a
		tr.appendChild(td3)

		parentTable.appendChild(tr)
	}

	if(c5n!=null) {
		var tr = document.createElement('tr')

		var td1 = document.createElement('td')
		td1.innerHTML = c5n
		tr.appendChild(td1)

		var td2 = document.createElement('td')
		td2.innerHTML = c5g
		tr.appendChild(td2)

		var td3 = document.createElement('td')
		td3.innerHTML = c5a
		tr.appendChild(td3)

		parentTable.appendChild(tr)
	}

	if(c6n!=null) {
		var tr = document.createElement('tr')

		var td1 = document.createElement('td')
		td1.innerHTML = c6n
		tr.appendChild(td1)

		var td2 = document.createElement('td')
		td2.innerHTML = c6g
		tr.appendChild(td2)

		var td3 = document.createElement('td')
		td3.innerHTML = c6a
		tr.appendChild(td3)

		parentTable.appendChild(tr)
	}

	if(c7n!=null) {
		var tr = document.createElement('tr')

		var td1 = document.createElement('td')
		td1.innerHTML = c7n
		tr.appendChild(td1)

		var td2 = document.createElement('td')
		td2.innerHTML = c7g
		tr.appendChild(td2)

		var td3 = document.createElement('td')
		td3.innerHTML = c7a
		tr.appendChild(td3)

		parentTable.appendChild(tr)
	}
}

function makeRow(className,average,grade) {
	var tr = document.createElement('tr')
	var td1 = document.createElement('td').innerHTML = className
	var td2 = document.createElement('td').innerHTML = grade
	var td3 = document.createElement('td').innerHTML = average
	tr.appendChild(td1)
	tr.appendChild(td2)
	tr.appendChild(td3)
	return tr
}

function createInsightFucntions() {
	var script = document.createElement('script')
	script.innerHTML = "function closeInsights(){document.getElementById('modalParent').style.display = 'none'} function openInsights() {document.getElementById('modalParent').style.display = 'block'}"
	document.head.appendChild(script)
}

createInsightFucntions()

function closeInsights() {
	document.getElementById('modalParent').style.display = 'none'
}

function openInsights() {
	document.getElementById('modalParent').style.display = 'block'
}

createModalV2()

closeInsights()