
var baseTerm = "locations"
var jsonURL = "http://api.grabngo.market/api/" + baseTerm;
var baseURL = "http://api.grabngo.market";
var nextURL = "";
var prevURL = "";
var searchTerm = "";
var searchURL = baseURL + "/api/" + baseTerm + "/search/" + searchTerm;

function loadJSON(file, callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4) {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function sendJSON(url, data, callback)
 {
    var xobj = new XMLHttpRequest();
    xobj.open('PUT', url, true);
    xobj.setRequestHeader('Content-Type', 'application/json');
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4) {
             callback(xobj.responseText);
          }
    };
    console.log(JSON.stringify(data));
    xobj.send(JSON.stringify(data));
 }

var Item = function Item(_id, customer_id, barcode, description, price, taxable) {
    this.id = id;
    this.customer_id = customer_id
    this.barcode = barcode;
    this.description = description;
    this.price = price;
    this.taxable = taxable;
};

function load() {
    loadJSON(jsonURL, function(response) {
        var locationsJson = JSON.parse(response);
        loadTables(locationsJson)
    });
}

function clearTable()
{
	var table = document.getElementById(baseTerm +"Table");
while(table.rows.length > 0) {
  table.deleteRow(0);
}
}

function next() {
	clearTable();
	jsonURL = baseURL + nextURL;
	load();
}

function previous() {
	clearTable();
	jsonURL = baseURL + prevURL;
	load();
}

function search()
{
    searchTerm = document.getElementById("searchBox").value;
    clearTable();
    jsonURL = searchURL + searchTerm;
    load();
    //console.log(jsonURL);
}

/*
    <table id="itemsTable" class="table table-bordered table-hover" width="647">
        <!-- GET /api/items/ -->
        <thead>
        <tr>
                                        <th>ITEMS Name</th>
                                        <th>Barcode</th>
                                        <th>Price</th>
                                        <th>Taxable</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
*/

function loadTables(json)
{
    // Create tables based on the top level JSON object

    var obj = json[baseTerm];

    obj.forEach(function (location) {

        // Create an HTML table for each object here
        // let's create our tables!
        var animatedLocationContainer;
        animatedLocationContainer = document.createElement('div');
        animatedLocationContainer.className = "css3-animated-example"


        var h3 = document.createElement('h3');
        h3.innerHTML=location["name"]
        animatedLocationContainer.appendChild(h3);

        var justaDiv = document.createElement('div');

        animatedLocationContainer.appendChild(justaDiv);

        var content = document.createElement('div');
        content.className = 'content';
        justaDiv.appendChild(content);

        appendLocationList(location["registered_users"], location["average_reload"], location["average_purchase"], content);

        appendItemsTable(location["items"], content);

        appendInventoryTable(location["inventory"], content);

        document.getElementById("locations").appendChild(animatedLocationContainer);

    });

    $(".css3-animated-example").collapse({
              accordion: true,
              open: function() {
                this.addClass("open");
                this.css({ height: this.children().outerHeight() });
              },
              close: function() {
                this.css({ height: "0px" });
                this.removeClass("open");
              }
            });

    return;

}

function appendLocationList(registered_users, average_reload, average_purchase, domElement)
{
    /*
    <h2>Statistics</h2>
    <li id="registered_users">Registerd User: 125</li>
    <li id="average_reload">Average Reload: $10.00</li>
    <li id="average_purchase">Average Puschare: $3.75</li>
    */

    var h2, li1, li2, li3;
    h2 = document.createElement('h2');
    li1 = document.createElement('li');
    li2 = document.createElement('li');
    li3 = document.createElement('li');

    h2.innerHTML = "Statistics";
    li1.innerHTML = "Registered Users: " + registered_users;
    li2.innerHTML = "Average Reload: " + average_reload;
    li3.innerHTML = "Average Purchase: " + average_purchase;

    domElement.appendChild(h2);
    domElement.appendChild(li1);
    domElement.appendChild(li2);
    domElement.appendChild(li3);


}

