$(document).ready(function() {

    // checkout
    var cart = $("#cart")
    var checkoutBtn = $("#checkout-btn");
    checkoutBtn.click (function () {
        cart.toggle(200);
    })

    // BUY ITEMS LIST
    var chair = new Item (1, "Chair", 15);
    var buyChairBtn = $("#buy-chair-btn");
    buyChairBtn.click (function () {
        addTest(chair);  
    })

    var table = new Item (2, "Table", 30);
    var buyTableBtn = $("#buy-table-btn");
    buyTableBtn.click (function () {
        addTest(table);  
    })

    var bed = new Item (3, "Bed", 145);
    var buyBedBtn = $("#buy-bed-btn");
    buyBedBtn.click (function () {
        addTest(bed);    
    })

    var bookcase = new Item (4, "Bookcase", 35);
    var buyBookcaseBtn = $("#buy-bookcase-btn");
    buyBookcaseBtn.click (function () {
        addTest(bookcase);   
    })

    var plant = new Item (5, "Plant", 2);
    var buyPlantBtn = $("#buy-plant-btn");
    buyPlantBtn.click (function () {
        addTest(plant);  
    })

    var tvBench = new Item (6, "TV bench", 65);
    var buyTVBenchBtn = $("#buy-tv-bench-btn");
    buyTVBenchBtn.click (function () {
        addTest(tvBench);  
    })
    
    // global builder
    function Item (id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qty = 1;
        this.price = price;
        this.exists = false;
    }

    // TEST PRODUCT DECLARATION ************** NOT IN USE WHEN NOT TESTING
    var test = new Item ("TEST", "test", 10);
    $("#test-add").click(function () {
        addTest(test);  

    })

    // ADDED TO CART CONFIRMATION
    $(".buy-btn").click(function () {
        console.log("click")
        $(this).parent().append("<div class='confirmation'>Sucessfully added this item to cart!</div>");
        $(".confirmation").delay(1000).fadeOut(1000);
    })

    // TODO POSSIBILITY TO CHOOSE QUANTITY BEFORE ADDING TO CART 
    function addTest (obj) {
        
        // if item doesn't exist, it's added as a new row
        if (!obj.exists) {
            $("tbody").append('<tr><th scope="row" id="' + obj.id + '">' + obj.id + '</th> <td class="name">' + obj.name +'</td class="price"><td>'+obj.price+'</td><td class="qty">' + obj.qty + '</td><td class="remove' + obj.name + '">' + removeButton + '</td></tr>');  
            console.log("Added product to cart")
            //its existance is changed so the program knows there's already one and stops adding new rows
            obj.exists = true;
        // if the item already exists, we must update its parameters inside the html
        } else {

            // adds 1 of the item
            obj.qty++;
            console.log("item: " + obj.name + ", quantity: " + obj.qty + ", total price of these items: " + obj.price*obj.qty)

            //updates shopping cart with new qty
            $("#" + obj.id).siblings(".qty").html(obj.qty);  

        }

        // cost of individual product is added to total
        totalCost += obj.price;
        updateTotalCost();
    }

    // total cost of products
    var totalCost = 0;
    function updateTotalCost () {
        $("#total-cost").html("Total cost: " + totalCost + "€");
    }

    // remove function
    function cleanObj (obj) {
        totalCost -= (obj.qty * obj.price)
        obj.qty = 1;
        obj.exists = false;
    }

    // REMOVE BUTTON DELETES ACTUAL TR
    var removeButton = '<button class="removeBtn btn btn-danger">REMOVE</button>';
    $(document).on('click', '.removeBtn', function(){ 

        // clean object registers, needed for re-adding to cart
        var objRemoved = ($(this).parent().siblings(".name").html()).toLowerCase(); // used to get the ID of the item
        console.log("Item being removed: " + objRemoved);

        //switch to clear the right object
        switch(objRemoved) {
            case "chair":
                cleanObj(chair);
                break;
            case "table":
                cleanObj(table);
                break;
            case "bed":
                cleanObj(bed);
                break;
            case "bookcase":
                cleanObj(bookcase);
                break;
            case "plant":
                cleanObj(plant);
                break;
            case "tv bench":
                cleanObj(bed);
                break;
            default:
                console.log("Nothing has been removed! (no match)")
        }

        // remove price from total count
        updateTotalCost();

        // remove element row
        $(this).parent().parent().remove();
    })

});
