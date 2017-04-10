import {Component,OnInit} from '@angular/core';
import {trigger, state,style, animate,transition} from '@angular/animations';
@Component({
    selector: 'view_location',
    templateUrl:'app/components/location/viewlocation.html'
})
export class ViewLocationComponentTest{
/*
baseTerm = "locations";
jsonURL = "https://api.grabngo.market/api/" + this.baseTerm;
baseURL = "https://api.grabngo.market";
 nextURL = "";
 prevURL = "";
 searchTerm = "";
 searchURL = this.baseURL + "/api/" + this.baseTerm + "/search/" + this.searchTerm;


loadJSON(file:any, callback:any) {   
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


 Item = function Item(_id:any, customer_id:any, barcode:any, description:any, price:any, taxable:any) {
    this.id = _id;
    this.customer_id = customer_id
    this.barcode = barcode;
    this.description = description;
    this.price = price;
    this.taxable = taxable;
};

    load() {

       this.loadJSON(this.jsonURL,(response:any)=>{
            var itemsJson = JSON.parse(response);
            this.loadItems(itemsJson);
           
        });
    }

 loadItems(itemsJson:any)
{

    let obj = itemsJson;
     let locationObj = itemsJson["locations"];
    console.log(obj);

    obj.forEach(function (location:any) {

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
        this.appendLocationList(location["registered_users"], location["average_reload"], location["average_purchase"], content);
        this.appendItemsTable(location["items"], content);
        this.appendInventoryTable(location["inventory"], content);
        document.getElementById("locations").appendChild(animatedLocationContainer);

    });


}
appendLocationList(registered_users:any, average_reload:any, average_purchase:any, domElement:any)
{

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

appendItemsTable(itemsObj:any, domElement:any)
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

    itemsObj.forEach(function (item:any) 
    //for(let item in itemsObj)
    {
            // Create the td elements and append them to the table element
            console.log(item);
            var description, price, barcode, taxable, id;
            description = document.createElement("td");
            price = document.createElement("td");
            barcode = document.createElement("td");
            taxable = document.createElement("td");
            id = document.createElement("td");

            description.innerHTML = item["description"];
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

            this.table.appendChild(tr);
    });
    return;
}

appendInventoryTable(inventoryObj:any, domElement:any)
{
    var sml_faq, animated_cont, div, content, table:any, tr, td, th, thead, tbody;
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

    inventoryObj.forEach(function (item:any) {
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


 ngOnInit(){

        //this.load();
   
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
     
 }

*/
 animations: [
    trigger('heroState', [
      state('inactive', style({
        backgroundColor: '#eee',
        transform: 'scale(1)'
      })),
      state('active',   style({
        backgroundColor: '#cfd8dc',
        transform: 'scale(1.1)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
}
 