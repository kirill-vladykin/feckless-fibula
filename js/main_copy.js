Controller = {
	orders: null,
	menu: null
}

Controller.loadData = function() {
	$.getJSON("orders.json", function(data) { this.orders = data.orders });
	for (var i=0; i<this.orders.length; i++) { this.orders[i].payment_status = 0 };
}

Controller.showAllOrders = function() {
	for (var i=0; i<this.orders.length; i++) {
		$("ul#orders").prepend("<li>Заказ #"+(i+1)+"<div class=\"order-time\">"+this.orders[i].time+"</div></li>");
	}
}

