'use strict';

//list of truckers
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const truckers = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'les-routiers-bretons',
  'pricePerKm': 0.05,
  'pricePerVolume': 5
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'geodis',
  'pricePerKm': 0.1,
  'pricePerVolume': 8.5
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'xpo',
  'pricePerKm': 0.10,
  'pricePerVolume': 10
}];

//list of current shippings
//useful for ALL steps
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const deliveries = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'shipper': 'bio-gourmet',
  'truckerId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'distance': 100,
  'volume': 4,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'shipper': 'librairie-lu-cie',
  'truckerId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'distance': 650,
  'volume': 12,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'shipper': 'otacos',
  'truckerId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'distance': 1250,
  'volume': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'convargo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'deliveryId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'deliveryId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'shipper',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'trucker',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'convargo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(truckers);
console.log(deliveries);
console.log(actors);

deliveries.forEach(function(delivery){

	truckers.forEach(function(trucker){

		actors.forEach(function(actor){


			var decreasedPriceVol = 1;
			var deductible = 0;

			if (trucker.id ==delivery.truckerId)
			{

				if ((delivery.volume >=5) && (delivery.volume <10))
				{
					decreasedPriceVol = 0.9;
				}
				if ((delivery.volume >=10) && (delivery.volume <25))
				{
					decreasedPriceVol = 0.7;
				}
				if (delivery.volume >=25)
				{
					decreasedPriceVol = 0.5;
				}

				if (delivery.options.deductibleReduction == true)
				{
					deductible = delivery.volume;
				}


				delivery.price = delivery.distance*(trucker.pricePerKm*decreasedPriceVol) + delivery.volume * trucker.pricePerVolume + deductible;
				

				var commission = delivery.price*0.3;


				delivery.commission.insurance = commission/2;
				delivery.commission.treasury = Math.ceil(delivery.distance/500);
				delivery.commission.convargo = commission - delivery.commission.insurance - delivery.commission.treasury;

				
			}
		});
	});
});

actors.forEach(function(actor){
	deliveries.forEach(function(delivery){
		if (actor.deliveryId == delivery.id)
			{
				actor.payment[0].amount = delivery.price;
				actor.payment[1].amount	= 0.7*delivery.price;
				actor.payment[2].amount	= delivery.commission.treasury;
				actor.payment[3].amount	= delivery.commission.insurance;
				actor.payment[4].amount	= delivery.commission.convargo;	


			}
			console.log(delivery.id + ":");
			console.log("delivery price : " + delivery.price);
			console.log ("shipper : " + actor.payment[0].amount);
			console.log ("trucker : " +actor.payment[1].amount);
			console.log ("treasury : " +actor.payment[2].amount);
			console.log ("insurance : " +actor.payment[3].amount);
			console.log ("convargo : " +actor.payment[4].amount);
	});
});

