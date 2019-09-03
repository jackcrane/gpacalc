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
	th.innerHTML = "GPA Score"
	headerTr.appendChild(th)

	table.setAttribute('class','table table-striped table-condensed table-mobile-stacked')

	table.appendChild(headerTr)

	var style = document.createElement('style')
	// style.innerHTML = "table,th,td{border:1px solid black;border-collapse:collapse} th,td {width:30%}"

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

function closeInsights() {
	document.getElementById('modalParent').style.display = 'none'
}

function openInsights() {
	document.getElementById('modalParent').style.display = 'block'
}

createModalV2()