function appendItemsTable(itemsObj, domElement)
{

    var sml_faq, animated_cont, div, content, table, tr, td, th, thead, tbody;
    sml_faq = document.createElement("div");
    animated_cont = document.createElement("div");
    div = document.createElement("div");
    content = document.createElement("div");
    table = document.createElement("table");
    tr = document.createElement("tr");
    td = document.createElement("td");
    th = document.createElement("th");
    thead = document.createElement("thead");

    var price, barcode, taxable, description, id;
    price = document.createElement("th");
    barcode = document.createElement("th");
    taxable = document.createElement("th");
    description = document.createElement("th");
    id = document.createElement("th");

    price.innerHTML = "Price";
    barcode.innerHTML = "Barcode";
    taxable.innerHTML = "Taxable";
    description.innerHTML = "Description";
    id.innerHTML = "_id";

    thead.appendChild(tr);
    tr.appendChild(description);
    tr.appendChild(price);
    tr.appendChild(barcode);
    tr.appendChild(taxable);
    tr.appendChild(id);

    table.appendChild(tr);
    tr.appendChild(td);

    sml_faq.className = "sml_faq";
    animated_cont.className = "css3-animated-example";

    var t = document.createElement('h3');
    t.innerHTML = "Items";
    animated_cont.appendChild(t);

    var y = document.createElement('div');
    animated_cont.appendChild(y);

    y.appendChild(content);

    content.className = "content";

    domElement.appendChild(sml_faq);
    sml_faq.appendChild(animated_cont);
    animated_cont.appendChild(div);
    //div.appendChild(content);
    content.appendChild(table);

    itemsObj.forEach(function (item) {
        // Create the td elements and append them to the table element
        console.log(item);
        var description, price, barcode, taxable, id;
        description = document.createElement("td");
        price = document.createElement("td");
        barcode = document.createElement("td");
        taxable = document.createElement("td");
        id = document.createElement("td");

        description.innerHTML = item["description"]
        price.innerHTML = item["price"];
        barcode.innerHTML = item["barcode"];
        taxable.innerHTML = item["taxable"];
        id.innerHTML = item["_id"];

        var tr = document.createElement("tr");
        tr.appendChild(description)
        tr.appendChild(price);
        tr.appendChild(barcode);
        tr.appendChild(taxable);
        tr.appendChild(id);

        table.appendChild(tr);
    });
}

function appendInventoryTable(inventoryObj, domElement)
{
        var sml_faq, animated_cont, div, content, table, tr, td, th, thead, tbody;
    sml_faq = document.createElement("div");
    animated_cont = document.createElement("div");
    div = document.createElement("div");
    content = document.createElement("div");
    table = document.createElement("table");
    tr = document.createElement("tr");
    td = document.createElement("td");
    th = document.createElement("th");
    thead = document.createElement("thead");

    var description, qty_on_shelf;

    description = document.createElement("th");
    qty_on_shelf = document.createElement("th");

    description.innerHTML = "Description";
    qty_on_shelf.innerHTML = "Qty on Shelf";

    thead.appendChild(tr);
    tr.appendChild(description);
    tr.appendChild(qty_on_shelf);

    table.appendChild(tr);
    tr.appendChild(td);

    sml_faq.className = "sml_faq";
    animated_cont.className = "css3-animated-example";

    var t = document.createElement('h3');
    t.innerHTML = "Inventory";
    animated_cont.appendChild(t);

    var y = document.createElement('div');
    animated_cont.appendChild(y);

    y.appendChild(content);

    content.className = "content";

    domElement.appendChild(sml_faq);
    sml_faq.appendChild(animated_cont);
    animated_cont.appendChild(div);
    //div.appendChild(content);
    content.appendChild(table);

    inventoryObj.forEach(function (item) {
        // Create the td elements and append them to the table element
        console.log(item);
        var description, qty_on_shelf;
        description = document.createElement("td");
        qty_on_shelf = document.createElement("td");

        description.innerHTML = item["description"]      
        qty_on_shelf.innerHTML = item["taxable"];

        var tr = document.createElement("tr");
        tr.appendChild(description)
        tr.appendChild(qty_on_shelf);

        table.appendChild(tr);
    });
}

function save(id, label, value)
{
	// PUT api.grabngo.market/api/items/id/:id
    // First, let's construct our PUT URL

    var putURL = "http://api.grabngo.market/api/items/id/" + id;

    var jsonBody = { };
    jsonBody[label] = value;

    sendJSON(putURL, jsonBody, function(response)
    {
        console.log(response);
    })
}
