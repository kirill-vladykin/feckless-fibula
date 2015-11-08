var orders, menu;

//----

function initWorkArea() {
	$("#content_all_orders").attr("isCurrent", "isCurrent");
	$("#content_one_order").hide();
}

// Manage working area (no work with variables and data insertion,
// only with html tags and its attributes)
function toggleWorkArea() {
	if ( $("#content_all_orders").attr("isCurrent") ) {
		$("ul#orders").empty();
		$("#content_all_orders").removeAttr("isCurrent").hide();
		$("#content_one_order").show().attr("isCurrent", "isCurrent");	
	} else {
		$("#content_one_order").removeAttr("isCurrent").hide();
		$(".scrollable h3").empty();
		$(".scrollable table>tbody").empty();
		$("#price_total").empty();
		$(".btn-success").removeAttr("disabled");
		$("#content_all_orders").attr("isCurrent", "isCurrent").show();
	}
	
}

//----

function isDataLoaded() {
	if (orders && menu) { showOrdersList();	}
}

function loadData(){
	$.ajax({
		url: "orders.json",
		context: this,
		dataType: "json"
	})
		.done(function(data) { 
				orders = data.orders;
				for (var i=0; i<orders.length; i++) { 
					orders[i].payment_status = 0; 
					orders[i].id = (i+1); 
				};	
				isDataLoaded();
		});
		
	$.ajax({
		url: "dishes.json",
		context: this,
		dataType: "json"
	})
		.done(function(data) { 
				menu = data.dishes;	
				isDataLoaded();
		});	
}

function showOrdersList() {
	for (var i=0; i<orders.length; i++) {
		if (orders[i].payment_status == 1) {
			$("ul#orders").prepend("<li class=\"payed\">Заказ #"+(i+1)+"<div class=\"order-time\">"+
				orders[i].time+"</div><span class=\"order-payed\">Оплачен</span></li>");
		} else {
			$("ul#orders").prepend("<li id=\"order-"+(i+1)+"\" onClick=\"showOrderDetails(this.id)\">Заказ #"+(i+1)+
				"<div class=\"order-time\">"+orders[i].time+"</div><span class=\"order-payed\">&nbsp;</span></li>");
		}
	}
}

function showOrderDetails(order_id) {
	toggleWorkArea();
	var dishes = findOrderById(order_id).dishes_portions;
	var view = [{"#": "#", "Название блюда":"Название блюда", "Кол-во порций":"Кол-во порций", "Вес/объем порции": "Вес/объем порции", "Цена порции": "Цена порции"}];
	var isMoreThanOnePortion = false;
	var price_total = 0;
	var i = 1;
	
	$.each(dishes, function(index, value) {
		var dish_details = findDishByName(index);
		var amount = (dish_details.weight) ? dish_details.weight + " гр." : dish_details.volume + " мл.";
		view.push({"#": i, "Название блюда":index, "Кол-во порций":parseInt(value), "Вес/объем порции": amount, "Цена порции": dish_details.price})
		if (parseInt(value) > 1) { isMoreThanOnePortion = true; }
		price_total += parseInt(dish_details.price) * parseInt(value);
		i++;
	});
	
	$(".scrollable h3").text("Заказ номер #" + order_id.substr(order_id.lastIndexOf("-")+1));
	$(".btn-success").attr("order_id", order_id);
	$("#price_total").text(price_total);
	
	var tbody = "";
	for (var i=0; i<view.length; i++) {
		tbody += "<tr>";
		$.each(view[i], function(index, value) {
			if (isMoreThanOnePortion || index != "Кол-во порций") {
				if (!isMoreThanOnePortion) {
					//Insert with inline styles.
					//One portion case.
					switch (index) {
						case "#":
							tbody += "<td style=\"width:50px;\">"+value+"</td>";
							break;
						case "Название блюда":
							tbody += "<td style=\"width:350px;\">"+value+"</td>";
							break;
						case "Вес/объем порции":
							tbody += "<td style=\"width:250px;\">"+value+"</td>";
							break;
						case "Цена порции":
							tbody += "<td style=\"width:110px; text-align:center\">"+value+"</td>";
							break;
					}	
					
				} else {
					// Several portions case
					switch (index) {
						case "#":
							tbody += "<td style=\"width:50px;\">"+value+"</td>";
							break;
						case "Название блюда":
							tbody += "<td style=\"width:250px;\">"+value+"</td>";
							break;
						case "Кол-во порций":
							tbody += "<td style=\"text-align:center;\">"+value+"</td>";
							break;
						case "Вес/объем порции":
							tbody += "<td style=\"width:250px; text-align:center\">"+value+"</td>";
							break;
						case "Цена порции":
							tbody += "<td style=\"width:110px; text-align:center\">"+value+"</td>";
							break;
					}
				}
			} else { null; } // only one portion case and current index is "number of portions" - do not insert 
		});
		tbody += "</tr>";
	}
	$(".scrollable table>tbody").html(tbody);
	var i = 0;
}

function markOrderPayed(order_id) {
	if (confirm("Отметить заказ как оплаченный?")) {
		findOrderById(order_id).payment_status = 1;
		$(".btn-success").attr("disabled", "disabled");
	}
}

//----

function findOrderById(order_id) {
	for (var i=0; i<orders.length; i++) {
		if ( ("order-"+orders[i].id) == order_id) { return orders[i] }
	}
	return undefined;
}

function findDishByName(dish_name) {
	for (var i=0; i<menu.length; i++) {
		if ( menu[i].name == dish_name) { return menu[i] }
	}
	return undefined;
}

$(document).ready(function() {
	initWorkArea();
	loadData();
});